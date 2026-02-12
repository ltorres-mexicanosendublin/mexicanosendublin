import { NextResponse } from "next/server";

export const runtime = "nodejs"; // importante para fetch server-side

export async function POST(req: Request) {
  try {
    const endpoint = process.env.LEADS_ENDPOINT?.trim(); // 👈 OJO: SIN NEXT_PUBLIC
    if (!endpoint) {
      return NextResponse.json(
        { ok: false, error: "Falta LEADS_ENDPOINT en variables de entorno (server)." },
        { status: 500 }
      );
    }

    const payload = await req.json();

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await r.text();

    // intenta parsear JSON, pero si viene texto/HTML no revientes
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, error: "Apps Script no regresó JSON", raw: text.slice(0, 400) };
    }

    if (!r.ok || data?.ok === false) {
      return NextResponse.json(
        { ok: false, error: data?.error ?? "Error en Apps Script", raw: data?.raw ?? text.slice(0, 400) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Error desconocido en /api/leads" },
      { status: 500 }
    );
  }
}
