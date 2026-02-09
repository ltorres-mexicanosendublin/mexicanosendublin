"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  location: "En Dublín" | "Aún en México" | "En otro país";
  arrivalDate: string; // YYYY-MM-DD
  area: string;
  interests: string[];
  agree: boolean;
};

const INTERESTS = [
  "Renta y housing",
  "Trámites (IRP/PPS)",
  "Leap card",
  "Trabajo / CV",
  "Eventos y comunidad",
  "Comprar/vender cosas",
  "Viajes / tours",
  "Gym / salud",
];

export default function UnirmePage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    whatsapp: "",
    location: "En Dublín",
    arrivalDate: "",
    area: "",
    interests: [],
    agree: false,
  });

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.includes("@") &&
      form.whatsapp.trim().length >= 6 &&
      form.agree
    );
  }, [form]);

  function toggleInterest(i: string) {
    setForm((prev) => {
      const has = prev.interests.includes(i);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((x) => x !== i)
          : [...prev.interests, i],
      };
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    console.log("Community signup:", form);
    setStatus("sent");
  }

  return (
    <main className="py-10">
      <div className="container-wide">
        <Link href="/" className="text-sm underline text-gray-600">
          ← Volver al inicio
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Lado izquierdo */}
          <section className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Únete a la comunidad 🇲🇽🇮🇪
            </h1>
            <p className="mt-3 text-gray-600">
              Un lugar para mexicanos en Dublín: guías, apoyo real, recomendaciones
              y conexiones de confianza.
            </p>

            <div className="mt-6 rounded-3xl border bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Qué obtienes</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                <li>Acceso a guías prácticas y checklists.</li>
                <li>Recomendaciones verificadas (rent, trámites, bancos).</li>
                <li>Invitaciones a eventos y networking.</li>
                <li>Intercambios: vender/donar cosas antes de irte.</li>
              </ul>

              <p className="mt-4 text-xs text-gray-500">
                Nota: por ahora esto es registro de interés. Después activamos cuentas y
                verificación.
              </p>
            </div>

            <div className="mt-6 rounded-3xl border bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Reglas rápidas (para mantenerlo sano)
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                <li>Cero estafas, cero spam.</li>
                <li>Respeto y apoyo entre paisanos.</li>
                <li>Si recomiendas renta/servicios: con evidencia.</li>
              </ul>
            </div>
          </section>

          {/* Lado derecho */}
          <section className="min-w-0">
            <div className="rounded-3xl border bg-white p-8">
              <h2 className="text-xl font-semibold text-gray-900">Registro rápido</h2>
              <p className="mt-2 text-sm text-gray-600">
                Te contactaremos para agregarte y enviarte recursos.
              </p>

              {status === "sent" ? (
                <div className="mt-6 rounded-2xl border bg-emerald-50 p-5 text-emerald-800">
                  <p className="font-semibold">¡Listo! 🎉</p>
                  <p className="mt-1 text-sm">
                    Recibimos tu registro. En breve te contactamos.
                  </p>
                  <button
                    className="btn btn-outline mt-4"
                    onClick={() => setStatus("idle")}
                    type="button"
                  >
                    Registrar a otra persona
                  </button>
                </div>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Luis Uriel"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="tu@email.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        WhatsApp
                      </label>
                      <input
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, whatsapp: e.target.value }))
                        }
                        placeholder="+52 777..."
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Sugerencia: incluye prefijo (+52 / +353).
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        ¿Dónde estás?
                      </label>
                      <select
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.location}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            location: e.target.value as FormState["location"],
                          }))
                        }
                      >
                        <option>En Dublín</option>
                        <option>Aún en México</option>
                        <option>En otro país</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Fecha de llegada (opcional)
                      </label>
                      <input
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.arrivalDate}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, arrivalDate: e.target.value }))
                        }
                        type="date"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Zona / área (opcional)
                      </label>
                      <input
                        className="input mt-2 w-full border-gray-300 focus:ring-emerald-500"
                        value={form.area}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, area: e.target.value }))
                        }
                        placeholder="Dublin 1 / 7 / 8, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Intereses
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {INTERESTS.map((i) => {
                        const active = form.interests.includes(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleInterest(i)}
                            className={
                              active
                                ? "rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                                : "rounded-full border bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                            }
                          >
                            {i}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4"
                      checked={form.agree}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, agree: e.target.checked }))
                      }
                    />
                    <span className="text-sm text-gray-600">
                      Estoy de acuerdo con las reglas: no spam, no estafas, respeto y
                      evidencia si recomiendo algo.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={`btn w-full ${
                      canSubmit ? "btn-primary" : "btn-outline opacity-60"
                    }`}
                    disabled={!canSubmit}
                  >
                    Unirme
                  </button>

                  <p className="text-xs text-gray-500">
                    Tu info se usa solo para organizar la comunidad. Luego agregamos
                    verificación y perfiles.
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
