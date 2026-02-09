import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Apps esenciales para llegar a Dublín | Mexicanos en Dublín",
  description:
    "Lista de apps por categoría (transporte, supermercados, bancos, telefonía, vivienda, gym) y cuáles requieren cambiar región.",
};

type Badge = "Requiere región" | "Recomendado" | "Opcional";

type AppItem = {
  name: string;
  slug: string; // para ruta del logo
  why: string;
  badges?: Badge[];
  links?: {
    appStore?: string;
    playStore?: string;
    web?: string;
  };
};

type AppCategory = {
  title: string;
  desc: string;
  icon: string; // emoji o texto corto
  items: AppItem[];
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const badgeStyle: Record<Badge, string> = {
  "Requiere región": "border-amber-200 bg-amber-50 text-amber-900",
  "Recomendado": "border-emerald-200 bg-emerald-50 text-emerald-900",
  "Opcional": "border-gray-200 bg-gray-50 text-gray-700",
};

function isPlaceholder(url?: string) {
  if (!url) return true;
  return url.includes("PON_AQUI");
}

function LinkBtn({ href, label }: { href?: string; label: string }) {
  if (!href || isPlaceholder(href)) {
    return (
      <span className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-gray-400">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
    >
      {label} →
    </a>
  );
}

function AppLogo({ slug, name }: { slug: string; name: string }) {
  // Ruta estándar: /public/apps/<slug>/logo.webp
  // Si no existe, Next mostrará error en consola en dev.
  // Tip: si te falta algún logo, pon un placeholder en public/apps/_placeholder/logo.webp
  const src = `/apps/${slug}/logo.webp`;

  return (
    <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border bg-white">
      <Image
        src={src}
        alt={`${name} logo`}
        width={48}
        height={48}
        className="h-10 w-10 object-contain"
      />
    </div>
  );
}

const categories: AppCategory[] = [
  {
    title: "Transporte",
    icon: "🚌",
    desc: "Para moverte en Dublín: buses en tiempo real, rutas y recargas.",
    items: [
      {
        name: "TFI Live",
        slug: "tfi-live",
        why: "Buses en tiempo real, retrasos y tiempos reales. Te salva cuando el bus “dice que viene” pero no llega.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id1581820088",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "PON_AQUI_LINK_WEB",
        },
      },
      {
        name: "Leap Top-Up",
        slug: "leap-topup",
        why: "Recarga tu Leap Card desde el celular y evita buscar máquinas o tiendas.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id1535791064",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "PON_AQUI_LINK_WEB",
        },
      },
      {
        name: "Uber",
        slug: "uber",
        why: "Útil en emergencias o madrugada. Funciona bien para moverte cuando el transporte está limitado.",
        badges: ["Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id368677368",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.uber.com",
        },
      },
    ],
  },
  {
    title: "Supermercados y ahorro",
    icon: "🛒",
    desc: "Cupones y descuentos para no gastar de más.",
    items: [
      {
        name: "Tesco",
        slug: "tesco",
        why: "Ubica tiendas y revisa promos. Ideal para tu primer súper al llegar.",
        badges: ["Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id648859363",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.tesco.ie",
        },
      },
      {
        name: "Lidl Plus",
        slug: "lidl-plus",
        why: "Cupones, ofertas y promos. A veces no aparece si tu región no es Irlanda.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id1238611143",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.lidl.ie",
        },
      },
      {
        name: "ALDI",
        slug: "aldi",
        why: "Ofertas semanales y localización de tiendas. Buenísimo para ahorrar.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id429399283",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.aldi.ie",
        },
      },
    ],
  },
  {
    title: "Telefonía",
    icon: "📱",
    desc: "Para controlar tu SIM, datos y recargas.",
    items: [
      {
        name: "My3 (Three)",
        slug: "my3",
        why: "Recargas, control de datos, plan y promos si usas Three.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id1477339641",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.three.ie",
        },
      },
      {
        name: "Vodafone",
        slug: "vodafone",
        why: "Administra tu línea, recargas y consumo si usas Vodafone.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/ie/app/my-vodafone-ireland/id450785639",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.vodafone.ie",
        },
      },
    ],
  },
  {
    title: "Bancos",
    icon: "🏦",
    desc: "Para pagar, transferir y sobrevivir los primeros meses.",
    items: [
      {
        name: "Revolut",
        slug: "revolut",
        why: "Pagos diarios, transferencias y tarjeta. Para muchos es el banco del día a día.",
        badges: ["Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id932493382",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.revolut.com",
        },
      },
      {
        name: "AIB",
        slug: "aib",
        why: "Banco irlandés tradicional. Útil si quieres cuenta local completa.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/ie/app/aib-mobile/id468042881",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://aib.ie",
        },
      },
    ],
  },
  {
    title: "Vivienda y compras usadas",
    icon: "🏠",
    desc: "Para buscar renta y amueblarte barato sin caer en estafas.",
    items: [
      {
        name: "Daft.ie",
        slug: "daft",
        why: "La app más usada para buscar cuarto/depa. Si no la tienes, pierdes oportunidades.",
        badges: ["Requiere región", "Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id346547065",
          playStore: "https://play.google.com/store/apps/details?id=com.daft.ie&pcampaignid=web_share",
          web: "https://www.daft.ie",
        },
      },
      {
        name: "Adverts.ie",
        slug: "adverts",
        why: "Compra/venta de cosas usadas (bici, escritorio, cama, etc.). Te ayuda a montar tu cuarto barato.",
        badges: ["Recomendado"],
        links: {
          appStore: "https://apps.apple.com/app/id433407256",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.adverts.ie",
        },
      },
    ],
  },
  {
    title: "Gimnasios / Bienestar",
    icon: "🏋️",
    desc: "Para registrarte, pagar membresía y ver clases.",
    items: [
      {
        name: "Flyefit",
        slug: "flyefit",
        why: "Registro, pagos y acceso por QR (depende la sede).",
        badges: ["Requiere región", "Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id6444167205",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.flyefit.ie",
        },
      },
      {
        name: "Swan Leisure",
        slug: "swan-leisure",
        why: "Horarios, clases y membresías (gym/piscina). Buena opción local.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id6471071369",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "PON_AQUI_LINK_WEB",
        },
      },
    ],
  },
  {
    title: "Delivery",
    icon: "🍔",
    desc: "Cuando llegas sin cocina o estás en acomodación temporal.",
    items: [
      {
        name: "Deliveroo",
        slug: "deliveroo",
        why: "Delivery fuerte en Irlanda; a veces mejores promos o restaurantes que otras apps.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id1001501844",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://deliveroo.ie",
        },
      },
      {
        name: "Uber Eats",
        slug: "uber-eats",
        why: "Otra opción de comida a domicilio. Útil para tus primeros días.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/ie/app/uber-eats-food-groceries/id1058959277",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.ubereats.com",
        },
      },
    ],
  },
  {
    title: "Viajes (tu aerolínea)",
    icon: "✈️",
    desc: "Check-in, pase de abordar y notificaciones de retrasos/puerta.",
    items: [
      {
        name: "KLM",
        slug: "klm",
        why: "Check-in, cambios, puerta y retrasos. Te evita estrés en el aeropuerto.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id391732065",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://www.klm.com",
        },
      },
      {
        name: "Aeroméxico",
        slug: "aeromexico",
        why: "Check-in, pase de abordar y gestión de vuelo.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id6453332631",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://aeromexico.com",
        },
      },
      {
        name: "Iberia",
        slug: "iberia",
        why: "Check-in, pase de abordar y gestión de vuelo.",
        badges: ["Opcional"],
        links: {
          appStore: "https://apps.apple.com/app/id434825954",
          playStore: "PON_AQUI_LINK_PLAY_STORE",
          web: "https://aeromexico.com",
        },
      },
    ],
  },
];

