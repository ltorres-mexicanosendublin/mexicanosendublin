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
    } = body ?? {};

    // Validaciones mínimas (igual estilo que contact)
    if (!fullName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Nombre, correo y teléfono son obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(zones) || zones.length === 0) {
      return new Response(
        JSON.stringify({ error: "Debes seleccionar al menos una zona" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return new Response(
        JSON.stringify({ error: "Debes seleccionar al menos un tipo de trabajo" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (englishProof !== true) {
      return new Response(
        JSON.stringify({ error: "Debes confirmar que tu inglés es comprobable" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const to = "contacto@mexicanosendublin.com";
    const subject = `Nuevo registro trabajador: ${fullName}`;

    const html = `
      <h2>Nuevo registro de trabajador</h2>

      <h3>Datos personales</h3>
      <p><b>Nombre:</b> ${fullName}</p>
      <p><b>Edad:</b> ${age ?? "—"}</p>
      <p><b>Género:</b> ${gender ?? "—"}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>

      <hr />

      <h3>Disponibilidad</h3>
      <p><b>Zonas:</b> ${(zones ?? []).join(", ")}</p>
      <p><b>Trabajos:</b> ${(jobs ?? []).join(", ")}</p>

      <hr />

      <h3>Inglés</h3>
      <p><b>Nivel:</b> ${englishLevel ?? "—"}</p>
      <p><b>Comprobable:</b> ${englishProof ? "Sí" : "No"}</p>
      <p><b>Nota:</b> ${(englishProofNote ?? "—").toString().replace(/\n/g, "<br/>")}</p>

      ${
        Array.isArray(jobs) && jobs.includes("enfermeria")
          ? `
        <hr />
        <h3>Cuidados de enfermería</h3>
        <p><b>Experiencia:</b> ${nursing?.experience ?? "—"}</p>
        <p><b>Referencia:</b> ${nursing?.reference?.name ?? "—"}</p>
        <p><b>Email referencia:</b> ${nursing?.reference?.email ?? "—"}</p>
        <p><b>Teléfono referencia:</b> ${nursing?.reference?.phone ?? "—"}</p>
      `
          : ""
      }
    `;

    const from =
      process.env.RESEND_FROM ??
      "Mexicanos en Dublin <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, id: data?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error("registro-worker error:", e);
    return new Response(
      JSON.stringify({ error: e?.message ?? "Error interno" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
