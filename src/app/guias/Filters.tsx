"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LOCALES = ["es", "en"] as const;

export default function Filters({
  q,
  cat,
  categories,
}: {
  q: string;
  cat: string;
  categories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(q);
  const [category, setCategory] = useState(cat);

  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setQuery(q), [q]);
  useEffect(() => setCategory(cat), [cat]);

  function updateUrl(nextQ: string, nextCat: string) {
    const sp = new URLSearchParams(searchParams.toString());

    const cleanQ = nextQ.trim();
    if (cleanQ) sp.set("q", cleanQ);
    else sp.delete("q");

    if (nextCat && nextCat !== "Todas") sp.set("cat", nextCat);
    else sp.delete("cat");

    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function debouncedUpdate(nextQ: string, nextCat: string) {
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => updateUrl(nextQ, nextCat), 250);
  }

  const hasFilters = Boolean(query.trim()) || (category && category !== "Todas");

  return (
    <div className="mt-6 rounded-3xl border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-12 md:items-center">
        {/* Search */}
        <div className="md:col-span-8">
          <label className="sr-only">Buscar</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                debouncedUpdate(v, category);
              }}
              placeholder="Buscar: IRP, PPS, Leap Card, renta, SIM..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />

            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  updateUrl("", category);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1 text-xs text-gray-600 hover:bg-gray-100"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>

        {/* Category */}
        <div className="md:col-span-4">
          <label className="sr-only">Categoría</label>
          <select
            value={category}
            onChange={(e) => {
              const v = e.target.value;
              setCategory(v);
              updateUrl(query, v);
            }}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 px-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Footer row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          Tip: escribe normal, no importa si pones acentos (ej. “Dublín”).
        </p>

        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("Todas");
              updateUrl("", "Todas");
            }}
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}
