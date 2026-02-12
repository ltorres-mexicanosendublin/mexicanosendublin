"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const schools = ["atlas", "delfin", "isi", "ces", "ise", "eli"];

function generateMondays(startYear: number, endYear: number) {
  const mondays: { value: string; label: string }[] = [];
  const startDate = new Date(startYear, 0, 1);
  const endDate = new Date(endYear, 11, 31);

  while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() + 1);

  const options = { day: "numeric", month: "long", year: "numeric" } as const;

  while (startDate <= endDate) {
    const value = startDate.toISOString().split("T")[0];
    const label = startDate.toLocaleDateString("es-ES", options);
    mondays.push({ value, label });
    startDate.setDate(startDate.getDate() + 7);
  }
  return mondays;
}

export default function FormClient() {
     const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const schoolFromUrl = searchParams.get("school") || "";
  const [school, setSchool] = useState(schoolFromUrl);

  const mondays = useMemo(() => generateMondays(2026, 2027), []);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    stateRegion: "",
    duration: "",
    preferredStart: "",
    applicationType: "",
    callAvailability: "",
    notes: "",
  });

  const canSubmit = useMemo(() => {
    return (
      !!school &&
      !!form.fullName &&
      !!form.email &&
      !!form.phone &&
      !!form.gender &&
      !!form.country &&
      !!form.stateRegion &&
      !!form.duration &&
      !!form.applicationType &&
      !!form.preferredStart &&
      !!form.callAvailability
    );
  }, [school, form]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const WHATSAPP_TO = "353870393105"; // 👈 CAMBIA A TU NUMERO sin +
function buildWhatsAppMessage(payload: any) {
  const lines = [
    `Hola 👋`,
    ``,
    `Mi nombre es *${payload.fullName ?? ""}* y estoy interesado en estudiar en *${payload.school?.toUpperCase() ?? ""}*.`,
    ``,
    `📌 *Información del estudiante:*`,
    `• Email: ${payload.email ?? ""}`,
    `• Teléfono: ${payload.phone ?? ""}`,
    `• País de origen: ${payload.country ?? ""}`,
    `• Estado/Región: ${payload.stateRegion ?? ""}`,
    `• Género: ${payload.gender ?? ""}`,
    ``,
    `📚 *Detalles del curso:*`,
    `• Duración: ${payload.duration ?? ""}`,
    `• Fecha de inicio deseada: ${payload.preferredStart ?? ""}`,
    `• Tipo de solicitud: ${payload.applicationType ?? ""}`,
    `• Disponibilidad para llamada: ${payload.callAvailability ?? ""}`,
    ``,
    payload.notes ? `📝 Comentarios adicionales:\n${payload.notes}\n` : "",
    `Quedo atento a información sobre costos, disponibilidad y proceso de inscripción.`,
    ``,
    `Muchas gracias 🙏`,
  ];

  return lines.filter(Boolean).join("\n");
}

async function handleSubmit(e: any) {
  e.preventDefault();

  try {
    setSending(true);

    const payload = {
      school,
      source: `escuelas/${school}`,
      ...form, // asumiendo que aqui vienen fullName, email, phone...
    };

    const msg = buildWhatsAppMessage(payload);
    const url = `https://wa.me/${WHATSAPP_TO}?text=${encodeURIComponent(msg)}`;

    // Abre WhatsApp Web / App con el mensaje listo
    window.open(url, "_blank", "noopener,noreferrer");

    // opcional: limpia form / muestra success
    setSuccess(true);
  } catch (err: any) {
    alert(err?.message ?? "No se pudo abrir WhatsApp");
  } finally {
    setSending(false);
  }
}


  // ✅ OJO: TIENE QUE EXISTIR ESTE RETURN
  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6 flex items-center">
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl shadow-2xl p-10 relative">
        <button
          type="button"
          onClick={() => router.push("/escuelas")}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Solicitar Información
        </h1>

        <p className="text-sm text-slate-600 mb-8">
          Completa el formulario y te contactaremos pronto.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            className="w-full border border-slate-200 rounded-2xl p-3 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <option value="">Selecciona una escuela</option>
            {schools.map((s) => (
              <option key={s} value={s}>
                {s.toUpperCase()}
              </option>
            ))}
          </select>

          <input name="fullName" placeholder="Nombre completo" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3" />

          <input type="email" name="email" placeholder="Correo" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3" />

          <input name="phone" placeholder="Teléfono (con lada)" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3" />

          <select name="gender" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3">
            <option value="">Género</option>
            <option value="Male">Hombre</option>
            <option value="Female">Mujer</option>
            <option value="Prefer not to say">Prefiero no decir</option>
          </select>

          <input name="country" placeholder="País" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3" />

          <input name="stateRegion" placeholder="Estado / Región" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3" />

          <select name="duration" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3">
            <option value="">Duración del curso</option>
            <option value="3 months">3 meses</option>
            <option value="6 months">6 meses</option>
            <option value="8 months">8 meses</option>
            <option value="1 year">1 año</option>
          </select>

          <select name="applicationType" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3">
            <option value="">¿Nuevo o renovación?</option>
            <option value="New Student">Nuevo</option>
            <option value="Renewal">Renovación</option>
          </select>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Fecha en la que te gustaría iniciar el curso (solo lunes)
            </label>
            <select name="preferredStart" required onChange={handleChange}
              className="w-full border border-slate-200 rounded-2xl p-3">
              <option value="">Selecciona una fecha</option>
              {mondays.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <select name="callAvailability" required onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3">
            <option value="">Mejor horario para contactarte</option>
            <option value="Morning (8am - 12pm)">Mañana (8am - 12pm)</option>
            <option value="Afternoon (12pm - 5pm)">Tarde (12pm - 5pm)</option>
            <option value="Evening (5pm - 9pm)">Noche (5pm - 9pm)</option>
            <option value="Anytime">Cualquier horario</option>
          </select>

          <textarea name="notes" placeholder="Notas (opcional)" onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl p-3 min-h-[110px]" />

          <button
            type="submit"
            disabled={!canSubmit || sending}
            className="w-full bg-slate-900 text-white py-3 rounded-2xl font-semibold hover:bg-black transition disabled:opacity-50"
          >
            {sending ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>

        {success && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">

      <div className="text-4xl mb-4">🎉</div>

      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        ¡Datos enviados correctamente!
      </h2>

      <p className="text-gray-600 mb-6">
        Hemos recibido tu solicitud y en breve nos pondremos en contacto contigo
        para continuar con el proceso.
      </p>

      <button
        onClick={() => {
          setSuccess(false);
          router.push("/escuelas");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200"
      >
        Volver a escuelas
      </button>

    </div>
  </div>
)}

      </div>
    </div>
    
  );
  
}
