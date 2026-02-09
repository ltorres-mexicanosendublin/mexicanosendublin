"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkersCardGate() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Card en Home */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full rounded-2xl border bg-white px-5 py-4 text-left transition hover:bg-gray-50 hover:shadow-sm"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-gray-900">
              Trabajadores Mexicanos en Dublin
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Conecta con trabajadores mexicanos o encuentra empleo en Dublín.
            </p>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition group-hover:bg-black group-hover:text-white">
            →
          </span>
        </div>
      </button>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* content */}
          <div className="relative w-full max-w-md rounded-3xl border bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">
              ¿Qué quieres hacer?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Elige una opción para continuar. Puedes <b>buscar trabajadores</b>{" "}
              o <b>registrarte para ofrecer tus servicios</b>.
            </p>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => router.push("/directorio")}
                className="rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Soy empleador (busco trabajadores)
              </button>

              <button
                type="button"
                onClick={() => router.push("/registro-trabajadores")}
                className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Quiero registrarme como trabajador
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-1 text-sm text-gray-500 hover:underline"
              >
                Cancelar
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Tu información se muestra con respeto y transparencia. Puedes
              actualizar tu perfil después.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
