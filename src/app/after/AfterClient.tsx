"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AfterCartProvider, useAfterCart, AfterItem } from "@/components/AfterCartProvider";
import AfterCartDrawer from "@/components/AfterCartDrawer";

const WHATSAPP_TO = "353870393105"; // tu número sin +

const MENU: AfterItem[] = [
  {
    id: "tacos_pastor",
    name: "Tacos al Pastor (4)",
    priceEUR: 10,
    desc: "Orden de 4 tacos con trompo estilo CDMX + salsa.",
    category: "Tacos",
    imageUrl: "/after/tacos-pastor.jpg",
  },
  {
    id: "burrito_after",
    name: "Burrito After",
    priceEUR: 12,
    desc: "Carne, arroz, frijoles, queso y salsa especial.",
    category: "Burritos",
    imageUrl: "/after/burrito.jpg",
  },
  {
    id: "trompitos",
    name: "Trompitos",
    priceEUR: 8,
    desc: "Mini tacos para compartir, perfectos para el after.",
    category: "Tacos",
    imageUrl: "/after/trompitos.jpg",
  },
  {
    id: "refresco",
    name: "Refresco",
    priceEUR: 2,
    desc: "Coca / Fanta / Sprite (según disponibilidad).",
    category: "Bebidas",
    imageUrl: "/after/refresco.jpg",
  },
  {
    id: "huevos_jitomate",
    name: "Huevos con jitomate",
    priceEUR: 8,
    desc: "Huevos estilo mexicano + frijoles y arroz.",
    category: "Desayuno",
    imageUrl: "/after/huevos-jitomate.jpg",
  },
  {
    id: "huevos_jamon",
    name: "Huevos con jamón",
    priceEUR: 8,
    desc: "Clásico rápido + frijoles y arroz.",
    category: "Desayuno",
    imageUrl: "/after/huevos-jamon.jpg",
  },
  {
    id: "arroz",
    name: "Arroz (extra)",
    priceEUR: 2,
    desc: "Porción extra.",
    category: "Extras",
    imageUrl: "/after/arroz.jpg",
  },
  {
    id: "frijoles",
    name: "Frijoles (extra)",
    priceEUR: 2,
    desc: "Porción extra.",
    category: "Extras",
    imageUrl: "/after/frijoles.jpg",
  },
];

function eur(n: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);
}

