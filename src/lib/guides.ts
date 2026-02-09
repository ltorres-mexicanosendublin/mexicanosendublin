export type GuideCategory =
  | "Llegada"
  | "Transporte"
  | "Trámites"
  | "Salud"
  | "Vivienda"
  | "Trabajo"
  | "Dinero"
  | "Apps"
  | "Escuelas"
  | "Comida"
  | "Bebida"
  | "Belleza";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  minutes: number;
  updatedAt: string;
  href?: string; // 👈 ruta explícita si no es /guias/[slug]
};

export const guides: Guide[] = [
  {
    slug: "escuelas-para-venirte-a-dublin",
    title: "Escuelas para estudiar en Dublín",
    description: "Escuelas que recomendamos para venir a estudiar a Dublín.",
    category: "Escuelas",
    minutes: 9,
    updatedAt: "2026-01-29",
    href: "/escuelas", // 👈 menú general de escuelas
  },

  {
    slug: "antes-de-venirte-a-dublin",
    title: "Antes de venirte a Dublín: checklist esencial",
    description:
      "Todo lo que debes hacer desde México antes de volar: apps, bancos, Apple ID, dinero y documentos.",
    category: "Llegada",
    minutes: 9,
    updatedAt: "2026-01-29",
    href: "/guias/checklist-antes-de-venirte-a-dublin", // 👈 página independiente
  },

  {
    slug: "primeros-pasos-en-dublin",
    title: "Primeros pasos en Dublín (día 1 a día 7)",
    description:
      "Transporte, SIM, comida barata y checklist para no perder dinero los primeros días.",
    category: "Llegada",
    minutes: 8,
    updatedAt: "2026-01-29",
  },

  {
    slug: "irp-guia-basica",
    title: "IRP en Irlanda: guía básica (Stamp 2)",
    description:
      "Qué es el IRP, documentos, costos y cómo prepararte para tu registro sin errores.",
    category: "Trámites",
    minutes: 10,
    updatedAt: "2026-01-29",
    href: "/guias/irp-guia-basica", // 👈 IRP separado
  },

  {
    slug: "pps-number-explicado",
    title: "PPS Number explicado: qué es y cómo prepararte",
    description:
      "Qué necesitas, cuándo aplica y errores comunes para no perder semanas.",
    category: "Trámites",
    minutes: 9,
    updatedAt: "2026-01-29",
    href: "/guias/pps-number-explicado", // 👈 PPS separado
  },

  {
    slug: "rentar-sin-estafas",
    title: "Rentar en Dublín sin estafas: checklist real",
    description:
      "Señales rojas, qué preguntar y cómo validar antes de pagar renta.",
    category: "Vivienda",
    minutes: 12,
    updatedAt: "2026-01-29",
  },

  {
    slug: "apps-esenciales",
    title: "Apps esenciales antes de llegar",
    description:
      "Apple ID, Wise, Revolut, TFI, Dublin Bus y qué configurar desde México.",
    category: "Apps",
    minutes: 6,
    updatedAt: "2026-01-29",
  },

  {
    slug: "leap-card-y-transporte",
    title: "Leap Card y transporte en Dublín",
    description:
      "Bus, Luas y DART sin pagar de más. Tips reales del día a día.",
    category: "Transporte",
    minutes: 7,
    updatedAt: "2026-01-29",
  },
  {
    slug: "medicos-latinos-dublin",
    title: "Médicos latinos en Dublín",
    description: "Opciones de médicos latinos recomendados por la comunidad.",
    category: "Salud",
    minutes: 6,
    updatedAt: "2026-01-29",
  },

  {
    slug: "restaurantes-mexicanos-dublin",
    title: "Restaurantes mexicanos en Dublín",
    description:
      "Lugares recomendados por mexicanos para sentirte más cerca de casa.",
    category: "Comida",
    minutes: 9,
    updatedAt: "2026-01-29",
  },

  {
    slug: "bares-en-dublin",
    title: "Bares y pubs recomendados en Dublín",
    description:
      "Pubs donde vivir la experiencia dublinesa según la comunidad.",
    category: "Bebida",
    minutes: 10,
    updatedAt: "2026-01-29",
  },

  {
    slug: "belleza-en-dublin",
    title: "Salones de belleza recomendados en Dublín",
    description:
      "Salones recomendados por mexicanos que viven en Dublín.",
    category: "Belleza",
    minutes: 10,
    updatedAt: "2026-01-29",
  },
];
