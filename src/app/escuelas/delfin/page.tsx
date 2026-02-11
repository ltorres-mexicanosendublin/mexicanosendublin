"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CourseTrack = "short_term" | "academic_year" | "renewal" | "accommodation";
type CourseInterest =
  | "general_15"
  | "general_plus_20"
  | "intensive_30"
  | "exam_prep_15"
  | "business_20"
  | "ay_morning"
  | "ay_afternoon"
  | "renewal_morning"
  | "renewal_afternoon"
  | "accommodation_help";

type Sponsorship = "yes" | "no" | "not_sure";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

export default function DelfinSchoolPage() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<string | null>(null);

  // form
  const [school, setSchool] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [preferredStart, setPreferredStart] = useState("");
  const [track, setTrack] = useState<CourseTrack>("academic_year");
  const [courseInterest, setCourseInterest] = useState<CourseInterest>("ay_morning");
  const [sponsored, setSponsored] = useState<Sponsorship>("not_sure");
  const [notes, setNotes] = useState("");

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
    setSentOk(null);

    if (!canSubmit) {
      alert("Completa: nombre, email, teléfono, país y fecha deseada.");
      return;
    }

    try {
      setSending(true);

      // 🔥 Envío vía tu endpoint (Resend)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: "Delfin English School",
          source: "escuelas/delfin",
          fullName,
          email,
          phone,
          country,
          stateRegion,
          preferredStart,
          track,
          courseInterest,
          sponsored,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "No se pudo enviar");
      }

      setSentOk("¡Listo! Te contactamos pronto ✅");
      // opcional: limpiar
      // setFullName(""); setEmail(""); setPhone(""); setCountry(""); setStateRegion("");
      // setPreferredStart(""); setNotes("");
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Error enviando el formulario");
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
          <div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Escuela en el centro (Parnell Square)
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Delfin English School (Dublín)
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Opción muy popular por ubicación y variedad de cursos: desde
                <strong> General English</strong> (15h/20h), hasta <strong>Intensive 30h</strong>,
                <strong> Business English</strong> y programas tipo <strong>Academic Year (Study &amp; Work)</strong>.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Link
  href="/escuelas/formulario?school=delfin"
  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
>
  Pedir info
</Link>
                <a
                  href="https://delfinschool.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Ver web oficial →
                </a>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                *Los precios pueden variar. Te ayudamos a comparar opciones y estimar el total final.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="grid gap-3">
                <div className="rounded-3xl border bg-white p-5">
                  <p className="text-sm font-semibold text-gray-900">Short-Term (semanal)</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Cursos de L–V: 15h, 20h (Plus), 30h Intensive, Exam Prep y Business.
                  </p>
                </div>

                <div className="rounded-3xl border bg-white p-5">
                  <p className="text-sm font-semibold text-gray-900">Study &amp; Work (25 semanas)</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Programa tipo Academic Year: 25 semanas + 8 semanas de vacaciones (según calendario).
                  </p>
                </div>

                <div className="rounded-3xl border bg-white p-5">
                  <p className="text-sm font-semibold text-gray-900">Alojamiento (opcional)</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Host family, city host, residence o hostel (según disponibilidad/temporada).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Cursos (resumen)</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>General English (15h) – mañana o tarde</li>
            <li>General English Plus (20h) – más speaking diario</li>
            <li>Intensive (30h) – mañana + tarde</li>
            <li>Exam Preparation (15h)</li>
            <li>Business English (20h)</li>
          </ul>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Precios rápidos (referencia)</p>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="font-semibold text-gray-900">Short-term (semanal)</p>
              <p className="mt-1 text-gray-700">
                General/Exam 15h: €155 (mañana) o €130 (tarde) en 1–5 semanas (baja si contratas más semanas).
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="font-semibold text-gray-900">Academic Year</p>
              <p className="mt-1 text-gray-700">
                Morning €2,950 · Afternoon €2,500 (según lista).
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            *Además hay fees (registro/libros/examen/seguro) según tu caso.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <p className="text-sm font-semibold text-gray-900">Fees típicos</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Registro Non-EU: €70</li>
            <li>Libros: €50 (standard) / €75 (intensive)</li>
            <li>Seguro médico (AY): €150</li>
            <li>Examen: TIE €130 o IELTS/Cambridge €220</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            *Te ayudamos a estimar el total final según el programa que elijas.
          </p>
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.426189700497!2d-6.264480923752767!3d53.35352717418684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e81ba4ad24f%3A0xb08e9110344f19e1!2sDelfin%20English%20School%20Dublin!5e0!3m2!1ses!2sie!4v1770254022150!5m2!1ses!2sie"
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
            <h2 className="text-xl font-bold text-gray-900">
              ¿Quieres que te mandemos la info y te ayudemos a elegir?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Llena el formulario y te respondemos por correo. Si quieres, agendamos una sesión.
            </p>
          </div>

         <Link
  href="/escuelas/formulario?school=delfin"
  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
>
  Pedir info
</Link>
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
                <label className="text-xs font-medium text-gray-600">¿Qué te interesa? *</label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={track}
                  onChange={(e) => setTrack(e.target.value as CourseTrack)}
                >
                  <option value="academic_year">Academic Year (Study & Work)</option>
                  <option value="short_term">Short-Term (semanal)</option>
                  <option value="renewal">Renovación Academic Year</option>
                  <option value="accommodation">Alojamiento</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600">Curso específico *</label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={courseInterest}
                  onChange={(e) => setCourseInterest(e.target.value as CourseInterest)}
                >
                  <option value="ay_morning">Academic Year – Morning</option>
                  <option value="ay_afternoon">Academic Year – Afternoon</option>
                  <option value="general_15">General English – 15h</option>
                  <option value="general_plus_20">General English Plus – 20h</option>
                  <option value="intensive_30">General English Intensive – 30h</option>
                  <option value="exam_prep_15">Exam Preparation – 15h</option>
                  <option value="business_20">Business English – 20h</option>
                  <option value="renewal_morning">Renewal – Morning</option>
                  <option value="renewal_afternoon">Renewal – Afternoon</option>
                  <option value="accommodation_help">Quiero ayuda con alojamiento</option>
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
                  placeholder="Dudas: pagos, fechas, documentación, alojamiento, etc."
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit || sending}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {sending ? "Enviando..." : "Enviar solicitud"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>

              {sentOk ? (
                <p className="md:col-span-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-900">
                  {sentOk}
                </p>
              ) : null}

              <p className="md:col-span-2 text-xs text-gray-500">
                Al enviar, te contactamos desde Mexicanos en Dublín.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
