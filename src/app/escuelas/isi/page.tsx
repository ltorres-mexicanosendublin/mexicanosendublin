"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type ProgramKey =
  | "adultos"
  | "academic_year"
  | "no_ue"
  | "teachers"
  | "juniors"
  | "groups"
  | "bachillerato";

type Sponsorship = "yes" | "no" | "not_sure";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const programs: Array<{
  key: ProgramKey;
  title: string;
  desc: string;
  bullets: string[];
}> = [
  {
    key: "adultos",
    title: "Cursos de inglés para adultos",
    desc: "Programas para mejorar tu inglés por objetivos académicos, laborales o personales.",
    bullets: ["Inglés general", "Intensivo", "Preparación para exámenes", "Opciones según perfil del estudiante"],
  },
  {
    key: "academic_year",
    title: "Programa Academic Year (Año Académico)",
    desc: "Ideal para estancias largas. Incluye estructura de curso + vacaciones (según calendario).",
    bullets: ["Cursos largos (ej. 25 semanas)", "Opciones Study & Work (según normativa)", "Vacaciones programadas", "Enfoque en progreso real"],
  },
  {
    key: "no_ue",
    title: "Adultos NO comunitarios (fuera de la UE)",
    desc: "Programas alineados a estudiantes internacionales fuera de la Unión Europea.",
    bullets: ["Enfoque en cumplimiento y documentos", "Asesoría sobre qué preparar", "Formato pensado para registro", "Confirmar detalles por temporada"],
  },
  {
    key: "teachers",
    title: "Inglés + formación para profesores",
    desc: "Opciones para docentes: mejora lingüística + formación y metodologías (según programa).",
    bullets: ["Cursos especializados", "Posible Erasmus+ (según caso)", "Desarrollo profesional", "Ideal para docentes ELT"],
  },
  {
    key: "juniors",
    title: "Cursos para juniors",
    desc: "Programas para jóvenes con un ambiente seguro y actividades.",
    bullets: ["Cursos junior", "Campamento de verano", "Actividades sociales", "Estructura y acompañamiento"],
  },
  {
    key: "groups",
    title: "Grupos escolares y mini-estancias",
    desc: "Programas para grupos: clases + actividades + logística (según paquete).",
    bullets: ["Diseñado para grupos", "Actividades y excursiones", "Opciones por duración", "Planificación a medida"],
  },
  {
    key: "bachillerato",
    title: "Bachillerato en Irlanda",
    desc: "Ruta para estudiantes que buscan estudiar secundaria/bachillerato en Irlanda.",
    bullets: ["Orientación según perfil", "Fechas y requisitos varían", "Opción a largo plazo", "Validar cupos y fechas"],
  },
];

const stats = [
  { value: "50,000+", label: "Estudiantes formados" },
  { value: "20+", label: "Años de experiencia" },
  { value: "60+", label: "Países representados" },
  { value: "99%+", label: "Comentarios positivos (ref.)" },
];

const exams = [
  { icon: "🎓", title: "Trinity College London", desc: "Centro de exámenes certificado." },
  { icon: "🧾", title: "LanguageCert", desc: "Centro de exámenes certificado." },
  { icon: "📘", title: "Cambridge (FCE / CAE)", desc: "Centro de preparación para exámenes." },
  { icon: "🧠", title: "IELTS", desc: "Preparación para examen (según curso)." },
];

