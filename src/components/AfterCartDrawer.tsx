"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAfterCart } from "./AfterCartProvider";

function eur(n: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);
}

const DELIVERY_PLACES = [
  "D’Olier Street (centro)",
  "Camden Street",
  "Temple Bar",
  "Smithfield",
  "Otra (especificar en notas)",
];

export default function AfterCartDrawer({
  open,
  onClose,
  whatsappTo,
  brandName = "After Mexicano en Dublín",
}: {
  open: boolean;
  onClose: () => void;
  whatsappTo: string; // sin +
  brandName?: string;
}) {
  const { items, count, subtotal, add, dec, remove, clear, delivery, setDelivery } = useAfterCart();

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // UX: cerrar con ESC + focus al abrir (se siente “app pro”)
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const canSend = useMemo(() => {
    if (!items.length) return false;
    if (!delivery.deliveryPlace) return false;
    if (!delivery.deliveryTime) return false;
    return true;
  }, [items.length, delivery.deliveryPlace, delivery.deliveryTime]);

  const message = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Hola 👋`);
    lines.push(`Quiero hacer un pedido en *${brandName}*`);
    lines.push(``);
    lines.push(`📍 *Entrega:* ${delivery.deliveryPlace || "—"}`);
    lines.push(`🕒 *Hora:* ${delivery.deliveryTime || "—"}`);
    lines.push(``);
    lines.push(`🧾 *Pedido:*`);
    items.forEach((it) => {
      lines.push(`• ${it.qty}x *${it.name}* — ${eur(it.priceEUR * it.qty)}`);
    });
    lines.push(``);
    lines.push(`💰 *Total:* ${eur(subtotal)}`);
    if (delivery.notes?.trim()) {
      lines.push(``);
      lines.push(`📝 *Notas:* ${delivery.notes.trim()}`);
    }
    lines.push(``);
    lines.push(`Gracias 🙏`);
    return lines.join("\n");
  }, [brandName, delivery.deliveryPlace, delivery.deliveryTime, delivery.notes, items, subtotal]);

  const sendWhatsApp = () => {
    const url = `https://wa.me/${whatsappTo}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  if (!open) return null;

  const BtnBase =
    "inline-flex items-center justify-center select-none transition active:scale-[0.98] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito After Mexicano">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-slate-950/95 text-white shadow-[0_0_50px_rgba(0,0,0,0.55)]">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-slate-300">Carrito</p>

              <p className="mt-1 text-lg font-semibold leading-tight">
                {count} item(s) <span className="text-slate-500">·</span>{" "}
                <span className="text-slate-100">{eur(subtotal)}</span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Elige punto + hora y lo mandamos por WhatsApp.
              </p>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              className={`${BtnBase} rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10`}
            >
              Cerrar ✕
            </button>
          </div>

          {/* Mini progreso */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
            <div className={`rounded-xl border px-2 py-2 ${items.length ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-white/10 bg-white/5 text-slate-300"}`}>
              1) Carrito
            </div>
            <div className={`rounded-xl border px-2 py-2 ${(delivery.deliveryPlace && delivery.deliveryTime) ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-white/10 bg-white/5 text-slate-300"}`}>
              2) Entrega
            </div>
            <div className={`rounded-xl border px-2 py-2 ${canSend ? "border-sky-500/30 bg-sky-500/10 text-sky-200" : "border-white/10 bg-white/5 text-slate-300"}`}>
              3) Enviar
            </div>
          </div>
        </div>

        {/* Body (scroll) */}
        <div className="h-[calc(100%-210px)] overflow-y-auto p-4 space-y-4 overscroll-contain">
          {/* Delivery */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Entrega</p>
              <span className="text-xs text-slate-400">10pm–3am</span>
            </div>

            <label className="mt-3 block text-xs text-slate-300">Punto</label>
            <select
              value={delivery.deliveryPlace}
              onChange={(e) => setDelivery({ deliveryPlace: e.target.value })}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-white outline-none focus:ring-2 focus:ring-sky-400/40"
            >
              <option value="">Selecciona un punto</option>
              {DELIVERY_PLACES.map((p) => (
                <option key={p} value={p} className="text-black">
                  {p}
                </option>
              ))}
            </select>

            <label className="mt-3 block text-xs text-slate-300">Hora aproximada</label>
            <input
              value={delivery.deliveryTime}
              onChange={(e) => setDelivery({ deliveryTime: e.target.value })}
              placeholder="Ej: 11:30pm"
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-400/40"
            />

            <label className="mt-3 block text-xs text-slate-300">Notas (opcional)</label>
            <textarea
              value={delivery.notes}
              onChange={(e) => setDelivery({ notes: e.target.value })}
              placeholder="Ej: sin cebolla / en Camden / pagaré en efectivo"
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 min-h-[90px] text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-400/40"
            />

            <p className="mt-3 text-[11px] text-slate-400">
              *Confirmamos disponibilidad y punto exacto por WhatsApp.
            </p>
          </section>

          {/* Items */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Tu pedido</p>

              <button
                onClick={clear}
                className={`${BtnBase} text-xs underline text-slate-300 hover:text-white`}
                disabled={!items.length}
              >
                Vaciar
              </button>
            </div>

            {!items.length ? (
              <p className="mt-3 text-sm text-slate-300">Tu carrito está vacío.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{it.name}</p>
                      <p className="text-xs text-slate-300">
                        {eur(it.priceEUR)} c/u ·{" "}
                        <span className="text-slate-100 font-semibold">{eur(it.priceEUR * it.qty)}</span>
                      </p>

                      <button
                        onClick={() => remove(it.id)}
                        className={`${BtnBase} mt-1 text-xs underline text-slate-400 hover:text-white`}
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(it.id)}
                        className={`${BtnBase} h-10 w-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10`}
                        aria-label={`Quitar 1 de ${it.name}`}
                      >
                        −
                      </button>

                      <span className="w-7 text-center font-semibold">{it.qty}</span>

                      <button
                        onClick={() => add(it)}
                        className={`${BtnBase} h-10 w-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10`}
                        aria-label={`Agregar 1 de ${it.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-950/95 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-300">Total</p>
            <p className="text-lg font-bold">{eur(subtotal)}</p>
          </div>

          <button
            onClick={sendWhatsApp}
            disabled={!canSend}
            className={`${BtnBase} mt-3 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 py-3 font-semibold text-slate-950 hover:opacity-95`}
          >
            Pedir por WhatsApp
          </button>

          {!canSend && (
            <p className="mt-2 text-xs text-slate-400">
              Selecciona punto + hora para poder enviar.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
