// app/registro/page.tsx
import type { Metadata } from "next";
import RegisterWorkerForm from "./RegisterWorkerForm";
 
export const metadata: Metadata = {
  title: "Registro de trabajadores mexicanos en Dublín | Mexicanos en Dublín",
  description:
    "Crea tu perfil como trabajador mexicano en Dublín. Regístrate para que empleadores te encuentren por zona, tipo de trabajo y nivel de inglés. Registro inicial €5.",
  alternates: { canonical: "/registro" },
  openGraph: {
    title: "Registro | Mexicanos trabajando en Dublín",
    description:
      "Registra tu perfil (zona, trabajos, inglés) y conecta con empleadores en Dublín. Registro inicial €5.",
    url: "/registro",
    type: "website",
  },
};

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* HERO (server-rendered, indexable) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                🇲🇽 Mexicanos en Dublín
                <span className="text-emerald-700/70">•</span>
                🇮🇪 Comunidad trabajadora
              </p>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Mexicanos trabajando en Dublín
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                Venimos a Dublín a trabajar con <span className="font-semibold">honestidad</span>,
                <span className="font-semibold"> respeto</span> y <span className="font-semibold">ganas de salir adelante</span>.
                Aquí puedes crear tu perfil para que empleadores te encuentren por zona y tipo de trabajo.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Más recomendaciones</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Si le gustas a un empleador, puede recomendarte con su círculo.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Tu inglés importa</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Si vas solo, necesitas poder comunicarte. Por eso pedimos verificación.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Oportunidades</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Con buen desempeño, un empleador podría ayudarte a crecer y abrir puertas laborales.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-slate-600">
                Registro inicial: <span className="font-semibold">€5</span> (precio de lanzamiento mientras crece la comunidad).
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-5 shadow-sm md:w-[360px]">
              <p className="text-sm font-semibold text-slate-900">¿Qué obtienes al registrarte?</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                    ✓
                  </span>
                  Un perfil visible por zona y oficio.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                    ✓
                  </span>
                  Contacto directo con empleadores.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                    ✓
                  </span>
                  Recomendaciones y reputación (cuando activemos reseñas).
                </li>
              </ul>

              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold text-amber-900">Importante</p>
                <p className="mt-1 text-xs text-amber-900/80">
                  Esta plataforma conecta personas. El acuerdo final (precio, horarios y pago) es entre el empleador y el trabajador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <RegisterWorkerForm/>
      </section>
    </main>
  );
}
