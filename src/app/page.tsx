import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBox from "@/components/SearchBox";
import WorkersCardGate from "@/components/WorkersCardGate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mexicanos en Dublín | Comunidad, trabajo y escuelas en Irlanda",
  description:
    "Guía para mexicanos en Dublín: escuelas de inglés (Atlas, CES, ISI, Delfin), trabajo, renta, IRP/PPS y comunidad.",
  alternates: {
    canonical: "https://mexicanosendublin.com/",
  },
  openGraph: {
  title: "Mexicanos en Dublín | Comunidad, trabajo y escuelas en Irlanda",
  description:
    "Guía para mexicanos en Dublín: escuelas de inglés, trabajo, renta, IRP/PPS y comunidad.",
  url: "https://mexicanosendublin.com/",
  siteName: "Mexicanos en Dublín",
  locale: "es_ES",
  type: "website",
},
};

const featuredGuides = [ 
  
  { tag: "Trámites", title: "IRP en Irlanda: qué llevar y cómo prepararte", href: "/guias/irp" },
  { tag: "Vivienda", title: "Rentar en Dublín sin estafas: checklist real", href: "/guias/renta" },
  { tag: "Trabajo", title: "CV estilo Irlanda y cómo aplicar sin perder tiempo", href: "/guias/trabajo" },
];

const services = [
  {
    title: "Renta verificada",
    desc: "Un miembro verificado visita el cuarto y te entrega video + checklist para decidir con confianza.",
    href: "/renta-verificada",
  },
  {
    title: "Asesoría 1–1",
    desc: "Llegada, IRP, PPS, bancos, transporte y plan de primeros días. Sin humo, paso a paso.",
    href: "/asesoria",
  },
{
  title: "Mano de obra Mexicana",
  desc: "Conecta con trabajadores mexicanos o encuentra empleo en Dublín",
  href: "/directorio", // 👈 NO redirige directo
}

];

const steps = [
  { n: "1", title: "Eliges un cuarto", desc: "Ves opciones en la comunidad o nos mandas el link del anuncio." },
  { n: "2", title: "Solicitas verificación", desc: "Pagas el servicio de verificación (no depósito de renta)." },
  { n: "3", title: "Visita + evidencia", desc: "Un verificador va, valida existencia y condiciones, entrega fotos/video." },
  { n: "4", title: "Tú decides", desc: "Si te conviene, depositas directo al landlord. Nosotros no custodiamos dinero." },
];

