// src/app/api/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY no configurada en el servidor" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();
    const { fullName, email } = body ?? {};

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    const from =
      process.env.RESEND_FROM ?? "Mexicanos en Dublin <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: "contacto@mexicanosendublin.com",
      replyTo: email,
      subject: "Nuevo lead escuelas",
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("contact error:", e);
    return NextResponse.json(
      { error: e?.message ?? "Error" },
      { status: 500 }
    );
  }
}
