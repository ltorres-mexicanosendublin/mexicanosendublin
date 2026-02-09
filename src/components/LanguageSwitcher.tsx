"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return (LOCALES.includes(seg as Locale) ? (seg as Locale) : "es");
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = getLocaleFromPath(pathname);

  function switchTo(nextLocale: Locale) {
    // Quita el locale actual del path y lo reemplaza por el nuevo
    const parts = pathname.split("/");
    // parts[0] = ""  (porque empieza con /)
    // parts[1] = locale
    if (LOCALES.includes(parts[1] as Locale)) {
      parts[1] = nextLocale;
    } else {
      // si por alguna razón estás en ruta sin locale, lo inserta
      parts.splice(1, 0, nextLocale);
    }

    const qs = searchParams.toString();
    const nextUrl = parts.join("/") + (qs ? `?${qs}` : "");

    router.push(nextUrl);
    router.refresh(); // fuerza refresh (ayuda con Turbopack)
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={() => switchTo("es")}
        style={{
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid #ccc",
          background: currentLocale === "es" ? "#eee" : "white"
        }}
      >
        🇪🇸 ES
      </button>

      <button
        onClick={() => switchTo("en")}
        style={{
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid #ccc",
          background: currentLocale === "en" ? "#eee" : "white"
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
