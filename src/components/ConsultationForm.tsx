"use client";

import { useState } from "react";

export default function ConsultationForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    setError("");
    try {
      const response = await fetch("/api/consultation", {method: "POST", body: JSON.stringify(Object.fromEntries(formData)), headers: {"Content-Type": "application/json"}});
      if (!response.ok) throw new Error("Unable to send your request. Please try again or email hello@accent.in.");
      setStatus("sent");
    } catch {
      setError("Unable to send your request. Please try again or email hello@accent.in.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-leaf/40 bg-mint p-6 text-forest-deep">
        Request received — someone from our team will contact you to discuss a suitable time.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input required name="company" aria-label="Company name" placeholder="Company name" className="field" />
      <input required name="contactName" aria-label="Your name" placeholder="Your name" className="field" />
      <input required type="email" name="email" aria-label="Work email" placeholder="Work email" className="field" />
      <input name="teamSize" aria-label="Team size (approx.)" placeholder="Team size (approx.)" className="field" />
      <select aria-label="Program of interest" required name="interest" className="field md:col-span-2" defaultValue="">
        <option value="" disabled>
          Which program are you exploring?
        </option>
        <option>Employee Engagement Programs</option>
        <option>Soft Skills Training</option>
        <option>Technical Workshops</option>
        <option>Employee Upskilling Programs</option>
        <option>Certification Programs</option>
        <option>Not sure yet</option>
      </select>
      <textarea aria-label="Additional notes"
        name="notes"
        placeholder="Anything specific you want covered?"
        rows={4}
        className="field md:col-span-2"
      />
      {error && <p role="alert" className="form-error md:col-span-2">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-dark w-fit md:col-span-2">
        {status === "submitting" ? "Booking…" : "Book a consultation"}
      </button>
    </form>
  );
}
