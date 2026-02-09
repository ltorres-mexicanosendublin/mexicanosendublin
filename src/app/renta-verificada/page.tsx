"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function inputBase() {
  return [
    "mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900",
    "placeholder:text-gray-400",
    "shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500",
    "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
  ].join(" ");
}

function labelBase() {
  return "text-sm font-semibold text-gray-800";
}

function helpText() {
  return "mt-2 text-xs text-gray-500";
}

function cardTitle() {
  return "text-sm font-semibold text-gray-900";
}

function softCard() {
  return "rounded-2xl border border-gray-200 bg-gray-50 p-4";
}


type FormState = {
  name: string;
  whatsapp: string;
  email: string;
  gender: "Hombre" | "Mujer" | "Prefiero no decir";
  inDublin: "Ya estoy en Dublín" | "Aún no llego";
  arrivalDate: string; // YYYY-MM-DD
  school: string;
  budget: string;
  roomType: "Single room" | "Double room" | "Compartida (2)" | "Compartida (3+)" | "Hostal (temporal)";
  okSharing: "Sí" | "No" | "Depende";
  preferredAreas: string[];
  notes: string;
  wantKeysOnArrival: boolean;
  flightTime: string;
  agree: boolean;
};

const AREAS = [
  "Dublin 1",
  "Dublin 2",
  "Dublin 3",
  "Dublin 4",
  "Dublin 6",
  "Dublin 7",
  "Dublin 8",
  "Dublin 9",
  "Dublin 11",
  "Dublin 12",
  "Dublin 13",
  "Dublin 14",
  "Dublin 15",
  "Dublin 16",
  "Dublin 18",
];

const GROUPS = [
  { name: "Daft.ie", desc: "El portal más usado (ojo con estafas y “depósitos”)." },
  { name: "Facebook Groups", desc: "Útil, pero es donde más intentan estafar." },
  { name: "WhatsApp / Comunidad", desc: "Recomendaciones de paisanos y contactos directos." },
  { name: "Hostales / Airbnb", desc: "Plan B para llegar y buscar con calma." },
];

const TRANSPORT = [
  { name: "Luas", desc: "Tranvía. Conecta zonas clave (verde/roja)." },
  { name: "DART", desc: "Tren costero (zonas norte/sur por la costa)." },
  { name: "Dublin Bus", desc: "Cobertura amplia, pero tráfico en horas pico." },
];

function pill(active: boolean) {
  return active
    ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800"
    : "rounded-full border bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50";
}

