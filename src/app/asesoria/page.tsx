import Link from "next/link";
import GoogleAppointmentButton from "@/components/GoogleAppointmentButton";

const GOOGLE_SCHEDULING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2FenX49DBDPggOt9tvPtoeKlEQOLDFh-XOaeFMt2EISgznTAcy15LqWF8cLhS_C1bJiWEG6BTB?gv=true";

const GOOGLE_APPOINTMENT_FALLBACK =
  "https://calendar.app.google/wseWYu9Zo5kkLGpy6";

const WHATSAPP_NUMBER = "353870393105"; // ⚠️ en wa.me va SIN "+" y sin espacios

export const metadata = {
  title: "Asesoría 1–1 | Mexicanos en Dublín",
  description:
    "Agenda tu asesoría 1–1 (€14 / 60 min) con disponibilidad real. Reserva en Google Calendar y confirma por WhatsApp.",
};

function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function AsesoriaPage() {
  const waMsg =
    "Hola! Quiero confirmar mi asesoría 1–1 (€14 / 60 min).\n\n" +
    "📅 Reserva: (PON AQUÍ TU DÍA Y HORA)\n" +
    "🧩 Tema: (Migración / IRP / PPS / Renta / Trabajo / etc)\n\n" +
    "Ya reservé en el calendario. ¿Me confirmas siguientes pasos?";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="text-sm underline text-gray-600">
          ← Volver al inicio
        </Link>

        <a
          href={buildWhatsAppUrl("Hola! Quiero info de la asesoría 1–1 🙌")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          WhatsApp
        </a>
      </div>

      {/* HERO */}
      <section className="mt-6 overflow-hidden rounded-[28px] border bg-white">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

          <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-12">
            {/* Left */}
            <div className="md:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Asesoría 1–1
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Agenda tu asesoría 1–1 (60 min)
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Te ayudamos con <strong>IRP, PPS, llegada, renta, bancos, transporte</strong> y plan de primeros días.
                Reservas en Google Calendar y después confirmas por WhatsApp.
              </p>

              {/* Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  €14
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  60 minutos
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  Hora Irlanda 🇮🇪
                </span>
              </div>

              {/* Steps */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">1) Reserva</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Elige tu horario en Google Calendar.
                  </p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">2) Regresa</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Copia el día/hora que reservaste.
                  </p>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <p className="text-xs font-semibold text-gray-900">3) Confirma</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Mándalo por WhatsApp y listo.
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-5">
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-sm font-semibold text-gray-900">
                  Disponibilidad en tiempo real
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Reserva aquí mismo (botón oficial de Google):
                </p>

                <div className="mt-4">
                  <GoogleAppointmentButton
                    url={GOOGLE_SCHEDULING_URL}
                    label="Reservar una cita"
                    color="#039BE5"
                  />
                </div>

                {/* Fallback */}
                <a
                  href={GOOGLE_APPOINTMENT_FALLBACK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Si no carga el botón, abrir calendario →
                </a>

                <p className="mt-3 text-xs text-gray-500">
                  Se abre en otra pestaña. Luego regresa aquí y confirma por WhatsApp.
                </p>
              </div>

              <div className="mt-3 rounded-3xl border bg-white p-6">
                <p className="text-sm font-semibold text-gray-900">Temas típicos</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  <li>IRP / Stamp 2 / solvencia</li>
                  <li>PPS / banco / SIM</li>
                  <li>Renta: zonas, presupuesto, red flags</li>
                  <li>Plan primeros 7 días</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t bg-white p-6 sm:p-8">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900">Qué necesito de ti</p>
                <p className="mt-1 text-sm text-gray-700">
                  Día + hora exacta (hora Irlanda) y tema.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900">Formato recomendado</p>
                <p className="mt-1 text-sm text-gray-700">
                  “Martes 12 / 3:00pm (hora Irlanda)”
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900">Confirmación</p>
                <p className="mt-1 text-sm text-gray-700">
                  Te respondo con siguientes pasos y detalles.
                </p>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(waMsg)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white hover:bg-emerald-700"
            >
              ✅ Confirmar por WhatsApp
            </a>

            <p className="mt-3 text-xs text-gray-500">
              Nota: La disponibilidad la gestiona Google Calendar. Aquí solo facilitamos reserva + confirmación por WhatsApp.
            </p>

            <div className="mt-6 rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Importante:</strong> No somos inmigración ni agencia. Es orientación basada en experiencia práctica.
              Las reglas pueden cambiar y la decisión final depende de las autoridades.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
