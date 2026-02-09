import Link from "next/link";

export const metadata = {
  title: "PPS Number en Irlanda: qué es y cómo tramitarlo | Mexicanos en Dublín",
  description:
    "Guía práctica para mexicanos: qué es el PPS Number, para qué sirve, requisitos y pasos para tramitarlo en Irlanda.",
};

export default function PpsNumberGuidePage() {
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill">Trámites</span>
          <span className="text-xs text-gray-500">Lectura: 8–10 min</span>
          <span className="text-xs text-gray-500">Actualizado: 2026</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          PPS Number en Irlanda: qué es y cómo tramitarlo
        </h1>

        <p className="mt-3 text-gray-600">
          El <strong>PPS Number</strong> es tu número personal para trámites con
          el estado (trabajo, impuestos, servicios, etc.). Aquí va una guía
          clara: qué es, para qué sirve y cómo solicitarlo.
        </p>

        <div className="mt-8 space-y-10 text-gray-800">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">¿Qué es el PPS Number?</h2>
            <p className="mt-2 text-gray-700">
              Es un identificador personal en Irlanda (parecido al RFC/curp pero
              para temas fiscales y servicios). Lo usarás en muchos procesos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">¿Para qué sirve?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>Trabajar legalmente y registrarte con Revenue (impuestos).</li>
              <li>Trámites con gobierno y algunos servicios.</li>
              <li>A veces para temas de nómina, bancos, etc. (según caso).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Requisitos comunes</h2>
            <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
              <ul className="list-disc space-y-2 pl-5">
                <li>Identificación (pasaporte).</li>
                <li>Prueba de dirección (según te pidan).</li>
                <li>Razón válida para solicitar PPS (trabajo/estudio/trámite).</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Nota: requisitos pueden variar según tu situación y el proceso vigente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Paso a paso (resumen)</h2>
            <ol className="mt-3 space-y-3 pl-5 text-gray-700">
              <li className="list-decimal">Junta documentos básicos.</li>
              <li className="list-decimal">Completa la solicitud según el portal/proceso actual.</li>
              <li className="list-decimal">Espera confirmación o cita.</li>
              <li className="list-decimal">Recibe tu PPS y guárdalo bien.</li>
            </ol>
          </section>

          <section>
            <div className="rounded-3xl border bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Nota importante (sin humo)
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Esta guía es informativa. El proceso puede cambiar y depende de tu caso.
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
          </section>
        </div>
      </article>
    </main>
  );
}
