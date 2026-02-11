"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


const schools = [
  "atlas",
  "delfin",
  "isi",
  "ces",
  "ise",
  "eli",
];

function generateMondays(startYear: number, endYear: number) {
    
    
  const mondays: { value: string; label: string }[] = [];

  const startDate = new Date(startYear, 0, 1); // Jan 1 startYear
  const endDate = new Date(endYear, 11, 31); // Dec 31 endYear

  // mover al primer lunes
  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() + 1);
  }

  const options = { day: "numeric", month: "long", year: "numeric" } as const;

  while (startDate <= endDate) {
    const value = startDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const label = startDate.toLocaleDateString("es-ES", options);

    mondays.push({ value, label });

    startDate.setDate(startDate.getDate() + 7);
  }

  return mondays;
}
const mondays = generateMondays(2026, 2027);



export default function GenericSchoolForm() {
    const router = useRouter();  // 👈 AQUÍ VA
    
    const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const schoolFromUrl = searchParams.get("school") || "";

  const [school, setSchool] = useState(schoolFromUrl);

  const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  country: "",
  stateRegion: "",
  duration: "",
  preferredStart: "",
  callAvailability: "",
  applicationType: "",
});


  const handleChange = (e: any) => {
    
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: any) => {
    
  e.preventDefault();

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      school,
      ...form,
    }),
  });

  if (res.ok) {
    setSuccess(true);
  }
};

  return (
    
  <div className="min-h-screen bg-slate-900 py-20 px-6 flex items-center">
  <div className="relative max-w-xl mx-auto w-full bg-white rounded-3xl shadow-2xl p-10">
  
  {/* BOTÓN CERRAR */}
  <button
  onClick={() => window.location.href = "/escuelas"}
  className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-xl font-bold transition"
>
  ×
</button>



    <h1 className="text-3xl font-bold text-slate-900 mb-2">
      Solicitar Información
    </h1>

    <p className="text-sm text-slate-600 mb-8">
      Completa el formulario y te contactaremos pronto.
    </p>

    <form onSubmit={handleSubmit} className="space-y-5">


        {/* SCHOOL */}
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select a school</option>
          {schools.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>

        {/* FULL NAME */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        {/* PHONE */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (with country code)"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        {/* GENDER */}
        <select
          name="gender"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        {/* COUNTRY */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        {/* STATE */}
        <input
          type="text"
          name="stateRegion"
          placeholder="State / Region"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        {/* DURATION */}
        <select
          name="duration"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Course duration</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="8 months">8 months</option>
          <option value="1 year">1 year</option>
        </select>
        {/* APPLICATION TYPE */}
<select
  name="applicationType"
  required
  onChange={handleChange}
  className="w-full border rounded-xl p-3"
>
  <option value="">Application type</option>
  <option value="New Student">New Student</option>
  <option value="Renewal">Renewal</option>
</select>



{/* START DATE */}
<div className="space-y-1">
  <label className="text-sm font-medium text-gray-700">
    Fecha en la que te gustaría iniciar el curso (solo lunes)
  </label>

  <select
    name="preferredStart"
    required
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  >
    <option value="">Selecciona una fecha</option>
    {mondays.map((m) => (
      <option key={m.value} value={m.value}>
        {m.label}
      </option>
    ))}
  </select>

  <p className="text-xs text-gray-500">
    Los cursos inician únicamente los lunes.
  </p>


  <p className="text-xs text-gray-500">
    Los cursos generalmente inician los lunes.
  </p>
</div>


        {/* CALL AVAILABILITY */}
        <select
          name="callAvailability"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        >
          <option value="">Best time to contact you</option>
          <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
          <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
          <option value="Evening (5pm - 9pm)">Evening (5pm - 9pm)</option>
          <option value="Anytime">Anytime</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          Send Request
        </button>
      </form>
      {success && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-backdrop">
    <div className="relative bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm w-full animate-fadeIn">

      {/* BOTÓN X */}
      <button
        onClick={() => setSuccess(false)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold transition"
      >
        ×
      </button>

      {/* CHECK ICON */}
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
        <span className="text-2xl text-blue-600">✓</span>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Solicitud enviada
      </h2>

      <p className="text-slate-600 mb-6">
        Te contactaremos muy pronto.
      </p>

      <button
        onClick={() => setSuccess(false)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
      >
        Cerrar
      </button>
    </div>
  </div>
)}


    </div>
    </div>
  );
}
