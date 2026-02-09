import { NextResponse } from "next/server";
import Stripe from "stripe";

type CartItem = {
  id: string;
  name: string;
  priceEUR: number;
  qty: number;
};

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY no configurada");
  return new Stripe(key, {
});
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();

    const body = await request.json();

    const items: CartItem[] = body?.items ?? [];
    const mode: "full" | "deposit" = body?.mode ?? "full";
    const deliveryPlace: string = body?.deliveryPlace ?? "";
    const deliveryDatetime: string = body?.deliveryDatetime ?? "";

    if (!items.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const subtotal = items.reduce((sum, it) => sum + it.priceEUR * it.qty, 0);

    const amountToCharge =
      mode === "deposit"
        ? Math.round(subtotal * 0.1 * 100) // 10% en centavos
        : Math.round(subtotal * 100); // 100% en centavos

    if (amountToCharge < 50) {
      return NextResponse.json(
        { error: "El monto es demasiado pequeño para cobrar con Stripe." },
        { status: 400 }
      );
    }

    // ✅ Usa URL correcta en Vercel
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name:
                mode === "deposit"
                  ? "Depósito 10% – Mexicanos en Dublín"
                  : "Pedido – Mexicanos en Dublín",
              description:
                mode === "deposit"
                  ? "Pagas 10% ahora. El resto por transferencia (24h)."
                  : "Pago completo con tarjeta.",
            },
            unit_amount: amountToCharge,
          },
          quantity: 1,
        },
      ],
      metadata: {
        mode,
        deliveryPlace,
        deliveryDatetime,
        itemsCount: String(items.reduce((n, it) => n + it.qty, 0)),
      },
      success_url: `${baseUrl}/success?mode=${mode}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Error creando sesión de Stripe" },
      { status: 500 }
    );
  }
}
