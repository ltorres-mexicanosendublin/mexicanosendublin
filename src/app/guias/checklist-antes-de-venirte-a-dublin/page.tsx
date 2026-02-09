import Link from "next/link";

export const metadata = {
  title: "Checklist antes de venirte a Dublín | Mexicanos en Dublín",
  description:
    "Checklist realista para mexicanos antes de viajar a Dublín: documentos, dinero, tarjetas, Apple ID, adaptadores y tips prácticos.",
};

export default function ChecklistDublinPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/guias" className="text-sm underline text-gray-600">
          ← Volver a guías
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="underline text-gray-600">
            Home
          </Link>
          <Link href="/unirme" className="underline text-gray-600">
            Unirme
          </Link>
        </div>
      </div>

      <article className="mt-6 rounded-3xl border bg-white p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill">Llegada</span>
          <span className="text-xs text-gray-500">Lectura: 8–10 min</span>
          <span className="text-xs text-gray-500">Actualizado: 2026</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          ✅ Checklist esencial antes de venirte a Dublín 🇮🇪
        </h1>

        <p className="mt-3 text-gray-600">
          Guía realista, sin humo. Esto es lo que de verdad necesitas traer para
          llegar tranquilo y evitar problemas con migración, dinero y trámites.
        </p>

        <div className="mt-8 space-y-6 text-gray-800">
          {/* ITEM */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              🛂 Pasaporte (MUY IMPORTANTE)
            </h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2">
              <li>
                Debe tener <strong>mínimo 2 años de vigencia</strong>.
              </li>
              <li>Renovar desde Irlanda es caro, lento y complicado.</li>
            </ul>
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              👉 Tip real: si vence en menos de 2 años,{" "}
              <strong>renuévalo antes de venirte</strong>.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              🎓 Curso de inglés pagado al 100%
            </h2>
            <p className="mt-2 text-gray-700">
              Debes traer tu curso completamente pagado. Migración puede pedir
              comprobante.
            </p>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              <li>Carta de inscripción</li>
              <li>Recibo de pago</li>
              <li>Fechas claras del curso</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              💰 Dinero y movimientos bancarios
            </h2>
            <p className="mt-2 text-gray-700">
              No solo importa cuánto traes, sino que se vea{" "}
              <strong>historial y flujo</strong>.
            </p>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              <li>Empieza a meter y sacar dinero desde antes</li>
              <li>Evita depósitos grandes de último minuto</li>
              <li>Esto ayuda para IRP, escuela y renovaciones</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              💵 ¿Cuánto dinero traer REALMENTE?
            </h2>
            <p className="mt-2 text-gray-700">
              Recomendación realista: <strong>€4,000 EUR</strong> (≈ $60,000 MXN)
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
              <div className="rounded-xl border p-3">🏠 Renta + depósito: €1,300</div>
              <div className="rounded-xl border p-3">🪪 IRP: €300</div>
              <div className="rounded-xl border p-3">🍽️ Comida: €45/semana aprox</div>
              <div className="rounded-xl border p-3">🛑 Colchón extra: €650</div>
            </div>

            <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
              👉 Con €4,000 llegas tranquilo el primer mes.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              💳 Tarjetas bancarias
            </h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              <li>Revisa vigencia de débito y crédito</li>
              <li>Reemplazarlas desde Irlanda es difícil</li>
              <li>Activa compras internacionales</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              📱 Apple ID y suscripciones (iPhone)
            </h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              <li>Cancela Apple Music, iCloud, etc.</li>
              <li>Necesitas cambiar región a Irlanda</li>
              <li>Sin eso no podrás bajar apps locales (Tesco, Lidl, etc.)</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              🔌 Adaptadores y power bank
            </h2>
            <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
              <li>Adaptador UK + Europeo (si haces escala)</li>
              <li>Power bank en equipaje de mano</li>
              <li>Te salva el día 1</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <h2 className="text-lg font-semibold">🧠 Mentalidad correcta</h2>
            <p className="mt-2 text-gray-700">
              Los primeros días son pesados. Es normal sentirse perdido. Con
              preparación, todo fluye más rápido.
            </p>
          </div>

          <div className="rounded-3xl border bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Siguiente paso</h2>
            <p className="mt-2 text-sm text-gray-700">
              Si ya traes lo básico listo, sigue con trámites como IRP y PPS.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/guias" className="btn btn-outline text-center">
                Ver más guías
              </Link>
              <Link href="/unirme" className="btn btn-primary text-center">
                Unirme a la comunidad
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
