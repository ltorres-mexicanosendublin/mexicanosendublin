import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      age,
      gender,
      phone,
      email,
      zones,
      jobs,
      englishLevel,
      englishProof,
      englishProofNote,
      nursing,
      photoUrl, // ✅ NUEVO
    } = body ?? {};

    // ✅ Validación mínima
    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum <= 0) {
      return NextResponse.json({ error: "Edad inválida" }, { status: 400 });
    }

    if (!Array.isArray(zones) || !Array.isArray(jobs)) {
      return NextResponse.json(
        { error: "Zonas y trabajos deben ser listas" },
        { status: 400 }
      );
    }

    if (photoUrl && typeof photoUrl !== "string") {
      return NextResponse.json({ error: "photoUrl inválida" }, { status: 400 });
    }

    const to = "contacto@mexicanosendublin.com";
    const subject = `Registro Trabajo: ${fullName} (${englishLevel ?? "—"})`;

    const safePhotoUrl = (photoUrl ?? "").toString().trim();

    const html = `
      <h2>Registro Trabajo</h2>
      <p><b>Nombre:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${phone ?? "—"}</p>
      <p><b>Edad:</b> ${ageNum}</p>
      <p><b>Género:</b> ${gender ?? "—"}</p>

      <hr/>

      <p><b>Foto (URL):</b> ${
        safePhotoUrl
          ? `<a href="${safePhotoUrl}" target="_blank" rel="noreferrer">${safePhotoUrl}</a>`
          : "No adjunta"
      }</p>

      ${
        safePhotoUrl
          ? `<p style="margin-top:8px">
               <img 
                 src="${safePhotoUrl}" 
                 alt="Foto de ${fullName}"
                 style="max-width:220px; border-radius:14px; border:1px solid #e5e7eb;"
               />
             </p>`
          : ""
      }

      <hr/>

      <p><b>Zonas:</b> ${(zones ?? []).join(", ") || "—"}</p>
      <p><b>Trabajos:</b> ${(jobs ?? []).join(", ") || "—"}</p>
      <p><b>Nivel inglés:</b> ${englishLevel ?? "—"}</p>
      <p><b>Prueba inglés:</b> ${englishProof ?? "—"}</p>
      <p><b>Nota prueba:</b> ${englishProofNote ?? "—"}</p>

      <hr/>

      <p><b>Nursing:</b> ${nursing ? "Sí" : "No"}</p>
      ${
        nursing
          ? `<p><b>Experiencia:</b> ${nursing.experience ?? "—"}</p>
             <p><b>Referencia:</b> ${nursing.reference?.name ?? "—"} / ${nursing.reference?.email ?? "—"} / ${nursing.reference?.phone ?? "—"}</p>`
          : ""
      }
    `;

    const from =
      process.env.RESEND_FROM ?? "Mexicanos en Dublin <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Error" }, { status: 500 });
  }
}
