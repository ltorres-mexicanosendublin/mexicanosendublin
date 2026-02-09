import Link from "next/link";

export const metadata = {
  title: "Leap Card en Dublín (TFI): precios, capping y tarjeta de estudiante | Mexicanos en Dublín",
  description:
    "Guía práctica de transporte en Dublín: Leap Card, capping, buses/Luas/DART y cómo aplicar a Young Adult o Student TFI Leap Card con 50% off.",
};

export default function LeapCardGuidePage() {
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

      {/* Article */}
      <article className="mt-6 rounded-3xl border bg-white p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
            Transporte
          </span>
          <span className="text-xs text-gray-500">Lectura: 7–9 min</span>
          <span className="text-xs text-gray-500">Actualizado: 2026</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Leap Card en Dublín: cómo funciona + tarjeta de estudiante (50% off)
        </h1>

        <p className="mt-3 text-gray-600">
          La <strong>TFI Leap Card</strong> es la forma más práctica de moverte en{" "}
          <strong>Bus, Luas y DART</strong>. En esta guía te explico lo esencial:
          cómo cargarla, qué es el <strong>capping</strong> (tope de gasto) y cómo
          pedir la <strong>Young Adult / Student TFI Leap Card</strong> con hasta{" "}
          <strong>50% de descuento</strong>.
        </p>

        {/* Quick CTAs */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://www.transportforireland.ie/fares/leap-card/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver Leap Card oficial →
          </a>

          <a
            href="https://www.transportforireland.ie/fares/leap-card/young-adult-and-student-card/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Apply now (Student/Young Adult) →
          </a>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-10 text-gray-800">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              1) ¿Qué es la Leap Card?
            </h2>
            <p className="mt-2 text-gray-700">
              Es una tarjeta recargable de{" "}
              <strong>Transport for Ireland (TFI)</strong> para pagar transporte.
              Normalmente te sale más barato que pagar en efectivo y es más fácil
              de usar día a día.
            </p>

            <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Sirve para:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li><strong>Bus</strong> (Dublin Bus y otros servicios)</li>
                <li><strong>Luas</strong></li>
                <li><strong>DART</strong> y trenes (según ruta)</li>
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              2) Capping: el “tope” que te evita pagar de más
            </h2>
            <p className="mt-2 text-gray-700">
              El <strong>capping</strong> es un tope diario/semanal: cuando llegas a
              cierto monto, el sistema deja de cobrarte (dependiendo del tipo de viaje).
            </p>

            <div className="mt-4 rounded-2xl border bg-emerald-50 p-4 text-sm text-emerald-900">
              Tip real: si te mueves mucho, <strong>Leap + capping</strong> suele ser la mejor combinación.
            </div>

            <a
              href="https://www.transportforireland.ie/fares/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center text-sm font-semibold underline text-gray-700"
            >
              Ver tarifas/capping en TFI →
            </a>
          </section>

          {/* 3: Young Adult & Student */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              3) Tarjeta con 50% off: Young Adult / Student TFI Leap Card
            </h2>

            <p className="mt-2 text-gray-700">
              Puedes conseguir <strong>50% de descuento</strong> en tarifas de adulto
              si cumples requisitos de edad o de estudiante.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {/* Young Adult */}
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-sm font-semibold text-gray-900">👤 Young Adult TFI Leap Card</p>
                <p className="mt-2 text-sm text-gray-700">
                  Disponible para <strong>19 a 25 años</strong>. Da 50% off en tarifas de adulto.
                </p>

                <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Importante</p>
                  <p className="mt-1">
                    Al recibir tu tarjeta, debes <strong>registrarla online</strong>.
                  </p>
                </div>

                <a
                  href="https://www.transportforireland.ie/fares/leap-card/young-adult-and-student-card/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Apply now (Young Adult) →
                </a>
              </div>

              {/* Student */}
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-sm font-semibold text-gray-900">🎓 Student TFI Leap Card</p>
                <p className="mt-2 text-sm text-gray-700">
                  Solo para estudiantes en educación/entrenamiento <strong>full time (15+ horas)</strong>.
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>
                    Elegible si eres <strong>16–18</strong> o <strong>26+</strong>.
                  </li>
                  <li>
                    El curso debe durar mínimo <strong>6 meses / 25 semanas</strong>.
                  </li>
                  <li>
                    Si el curso cruza dos años académicos, debe correr mínimo{" "}
                    <strong>3 meses desde el 1 de octubre</strong> para calificar.
                  </li>
                </ul>

                <div className="mt-4 rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
                  <strong>Ojo:</strong> la elegibilidad final la define TFI. Si tu curso es de inglés de 25 semanas,
                  normalmente aplica, pero revisa requisitos.
                </div>

                <a
                  href="https://www.transportforireland.ie/fares/leap-card/young-adult-and-student-card/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Apply now (Student) →
                </a>
              </div>
            </div>
          </section>

          {/* 4: Apps */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              4) Apps recomendadas para usar Leap (y transporte)
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-white p-5">
                <p className="font-semibold text-gray-900">TFI Live</p>
                <p className="mt-1 text-sm text-gray-700">
                  Para ver rutas y horarios en tiempo real.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-5">
                <p className="font-semibold text-gray-900">Leap Top-Up</p>
                <p className="mt-1 text-sm text-gray-700">
                  Para recargar tu Leap Card desde el celular (según compatibilidad).
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Tip región</p>
              <p className="mt-1">
                Algunas apps solo aparecen si tu App Store/Play Store está en región Irlanda.
                Si no las ves, intenta cambiar la región.
              </p>
            </div>
          </section>

          {/* 5: Map */}
          <section className="mt-10">
            <div className="rounded-3xl border bg-white p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    📍 Tip de rutas: mide tiempos reales
                  </h2>
                  <p className="text-sm text-gray-600">
                    Abre el mapa y calcula cuánto tardas en bus/Luas caminando desde tu alojamiento.
                  </p>
                </div>

                <a
                  href="https://www.transportforireland.ie/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline text-gray-600"
                >
                  Abrir Transport for Ireland →
                </a>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border">
                <iframe
                  title="Dublin transport map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9526.64024547058!2d-6.266!3d53.3498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e84b27c2f6d%3A0x5b8a2a9d3b9c0d9c!2sDublin%2C%20Irlanda!5e0!3m2!1ses!2sie!4v1770075361194!5m2!1ses!2sie"
                  width="100%"
                  height="380"
                  loading="lazy"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Tip real: úsalo para comparar zonas (D1/D2/D6/D8) antes de rentar.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="rounded-3xl border bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">¿Quieres que te ayudemos a planear tu transporte?</h2>
              <p className="mt-2 text-sm text-gray-700">
                Si vas llegando y quieres plan de primeros días (rutas, zonas y tips), puedes ver asesoría 1–1.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/asesoria" className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
                  Ver asesoría 1–1 →
                </Link>
                <Link href="/guias" className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                  Ver más guías →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
