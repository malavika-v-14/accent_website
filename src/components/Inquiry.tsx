"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type FormKind = "master" | "guidance" | "updates" | "college" | "corporate" | "callback" | "download";
type Request = { kind: FormKind; offering?: string; audience?: string };
const titles: Record<FormKind, string> = { master: "Master class registration", guidance: "Book your free first guidance session", updates: "Opportunity updates", college: "Request a campus conversation", corporate: "Book a free needs call", callback: "Request a callback", download: "Download your resource" };
const Open = createContext<(request: Request) => void>(() => {});

export function InquiryButton({ kind = "callback", offering, audience, children, className = "action-solid" }: { kind?: FormKind; offering?: string; audience?: string; children: React.ReactNode; className?: string }) {
  const open = useContext(Open);
  return <button type="button" className={className} onClick={() => open({ kind, offering, audience })}>{children}</button>;
}

export function InquiryForm({ kind = "callback", offering, audience }: Request) {
  const [done, setDone] = useState(false); const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  const field = (name: string, label: string, type = "text") => <label key={name}>{label}<input className="field" name={name} type={type} required maxLength={180} autoComplete={name === "name" ? "name" : type === "email" ? "email" : type === "tel" ? "tel" : "off"} /></label>;
  const select = (name: string, label: string, options: string[]) => <label>{label}<select className="field" name={name} required defaultValue=""><option value="" disabled>Select an option</option>{options.map(x => <option key={x}>{x}</option>)}</select></label>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); const data = new FormData(e.currentTarget);
    if (kind === "download" && audience === "corporates" && /^(gmail|googlemail|yahoo|hotmail|outlook|live|icloud|aol|protonmail|proton|mail)\./i.test(String(data.get("email")).split("@")[1] || "")) { setError("Please use your official company email address."); return; }
    const details = [`Request type: ${titles[kind]}`, offering && `Offering: ${offering}`, audience && `Audience: ${audience}`, ...Array.from(data.entries()).filter(([key]) => key !== "email").map(([key, value]) => `${key.replace(/([A-Z])/g, " $1").replace(/^./, x => x.toUpperCase())}: ${value}`)].filter(Boolean).join("\n");
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: String(data.get("name")), email: String(data.get("email")), subject: offering || titles[kind], message: details }) });
      if (!response.ok) { const result = await response.json().catch(() => null); throw new Error(result?.error || "Unable to send your request."); }
      setDone(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to send your request. Please try again or email hello@accent.in."); } finally { setSubmitting(false); }
  }
  if (done) return <div role="status" onClick={e => e.stopPropagation()} className="bg-mint rounded-xl p-6"><h3 className="text-xl font-semibold">{kind === "download" ? "Your request was received" : "Thank you — we have your details"}</h3><p className="my-4">{kind === "download" ? "Your download request has been sent to our team. You can also download the sample file below." : "Your request has been sent to the Accent team. We’ll contact you soon to confirm the next step."}</p>{kind === "download" && <a className="action-solid" href="/downloads/resource-sample.txt" download>Download ↓</a>}</div>;
  return <form onSubmit={submit} onClick={e => e.stopPropagation()} className="flex flex-col gap-4 inquiry-form"><h3 className="text-xl font-semibold">{titles[kind]}</h3>{offering && <p className="text-sm text-ink-soft">{offering}</p>}{field("name", kind === "college" || kind === "corporate" ? "Name and role" : "Your name")}{field("email", kind === "college" || kind === "corporate" ? "Work email" : "Email address", "email")}{kind !== "download" && field("phone", "Phone number", "tel")}
    {kind === "callback" && <>{select("audience", "I’m enquiring for", ["Job seekers", "Colleges", "Corporates"])}{field("interest", "What would you like to discuss?")}</>}
    {(kind === "master" || kind === "guidance" || kind === "updates") && <>{select("stage", "Current stage", ["Student", "Graduate", "Career switcher"])}{field("interest", "Field of interest")}</>}
    {kind === "college" && <>{field("college", "College and city")}{field("interest", "What would you like to improve?")}</>}
    {kind === "corporate" && <>{field("company", "Company")}{field("interest", "What would you like to build or improve?")}</>}
    {kind === "download" && field("phone", "Phone number", "tel")}
    <label className="flex items-start gap-2 text-sm"><input type="checkbox" required className="mt-1" /><span>I consent to Accent contacting me about this request. Read the <Link className="underline" href="/privacy">privacy policy</Link>.</span></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="btn-dark w-fit" type="submit" disabled={submitting}>{submitting ? "Sending…" : kind === "download" ? "Download" : "Continue"}</button></form>;
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<Request | null>(null); const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (request) { dialog.current?.showModal(); const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; } }, [request]);
  return <Open.Provider value={setRequest}>{children}<dialog ref={dialog} onClose={() => setRequest(null)} onClick={e => { const bounds = e.currentTarget.getBoundingClientRect(); const clickedBackdrop = e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom; if (clickedBackdrop) dialog.current?.close(); }} className="inquiry-dialog" aria-label={request ? titles[request.kind] : "Enquiry"}><button type="button" className="dialog-close" aria-label="Close form" onClick={() => dialog.current?.close()}>×</button>{request && <InquiryForm key={JSON.stringify(request)} {...request} />}</dialog></Open.Provider>;
}
