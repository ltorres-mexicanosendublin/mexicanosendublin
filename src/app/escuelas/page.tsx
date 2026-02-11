import Link from "next/link";

type School = {
  name: string;
  city: string;
  blurb: string;
  tags: string[];
  href: string;
  badge?: string;

  // ✅ NUEVO
  logoSrc: string;   // /public/...
  coverSrc?: string; // opcional: imagen grande para hover
};


const schools: School[] = [
  {
    name: "Atlas Language School",
  city: "Dublín",
  blurb:
  "Aprende inglés en el corazón de Dublín con Atlas Language School. Miles de estudiantes internacionales han elegido Atlas por su calidad académica y experiencia comprobada.",
  tags: [
  "En el corazón de Dublín",
  "Más de 20 años de experiencia",
  "Escuela de confianza internacional",
],
    href: "/escuelas/atlas",
    badge: "Recomendada",
    logoSrc: "/products/escuelas/logo.webp",
    coverSrc: "/products/escuelas/logo.webp", // opcional
  },
  {
    name: "Delfin English School",
    city: "Dublín",
    blurb:
  "Estudia inglés en una de las escuelas más reconocidas de Dublín. Delfin destaca por su ambiente internacional, programas flexibles y más de 20 años formando estudiantes.",
tags: [
  "Más de 60,000 estudiantes",
  "135+ nacionalidades",
  "20 años de experiencia",
],
    href: "/escuelas/delfin",
    logoSrc: "/products/escuelas/Delfin.webp",
    coverSrc: "/products/escuelas/Delfin.webp",
  },
  {
    name: "ISI Dublin",
    city: "Dublín",
    blurb:
  "ISI Dublín es una escuela con gran trayectoria y reconocimiento internacional. Miles de estudiantes de todo el mundo han pasado por sus aulas durante más de 20 años.",
    tags: [
  "50,000+ exalumnos",
  "Más de 20 años activos",
  "Estudiantes de 60+ países",
],
href: "/escuelas/isi",
    logoSrc: "/products/escuelas/isiDublin.jpg",
    coverSrc: "/products/escuelas/isiDublin.jpg",
  }, 
];


function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

export const metadata = {
  title: "Escuelas en Dublín | Mexicanos en Dublín",
  description:
    "Menú de escuelas con las que tenemos convenio: comparativas rápidas, costos aproximados y formulario para pedir información.",
};

export default function SchoolsMenuPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/guias" className="text-sm underline text-gray-600">
          ← Volver a guías
        </Link>

        <Link href="/" className="text-sm underline text-gray-600">
          Volver al inicio
        </Link>
      </div>

      {/* Header */}
      <header className="mt-8 rounded-[2rem] border bg-white p-7 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Convenios / Escuelas recomendadas
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Escuelas para estudiar inglés en Dublín 🇮🇪
        </h1>

        <p className="mt-3 max-w-3xl text-gray-600">
          Aquí tienes un menú con las escuelas con las que tenemos convenio.
          Entra a cada escuela para ver resumen, costos y pedir información.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/escuelas/atlas"
            className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver Atlas →
          </Link>

          <Link
            href="/escuelas/delfin"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Ver Delfin →
          </Link>
          <Link
            href="/escuelas/Isi"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Ver Isi Dublin →
          </Link>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          *Precios y disponibilidad pueden variar por temporada. Siempre confirmamos contigo antes.
        </p>
      </header>

      {/* Cards */}
<section className="mt-8 grid gap-4 md:grid-cols-2">
  {schools.map((s) => (
    <Link
      key={s.href}
      href={s.href}
      className="group relative overflow-hidden rounded-[2rem] border bg-white p-6 transition-colors hover:bg-gray-50"
    >
      {/* Overlay hover (logo / imagen) */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {s.coverSrc ? (
          <>
            <img
              src={s.coverSrc}
              alt={`${s.name} cover`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-white/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-white/90" />
        )}

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={s.logoSrc}
            alt={`${s.name} logo`}
            className="max-h-24 w-auto object-contain"
          />
        </div>
      </div>

      {/* Contenido normal */}
      <div className="relative z-0 transition-opacity duration-300 group-hover:opacity-20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{s.name}</h2>
              {s.badge && (
                <span className="rounded-full border bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {s.badge}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-600">{s.city}</p>
          </div>

          <span className="rounded-2xl border px-3 py-2 text-sm font-semibold text-gray-800">
            Ver →
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-700">{s.blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm underline text-gray-700">
          Ver detalles y pedir información
        </p>
      </div>
    </Link>
  ))}
</section>


      {/* CTA */}
      <section className="mt-8 rounded-[2rem] border bg-gray-50 p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ¿Quieres que te recomendemos la mejor opción para tu caso?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Entra a la escuela que te interesa y llena el formulario. Te contactamos por correo.
            </p>
          </div>
                <Link
  href="/escuelas/formulario?school=atlas"
  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
>
  Pedir info
</Link>
        </div>
      </section>
    </main>
  );
}
