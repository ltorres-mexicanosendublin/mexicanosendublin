"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  brand?: string;
  type?: string;
  priceEUR: number;
  imageUrl?: string;
  qty: number;
};

type AddItemInput = Omit<CartItem, "qty">;

type CartCtx = {
  items: CartItem[];

  // acciones
  addItem: (p: AddItemInput) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  // totales que tu Drawer usa
  totalItems: number;
  subtotal: number;

  // drawer control
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (p: AddItemInput) => {
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

  // ✅ wrappers que tu CartDrawer espera
  const increment = (id: string) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    addItem({
      id: it.id,
      name: it.name,
      brand: it.brand,
      type: it.type,
      priceEUR: it.priceEUR,
      imageUrl: it.imageUrl,
    });
  };

  const decrement = (id: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const it = prev[idx];
      if (it.qty <= 1) return prev.filter((x) => x.id !== id);
      const copy = [...prev];
      copy[idx] = { ...it, qty: it.qty - 1 };
      return copy;
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((acc, x) => acc + x.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, x) => acc + x.qty * x.priceEUR, 0), [items]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const value: CartCtx = {
    items,
    addItem,
    increment,
    decrement,
    remove,
    clear,
    totalItems,
    subtotal,
    isOpen,
    open,
    close,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within <CartProvider>");
  return v;
}

// ✅ opcional: para evitar el mismatch de import default/named
export default CartProvider;
