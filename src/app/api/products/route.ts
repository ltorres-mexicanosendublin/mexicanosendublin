import { NextResponse } from "next/server";
import { fetchProductsFromSheet } from "@/lib/sheets";

export async function GET() {
  try {
    const products = await fetchProductsFromSheet();
    return NextResponse.json({ ok: true, products });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Error fetching products" },
      { status: 500 }
    );
  }
}
