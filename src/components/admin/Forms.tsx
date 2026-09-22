"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoryLabels } from "@/lib/event-categories";

async function request(url: string, method: string, data: unknown) {
  const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const body = await response.json();
  if (!response.ok) {
    if (response.status === 401 && !url.endsWith("/login")) window.location.assign("/admin/login");
    throw new Error(body.error || "Unable to save. Please try again.");
  }
  return body;
}

function Notice({ error, success }: { error: string; success?: string }) {
  return <>{error && <p className="admin-notice admin-notice-error" role="alert">{error}</p>}{success && <p className="admin-notice" role="status">{success}</p>}</>;
}

export function LoginForm() {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    try { await request("/api/admin/login", "POST", Object.fromEntries(new FormData(e.currentTarget))); router.replace("/admin"); router.refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to sign in."); setBusy(false); }
  }
  return <form className="admin-form" onSubmit={submit}><label>Email address<input className="field" name="email" type="email" autoComplete="username" required maxLength={254} /></label><label>Password<input className="field" name="password" type="password" autoComplete="current-password" required maxLength={128} /></label><Notice error={error} /><button className="admin-button" disabled={busy}>{busy ? "Signing in…" : "Sign in to workspace"}<span>↗</span></button></form>;
}

export type EditableEvent = { id?: string; title: string; category: string; date: string; location: string; description: string; isActive: boolean };
export function EventForm({ event }: { event?: EditableEvent }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await request(event ? `/api/admin/events/${event.id}` : "/api/admin/events", event ? "PATCH" : "POST", { ...data, isActive: data.isActive === "true" });
      router.push("/admin/events?saved=1"); router.refresh();
    } catch(e) { setError(e instanceof Error ? e.message : "Unable to save event."); setBusy(false); }
  }
  return <form className="admin-form" onSubmit={submit}><label>Event title<input className="field" name="title" required maxLength={180} defaultValue={event?.title} /></label><div className="admin-form-grid"><label>Category<select className="field" name="category" defaultValue={event?.category || "WORKSHOP"}>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Event date<input className="field" name="date" type="date" required defaultValue={event?.date} /></label></div><label>Location<input className="field" name="location" required maxLength={180} defaultValue={event?.location} placeholder="Kozhikode, Kerala or Online" /></label><label>Description<textarea className="field" name="description" rows={5} required maxLength={3000} defaultValue={event?.description} /></label><label>Visibility<select className="field" name="isActive" defaultValue={event?.isActive ? "true" : "false"}><option value="false">Draft — only visible to admins</option><option value="true">Published — visible on the events page</option></select></label><Notice error={error} /><div className="admin-form-actions"><button className="admin-button" disabled={busy}>{busy ? "Saving…" : "Save event"}</button><button type="button" className="admin-button admin-button-outline" disabled={busy} onClick={() => router.push("/admin/events")}>Cancel</button></div></form>;
}

export function DeleteEvent({ id, title }: { id: string; title: string }) {
  const router = useRouter(); const [confirming, setConfirming] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function remove() {
    setBusy(true); setError("");
    try { await request(`/api/admin/events/${id}`, "DELETE", {}); router.push("/admin/events?deleted=1"); router.refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to delete event."); setBusy(false); }
  }
  return <div className="admin-delete"><h2>Delete event</h2><p>To hide this event while keeping its details, save it as a draft instead.</p>{confirming ? <div role="group" aria-label="Confirm event deletion"><p>Delete “{title}” permanently?</p><div className="admin-form-actions"><button className="admin-button admin-button-danger" disabled={busy} onClick={remove}>{busy ? "Deleting…" : "Delete permanently"}</button><button className="admin-button admin-button-outline" disabled={busy} onClick={() => setConfirming(false)}>Keep event</button></div></div> : <button className="admin-button admin-button-outline" onClick={() => setConfirming(true)}>Delete this event</button>}<Notice error={error} /></div>;
}

export function InquiryForm({ kind, id, status, notes }: { kind: string; id: string; status: string; notes: string }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(""); setSuccess("");
    try { await request(`/api/admin/inquiries/${kind}/${id}`, "PATCH", Object.fromEntries(new FormData(e.currentTarget))); setSuccess("Enquiry updated. Internal notes are only visible to admins."); router.refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to save enquiry."); } finally { setBusy(false); }
  }
  return <form className="admin-form" onSubmit={submit}><label>Status<select className="field" name="status" defaultValue={status}><option value="NEW">New</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option><option value="ARCHIVED">Archived</option></select></label><label>Internal notes<textarea className="field" name="adminNotes" rows={5} maxLength={5000} defaultValue={notes} placeholder="Add follow-up details for your team." /></label><Notice error={error} success={success} /><button className="admin-button" disabled={busy}>{busy ? "Saving…" : "Save updates"}</button></form>;
}

export function ServiceForm({ service }: { service: { id: string; title: string; tag: string; text: string; details: string[] } }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(""); setSuccess("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try { await request(`/api/admin/services/${service.id}`, "PATCH", { ...data, details: String(data.details).split("\n").map(s => s.trim()).filter(Boolean) }); setSuccess("Service saved. The website now uses the updated content."); router.refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to save service."); } finally { setBusy(false); }
  }
  return <form className="admin-form" onSubmit={submit}><label>Service title<input className="field" name="title" required maxLength={100} defaultValue={service.title} /></label><label>Short label<input className="field" name="tag" required maxLength={60} defaultValue={service.tag} /></label><label>Description<textarea className="field" name="description" required rows={4} maxLength={800} defaultValue={service.text} /></label><label>Details (one per line, up to 8)<textarea className="field" name="details" required rows={5} defaultValue={service.details.join("\n")} /></label><Notice error={error} success={success} /><button className="admin-button" disabled={busy}>{busy ? "Saving…" : "Save and publish content"}</button></form>;
}

export function PasswordForm() {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.password !== data.confirm) { setError("The new passwords do not match."); return; }
    setBusy(true);
    try { await request("/api/admin/password", "POST", data); router.replace("/admin/login?changed=1"); router.refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : "Unable to change password."); setBusy(false); }
  }
  return <form className="admin-form" onSubmit={submit}><label>Current password<input className="field" type="password" name="currentPassword" autoComplete="current-password" required maxLength={128} /></label><label>New password<input className="field" type="password" name="password" autoComplete="new-password" required minLength={12} maxLength={128} /></label><label>Confirm new password<input className="field" type="password" name="confirm" autoComplete="new-password" required minLength={12} maxLength={128} /></label><p className="admin-muted">Use at least 12 characters. Changing your password signs out all your sessions.</p><Notice error={error} /><button className="admin-button" disabled={busy}>{busy ? "Updating…" : "Change password"}</button></form>;
}
