import Link from "next/link";
import { guides, type GuideCategory } from "@/lib/guides";
import Filters from "./Filters";
export const metadata = {
  title: "Guías | Mexicanos en Dublín",
  description:
    "Guías prácticas para mexicanos en Dublín: llegada, transporte, IRP, PPS, renta, trabajo y más.",
};

function uniqCategories() {
  const set = new Set<string>();
  for (const g of guides) set.add(g.category);
  return ["Todas", ...Array.from(set)];
}

function includesNormalized(text: string, q: string) {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  return norm(text).includes(norm(q));
}

type PageProps = {
  searchParams?: Promise<{ q?: string; cat?: string }>;
};

export default async function GuidesPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").trim();
  const cat = (sp.cat ?? "Todas").trim();

  const categories = uniqCategories();

  const filtered = guides
    .filter((g) => (cat === "Todas" ? true : g.category === (cat as GuideCategory)))
    .filter((g) => {
      if (!q) return true;
      return (
        includesNormalized(g.title, q) ||
        includesNormalized(g.description, q) ||
        includesNormalized(g.category, q)
      );
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guías</h1>
          <p className="mt-2 text-gray-600">
            Contenido práctico para llegar a Dublín con claridad (y sin perder dinero).
          </p>
        </div>

        <Link href="/" className="text-sm underline text-gray-600">
          Volver al inicio
        </Link>
      </div>

      {/* Search + Filters */}
      {/* Search + Filters */}
<Filters q={q} cat={cat} categories={categories} />
      {/* Results header */}
      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-600">
          {filtered.length} guía{filtered.length === 1 ? "" : "s"} encontrada
          {filtered.length === 1 ? "" : "s"}
          {q ? ` para “${q}”` : ""}
          {cat !== "Todas" ? ` en ${cat}` : ""}.
        </p>

        <Link href="/guias" className="text-sm underline text-gray-600">
          Limpiar filtros
        </Link>
      </div>

      {/* Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
  {filtered.map((g) => {
    const href = g.href ?? `/guias/${g.slug}`;

    const cta = href.startsWith("/escuelas")
      ? "Ver escuelas"
      : "Leer guía";

    return (
      <Link
        key={g.slug}
        href={href}
        className="flex h-full w-full flex-col rounded-3xl border bg-white p-6 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="pill">{g.category}</span>
          <span className="text-xs text-gray-500">{g.minutes} min</span>
        </div>

        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          {g.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {g.description}
        </p>

        <p className="mt-auto pt-4 text-sm underline text-gray-700">
          {cta}
        </p>
      </Link>
    );
  })}
</div>
    </main>
  );
}
