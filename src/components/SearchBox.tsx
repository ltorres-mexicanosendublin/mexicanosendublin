"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/guias?q=${encodeURIComponent(query)}` : "/guias");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Busca: IRP, PPS, renta, bancos, trabajo..."
        className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2"
      />
      <button
        type="submit"
        className="rounded-2xl bg-white px-5 py-3 font-medium text-white hover:opacity-90"
      >
        Buscar
      </button>
    </form>
  );
}
