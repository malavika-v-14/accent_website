"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const key = "accent-cookie-consent";
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(!localStorage.getItem(key)); }, []);
  function choose(value: "accepted" | "rejected") { localStorage.setItem(key, value); window.dispatchEvent(new Event("accent-consent-changed")); setVisible(false); }
  if (!visible) return null;
  return <aside className="cookie-consent" role="dialog" aria-label="Cookie preferences" aria-live="polite"><div><strong>Your privacy matters</strong><p>We use essential cookies to keep this website working. With your permission, we also use analytics cookies to understand how visitors use the site.</p><Link href="/privacy">Privacy policy</Link></div><div className="cookie-consent-actions"><button type="button" className="action-text" onClick={() => choose("rejected")}>Reject optional cookies</button><button type="button" className="action-solid" onClick={() => choose("accepted")}>Accept all cookies</button></div></aside>;
}
