// src/app/api/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Mexicanos en Dublin <onboarding@resend.dev>", // 👈 dominio seguro
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
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Error" },
      { status: 500 }
    );
  }
}
