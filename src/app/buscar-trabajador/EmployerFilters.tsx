"use client";

import { useMemo, useState } from "react";

const DUBLIN_ZONES = [
  "D1","D2","D3","D4","D5","D6","D6W","D7","D8","D9","D10","D11","D12","D13","D14","D15","D16","D17","D18","D20","D22","D24",
];

const JOBS = [
  "Limpieza",
  "Plomería",
  "Albañil",
  "Peluquero(a)",
  "Pintor",
  "Mesero(a)",
  "Cocinero(a)",
  "Cajero(a)",
  "Almacenista",
  "Jardinero(a)",
  "Cuidados de enfermería",
];

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function EmployerFilters() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [zones, setZones] = useState<string[]>([]);
  const [job, setJob] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [hours, setHours] = useState("");
  const [details, setDetails] = useState("");

  function toggleZone(z: string) {
    setZones((p) => (p.includes(z) ? p.filter((x) => x !== z) : [...p, z]));
  }

  const canSend = useMemo(() => {
    if (!name.trim()) return false;
    if (!contact.trim()) return false;
    if (!job) return false;
    if (zones.length === 0) return false;
    return true;
  }, [name, contact, job, zones.length]);

  function send() {
    const msg =
      `Hola, busco trabajador(a) en Dublín.\n` +
      `Nombre: ${name}\n` +
      `Contacto: ${contact}\n` +
      `Zonas: ${zones.join(", ")}\n` +
      `Trabajo: ${job}\n` +
      `Urgente: ${urgent ? "Sí" : "No"}\n` +
      `Horas aprox: ${hours || "—"}\n` +
      `Detalles: ${details || "—"}\n\n` +
      `Enviado desde Mexicanos en Dublín`;

    // Cambia por tu WhatsApp real
    const WHATSAPP = "+353870393105";
    const url = `https://wa.me/${WHATSAPP.replace("+", "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold text-gray-900">Filtros</h2>
      <p className="mt-1 text-sm text-gray-600">
        Completa lo básico y te conectamos. (Después lo hacemos automático con perfiles).
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-gray-700">Tu nombre *</label>
          <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">Tu contacto (tel o email) *</label>
          <input className="input mt-1" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+353... o correo" />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Tipo de trabajo *</label>
          <select className="input mt-1" value={job} onChange={(e) => setJob(e.target.value)}>
            <option value="">Selecciona</option>
            {JOBS.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Horas aproximadas</label>
          <input className="input mt-1" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Ej. 3 horas" />
        </div>
      </div>

      <div className="mt-6">
        <label className="text-xs font-semibold text-gray-700">Zonas *</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {DUBLIN_ZONES.map((z) => {
            const active = zones.includes(z);
            return (
              <button
                key={z}
                type="button"
                onClick={() => toggleZone(z)}
                className={cx(
                  "rounded-full border px-3 py-1 text-sm font-semibold",
                  active ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                )}
              >
                {z}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-gray-50 p-4">
        <input
          id="urgent"
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
          className="h-4 w-4 accent-emerald-600"
        />
        <label htmlFor="urgent" className="text-sm font-semibold text-gray-900">
          Se necesita urgente
        </label>
      </div>

      <div className="mt-6">
        <label className="text-xs font-semibold text-gray-700">Detalles</label>
        <textarea
          className="input mt-1 min-h-[110px]"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Ej. Limpieza profunda, casa 2 cuartos, cerca de D8, etc."
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          * MVP: abrimos WhatsApp con tu solicitud. Próximo: lista de perfiles + contacto directo.
        </p>
        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          className={cx(
            "rounded-2xl px-6 py-3 text-sm font-extrabold",
            canSend ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500"
          )}
        >
          Buscar ahora
        </button>
      </div>
    </div>
  );
}
