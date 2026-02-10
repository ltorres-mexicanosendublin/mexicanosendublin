import { NextResponse } from "next/server";

export const runtime = "nodejs";

function splitCSVLine(line: string) {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.replace(/^"|"$/g, ""));
}

function parseCSV(csv: string) {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = splitCSVLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const cells = splitCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = (cells[i] ?? "").trim()));
    return obj;
  });
}

const get = (r: Record<string, string>, keys: string[]) => {
  for (const k of keys) {
    if (r[k] && String(r[k]).trim() !== "") return String(r[k]).trim();
  }
  return "";
};

function toBool(v: string) {
  const x = (v ?? "").toString().trim().toLowerCase();
  return x === "true" || x === "si" || x === "sí" || x === "1" || x === "yes";
}

export async function GET() {
  try {
    const url = process.env.SHEET_CSV_URL;

    if (!url) {
      return NextResponse.json(
        { error: "Falta SHEET_CSV_URL en .env.local / Vercel." },
        { status: 500 }
      );
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const preview = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: `No se pudo leer el Sheet (${res.status})`,
          preview: preview.slice(0, 200),
        },
        { status: 500 }
      );
    }

    const csv = await res.text();

    // Si esto aparece, no es CSV (posible XLSX)
    if (csv.includes("PK") && csv.includes("xml")) {
      return NextResponse.json(
        {
          error: "Tu URL está devolviendo un Excel (XLSX), no CSV.",
          fix: "Cambia la publicación a CSV o usa gviz/tq?tqx=out:csv&gid=0",
        },
        { status: 500 }
      );
    }

    const rows = parseCSV(csv);

    const workers = rows.map((r) => {
      const fullName = get(r, ["fullName", "Nombre", "nombre", "Nombre completo", "NombreCompleto"]);
      const ageStr = get(r, ["age", "Edad", "edad"]);
      const gender = get(r, ["gender", "Genero", "Género", "genero", "género"]);
      const phone = get(r, ["phone", "Telefono", "Teléfono", "celular", "Celular", "numero", "Número"]);
      const email = get(r, ["email", "Email", "Correo", "correo", "Correo electrónico", "Correo electronico"]);
      const zonesRaw = get(r, ["zones", "Zonas", "zonas", "Dublin disponibles", "Dublin", "Zonas Dublin"]);
      const jobsRaw = get(r, ["jobs", "Trabajos", "trabajos", "Oficios", "oficios", "Trabajo"]);
      const englishLevel = get(r, ["englishLevel", "Ingles", "Inglés", "Nivel ingles", "Nivel inglés"]);
      const immediateStr = get(r, ["immediate", "Disponibilidad inmediata", "disponibilidad inmediata", "Inmediato", "inmediato"]);
      const photoUrl = get(r, ["photoUrl", "Foto", "foto", "FotoUrl", "URL Foto", "Photo"]);
      const description = get(r, ["description", "Descripcion", "Descripción", "Bio", "Sobre mi", "Sobre mí"]);

      return {
        id: get(r, ["id", "ID", "Id"]) || (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
        fullName,
        age: Number(ageStr || 0),
        gender,
        phone,
        email,
        zones: (zonesRaw || "").split(",").map((x) => x.trim()).filter(Boolean),
        jobs: (jobsRaw || "").split(",").map((x) => x.trim()).filter(Boolean),
        englishLevel,
        immediate: toBool(immediateStr),
        photoUrl,
        description,
      };
    });

    return NextResponse.json({
      workers,
      debug: {
        totalRows: rows.length,
        keys: rows[0] ? Object.keys(rows[0]) : [],
      },
    });
  } catch (e: any) {
    console.error("api/workers error:", e);
    return NextResponse.json({ error: e?.message ?? "Error interno" }, { status: 500 });
  }
}
