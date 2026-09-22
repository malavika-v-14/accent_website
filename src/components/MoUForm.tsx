"use client";

import { useState } from "react";

export default function MoUForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    setError("");
    try {
      const response = await fetch("/api/mou", {method: "POST", body: JSON.stringify(Object.fromEntries(formData)), headers: {"Content-Type": "application/json"}});
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
        Thanks — we'll follow up with your institution within a few working days.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input required name="institution" aria-label="Institution name" placeholder="Institution name" className="field" />
      <input required name="contactName" aria-label="Your name" placeholder="Your name" className="field" />
      <input required type="email" name="email" aria-label="Work email" placeholder="Work email" className="field" />
      <input required name="phone" aria-label="Phone number" placeholder="Phone number" className="field" />
      <input name="department" aria-label="Department (optional)" placeholder="Department (optional)" className="field md:col-span-2" />
      <textarea aria-label="Additional notes"
        name="notes"
        placeholder="What are you hoping to set up with Accent?"
        rows={4}
        className="field md:col-span-2"
      />
      {error && <p role="alert" className="form-error md:col-span-2">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-dark w-fit md:col-span-2">
        {status === "submitting" ? "Sending…" : "Apply for an MoU"}
      </button>
    </form>
  );
}