export default function IsiSchoolPage() {
  const [open, setOpen] = useState(false);

  // form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [preferredStart, setPreferredStart] = useState("");
  const [program, setProgram] = useState<ProgramKey>("academic_year");
  const [sponsored, setSponsored] = useState<Sponsorship>("not_sure");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      fullName.trim().length >= 3 &&
      email.includes("@") &&
      phone.trim().length >= 6 &&
      country.trim().length >= 2 &&
      preferredStart.trim().length >= 6
    );
  }, [fullName, email, phone, country, preferredStart]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (!canSubmit) {
      setErr("Completa: nombre, email, teléfono, país y fecha deseada.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          escuela: "ISI Dublin",
          nombre: fullName,
          email,
          telefono: phone,
          pais: country,
          estado: stateRegion,
          fechaCurso: preferredStart,
          curso: program,
          patrocinador: sponsored,
          mensaje: notes,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "No se pudo enviar. Intenta de nuevo.");

      setOk("¡Listo! Te contactaremos por correo lo antes posible.");
      setFullName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setStateRegion("");
      setPreferredStart("");
      setProgram("academic_year");
      setSponsored("not_sure");
      setNotes("");
    } catch (e: any) {
      setErr(e?.message ?? "Error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/escuelas" className="text-sm underline text-gray-600">
          ← Volver a escuelas
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

      {/* HERO */}
     <section className="mt-8 overflow-hidden rounded-[2rem] border bg-white">
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

    <div className="relative p-7 sm:p-10">
      {/* HERO */}
      <div className="grid gap-8 md:grid-cols-12">
        {/* Left */}
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Escuela destacada en Dublín
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ISI Dublín
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Elegir estudiar inglés puede ser una de las decisiones más importantes de tu vida.
            ISI Dublín ofrece programas reconocidos y preparación para exámenes internacionales.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Pedir información
            </button>

            <a
              href="#programas"
              className="inline-flex items-center justify-center rounded-2xl border bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Ver programas ↓
            </a>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            *Precios, cupos y fechas pueden variar por temporada. Confirmamos contigo antes.
          </p>
        </div>

        {/* Right */}
        <div className="md:col-span-5">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-center">
              <Image
                src="/products/escuelas/isiDublin.jpg"
                alt="ISI Dublin logo"
                width={300}
                height={140}
                className="h-auto w-full max-w-[300px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* STATS – igual que Atlas */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border bg-white p-5 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-1 text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* INFO GRID */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Acreditaciones */}
        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Acreditaciones</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Programas acreditados por EAQUALS</li>
            <li>Reconocidos por ACELS (QQI)</li>
            <li>Miembro de English Education Ireland (EEI)</li>
          </ul>
        </div>

        {/* Exámenes */}
        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Exámenes disponibles</p>

          <div className="mt-4 grid gap-3">
            {exams.map((x) => (
              <div
                key={x.title}
                className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl border bg-white text-lg">
                  {x.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">{x.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            *Disponibilidad y requisitos dependen del programa. Te confirmamos por correo.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* PROGRAMAS */}
      <section id="programas" className="mt-8">
        <div className="rounded-3xl border bg-white p-6 sm:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Programas de inglés</h2>
              <p className="mt-2 text-sm text-gray-600">Resumen claro de las opciones principales.</p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Pedir info
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {programs.map((p) => (
              <div key={p.key} className="rounded-3xl border bg-white p-6">
                <p className="text-lg font-semibold text-gray-900">{p.title}</p>
                <p className="mt-2 text-sm text-gray-600">{p.desc}</p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setProgram(p.key);
                    setOpen(true);
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                >
                  Me interesa este programa →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-900">Nota importante</p>
            <p className="mt-2 text-sm text-gray-700">
              Esta información es orientativa. Confirmamos contigo precios, fechas y requisitos según temporada.
            </p>
          </div>
        </div>
      </section>
 {/* MAPA (igual que Atlas) */}
              <div className="mt-6 rounded-3xl border bg-white p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">📍 Ubicación de la escuela</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Revisa la zona y calcula tiempos reales de traslado.
                    </p>
                  </div>

                  {/* Pon aquí tu link de maps */}
                  <a
                    href="https://maps.app.goo.gl/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline text-gray-600"
                  >
                    Abrir en Google Maps →
                  </a>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border">
                  <iframe
                    title="ISI Dublin map"
                    // Pega aquí el embed URL de Google Maps
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.7612175081404!2d-6.271964223753164!3d53.34753047463544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c282dd2cb2b%3A0xcd82525c8ff047b0!2sISI%20Dublin%20Ltd!5e0!3m2!1ses!2sie!4v1770252849367!5m2!1ses!2sie"
                    width="100%"
                    height="320"
                    loading="lazy"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Tip: usa el mapa para estimar distancia desde tu zona de renta / transporte.
                </p>
              </div>
      {/* CTA */}
      <section className="mt-8 rounded-3xl border bg-gray-50 p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ¿Quieres que revisemos tu caso y te recomendemos el programa ideal?
            </h3>
            <p className="mt-1 text-sm text-gray-600">Llena el formulario y te respondemos por correo.</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Pedir información
          </button>
        </div>
      </section>

      {/* MODAL FORM */}
      <div className={cx("fixed inset-0 z-50", open ? "block" : "hidden")}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

        <div className="absolute left-1/2 top-1/2 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-[2rem] border bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">Formulario de información – ISI Dublín</p>
                <p className="mt-1 text-sm text-gray-600">Te contactamos por correo con detalles y siguientes pasos.</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border px-3 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-600">Nombre completo *</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Correo *</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tuemail@gmail.com"
                  type="email"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Teléfono (WhatsApp) *</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+353..."
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">País *</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="México"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Estado / Región</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  placeholder="CDMX, Jalisco..."
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Programa de interés *</label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={program}
                  onChange={(e) => setProgram(e.target.value as ProgramKey)}
                >
                  <option value="adultos">Adultos</option>
                  <option value="academic_year">Academic Year</option>
                  <option value="no_ue">No comunitarios (fuera UE)</option>
                  <option value="teachers">Inglés + formación profesores</option>
                  <option value="juniors">Juniors</option>
                  <option value="groups">Grupos escolares</option>
                  <option value="bachillerato">Bachillerato</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Fecha deseada de inicio *</label>
                <input
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={preferredStart}
                  onChange={(e) => setPreferredStart(e.target.value)}
                  type="date"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-600">¿Vienes patrocinado por familia?</label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={sponsored}
                  onChange={(e) => setSponsored(e.target.value as Sponsorship)}
                >
                  <option value="not_sure">No estoy seguro</option>
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-600">Notas (opcional)</label>
                <textarea
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dudas: precios, fechas, requisitos, examen, documentación..."
                />
              </div>

              {err ? (
                <p className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {err}
                </p>
              ) : null}

              {ok ? (
                <p className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {ok}
                </p>
              ) : null}

              <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar solicitud"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>

              <p className="md:col-span-2 text-xs text-gray-500">
                Al enviar, aceptas que te contactemos por correo para darte información del programa.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
