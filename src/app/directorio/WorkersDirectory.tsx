"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Worker = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  zones: string[];
  jobs: string[];
  englishLevel: string;
  immediate: boolean;
  photoUrl: string;
  description: string;
};
function normalizeDriveUrl(url: string) {
  if (!url) return url;

  // Si viene así: /file/d/ID/view
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//);
  if (m?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }

  return url;
}


const DUBLIN_ZONES = [
  "D1","D2","D3","D4","D5","D6","D6W","D7","D8","D9","D10","D11","D12","D13","D14","D15","D16","D17","D18","D20","D22","D24",
];

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function normalize(s: string) {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function WorkersDirectory() {
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [q, setQ] = useState("");
  const [zone, setZone] = useState("Todas");
  const [job, setJob] = useState("Todos");
  const [immediateOnly, setImmediateOnly] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});


useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/workers", { cache: "no-store" });
      const data = await res.json();
      setWorkers(data?.workers ?? []);
      setImgErrors({}); // 👈 CLAVE: resetear errores
    } finally {
      setLoading(false);
    }
  })();
}, []);


  const allJobs = useMemo(() => {
    const set = new Set<string>();
    workers.forEach((w) => w.jobs.forEach((j) => set.add(j)));
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [workers]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    const nzone = normalize(zone);
    const njob = normalize(job);

    return workers.filter((w) => {
      const matchesQ =
        !nq ||
        normalize(w.fullName).includes(nq) ||
        normalize(w.jobs.join(" ")).includes(nq) ||
        normalize(w.zones.join(" ")).includes(nq);

      const matchesZone =
        nzone === "todas" || w.zones.some((z) => normalize(z) === nzone);

      const matchesJob =
        njob === "todos" || w.jobs.some((j) => normalize(j) === njob);

      const matchesImmediate = !immediateOnly || w.immediate;

      return matchesQ && matchesZone && matchesJob && matchesImmediate;
    });
  }, [workers, q, zone, job, immediateOnly]);

  return (
    <section className="mt-8">
      {/* Filters */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <label className="text-xs font-semibold text-gray-700">Buscar</label>
            <input
              className="input mt-1"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre, oficio, zona..."
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-gray-700">Zona</label>
            <select className="input mt-1" value={zone} onChange={(e) => setZone(e.target.value)}>
              <option value="Todas">Todas</option>
              {DUBLIN_ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-gray-700">Trabajo</label>
            <select className="input mt-1" value={job} onChange={(e) => setJob(e.target.value)}>
              {allJobs.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={immediateOnly}
              onChange={(e) => setImmediateOnly(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Disponibilidad inmediata (puede ir hoy)
          </label>

          <p className="text-sm text-gray-600">
            {loading ? "Cargando..." : `${filtered.length} trabajador(es)`}
          </p>
        </div>
      </div>

      {/* Cards */}
<div className="mt-6 grid gap-4">
  {filtered.map((w) => {
    const failed = !!imgErrors[w.id];

    return (
      <div
        key={w.id}
        className="rounded-3xl border bg-white p-4 shadow-sm md:p-6"
      >
        <div className="grid gap-4 md:grid-cols-[140px_1fr] md:items-start">
          {/* Photo */}
          <div className="w-[140px]">
            <div className="relative h-[140px] w-[140px] overflow-hidden rounded-2xl border bg-gray-50">
              {w.photoUrl && !failed ? (
                <img
  src={w.photoUrl}
  alt={w.fullName}
  className="h-full w-full object-cover"
  referrerPolicy="no-referrer"
  loading="lazy"
  onError={() =>
    setImgErrors((p) => ({ ...p, [w.id]: true }))
  }
  onLoad={() =>
    setImgErrors((p) => {
      if (!p[w.id]) return p;
      const copy = { ...p };
      delete copy[w.id];
      return copy;
    })
  }
/>


              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  Sin foto
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-base font-semibold text-gray-900">
                Nombre: {w.fullName || "—"}
              </p>
              <p className="text-sm text-gray-700">
                Género:{" "}
                <span className="font-semibold">{w.gender || "—"}</span>{" "}
                <span className="mx-2 text-gray-300">|</span>
                Edad: <span className="font-semibold">{w.age || "—"}</span>
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-700">
              Dublin disponibles:{" "}
              <span className="font-semibold">
                {w.zones?.length ? w.zones.join(", ") : "—"}
              </span>
            </p>

            <div className="mt-3">
              <p className="text-sm font-semibold text-gray-900">
                Trabajos que puedo realizar:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {w.jobs?.length ? (
                  w.jobs.map((j) => (
                    <span
                      key={`${w.id}-${j}`}
                      className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900"
                    >
                      {j}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">—</span>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border bg-gray-50 px-3 py-1 text-gray-700">
                Inglés: <b>{w.englishLevel || "—"}</b>
              </span>

              <span
                className={cx(
                  "rounded-full border px-3 py-1",
                  w.immediate
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                )}
              >
                {w.immediate ? "Disponibilidad inmediata" : "No inmediata"}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              Breve descripción: {w.description || "—"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="rounded-2xl bg-gray-900 px-4 py-2 text-sm font-bold text-white hover:bg-gray-800"
                href={`https://wa.me/${(w.phone ?? "").replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                Contactar WhatsApp
              </a>

              <a
                className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gray-50"
                href={`mailto:${w.email ?? ""}`}
              >
                Enviar email
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  })}


        {!loading && filtered.length === 0 ? (
          <div className="rounded-3xl border bg-white p-8 text-center text-sm text-gray-600">
            No hay resultados con esos filtros.
          </div>
        ) : null}
      </div>
    </section>
  );
}
