import Link from "next/link";

export default function PagoExitosoPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-3xl border bg-white p-8">
        <h1 className="text-2xl font-bold">✅ Pago confirmado</h1>
        <p className="mt-2 text-gray-600">
          Gracias. Si quieres, confirma tu pedido por WhatsApp para coordinar entrega.
        </p>

        <a
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-600 px-6 py-4 text-lg font-semibold text-white hover:bg-green-700"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/353XXXXXXXXX?text=${encodeURIComponent(
            `Hola! Ya pagué mi pedido ✅. Session: ${searchParams?.session_id ?? "N/A"}`
          )}`}
        >
          Confirmar por WhatsApp
        </a>

        <Link href="/productos" className="mt-4 block text-center text-sm underline text-gray-600">
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}
