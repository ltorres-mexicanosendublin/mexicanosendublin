"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";

const WHATSAPP_NUMBER = "353870393105"; // sin +, solo números

type PayOption = "full" | "deposit" | "transfer";
type DeliveryPlace = "atlas_spire" | "spire";

function eur(n: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export default function CartDrawer() {
  const {
    items,
    subtotal,
    totalItems,
    isOpen,
    close,
    increment,
    decrement,
    remove,
    clear,
  } = useCart();

  const [isPaying, setIsPaying] = useState(false);

  // opción de pago + entrega + fecha
  const [payOption, setPayOption] = useState<PayOption>("full");
  const [deliveryPlace, setDeliveryPlace] = useState<DeliveryPlace>("atlas_spire");
  const [deliveryDatetime, setDeliveryDatetime] = useState<string>("");

  const empty = items.length === 0;

  const totals = useMemo(() => {
    const total = subtotal;
    const deposit = round2(total * 0.1);
    const remaining = round2(total - deposit);
    return { total, deposit, remaining };
  }, [subtotal]);

  const waLink = useMemo(() => {
    const lines = items.map(
      (it) =>
        `• ${it.qty} x ${it.name} (${it.brand} / ${it.type}) = ${eur(it.qty * it.priceEUR)}`
    );

    const placeLabel = deliveryPlace === "atlas_spire" ? "Atlas (Spire)" : "Spire";

    const text =
      `Hola 👋 Quiero hacer este pedido:\n\n` +
      (lines.length ? lines.join("\n") : "— (carrito vacío)") +
      `\n\nSubtotal: ${eur(subtotal)}\n` +
      `Método de pago: ${
        payOption === "full"
          ? "Tarjeta (100%)"
          : payOption === "deposit"
          ? "Tarjeta 10% + transferencia"
          : "Transferencia"
      }\n` +
      `Entrega: ${placeLabel}\n` +
      `Fecha/Hora: ${deliveryDatetime ? deliveryDatetime : "(por definir)"}\n\n` +
      `Nombre: (tu nombre)\n` +
      `Notas: (opcional)\n\n` +
      `Gracias!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [items, subtotal, payOption, deliveryPlace, deliveryDatetime]);

  // Placeholder de ficha (luego será PDF real)
  function downloadTransferDetails() {
    const placeLabel = deliveryPlace === "atlas_spire" ? "Atlas (Spire)" : "Spire";
    const orderRef = `MED-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const content =
      `MEXICANOS EN DUBLIN - DATOS PARA TRANSFERENCIA\n\n` +
      `Referencia: ${orderRef}\n` +
      `Total: ${eur(totals.total)}\n` +
      `Si pagaste 10%: ${eur(totals.deposit)}\n` +
      `Resto a pagar: ${eur(totals.remaining)}\n\n` +
      `IMPORTANTE:\n` +
      `- Tienes 24 horas para realizar el pago, de lo contrario el pedido se cancela.\n` +
      `- Coloca la referencia en el concepto de la transferencia.\n\n` +
      `DATOS BANCARIOS (EJEMPLO):\n` +
      `Beneficiario: Mexicanos en Dublin\n` +
      `IBAN: IE00 XXXX XXXX XXXX XXXX XX\n` +
      `BIC: XXXXXXXX\n` +
      `Banco: (tu banco)\n\n` +
      `ENTREGA:\n` +
      `Lugar: ${placeLabel}\n` +
      `Fecha/Hora: ${deliveryDatetime || "(por definir)"}\n\n` +
      `Soporte WhatsApp: +353 87 039 3105\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transfer-${orderRef}.txt`; // luego será .pdf
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  // ✅ Stripe REAL: redirect con data.url
  async function payWithStripe(mode: "full" | "deposit") {
    if (!items.length || isPaying) return;

    if (!deliveryDatetime) {
      alert("Selecciona fecha y hora de entrega");
      return;
    }

    try {
      setIsPaying(true);

      const payload = {
        mode,
        items: items.map((p) => ({
          id: p.id,
          name: p.name,
          priceEUR: p.priceEUR,
          qty: p.qty,
        })),
        deliveryPlace,
        deliveryDatetime,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(data?.error ?? "No se pudo crear el link de pago");
        setIsPaying(false);
      }
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error al crear el pago");
      setIsPaying(false);
    }
  }

  // ✅ Acción principal única
  async function handlePay() {
    if (!items.length || isPaying) return;

    if (!deliveryDatetime) {
      alert("Selecciona una fecha y hora de entrega.");
      return;
    }

    // Transferencia: por ahora genera ficha (placeholder)
    if (payOption === "transfer") {
      downloadTransferDetails();
      alert("Listo ✅ Te generé la ficha de transferencia (placeholder).");
      return;
    }

    // Stripe 10% o 100%
    if (payOption === "deposit") {
      await payWithStripe("deposit");

      // Si quieres generar ficha del resto ANTES de ir a Stripe, descomenta:
      // downloadTransferDetails();
      return;
    }

    await payWithStripe("full");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      {/* panel */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* header (sticky) */}
        <div className="sticky top-0 z-10 border-b bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-gray-900">Carrito</p>
              <p className="text-sm text-gray-600">
                {totalItems} artículo{totalItems === 1 ? "" : "s"}
              </p>
            </div>

            <button
              className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
              onClick={close}
            >
              Cerrar
            </button>
          </div>

          {/* mini summary */}
          <div className="mt-3 flex items-center justify-between rounded-2xl border bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-base font-semibold text-gray-900">{eur(subtotal)}</p>
          </div>
        </div>

        {/* list (scroll) */}
        <div className="flex-1 overflow-y-auto p-4">
          {empty ? (
            <div className="rounded-3xl border bg-gray-50 p-6 text-center">
              <p className="text-lg font-semibold text-gray-900">Tu carrito está vacío</p>
              <p className="mt-2 text-sm text-gray-600">
                Agrega productos y vuelve aquí para pagar o pedir por WhatsApp.
              </p>

              <button
                onClick={close}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 rounded-3xl border p-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <Image src={it.imageUrl} alt={it.name} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">{it.name}</p>
                    <p className="mt-0.5 text-xs text-gray-600">
                      {it.brand} · {it.type}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{eur(it.priceEUR)}</p>
                      <button
                        className="text-xs underline text-gray-600 hover:text-gray-900"
                        onClick={() => remove(it.id)}
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        className="h-9 w-9 rounded-xl border text-lg hover:bg-gray-50"
                        onClick={() => decrement(it.id)}
                        aria-label="Disminuir"
                      >
                        –
                      </button>

                      <span className="min-w-10 text-center text-sm font-semibold text-gray-900">
                        {it.qty}
                      </span>

                      <button
                        className="h-9 w-9 rounded-xl border text-lg hover:bg-gray-50"
                        onClick={() => increment(it.id)}
                        aria-label="Aumentar"
                      >
                        +
                      </button>

                      <p className="ml-auto text-sm font-semibold text-gray-900">
                        {eur(it.qty * it.priceEUR)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* bloque de pago + entrega */}
          {!empty && (
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl border p-4">
                <p className="text-sm font-semibold text-gray-900">Método de pago</p>

                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={payOption === "full"}
                      onChange={() => setPayOption("full")}
                    />
                    Pagar 100% con tarjeta (Stripe)
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={payOption === "deposit"}
                      onChange={() => setPayOption("deposit")}
                    />
                    Pagar 10% con tarjeta y el resto por transferencia (24h)
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={payOption === "transfer"}
                      onChange={() => setPayOption("transfer")}
                    />
                    Pagar por transferencia (24h)
                  </label>
                </div>

                <div className="mt-3 rounded-2xl bg-gray-50 p-3 text-sm">
                  {payOption === "full" && (
                    <p>
                      Total a pagar hoy:{" "}
                      <span className="font-semibold">{eur(totals.total)}</span>
                    </p>
                  )}

                  {payOption === "deposit" && (
                    <div className="space-y-1">
                      <p>
                        Pagas hoy (10%):{" "}
                        <span className="font-semibold">{eur(totals.deposit)}</span>
                      </p>
                      <p>
                        Restante por transferencia:{" "}
                        <span className="font-semibold">{eur(totals.remaining)}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        *Tienes 24 horas para completar el pago restante o el pedido se cancela.
                      </p>
                    </div>
                  )}

                  {payOption === "transfer" && (
                    <div className="space-y-1">
                      <p>
                        Total por transferencia:{" "}
                        <span className="font-semibold">{eur(totals.total)}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        *Tienes 24 horas para pagar o el pedido se cancela automáticamente.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border p-4">
                <p className="text-sm font-semibold text-gray-900">Entrega</p>

                <label className="mt-3 block text-xs font-medium text-gray-600">
                  Punto de entrega
                </label>
                <select
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={deliveryPlace}
                  onChange={(e) => setDeliveryPlace(e.target.value as DeliveryPlace)}
                >
                  <option value="atlas_spire">Atlas (Spire)</option>
                  <option value="spire">Spire</option>
                </select>

                <label className="mt-3 block text-xs font-medium text-gray-600">
                  Fecha y hora
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 w-full rounded-2xl border px-3 py-2 text-sm"
                  value={deliveryDatetime}
                  onChange={(e) => setDeliveryDatetime(e.target.value)}
                />

                <p className="mt-2 text-xs text-gray-500">
                  *Si eliges transferencia (o 10%), tienes <b>24 horas</b> para realizar el pago o
                  el pedido se cancela.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* footer (sticky) */}
        <div className="sticky bottom-0 border-t bg-white p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              className="rounded-2xl border px-4 py-3 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
              onClick={clear}
              disabled={empty}
            >
              Vaciar
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 ${
                empty ? "pointer-events-none opacity-60" : ""
              }`}
            >
              Finalizar por WhatsApp
            </a>
          </div>

          <button
            onClick={handlePay}
            disabled={empty || isPaying}
            className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-base font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {isPaying
              ? "Redirigiendo a Stripe..."
              : payOption === "transfer"
              ? "Generar datos de transferencia"
              : payOption === "deposit"
              ? "Pagar 10% con Stripe"
              : "Pagar con Stripe"}
          </button>

          <p className="mt-2 text-xs text-gray-500">
            *Tarjeta: checkout seguro. Transferencia: se genera ficha (por ahora placeholder).
          </p>
        </div>
      </div>
    </div>
  );
}
