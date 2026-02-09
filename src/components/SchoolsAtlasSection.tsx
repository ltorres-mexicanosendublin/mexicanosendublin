"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";

type CourseInterest = "25_weeks" | "1_week";
type Sponsorship = "yes" | "no" | "not_sure";

const CONTACT_EMAIL = "contacto@mexicanosendublin.com";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

export default function AtlasSchoolPage() {
  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [preferredStart, setPreferredStart] = useState("");
  const [courseInterest, setCourseInterest] = useState<CourseInterest>("25_weeks");
  const [sponsored, setSponsored] = useState<Sponsorship>("not_sure");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
const [sent, setSent] = useState<null | "ok" | "error">(null);


const canSubmit = useMemo(() => {
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(preferredStart); // ✅ yyyy-mm-dd
  return (
    fullName.trim().length >= 3 &&
    email.includes("@") &&
    phone.trim().length >= 6 &&
    country.trim().length >= 2 &&
    dateOk
  );
}, [fullName, email, phone, country, preferredStart]);


  function buildEmailBody() {
    const lines = [
      "Solicitud de información – Atlas (Mexicanos en Dublín)",
      "",
      "DATOS DEL INTERESADO:",
      `Nombre: ${fullName}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      `País: ${country}`,
      `Estado/Región: ${stateRegion || "—"}`,
      "",
      "CURSO:",
      `Interés: ${courseInterest === "25_weeks" ? "Programa 25 semanas" : "Curso 1 semana"}`,
      `Fecha deseada de inicio: ${preferredStart}`,
      `¿Patrocinado por familia? (papás/tíos/familiar): ${
        sponsored === "yes" ? "Sí" : sponsored === "no" ? "No" : "No estoy seguro"
      }`,
      "",
      "NOTAS / DUDAS:",
      notes || "—",
      "",
      "— Enviado desde el formulario de Mexicanos en Dublín",
    ];
    return lines.join("\n");
  }

async function submit(e: React.FormEvent) {
  e.preventDefault();
  setSent(null);

  if (!canSubmit) {
    alert("Completa: nombre, email, teléfono, país y fecha deseada.");
    return;
  }

  try {
    setSending(true);

const payload = {
  school: "Atlas Language School",
  source: "atlas_form",
  fullName,
  email,
  phone,
  country,
  stateRegion,
  preferredStart,
  courseInterest: courseInterest === "25_weeks" ? "25 semanas" : "1 semana",
  sponsored: sponsored === "yes" ? "Sí" : sponsored === "no" ? "No" : "No estoy seguro",
  notes,
};


    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("API contact error:", data);
      setSent("error");
      alert(data?.error ?? "No se pudo enviar. Intenta de nuevo.");
      return;
    }

    setSent("ok");
    alert("✅ Listo. Te contactamos pronto.");

    // opcional: cerrar modal y limpiar
    setOpen(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setStateRegion("");
    setPreferredStart("");
    setCourseInterest("25_weeks");
    setSponsored("not_sure");
    setNotes("");
  } catch (err) {
    console.error(err);
    setSent("error");
    alert("❌ Error de red. Revisa tu conexión.");
  } finally {
    setSending(false);
  }
}


  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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

      {/* Hero */}
      <section className="mt-8 overflow-hidden rounded-[2rem] border bg-white">
        <div className="relative">
          {/* fondo suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
          <div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-12">
            {/* Copy */}
            
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Escuela destacada en Dublín
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Atlas Language School (Dublín)
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Una de las opciones más elegidas por estudiantes internacionales.
                Lo que muchos aman: el <strong>intercambio cultural</strong>.
                En clase convives con gente de <strong>Francia, Italia, China, Taiwán, Corea</strong> y más
                (depende de la temporada).
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Quiero más información
                </button>

                <a
                  href="https://atlaslanguageschool.com/atlas-dublin/#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Ver web oficial →
                </a>
              </div>
{/* Información del curso */}
<div className="mt-3 rounded-3xl border bg-white p-6 sm:p-8 space-y-2">

  {/* Levels */}
  <div className="flex items-start gap-4">
    <div className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M4 18h4V8H4v10zm6 0h4V4h-4v14zm6 0h4v-6h-4v6z" />
      </svg>
    </div>
    <p className="text-sm text-gray-900">
      <span className="font-semibold">Levels:</span>{" "}
      Pre-Intermediate (A1) to Advanced (C1)
    </p>
  </div>

  {/* Hours */}
  <div className="flex items-start gap-4">
    <div className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2l9 4.9v10.2L12 22 3 17.1V6.9L12 2z" />
      </svg>
    </div>
    <p className="text-sm text-gray-900">
      <span className="font-semibold">Number of hours per week:</span>{" "}
      4 hours per week
    </p>
  </div>

  {/* Timetable */}
  <div className="flex items-start gap-4">
    <div className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2z" />
      </svg>
    </div>
    <p className="text-sm text-gray-900">
      <span className="font-semibold">Timetable:</span>{" "}
      Tuesdays and Thursdays from 6.30pm to 8.30pm (Irish time)
    </p>
  </div>

  {/* Minimum age */}
  <div className="flex items-start gap-4">
    <div className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3.3 0-8 1.7-8 5v3h16v-3c0-3.3-4.7-5-8-5z" />
      </svg>
    </div>
    <p className="text-sm text-gray-900">
      <span className="font-semibold">Minimum age:</span> 18
    </p>
  </div>

  {/* Start dates */}
  <div className="flex items-start gap-4">
    <div className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 10.6V7h-2v6l5 3 .9-1.5-3.9-1.9z" />
      </svg>
    </div>
    <p className="text-sm text-gray-900">
      <span className="font-semibold">Start dates:</span> Every Tuesday
    </p>
  </div>

</div>

            </div>
            {/* Highlights */}
            
            <div className="md:col-span-5 flex flex-col gap-4">
  {/* Logo */}
  <div className="flex justify-center pt-12">
    <img
      src="/products/escuelas/logo.webp"
      alt="Atlas Language School"
      className="max-w-[250px] w-full object-contain"
    />
  </div>

  {/* Cards */}
  <div className="rounded-3xl border bg-white p-5">
    <p className="text-sm font-semibold text-gray-900">Programa 25 semanas</p>
    <p className="mt-2 text-sm text-gray-600">
      Curso tipo “Academic Year”. Generalmente incluye semanas de vacaciones para viajar por Europa.
    </p>
  </div>

  <div className="rounded-3xl border bg-white p-5">
    <p className="text-sm font-semibold text-gray-900">Ambiente internacional</p>
    <p className="mt-2 text-sm text-gray-600">
      Ideal si quieres practicar inglés fuera del salón con gente de muchos países.
    </p>
  </div>

  <div className="rounded-3xl border bg-white p-5">
    <p className="text-sm font-semibold text-gray-900">Ubicación & vida en Dublín</p>
    <p className="mt-2 text-sm text-gray-600">
      Buen punto si quieres moverte fácil en el centro y conectar con actividades.
    </p>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">¿Por qué Atlas?</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Intercambio cultural real (muchos europeos + asiáticos).</li>
            <li>Buen ritmo de clases para mejorar rápido si eres constante.</li>
            <li>Buen “network” de estudiantes internacionales.</li>
          </ul>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Costos (referencia)</p>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <span>Curso 25 semanas</span>
              <span className="font-semibold">€4,050*</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <span>Material fee</span>
              <span className="font-semibold">€40*</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <span>Exam fee (AY)</span>
              <span className="font-semibold">€190*</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            *Puede variar por temporada/paquete. Te ayudamos a confirmar el total final.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Incluye / requisitos</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Learner Protection (PEL)*</li>
            <li>Medical insurance*</li>
            <li>Documentos y proceso de inscripción*</li>
          </ul>

          <p className="mt-3 text-xs text-gray-500">
            *Depende del programa y tu situación. Lo revisamos contigo.
          </p>
        </div>
      </section>
      

      {/* CTA */}
      <section className="mt-8 rounded-3xl border bg-gray-50 p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              ¿Quieres que te mandemos la info y te ayudemos a elegir?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Llena el formulario y te respondemos. Si quieres, agendamos una sesión para platicarte.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Pedir información
          </button>
        </div>
      </section>
<section className="mt-6">
  <div className="rounded-3xl border bg-gray-50 p-5">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          📍 Ubicación de la escuela
        </h3>
        <p className="text-sm text-gray-600">
          Revisa la zona y calcula tiempos reales de traslado.
        </p>
      </div>

      <a
        href="https://maps.app.goo.gl/PEGA_AQUI_TU_LINK"
        target="_blank"
        rel="noreferrer"
        className="text-sm underline text-gray-600"
      >
        Abrir en Google Maps →
      </a>
    </div>
    
    <div className="mt-4 overflow-hidden rounded-2xl border">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4765.443034449183!2d-6.267171723754354!3d53.330339375921625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670ea0a04ac189%3A0xae2d8bc33dfd4ed0!2sAtlas%20Language%20School!5e0!3m2!1ses!2sie!4v1770242604261!5m2!1ses!2sie" width="1200" height="450" ></iframe>
    </div>

    <p className="mt-2 text-xs text-gray-500">
      Tip: usa este punto para medir distancias desde posibles habitaciones.
    </p>
  </div>
</section>
      {/* Modal */}
      <div className={cx("fixed inset-0 z-50", open ? "block" : "hidden")}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

        <div className="absolute left-1/2 top-1/2 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-[2rem] border bg-white p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">Formulario de información</p>
                <p className="mt-1 text-sm text-gray-600">
                  Te mandamos detalles a tu correo y si quieres agendamos una sesión contigo.
                </p>
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
                  placeholder="+52..."
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
                <label className="text-xs font-medium text-gray-600">Curso de interés *</label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={courseInterest}
                  onChange={(e) => setCourseInterest(e.target.value as CourseInterest)}
                >
                  <option value="25_weeks">25 semanas (con vacaciones)</option>
                  <option value="1_week">1 semana</option>
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
                <label className="text-xs font-medium text-gray-600">
                  ¿Vienes patrocinado por papás/tíos/familiar?
                </label>
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
                  placeholder="Dudas: fechas, pagos, documentación, etc."
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row">
<button
  type="submit"
  disabled={!canSubmit || sending}
  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
>
  {sending ? "Enviando..." : "Enviar"}
</button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
