// app/registro/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterWorkerForm from "./RegisterWorkerForm";

export const metadata: Metadata = {
  title: "Registro de trabajadores mexicanos en Dublín | Mexicanos en Dublín",
  description:
    "Crea tu perfil como trabajador mexicano en Dublín. Regístrate para que empleadores te encuentren por zona, tipo de trabajo y nivel de inglés. Registro inicial €5.",
  alternates: { canonical: "/registro" },
  openGraph: {
    title: "Registro | Mexicanos trabajando en Dublín",
    description:
      "Registra tu perfil (zona, trabajos, inglés) y conecta con empleadores en Dublín. Registro inicial €5.",
    url: "/registro",
    type: "website",
  },
};

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        {/* ... todo tu hero igual ... */}
      </section>

      {/* FORM */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <Suspense fallback={<div className="p-6 text-slate-600">Cargando formulario…</div>}>
          <RegisterWorkerForm />
        </Suspense>
      </section>
    </main>
  );
}
