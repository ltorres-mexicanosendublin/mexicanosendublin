"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/guias", label: "Guías" },
  { href: "/renta-verificada", label: "Renta verificada" },
  { href: "/asesoria", label: "Asesoría" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/productos", label: "Productos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Cierra el menú si cambias de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container-wide flex items-center justify-between gap-3 py-3">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border">
            🇲🇽
          </span>
          <span>MexicanosEnDublin</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {NAV_LINKS.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? "font-semibold text-black" : "hover:text-black"}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <Link
            href="/unirme"
            className="hidden md:inline-flex rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Unirme
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border hover:bg-gray-50"
          >
            {/* Icon */}
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-wide py-3">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => {
                const active = pathname?.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={
                      active
                        ? "rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-black"
                        : "rounded-2xl px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                    }
                  >
                    {l.label}
                  </Link>
                );
              })}

              <Link
                href="/unirme"
                className="mt-2 rounded-2xl bg-black px-4 py-3 text-center text-sm font-medium text-white"
              >
                Unirme
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
