"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

type Product = {
  id: string;
  name: string;
  category: string;
  type: string;
  brand: string;
  priceEUR: number;
  description: string;
  imageUrl: string;
  available: boolean;
  stock: number;
};

function eur(n: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default function ProductosPage() {
  const { addItem, open, totalItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  // qty por producto
  const [qtyById, setQtyById] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data?.ok) setProducts(data.products);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((d) => d.category))).filter(Boolean),
    [products]
  );

  const types = useMemo(() => {
    const base = categoryFilter
      ? products.filter((d) => d.category === categoryFilter)
      : products;
    return Array.from(new Set(base.map((d) => d.type))).filter(Boolean);
  }, [products, categoryFilter]);

  const brands = useMemo(() => {
    const base = categoryFilter
      ? products.filter((d) => d.category === categoryFilter)
      : products;
    return Array.from(new Set(base.map((d) => d.brand))).filter(Boolean);
  }, [products, categoryFilter]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return products.filter((d) => {
      if (onlyAvailable && (!d.available || d.stock <= 0)) return false;
      if (categoryFilter && d.category !== categoryFilter) return false;
      if (typeFilter && d.type !== typeFilter) return false;
      if (brandFilter && d.brand !== brandFilter) return false;

      if (q) {
        const hay = `${d.name} ${d.brand} ${d.type} ${d.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, onlyAvailable, categoryFilter, typeFilter, brandFilter]);

  function setQty(id: string, next: number, max: number) {
    const n = Math.max(1, Math.min(next, max));
    setQtyById((prev) => ({ ...prev, [id]: n }));
  }

  const hasFilters =
    query.trim() ||
    categoryFilter ||
    typeFilter ||
    brandFilter ||
    onlyAvailable !== true;

  return (<main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-emerald-800/80 hover:text-emerald-900 underline underline-offset-4"
            >
              ← Volver al inicio
            </Link>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900">
              Bebidas en Dublín
            </h1>

            <p className="mt-1 text-zinc-600">
              Catálogo por tipo y marca{" "}
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                Beta
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/unirme"
              className="rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-800 hover:bg-emerald-50 transition"
            >
              Unirme
            </Link>

            <button
              className={`rounded-2xl border px-3 py-2 text-sm transition ${
                hasFilters
                  ? "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  : "border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
              onClick={() => {
                setQuery("");
                setOnlyAvailable(true);
                setCategoryFilter(null);
                setTypeFilter(null);
                setBrandFilter(null);
              }}
              disabled={!hasFilters}
              title="Limpiar filtros"
            >
              Limpiar
            </button>

            <button
              className="rounded-2xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black transition"
              onClick={open}
              title="Abrir carrito"
            >
              🧺 Carrito <span className="opacity-90">({totalItems})</span>
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          {/* Filters */}
          <aside className="md:col-span-4">
            <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-zinc-900 mb-2">Buscar</p>

              <div className="relative">
                <input
                  className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Don Julio, 1800, cerveza..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query ? (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100"
                    onClick={() => setQuery("")}
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                ) : null}
              </div>

              <label className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
                Mostrar solo disponibles
              </label>

              {/* Category */}
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <p className="text-sm font-semibold text-zinc-900 mb-3">
                  Categoría
                </p>
                <div className="grid gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategoryFilter(categoryFilter === c ? null : c);
                        setTypeFilter(null);
                        setBrandFilter(null);
                      }}
                      className={`w-full rounded-2xl px-3 py-2 text-left text-sm border transition ${
                        categoryFilter === c
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <p className="text-sm font-semibold text-zinc-900 mb-3">Tipo</p>
                <div className="grid gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                      className={`w-full rounded-2xl px-3 py-2 text-left text-sm border transition ${
                        typeFilter === t
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <p className="text-sm font-semibold text-zinc-900 mb-3">Marca</p>
                <div className="grid gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() =>
                        setBrandFilter(brandFilter === b ? null : b)
                      }
                      className={`w-full rounded-2xl px-3 py-2 text-left text-sm border transition ${
                        brandFilter === b
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hint */}
              <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-xs text-emerald-900/80">
                Tip: agrega más productos desde Google Sheets y se actualiza solo
                (cache 60s).
              </div>
            </div>
          </aside>

          {/* Products */}
          <section className="md:col-span-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-zinc-600">
                {loading
                  ? "Cargando..."
                  : `Mostrando ${filtered.length} producto${
                      filtered.length === 1 ? "" : "s"
                    }`}
              </p>

              {hasFilters ? (
                <button
                  className="text-sm text-emerald-800/80 hover:text-emerald-900 underline underline-offset-4"
                  onClick={() => {
                    setQuery("");
                    setOnlyAvailable(true);
                    setCategoryFilter(null);
                    setTypeFilter(null);
                    setBrandFilter(null);
                  }}
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => {
                const max = Math.max(0, p.stock);
                const disabled = !p.available || max <= 0;
                const qty = qtyById[p.id] ?? 1;

                return (
                  <div
                    key={p.id}
                    className="group rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="p-4 pb-0">
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100">
                        {p.imageUrl ? (
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                            Sin imagen
                          </div>
                        )}

                        {/* Badge */}
                        <div className="absolute left-3 top-3 flex gap-2">
                          <span className="rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm">
                            {p.type}
                          </span>
                          {disabled ? (
                            <span className="rounded-full bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-800">
                              Agotado
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-800">
                              Disponible
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-zinc-500">Stock: {p.stock}</p>
                        <p className="text-sm font-bold text-zinc-900">
                          {eur(p.priceEUR)}
                        </p>
                      </div>

                      <h3 className="mt-2 font-semibold text-zinc-900">
                        {p.name}
                      </h3>
                      <p className="text-sm text-zinc-600">{p.brand}</p>

                      <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
                        {p.description}
                      </p>

                      {/* Qty + Add */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex items-center rounded-2xl border border-zinc-200 bg-white">
                          <button
                            className="px-3 py-2 text-sm hover:bg-zinc-50 disabled:opacity-40"
                            onClick={() => setQty(p.id, qty - 1, max || 1)}
                            disabled={disabled || qty <= 1}
                            aria-label="Disminuir"
                          >
                            −
                          </button>

                          <div className="min-w-[42px] text-center text-sm font-semibold text-zinc-800">
                            {qty}
                          </div>

                          <button
                            className="px-3 py-2 text-sm hover:bg-zinc-50 disabled:opacity-40"
                            onClick={() =>
                              setQty(p.id, qty + 1, max || qty + 1)
                            }
                            disabled={disabled || qty >= max}
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className={`flex-1 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                            disabled
                              ? "border border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed"
                              : "bg-emerald-800 text-white hover:bg-emerald-900 shadow-md shadow-sm"
                          }`}
                          disabled={disabled}
                          onClick={() => {
                            for (let i = 0; i < qty; i++) {
                              addItem({
                                id: p.id,
                                name: p.name,
                                brand: p.brand,
                                type: p.type,
                                priceEUR: p.priceEUR,
                                imageUrl: p.imageUrl,
                              });
                            }
                            open();
                          }}
                        >
                          🧺 Agregar
                        </button>
                      </div>

                      {disabled ? (
                        <p className="mt-2 text-xs text-zinc-500">
                          No disponible por ahora.
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {!loading && filtered.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 text-center">
                <p className="text-zinc-900 font-semibold">
                  No encontramos resultados
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Prueba con otra búsqueda o limpia filtros.
                </p>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
