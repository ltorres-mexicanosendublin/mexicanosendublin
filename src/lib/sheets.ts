export type SheetProduct = {
  id: string;
  name: string;
  category: string;
  type: string;
  brand: string;
  priceEUR: number;
  description: string;
  imageUrl: string;
  available: boolean;
  stock: number;
};

function toBool(v: unknown) {
  const s = String(v ?? "").toLowerCase().trim();
  return s === "true" || s === "1" || s === "yes" || s === "si";
}

function toNum(v: unknown, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/** CSV parser simple (soporta comas y comillas) */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cur);
      cur = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
      continue;
    }

    cur += ch;
  }

  row.push(cur);
  if (row.some((c) => c.trim() !== "")) rows.push(row);

  return rows;
}

export async function fetchProductsFromSheet(): Promise<SheetProduct[]> {
  const csvUrl = process.env.GOOGLE_SHEET_CSV_URL!;
  if (!csvUrl) throw new Error("Missing GOOGLE_SHEET_CSV_URL in .env.local");

  const res = await fetch(csvUrl, { next: { revalidate: 60 } });
  const csv = await res.text();

  const rows = parseCsv(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());
  const idx = (name: string) => headers.indexOf(name);

  // Validación de headers
  const required = [
    "id",
    "name",
    "category",
    "type",
    "brand",
    "priceEUR",
    "description",
    "imageUrl",
    "available",
    "stock",
  ];

  const missing = required.filter((h) => idx(h) === -1);
  if (missing.length) {
    throw new Error(`Missing columns in sheet: ${missing.join(", ")}`);
  }

  const products: SheetProduct[] = rows.slice(1).map((r) => ({
    id: String(r[idx("id")] ?? "").trim(),
    name: String(r[idx("name")] ?? "").trim(),
    category: String(r[idx("category")] ?? "").trim(),
    type: String(r[idx("type")] ?? "").trim(),
    brand: String(r[idx("brand")] ?? "").trim(),
    priceEUR: toNum(r[idx("priceEUR")], 0),
    description: String(r[idx("description")] ?? "").trim(),
    imageUrl: String(r[idx("imageUrl")] ?? "").trim(),
    available: toBool(r[idx("available")]),
    stock: toNum(r[idx("stock")], 0),
  }));

  return products.filter((p) => p.id && p.name);
}