const testimonials = [
  { name: "Mariana", text: "Me ayudó a entender lo del IRP y llegué con plan. Me ahorré un montón de tiempo." },
  { name: "Diego", text: "La renta verificada me dio tranquilidad. El video y checklist fueron clave." },
  { name: "Fer", text: "Las guías están claras y directas. Nada de rollos." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

 <main className="container-wide py-11">
{/* HERO */}
<section className="relative isolate overflow-hidden rounded-[28px] border bg-white p-8 md:p-12">
  {/* decoraciones atrás */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border bg-gray-50" />
    <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full border bg-gray-50" />
  </div>

  <div className="relative z-10">
    {/* pill */}
    <div className="flex flex-wrap items-center gap-2">
      <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600">
        🇲🇽 Mexicanos en Dublín 🇮🇪 · Guías + escuelas + comunidad
      </p>

      <div className="hidden sm:flex items-center gap-2">
        <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
          Atlas
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
          Delfin
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
          ISI
        </span>
      </div>
    </div>
<h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
  Mexicanos en Dublín
  <span className="block text-gray-900">
    Guía para estudiar, trabajar y vivir en Irlanda con claridad.
  </span>
</h1>
    <p className="mt-4 max-w-2xl text-gray-600 md:text-lg">
  Una guía hecha para <strong>mexicanos en Dublín</strong> que buscan estudiar,
  trabajar y vivir en Irlanda con claridad. Compara escuelas de inglés
  (Atlas, CES, ISI, Delfin), entiende <strong>IRP/PPS</strong> y evita estafas de renta.
</p>


    <SearchBox />

    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <Link
        href="/escuelas"
        className="rounded-2xl bg-black px-6 py-3 text-center font-medium text-white hover:opacity-90"
      >
        Ver escuelas recomendadas →
      </Link>

      <Link
        href="/guias"
        className="rounded-2xl border px-6 py-3 text-center font-medium hover:bg-gray-50"
      >
        Ver guías prácticas →
      </Link>

      <Link
        href="/comunidad"
        className="rounded-2xl border px-6 py-3 text-center font-medium hover:bg-gray-50"
      >
        Unirme a la comunidad
      </Link>
    </div>

    {/* Cards abajo */}
    <div className="mt-7 grid gap-3 sm:grid-cols-3">
      {/* Escuelas */}
      <Link
        href="/escuelas"
        className="group relative block rounded-2xl border bg-white px-5 py-4 transition hover:bg-gray-50 hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-gray-900">Escuelas</p>
            <p className="mt-1 text-sm text-gray-600">
              Programas, ubicación y formulario de info.
            </p>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition group-hover:bg-black group-hover:text-white">
            →
          </span>
        </div>
      </Link>
      {/* Renta */}
<WorkersCardGate />

      {/* Guías */}
      <Link
        href="/guias"
        className="group relative block rounded-2xl border bg-white px-5 py-4 transition hover:bg-gray-50 hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-gray-900">Consejos</p>
            <p className="mt-1 text-sm text-gray-600">
              IRP, PPS, transporte, apps y checklists.
            </p>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition group-hover:bg-black group-hover:text-white">
            →
          </span>
        </div>
      </Link>

      
    </div>
  </div>
</section>


        {/* SERVICES */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">Qué puedes hacer aquí</h2>
            <Link href="/guias" className="text-sm underline">
              Ver guías
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="rounded-3xl border p-6 hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                <p className="mt-4 text-sm underline">Ver detalles</p>
              </Link>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-12 rounded-[28px] border p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Cómo funciona la renta verificada</h2>
              <p className="mt-2 text-gray-600">
                Diseñado para que llegues con más seguridad. Importante: no custodiamos depósitos de renta.
              </p>
            </div>
            <Link
              href="/renta-verificada"
              className="mt-4 inline-block rounded-2xl border px-5 py-3 text-center font-medium hover:bg-gray-50 md:mt-0"
            >
              Ver ejemplo de checklist
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((st) => (
              <div key={st.n} className="rounded-3xl border bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold">
                  {st.n}
                </div>
                <h3 className="mt-3 font-semibold">{st.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{st.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Disclaimer: Servicio de verificación y acompañamiento. No somos agentes inmobiliarios ni autoridad gubernamental.
          </p>
        </section>

        {/* FEATURED GUIDES */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Guías destacadas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredGuides.map((g) => (
              <Link key={g.title} href={g.href} className="rounded-3xl border p-6 hover:bg-gray-50">
                <p className="text-xs text-gray-500">{g.tag}</p>
                <h3 className="mt-2 text-lg font-semibold">{g.title}</h3>
                <p className="mt-4 text-sm underline">Leer</p>
              </Link>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Lo que dice la comunidad</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border p-6">
                <p className="text-sm text-gray-700">“{t.text}”</p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-[28px] border bg-white p-8 text-black md:p-10">
          <h2 className="text-2xl font-bold">¿Vas llegando a Dublín?</h2>
          <p className="mt-2 max-w-2xl text-white/80">
            Únete y empieza por las guías clave. Si quieres, agenda asesoría o solicita una renta verificada.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/comunidad"
              className="rounded-2xl bg-black px-6 py-3 text-center font-medium text-white hover:opacity-90"
            > Unirme
            </Link>
            <Link
              href="/asesoria"
              className="rounded-2xl border border-black/30 px-6 py-3 text-center font-medium hover:bg-black/10"
            >
              Ver asesoría
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
