"use client";

import { useState } from "react";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    setError("");
    try {
      const response = await fetch("/api/contact", {method: "POST", body: JSON.stringify(Object.fromEntries(formData)), headers: {"Content-Type": "application/json"}});
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setError("Unable to send your message. Please try again or email hello@accent.in.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-leaf/40 bg-mint p-6 text-forest-deep">
        Message sent — we usually reply within a couple of days.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>Your name<input autoComplete="name" required name="name" placeholder="Alex Thomas" className="field" /></label>
      <label>Email address<input autoComplete="email" required type="email" name="email" placeholder="you@example.com" className="field" /></label>
      <label>What brings you here? (optional)<input name="subject" placeholder="A workshop, a partnership, a new idea…" className="field" /></label>
      <label>Your message<textarea required name="message" placeholder="Tell us a little about what you have in mind…" rows={5} className="field" /></label>
      {error && <p role="alert" className="form-error">{error}</p>}
      <button type="submit" disabled={status === "submitting"} className="btn-dark w-fit">
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
