import Link from "next/link";

export default function ComunidadPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Comunidad
          </h1>
          <p className="mt-2 text-gray-600">
            Recomendaciones, apoyo y conexiones entre mexicanos en Dublín.
          </p>
        </div>

        <Link href="/unirme" className="btn btn-primary">
          Unirme
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Eventos</h2>
          <p className="mt-2 text-sm text-gray-600">
            Reuniones, cafés, networking, partidos y más.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Compra / Venta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Los que se van venden cosas, los que llegan compran barato.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recomendaciones</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rentas, servicios y tips con evidencia y confianza.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          ¿Cómo funciona?
        </h2>
        <ol className="mt-3 list-decimal pl-6 text-sm text-gray-700 space-y-2">
          <li>Te registras en “Unirme”.</li>
          <li>Te enviamos acceso y reglas.</li>
          <li>Participas con respeto y sin spam.</li>
        </ol>
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/unirme" className="btn btn-primary">
          Unirme a la comunidad
        </Link>
        <Link href="/" className="btn btn-outline">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
