"use client";

import { useMemo, useState,useEffect  } from "react";
import { useSearchParams } from "next/navigation";

type EnglishLevel = "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

const DUBLIN_ZONES = [
  "D1","D2","D3","D4","D5","D6","D6W","D7","D8","D9","D10","D11","D12","D13","D14","D15","D16","D17","D18","D20","D22","D24",
];

const JOB_TYPES = [
  { key: "limpieza", label: "Limpieza" },
  { key: "plomeria", label: "Plomería" },
  { key: "albanil", label: "Albañil" },
  { key: "peluquero", label: "Peluquero(a)" },
  { key: "pintor", label: "Pintor" },
  { key: "mesero", label: "Mesero(a)" },
  { key: "cocinero", label: "Cocinero(a)" },
  { key: "cajero", label: "Cajero(a)" },
  { key: "almacenista", label: "Almacenista" },
  { key: "jardinero", label: "Jardinero(a)" },
  { key: "enfermeria", label: "Cuidados de enfermería" },
] as const;

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}
async function uploadToCloudinary(file: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);
  fd.append("folder", "mexicanos/workers");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? "Error subiendo foto");

  return data.secure_url as string;
}


export default function RegisterWorkerForm() {
    
  const [submitting, setSubmitting] = useState(false);
  const [paid, setPaid] = useState(false);
  const searchParams = useSearchParams();
const [photoUploading, setPhotoUploading] = useState(false);
const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (searchParams.get("paid") === "1") {
      setPaid(true);
    }
  }, [searchParams]);

  // Basic info
  
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Photo (local preview only for now)
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const photoPreview = useMemo(() => {
    if (!photoFile) return "";
    return URL.createObjectURL(photoFile);
  }, [photoFile]);

  // Work details
  const [zones, setZones] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Record<string, boolean>>({
    limpieza: false,
    plomeria: false,
    albanil: false,
    peluquero: false,
    pintor: false,
    mesero: false,
    cocinero: false,
    cajero: false,
    almacenista: false,
    jardinero: false,
    enfermeria: false,
  });

  // English
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>("A2");
  const [englishProof, setEnglishProof] = useState(false);
  const [englishProofNote, setEnglishProofNote] = useState("");

  // Nursing
  const nursingSelected = !!jobs.enfermeria;
  const [nursingExp, setNursingExp] = useState("");
  const [refName, setRefName] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [refPhone, setRefPhone] = useState("");

  // Terms
  const [agree, setAgree] = useState(false);

  function toggleZone(z: string) {
    setZones((prev) => (prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]));
  }

  function toggleJob(key: string) {
    setJobs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const selectedJobs = useMemo(
    () => Object.entries(jobs).filter(([, v]) => v).map(([k]) => k),
    [jobs]
  );

  const canSubmit = useMemo(() => {
    if (!paid) return false;
    if (!agree) return false;
    if (!fullName.trim()) return false;
    const ageNum = Number(age);
    if (!age || Number.isNaN(ageNum) || ageNum < 16 || ageNum > 90) return false;
    if (!gender) return false;
    if (!phone.trim()) return false;
    if (!email.includes("@")) return false;
    if (zones.length === 0) return false;
    if (selectedJobs.length === 0) return false;

    // English: must be "comprobable" (your requirement)
    if (!englishProof) return false;

    // Nursing references required if nursing selected
    if (nursingSelected) {
      if (!nursingExp.trim()) return false;
      if (!refName.trim()) return false;
      if (!refEmail.includes("@")) return false;
      if (!refPhone.trim()) return false;
    }
    return true;
  }, [
    paid,
    agree,
    fullName,
    age,
    gender,
    phone,
    email,
    zones.length,
    selectedJobs.length,
    englishProof,
    nursingSelected,
    nursingExp,
    refName,
    refEmail,
    refPhone,
  ]);
  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setPhotoUploading(true);
      const url = await uploadToCloudinary(file);
      setPhotoUrl(url);
    } catch (err: any) {
      alert(err?.message ?? "No se pudo subir la foto");
    } finally {
      setPhotoUploading(false);
    }
  }
  async function handlePay(e: React.MouseEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);

      // ✅ Recomendado: crea un endpoint que genere un Stripe Checkout Session de €5
      // y regrese { url }. Aquí solo dejamos el hook listo.
      const res = await fetch("/api/checkout-registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "registro_worker", amountEUR: 5 }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // Stripe checkout
        return;
      }

      // Si todavía no tienes Stripe listo, puedes activar el modo “manual”:
      // (comenta lo de arriba y descomenta esto temporalmente)
      // setPaid(true);

      alert(data?.error ?? "No se pudo iniciar el pago. Intenta de nuevo.");
    } catch (err) {
      alert("Error iniciando pago. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canSubmit) {
      alert("Completa todos los campos requeridos.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        fullName: fullName.trim(),
        age: Number(age),
        gender,
        phone: phone.trim(),
        email: email.trim(),
        zones,
        jobs: selectedJobs, // array
        englishLevel,
        englishProof,
        englishProofNote,
        nursing: nursingSelected
          ? {
              experience: nursingExp.trim(),
              reference: {
                name: refName.trim(),
                email: refEmail.trim(),
                phone: refPhone.trim(),
              },
            }
          : null,
          photoUrl,
      };

      const res = await fetch("/api/registro-worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("registro-worker API:", res.status, json);
        alert(json?.error ?? `Error API (${res.status})`);
        return;
      }

      alert("✅ Registro enviado correctamente. Te contactaremos si necesitamos validar algo.");
    } catch (err) {
      console.error("handleSubmit error:", err);
      alert("Ocurrió un error al enviar. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }


  

  return (
    
    <div className="mx-auto grid gap-6 lg:grid-cols-12">
      {/* Left: info / trust */}
      
      <aside className="lg:col-span-4">
        <div className="sticky top-6 space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Crea tu perfil</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Queremos que se vea lo mejor de nuestra comunidad: gente mexicana
              trabajadora, responsable y con ganas de salir adelante.
            </p>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">Registro de lanzamiento</p>
              <p className="mt-1 text-sm text-emerald-900/80">
                Por ahora cobramos <span className="font-semibold">€5</span> para registrarte (esto nos ayuda a
                crecer y llegar a más gente). Conforme crezca la comunidad, el precio puede subir.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">Privacidad</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Tu información se usa solo para crear tu perfil y permitir contacto con empleadores.
                No publiques datos sensibles. Tus referencias se usan únicamente para validación.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900">Tips para que te elijan</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Sube una foto clara (opcional por ahora).</li>
              <li>• Elige bien tus zonas y trabajos reales.</li>
              <li>• Inglés: marca solo si puedes comprobarlo (certificado o entrevista).</li>
              <li>• Enfermería: pon referencias reales en México para validar.</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Right: form */}
      <section className="lg:col-span-8">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Registro de trabajador</h2>
              <p className="mt-1 text-sm text-slate-600">
                Completa tus datos. Después del pago, podrás enviar tu registro.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cx(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  paid ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                )}
              >
                {paid ? "Pago confirmado" : "Pago pendiente"}
              </span>

              {!paid && (
                <button
                  onClick={handlePay}
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                  type="button"
                >
                  {submitting ? "Procesando..." : "Pagar €5"}
                </button>
              )}

              {/* 👇 Si NO tienes Stripe aún, activa este botón temporal */}
              {/* <button
                onClick={() => setPaid(true)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                type="button"
              >
                Marcar como pagado (MVP)
              </button> */}
            </div>
          </div>

          <hr className="my-6 border-slate-100" />

          {/* Datos personales */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Datos personales</h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" required>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={input()}
                  placeholder="Ej. Luis Uriel Torres Morales"
                  autoComplete="name"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Edad" required>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/[^\d]/g, ""))}
                    className={input()}
                    placeholder="Ej. 28"
                    inputMode="numeric"
                  />
                </Field>

                <Field label="Género" required>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className={input()}>
                    <option value="">Selecciona</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="No binario">No binario</option>
                    <option value="Prefiero no decir">Prefiero no decir</option>
                  </select>
                </Field>
              </div>

              <Field label="Número celular" required hint="Incluye código, ej. +353...">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={input()}
                  placeholder="+353 87 000 0000"
                  autoComplete="tel"
                />
              </Field>

              <Field label="Correo electrónico" required>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={input()}
                  placeholder="tucorreo@email.com"
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Foto (opcional por ahora)" hint="Una foto clara genera más confianza.">
                <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setPhotoUploading(true);
      const url = await uploadToCloudinary(file);
      setPhotoUrl(url);
    } catch (err: any) {
      alert(err?.message ?? "No se pudo subir la foto");
    } finally {
      setPhotoUploading(false);
    }
  }}
