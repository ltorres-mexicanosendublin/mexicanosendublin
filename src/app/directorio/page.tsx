import type { Metadata } from "next";
import WorkersDirectory from "./WorkersDirectory";

export const metadata: Metadata = {
  title: "Directorio de trabajadores | Mexicanos en Dublín",
  description:
    "Encuentra trabajadores mexicanos por zona, oficio y disponibilidad inmediata.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Directorio</h1>
          <p className="mt-2 text-gray-600">
            Filtra por zona, oficio y disponibilidad inmediata.
          </p>
        </div>
      </div>

      <WorkersDirectory />
    </main>
  );
}