export default function RentaVerificadaPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const [form, setForm] = useState<FormState>({
    name: "",
    whatsapp: "",
    email: "",
    gender: "Prefiero no decir",
    inDublin: "Aún no llego",
    arrivalDate: "",
    school: "",
    budget: "",
    roomType: "Single room",
    okSharing: "Depende",
    preferredAreas: [],
    notes: "",
    wantKeysOnArrival: false,
    flightTime: "",
    agree: false,
  });

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.whatsapp.trim().length >= 6 &&
      form.email.includes("@") &&
      form.agree
    );
  }, [form]);

  function toggleArea(a: string) {
    setForm((prev) => {
      const has = prev.preferredAreas.includes(a);
      return {
        ...prev,
        preferredAreas: has
          ? prev.preferredAreas.filter((x) => x !== a)
          : [...prev.preferredAreas, a],
      };
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // Por ahora: sin backend (solo consola). Luego lo conectamos a API/Sheets/Supabase.
    console.log("Renta verificada lead:", form);

    // Opcional: abrir WhatsApp con un resumen
    const msg = encodeURIComponent(
      [
        "Hola, quiero Renta Verificada (MX en Dublín).",
        `Nombre: ${form.name}`,
        `WhatsApp: ${form.whatsapp}`,
        `Email: ${form.email}`,
        `Estoy: ${form.inDublin}`,
        form.arrivalDate ? `Fecha llegada: ${form.arrivalDate}` : "",
        form.school ? `Escuela: ${form.school}` : "",
        `Tipo: ${form.roomType}`,
        `Presupuesto: ${form.budget || "—"}`,
        `¿Compartir?: ${form.okSharing}`,
        form.preferredAreas.length ? `Zonas: ${form.preferredAreas.join(", ")}` : "",
        form.wantKeysOnArrival ? `Quiero llaves al llegar. Hora vuelo: ${form.flightTime || "—"}` : "",
        form.notes ? `Notas: ${form.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );

    // Cambia este número por el tuyo (formato internacional sin +)
    const PHONE = "+3530870393105";
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");

    setStatus("sent");
  }

  return (
    
    <main className="container-wide py-10">
        <div className="mb-6">
  <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600">
    🇲🇽 Mexicanos en Dublín
  </p>

  <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
    Renta verificada
  </h2>

  <p className="mt-1 max-w-3xl text-sm text-gray-600">
    Servicio de acompañamiento y verificación para rentar en Dublín con evidencia real,
    evitando estafas y falsas promesas.
  </p>
</div>
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  {/* Volver */}
  <Link
    href="/"
    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
  >
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white">
      ←
    </span>
    Volver al inicio
  </Link>

  {/* Acciones */}
  <div className="flex items-center gap-2">
    <Link
      href="/guias"
      className="rounded-full border bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
    >
      📘 Ver guías
    </Link>

    <Link
      href="/unirme"
      className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
    >
      Unirme
    </Link>
  </div>
</div>

      

      {/* HERO */}
      {/* COMO SE DIVIDE DUBLÍN */}
<section className="mt-8 rounded-3xl border bg-white p-8">
  <h2 className="text-2xl font-semibold text-gray-900">
    ¿Cómo se divide Dublín y en qué zonas te conviene rentar?
  </h2>

  <p className="mt-3 max-w-3xl text-gray-600">
    Dublín se divide por zonas numeradas (Dublin 1, Dublin 2, Dublin 3, etc.).
    La zona correcta para ti depende principalmente de <b>tu escuela, presupuesto
    y tolerancia al transporte</b>.
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border bg-gray-50 p-5">
      <p className="font-semibold text-gray-900">Centro (D1, D2, D4)</p>
      <p className="mt-2 text-sm text-gray-600">
        Más cerca de escuelas, trabajo y vida social. Más caro y con mayor demanda.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Ideal si tu presupuesto lo permite y quieres caminar o usar poco transporte.
      </p>
    </div>

    <div className="rounded-2xl border bg-gray-50 p-5">
      <p className="font-semibold text-gray-900">Zonas intermedias (D6, D7, D8, D9)</p>
      <p className="mt-2 text-sm text-gray-600">
        Buen balance entre precio y distancia. Bien conectadas por bus o Luas.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Son las zonas que más recomendamos para estudiantes.
      </p>
    </div>

    <div className="rounded-2xl border bg-gray-50 p-5">
      <p className="font-semibold text-gray-900">Zonas exteriores (D11–D18)</p>
      <p className="mt-2 text-sm text-gray-600">
        Más económicas, pero con traslados más largos.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Recomendadas solo si aceptas transporte diario.
      </p>
    </div>
  </div>

  <div className="mt-6 rounded-2xl border bg-white p-5">
    <p className="font-semibold text-gray-900">
      Zonas que solemos recomendar (según escuela y presupuesto)
    </p>
    <p className="mt-2 text-sm text-gray-600">
      Dublin 6, Dublin 7, Dublin 8 y Dublin 9 suelen ofrecer mejor equilibrio entre
      precio, seguridad y conexión al centro.
    </p>
  </div>

  <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
    <p className="font-semibold">
      Cuota de recuperación
    </p>
    <p className="mt-2 text-sm">
      El servicio de <b>Renta Verificada tiene una cuota de recuperación de €50</b>.
      Esta cuota cubre tiempo, traslados y validaciones presenciales.
    </p>
    <p className="mt-1 text-sm">
      <b>No garantiza una habitación específica</b>; el objetivo es ayudarte a
      <b>evitar estafas</b> y tomar decisiones informadas con evidencia real.
    </p>
  </div>
</section>

      {/* CONTENIDO */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* IZQUIERDA: info */}
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border bg-white p-7">
            <h2 className="text-xl font-semibold text-gray-900">Formas comunes de rentar</h2>
            <p className="mt-2 text-sm text-gray-600">
              No hay una sola forma “correcta”. Depende de presupuesto, escuela, zona y si aceptas compartir.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {GROUPS.map((g) => (
                <div key={g.name} className="rounded-2xl border bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">{g.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border bg-white p-4">
              <p className="font-semibold text-gray-900">Ojo con estafas típicas</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Te piden depósito para “apartar” sin contrato o sin video en vivo.</li>
                <li>Fotos bonitas pero no te dejan ver la habitación por videollamada.</li>
                <li>Precio “demasiado bueno” en zonas top (D1/D2) con urgencia falsa.</li>
                <li>Te mandan IBAN de tercero o cambian datos de pago al final.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-7">
            <h2 className="text-xl font-semibold text-gray-900">Tipos de cuarto</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">Single room</p>
                <p className="mt-1 text-sm text-gray-600">
                  Habitación para 1 persona. Más privacidad, más caro, más demanda.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">Double room</p>
                <p className="mt-1 text-sm text-gray-600">
                  Cuarto más grande. Puede ser para pareja o para 1 (depende del landlord).
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">Compartida (2)</p>
                <p className="mt-1 text-sm text-gray-600">
                  Compartes habitación con 1 persona. Más económico, menos privacidad.
                </p>
              </div>
              <div className="rounded-2xl border bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">Hostal / temporal</p>
                <p className="mt-1 text-sm text-gray-600">
                  Plan B para llegar. Te permite buscar con calma y evitar depósitos a distancia.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-7">
            <h2 className="text-xl font-semibold text-gray-900">
              Zonas + transporte (para decidir mejor)
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              La regla de oro: define tu escuela/trabajo y luego prioriza conexión.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {TRANSPORT.map((t) => (
                <div key={t.name} className="rounded-2xl border bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border bg-white p-4">
              <p className="font-semibold text-gray-900">Pros / contras de vivir en el centro</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2 text-sm text-gray-600">
                <div className="rounded-2xl border bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">Pros</p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Más cerca de todo (escuela, trabajo, vida social).</li>
                    <li>Menos tiempo de transporte.</li>
                    <li>Más opciones para moverte.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border bg-gray-50 p-4">
                  <p className="font-semibold text-gray-900">Contras</p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Más caro y más competencia.</li>
                    <li>Cuartos más pequeños.</li>
                    <li>Más ruido (depende del área).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-7">
            <h2 className="text-xl font-semibold text-gray-900">Cómo funciona “Renta verificada”</h2>
            <p className="mt-2 text-sm text-gray-600">
              Nuestro enfoque es simple: evidencia + checklist + confirmación de fechas y pago.
            </p>

            <ol className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="rounded-2xl border bg-gray-50 p-4">
                <b>1) Definimos tu caso</b>: presupuesto, single/double/compartida, escuela, zona y fechas.
              </li>
              <li className="rounded-2xl border bg-gray-50 p-4">
                <b>2) Coordinamos visitas</b>: contamos con <b>hasta 4 visitas</b> a diferentes opciones para validar.
              </li>
              <li className="rounded-2xl border bg-gray-50 p-4">
                <b>3) Evidencia</b>: video + checklist: habitación existe, condiciones, reglas, servicios y ubicación.
              </li>
              <li className="rounded-2xl border bg-gray-50 p-4">
                <b>4) Confirmación</b>: fecha de ingreso, cuándo se deposita, a quién, y si deseas llaves al llegar.
              </li>
            </ol>

            <div className="mt-5 rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Importante (para expectativas reales)</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>No garantizamos conseguir una single específica (depende de disponibilidad).</li>
                <li>Nos adecuamos a lo disponible según tu presupuesto y flexibilidad.</li>
                <li>No custodiamos depósitos ni hacemos “pagos por ti”.</li>
              </ul>
            </div>

            <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Tiempos recomendados</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                <li><b>Single:</b> ideal 1 mes–1.5 meses (alta demanda).</li>
                <li><b>Compartida (2):</b> ~20 días puede funcionar.</li>
                <li><b>Compartida (3+):</b> suele haber más flexibilidad.</li>
                <li><b>Hostal temporal:</b> si vienes ya, puede ser el mejor “plan A” + búsqueda real.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DERECHA: formulario */}
<aside className="lg:col-span-5">
  <div className="sticky top-6 rounded-3xl border bg-white p-7 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Pide renta verificada</h2>
        <p className="mt-2 text-sm text-gray-600">
          Te respondemos con pasos y opciones según tu caso.
        </p>
      </div>

      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
        Respuesta rápida
      </span>
    </div>

    {status === "sent" ? (
      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
        <p className="font-semibold">¡Listo! 🎉</p>
        <p className="mt-1 text-sm">
          Se abrió WhatsApp con tu resumen. Si no se abrió, revisa popups.
        </p>
        <button className="btn btn-outline mt-4" onClick={() => setStatus("idle")}>
          Enviar otro
        </button>
      </div>
    ) : (
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelBase()}>Nombre</label>
            <input
              className={inputBase()}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Luis Uriel"
            />
          </div>

          <div>
            <label className={labelBase()}>WhatsApp</label>
            <input
              className={inputBase()}
              value={form.whatsapp}
              onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
              placeholder="+353 87..."
              inputMode="tel"
            />
          </div>
        </div>

        <div>
          <label className={labelBase()}>Email</label>
          <input
            className={inputBase()}
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="tu@email.com"
            type="email"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelBase()}>Género</label>
            <select
              className={inputBase()}
              value={form.gender}
              onChange={(e) =>
                setForm((p) => ({ ...p, gender: e.target.value as FormState["gender"] }))
              }
            >
              <option>Hombre</option>
              <option>Mujer</option>
              <option>Prefiero no decir</option>
            </select>
          </div>

          <div>
            <label className={labelBase()}>¿Dónde estás?</label>
            <select
              className={inputBase()}
              value={form.inDublin}
              onChange={(e) =>
                setForm((p) => ({ ...p, inDublin: e.target.value as FormState["inDublin"] }))
              }
            >
              <option>Aún no llego</option>
              <option>Ya estoy en Dublín</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelBase()}>Fecha de llegada</label>
            <input
              className={inputBase()}
              type="date"
              value={form.arrivalDate}
              onChange={(e) => setForm((p) => ({ ...p, arrivalDate: e.target.value }))}
            />
            <p className={helpText()}>Si ya estás en Dublín, pon una fecha aproximada.</p>
          </div>

          <div>
            <label className={labelBase()}>Escuela / zona de escuela</label>
            <input
              className={inputBase()}
              value={form.school}
              onChange={(e) => setForm((p) => ({ ...p, school: e.target.value }))}
              placeholder="Ej. Atlas / D2 / etc."
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelBase()}>Tipo de cuarto</label>
            <select
              className={inputBase()}
              value={form.roomType}
              onChange={(e) =>
                setForm((p) => ({ ...p, roomType: e.target.value as FormState["roomType"] }))
              }
            >
              <option>Single room</option>
              <option>Double room</option>
              <option>Compartida (2)</option>
              <option>Compartida (3+)</option>
              <option>Hostal (temporal)</option>
            </select>
          </div>

          <div>
            <label className={labelBase()}>Presupuesto (€/sem o €/mes)</label>
            <input
              className={inputBase()}
              value={form.budget}
              onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
              placeholder="Ej. 250/sem o 900/mes"
            />
          </div>
        </div>

        <div>
          <label className={labelBase()}>¿Te molesta compartir?</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["Sí", "No", "Depende"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setForm((p) => ({ ...p, okSharing: v }))}
                className={pill(form.okSharing === v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelBase()}>Zonas preferidas</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggleArea(a)}
                className={pill(form.preferredAreas.includes(a))}
              >
                {a}
              </button>
            ))}
          </div>
          <p className={helpText()}>Si no sabes, pon 2–3 zonas y “cercano a mi escuela”.</p>
        </div>

        <div className={softCard()}>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              checked={form.wantKeysOnArrival}
              onChange={(e) =>
                setForm((p) => ({ ...p, wantKeysOnArrival: e.target.checked }))
              }
            />
            <span className="text-sm text-gray-700">
              Quiero que me entreguen llaves el día que llego (si se puede).
            </span>
          </label>

          {form.wantKeysOnArrival && (
            <div className="mt-3">
              <label className={labelBase()}>Hora aproximada del vuelo / llegada</label>
              <input
                className={inputBase()}
                value={form.flightTime}
                onChange={(e) => setForm((p) => ({ ...p, flightTime: e.target.value }))}
                placeholder="Ej. 10:30 am"
              />
            </div>
          )}
        </div>

        <div>
          <label className={labelBase()}>Notas (opcional)</label>
          <textarea
            className={[inputBase(), "min-h-[110px] resize-y"].join(" ")}
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Ej. prefiero casa tranquila, no fiestas, cerca de Luas, etc."
          />
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            checked={form.agree}
            onChange={(e) => setForm((p) => ({ ...p, agree: e.target.checked }))}
          />
          <span className="text-sm text-gray-600">
            Entiendo que no garantizan una single específica y que el servicio se ajusta a disponibilidad y
            verificación (sin custodiar depósitos).
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full rounded-2xl px-6 py-4 text-sm font-semibold transition ${
            canSubmit
              ? "bg-black text-white hover:opacity-90"
              : "border border-gray-300 bg-white text-gray-400 cursor-not-allowed"
          }`}
        >
          Enviar y abrir WhatsApp
        </button>

        <p className="text-xs text-gray-500">
          Tip: más exacto tu presupuesto/escuela → más rápido encontramos opciones reales.
        </p>
      </form>
    )}
  </div>
</aside>

      </div>
      <div className="mt-6 rounded-3xl border bg-gray-50 p-6">
  <h3 className="text-lg font-semibold text-gray-900">
    Contratos, depósitos y responsabilidades
  </h3>

  <ul className="mt-3 space-y-3 text-sm text-gray-700 list-disc pl-5">
    <li>
      En Dublín, muchos cuartos se rentan con contratos mínimos de <strong>3 meses</strong>.
      No todos los propietarios aceptan estancias cortas.
    </li>

    <li>
      Si decides salir del cuarto antes de cumplir el tiempo acordado, es común que
      <strong>el depósito no sea devuelto</strong> o que se te pida encontrar un reemplazo.
    </li>

    <li>
      En algunos casos, si deseas cambiarte de cuarto, <strong>tú mismo deberás mostrar la habitación</strong>
      a posibles interesados para que el propietario autorice el cambio y libere tu depósito.
    </li>

    <li>
      <strong>No nos hacemos responsables</strong> si una habitación no cumple con tus expectativas
      personales (comodidad, convivencia, ruido, limpieza, etc.).
    </li>

    <li>
      <strong>No somos una agencia inmobiliaria</strong> ni custodiamos depósitos.
      El dinero del depósito y la renta se entrega directamente al propietario o arrendador.
    </li>

    <li>
      Nuestro servicio consiste en <strong>verificar que la habitación exista</strong>,
      confirmar condiciones, fechas y evidenciar lo que se ofrece para que tomes una decisión informada.
    </li>
  </ul>

  <p className="mt-4 text-xs text-gray-500">
    Renta Verificada es un servicio de acompañamiento y validación, no una garantía de satisfacción
    ni de devolución de dinero.
  </p>
</div>

    </main>
  );
}