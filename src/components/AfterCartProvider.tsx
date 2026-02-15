"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AfterItem = {
  id: string;
  name: string;
  priceEUR: number;
  imageUrl?: string;
  desc?: string;
  category?: string;
};

export type CartLine = AfterItem & { qty: number };

type DeliveryInfo = {
  deliveryPlace: string;
  deliveryTime: string;
  notes: string;
};

type AfterCartCtx = {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (p: AfterItem) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  delivery: DeliveryInfo;
  setDelivery: (patch: Partial<DeliveryInfo>) => void;
};

const Ctx = createContext<AfterCartCtx | null>(null);

const LS_KEY = "after_cart_v1";
const LS_DELIVERY_KEY = "after_delivery_v1";

export function AfterCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [delivery, setDeliveryState] = useState<DeliveryInfo>({
    deliveryPlace: "",
    deliveryTime: "",
    notes: "",
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
      const raw2 = localStorage.getItem(LS_DELIVERY_KEY);
      if (raw2) setDeliveryState(JSON.parse(raw2));
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_DELIVERY_KEY, JSON.stringify(delivery));
    } catch {}
  }, [delivery]);

  const add = (p: AfterItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const dec = (id: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const copy = [...prev];
      const nextQty = copy[idx].qty - 1;
      if (nextQty <= 0) return copy.filter((x) => x.id !== id);
      copy[idx] = { ...copy[idx], qty: nextQty };
      return copy;
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.priceEUR * it.qty, 0), [items]);

  const setDelivery = (patch: Partial<DeliveryInfo>) => {
    setDeliveryState((d) => ({ ...d, ...patch }));
  };

  const value: AfterCartCtx = {
    items,
    count,
    subtotal,
    add,
    dec,
    remove,
    clear,
    delivery,
    setDelivery,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAfterCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAfterCart must be used within <AfterCartProvider>");
  return ctx;
}