function MenuGrid() {
  const { add, count } = useAfterCart();
  const [open, setOpen] = useState(false);

  const grouped = useMemo(() => {
    const m = new Map<string, AfterItem[]>();
    for (const p of MENU) {
      const k = p.category ?? "Otros";
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(p);
    }
    return Array.from(m.entries());
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            After (10pm–3am) · Comida mexicana en Dublín (tacos y burritos)
          </p>

          {/* H1 SEO */}
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Comida mexicana en Dublín por la noche: After Mexicano
            <span className="block text-white/80 text-lg md:text-xl font-medium mt-2">
              Tacos al pastor, burritos, bebidas y extras · Pedido por WhatsApp
            </span>
          </h1>

          {/* Texto SEO */}
          <p className="mt-3 max-w-2xl text-white/70">
            ¿Buscas <strong>tacos en Dublín</strong> o <strong>comida mexicana late night</strong>?
            Aquí puedes armar tu pedido (tacos, burritos, trompitos y refrescos),
            elegir punto de entrega (Camden, Temple Bar, Smithfield, centro) y enviarlo por WhatsApp.
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/" className="text-white/80 underline hover:text-white transition">
              ← Volver al inicio
            </Link>
            <span className="text-white/50">Entrega por puntos (centro / bares)</span>
            <span className="text-white/50">Horario: 10pm–3am</span>
          </div>
        </div>

        {/* Botón carrito con badge */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            inline-flex items-center justify-center gap-3
            rounded-2xl border border-white/10 bg-white/10 px-5 py-3
            font-semibold text-white hover:bg-white/15
            transform transition-all duration-150 active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60
          "
        >
          <span>Ver carrito</span>
          <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-sky-400 px-2 py-0.5 text-xs font-extrabold text-slate-950">
            {count}
          </span>
        </button>
      </div>

      {/* Bloque extra SEO “textual” */}
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-bold text-white">Menú de comida mexicana en Dublín</h2>
        <p className="mt-2 text-sm text-white/70">
          Este menú está pensado para el after: <strong>tacos al pastor</strong>, <strong>burritos</strong>,
          trompitos, refrescos y opciones de desayuno nocturno. Selecciona productos y manda tu pedido por WhatsApp.
        </p>
      </section>

      {/* Menu */}
      <div className="mt-10 space-y-10">
        {grouped.map(([cat, items]) => (
          <section key={cat}>
            <h2 className="text-xl font-bold text-white">{cat}</h2>

            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <article
                  key={p.id}
                  className="
                    rounded-3xl border border-white/10 bg-white/5 p-5
                    hover:bg-white/10 transition transform hover:-translate-y-0.5
                  "
                >
                  {/* Imagen */}
                  <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-black/20">
                    <Image
                      src={p.imageUrl || "/after/placeholder.jpg"}
                      alt={`${p.name} - comida mexicana en Dublín`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={cat === "Tacos"}
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                      {p.desc && <p className="mt-1 text-sm text-white/70">{p.desc}</p>}
                    </div>
                    <p className="font-bold text-white">{eur(p.priceEUR)}</p>
                  </div>

                  {/* Botón agregar (feedback) */}
                  <button
                    type="button"
                    id={`add-${p.id}`}
                    onClick={() => {
                      add(p);
                      const el = document.getElementById(`add-${p.id}`);
                      if (el) {
                        el.textContent = "Agregado ✓";
                        el.classList.remove("bg-sky-500");
                        el.classList.add("bg-white");
                        window.setTimeout(() => {
                          el.textContent = "Agregar al carrito";
                          el.classList.remove("bg-white");
                          el.classList.add("bg-sky-500");
                        }, 600);
                      }
                    }}
                    className={`
                      mt-4 w-full rounded-2xl
                      bg-sky-500 py-3 font-semibold text-slate-950
                      hover:bg-sky-400
                      transform transition-all duration-150
                      active:scale-[0.98] active:translate-y-[1px]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60
                      shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20
                    `}
                  >
                    Agregar al carrito
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ (SEO puro, Google ama esto) */}
      <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-bold text-white">Preguntas frecuentes</h2>

        <div className="mt-4 space-y-4 text-sm text-white/70">
          <div>
            <h3 className="font-semibold text-white">¿Dónde entregan la comida mexicana en Dublín?</h3>
            <p>
              Entregamos por puntos en el centro: Camden Street, Temple Bar, Smithfield y D’Olier Street.
              También puedes elegir “Otra” y dejar notas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">¿Cuál es el horario del After Mexicano?</h3>
            <p>Normalmente de 10:00pm a 3:00am (confirmamos disponibilidad por WhatsApp).</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">¿Cómo hago mi pedido?</h3>
            <p>
              Agrega productos al carrito, elige punto y hora aproximada de entrega, y presiona “Pedir por WhatsApp”.
            </p>
          </div>
        </div>
      </section>

      <AfterCartDrawer
        open={open}
        onClose={() => setOpen(false)}
        whatsappTo={WHATSAPP_TO}
        brandName="After Mexicano en Dublín"
      />
    </>
  );
}

export default function AfterClient() {
  return (
    <AfterCartProvider>
      {/* Fondo azul nocturno (bonito) */}
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-10">
            <MenuGrid />

            <p className="mt-10 text-center text-xs text-white/50">
              *Confirmación final por WhatsApp (disponibilidad, hora y punto).
            </p>
          </div>
        </div>
      </main>
    </AfterCartProvider>
  );
}
