import type { Metadata } from "next";
import EmployerFilters from "./EmployerFilters";

export const metadata: Metadata = {
  title: "Buscar trabajador | Mexicanos en Dublín",
  description:
    "Busca trabajadores mexicanos por zona, urgencia y tipo de trabajo. Conecta directo con la persona ideal.",
};

export default function BuscarTrabajadorPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buscar trabajador</h1>
          <p className="mt-2 text-gray-600">
            Filtra por zona, urgencia y tipo de trabajo. (MVP: te conectamos por WhatsApp/Correo).
          </p>
        </div>

        <a href="/directorio" className="text-sm underline text-gray-600">
          ← Volver al directorio
        </a>
      </div>

      <div className="mt-8">
        <EmployerFilters />
      </div>
    </main>
  );
}