export default function AppsEsencialesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Top nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/guias" className="text-sm underline text-gray-600">
          ← Volver a guías
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="underline text-gray-600">
            Home
          </Link>
          <Link href="/unirme" className="underline text-gray-600">
            Unirme
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="mt-6 overflow-hidden rounded-[28px] border bg-white">
        <div className="relative p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                📲 Apps esenciales
              </span>
              <span className="text-xs text-gray-500">Checklist para llegar a Dublín</span>
              <span className="text-xs text-gray-500">Actualizado: 2026</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Apps que necesitas en tu teléfono (Irlanda 🇮🇪)
            </h1>

            <p className="mt-3 max-w-3xl text-gray-600">
              Varias apps **no aparecen** si tu cuenta sigue en región México. Aquí las tienes por categoría,
              con explicación rápida y links.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className={cx("rounded-full border px-3 py-1 font-semibold", badgeStyle["Requiere región"])}>
                Requiere región
              </span>
              <span className={cx("rounded-full border px-3 py-1 font-semibold", badgeStyle["Recomendado"])}>
                Recomendado
              </span>
              <span className={cx("rounded-full border px-3 py-1 font-semibold", badgeStyle["Opcional"])}>
                Opcional
              </span>
            </div>
          </div>
        </div>

        <div className="border-t bg-white p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">Si no te aparecen apps:</p>
              <p className="mt-1">
                Tu Apple ID / Google Play sigue en región México. Cambia región a Irlanda o crea una cuenta “Irlanda”
                solo para descargar apps.
              </p>
            </div>

            <div className="rounded-2xl border bg-gray-50 p-4 text-sm text-gray-800">
              <p className="font-semibold">Top 5 (día 1):</p>
              <p className="mt-1">
                Revolut + TFI Live + Leap Top-Up + Daft + Tesco/Clubcard.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="mt-8 space-y-8">
        {categories.map((cat) => (
          <div key={cat.title} className="rounded-[28px] border bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {cat.icon} {cat.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{cat.desc}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {cat.items.map((a) => (
                <div key={a.name} className="rounded-[24px] border bg-white p-5 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AppLogo slug={a.slug} name={a.name} />
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{a.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(a.badges ?? []).map((b) => (
                            <span
                              key={b}
                              className={cx("rounded-full border px-3 py-1 text-xs font-semibold", badgeStyle[b])}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700">{a.why}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <LinkBtn href={a.links?.appStore} label="App Store" />
                    <LinkBtn href={a.links?.playStore} label="Google Play" />
                    <LinkBtn href={a.links?.web} label="Web" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-[28px] border bg-gray-50 p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ¿Quieres que te armemos tu checklist exacto según tu caso?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Depende si vienes a estudiar, trabajar o llegas sin alojamiento. En la comunidad te decimos qué sí o sí necesitas.
            </p>
          </div>

          <Link
            href="/unirme"
            className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Unirme →
          </Link>
        </div>
      </section>
    </main>
  );
}
