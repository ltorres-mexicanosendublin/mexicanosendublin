"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function RoleGateModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Si ya eligió antes, no mostramos modal
    const choice = localStorage.getItem("md_role_choice");
    if (!choice) setOpen(true);
  }, []);

  function choose(role: "worker" | "employer") {
    localStorage.setItem("md_role_choice", role);
    setOpen(false);
    router.push(role === "worker" ? "/registro-trabajadores" : "/buscar-trabajador");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-3xl border bg-white p-6 shadow-xl">
        <p className="inline-flex items-center gap-2 rounded-full border bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
          🇲🇽 Mexicanos en Dublín
        </p>

        <h2 className="mt-3 text-xl font-extrabold text-gray-900">
          ¿Cómo quieres usar el directorio?
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Elige una opción para continuar. (Puedes cambiarlo después).
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => choose("worker")}
            className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800"
          >
            Soy trabajador
          </button>

          <button
            onClick={() => choose("employer")}
            className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
          >
            Soy empleador
          </button>
        </div>

        <button
          onClick={() => setOpen(false)}
          className={cx(
            "mt-4 w-full rounded-2xl px-4 py-2 text-sm font-semibold",
            "text-gray-600 hover:bg-gray-50"
          )}
        >
          Cerrar
        </button>

        <p className="mt-3 text-xs text-gray-500">
          Nota: Esta plataforma conecta personas. El acuerdo final es entre empleador y trabajador.
        </p>
      </div>
    </div>
  );
}
