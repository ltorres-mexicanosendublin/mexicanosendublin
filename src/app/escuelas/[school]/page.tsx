"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SchoolForm() {
  const params = useParams();
  const school = params.school as string;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    country: "",
    stateRegion: "",
    duration: "",
    preferredStart: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school,
        ...form,
      }),
    });

    alert("Information sent successfully 🚀");
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-6">
        Request Information - {school.toUpperCase()}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        <input
          type="text"
          name="stateRegion"
          placeholder="State / Region"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

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

        <input
          type="date"
          name="preferredStart"
          required
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          Send Request
        </button>
      </form>
    </div>
  );
}
