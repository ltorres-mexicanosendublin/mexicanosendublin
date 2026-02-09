"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RoleGateModal({ open, onClose }: Props) {
  // cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* modal */}
      <div className="relative mx-auto mt-24 w-[min(92vw,520px)] rounded-3xl border bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ¿Qué quieres hacer?
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Elige tu opción para llevarte al lugar correcto.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <Link
            href="/directorio"
            onClick={onClose}
            className="rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-gray-800"
          >
            Soy empleador (quiero contratar)
          </Link>

          <Link
            href="/registro-trabajadores"
            onClick={onClose}
            className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-bold text-gray-900 hover:bg-gray-50"
          >
            Quiero ser trabajador (registrarme)
          </Link>

          <p className="mt-1 text-xs text-gray-500">
            *Si solo quieres ver opciones, entra como empleador.
          </p>
        </div>
      </div>
    </div>
  );
}
