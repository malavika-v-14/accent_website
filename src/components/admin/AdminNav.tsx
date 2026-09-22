"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AccentMark from "@/components/AccentMark";

const links = [["/admin", "Overview", "01"], ["/admin/events", "Events", "02"], ["/admin/inquiries", "Enquiries", "03"], ["/admin/services", "Services", "04"], ["/admin/account", "Account", "05"]];
export default function AdminNav({ name }: { name: string }) {
  const path = usePathname(); const router = useRouter();
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function logout() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      router.replace("/admin/login"); router.refresh();
    } catch { setError("Could not sign out. Please try again."); setBusy(false); }
  }
  return <aside className="admin-sidebar"><Link href="/admin" className="accent-logo"><AccentMark />accent</Link><p className="admin-sidebar-label">WORKSPACE</p><nav aria-label="Admin navigation">{links.map(([href, label, number]) => <Link key={href} href={href} aria-current={(href === "/admin" ? path === href : path.startsWith(href)) ? "page" : undefined}><span>{number}</span>{label}<b>↗</b></Link>)}</nav><div className="admin-sidebar-bottom"><p>Signed in as<strong>{name}</strong></p><Link href="/" target="_blank">View public website ↗</Link><button type="button" onClick={logout} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>{error && <p role="alert">{error}</p>}</div></aside>;
}