/>

{photoUploading ? (
  <p className="text-sm text-gray-600 mt-2">Subiendo foto…</p>
) : photoUrl ? (
  <p className="text-sm text-emerald-700 mt-2">✅ Foto cargada</p>
) : null}

              </Field>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-700">Vista previa</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                        Sin foto
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">
                    (En MVP, la foto no se sube aún. Cuando activemos storage, se guardará en tu perfil.)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Zonas */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Zonas disponibles (Dublín)</h3>
            <p className="mt-1 text-sm text-slate-600">Selecciona donde sí puedes moverte.</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {DUBLIN_ZONES.map((z) => {
                const active = zones.includes(z);
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() => toggleZone(z)}
                    className={cx(
                      "rounded-full border px-3 py-1 text-sm font-semibold",
                      active
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {z}
                  </button>
                );
              })}
            </div>

            {zones.length === 0 && (
              <p className="mt-2 text-xs text-rose-600">Selecciona al menos 1 zona.</p>
            )}
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Tipos de trabajo */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Tipo de trabajo</h3>
            <p className="mt-1 text-sm text-slate-600">Marca lo que realmente puedes hacer.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {JOB_TYPES.map((j) => (
                <label
                  key={j.key}
                  className={cx(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border p-4",
                    jobs[j.key] ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={!!jobs[j.key]}
                    onChange={() => toggleJob(j.key)}
                    className="mt-1 h-4 w-4 accent-emerald-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{j.label}</p>
                    <p className="text-xs text-slate-600">
                      {j.key === "enfermeria"
                        ? "Requiere experiencia real y referencias para validar."
                        : "Oficio/servicio seleccionado."}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {selectedJobs.length === 0 && (
              <p className="mt-2 text-xs text-rose-600">Selecciona al menos 1 tipo de trabajo.</p>
            )}
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Inglés */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Nivel de inglés</h3>
            <p className="mt-1 text-sm text-slate-600">
              Esto debe ser <span className="font-semibold">comprobable</span>, porque a veces irás solo y no habrá quien traduzca.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Selecciona tu nivel" required>
                <select
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
                  className={input()}
                >
                  <option value="A0">A0 (casi nada)</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </Field>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={englishProof}
                    onChange={(e) => setEnglishProof(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-emerald-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Puedo comprobar mi inglés</p>
                    <p className="text-xs text-slate-600">
                      Ej. certificado, entrevista breve, o evidencia de estudio/trabajo.
                    </p>
                  </div>
                </label>

                <div className="mt-3">
                  <label className="text-xs font-semibold text-slate-700">¿Cómo lo compruebas? (opcional)</label>
                  <textarea
                    value={englishProofNote}
                    onChange={(e) => setEnglishProofNote(e.target.value)}
                    className={cx(input(), "mt-1 min-h-[80px]")}
                    placeholder="Ej. Estudio en Atlas / certificado / entrevista / etc."
                  />
                </div>

                {!englishProof && (
                  <p className="mt-2 text-xs text-rose-600">
                    Necesitas marcar esta casilla para poder registrarte (requisito del sistema).
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Enfermería extra */}
          {nursingSelected && (
            <>
              <hr className="my-8 border-slate-100" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Cuidados de enfermería</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Cuéntanos tu experiencia y agrega referencias en México para validar (correo y teléfono).
                </p>

                <div className="mt-4 grid gap-4">
                  <Field label="Experiencia (detalles)" required hint="Años, lugares, tareas, pacientes, etc.">
                    <textarea
                      value={nursingExp}
                      onChange={(e) => setNursingExp(e.target.value)}
                      className={cx(input(), "min-h-[120px]")}
                      placeholder="Ej. 2 años cuidando adulto mayor, administración de medicamentos, higiene, movilidad, etc."
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Nombre de referencia" required>
                      <input
                        value={refName}
                        onChange={(e) => setRefName(e.target.value)}
                        className={input()}
                        placeholder="Nombre completo"
                      />
                    </Field>
                    <Field label="Correo de referencia" required>
                      <input
                        value={refEmail}
                        onChange={(e) => setRefEmail(e.target.value)}
                        className={input()}
                        placeholder="referencia@email.com"
                      />
                    </Field>
                    <Field label="Teléfono de referencia" required>
                      <input
                        value={refPhone}
                        onChange={(e) => setRefPhone(e.target.value)}
                        className={input()}
                        placeholder="+52 ..."
                      />
                    </Field>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-semibold text-amber-900">Validación</p>
                    <p className="mt-1 text-xs text-amber-900/80">
                      Solo usamos estas referencias para verificar información cuando sea necesario.
                      No compartimos estos datos con empleadores.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <hr className="my-8 border-slate-100" />

          {/* Terms */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 accent-emerald-600"
              />
              <div className="text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Acepto</p>
                <p className="mt-1 text-sm text-slate-700">
                  Que mi información se use para crear mi perfil y que esta plataforma solo conecta personas.
                  El acuerdo final (precio, horarios, pago) es entre empleador y trabajador.
                </p>
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-600">
              * Para enviar: necesitas <span className="font-semibold">pago confirmado</span>, datos completos y aceptar términos.
            </p>

            <button
              disabled={!canSubmit || submitting}
              className={cx(
                "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-extrabold shadow-sm",
                canSubmit
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-500"
              )}
              type="submit"
            >
              {submitting ? "Enviando..." : "Crear mi perfil"}
            </button>
          </div>
        </form>

        {/* Mini footer SEO text (indexable) */}
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Mexicanos en Dublín • Registro de trabajadores mexicanos en Dublín • Limpieza, plomería, albañilería,
          peluquería, pintura, mesero, cocinero, cajero, almacenista, jardinería y cuidados de enfermería.
        </p>
      </section>
    </div>
  );


function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-xs font-semibold text-slate-700">
          {label} {required ? <span className="text-rose-600">*</span> : null}
        </label>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
  
}


function input() {
  return "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";
}
}