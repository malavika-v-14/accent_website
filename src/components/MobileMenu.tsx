"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function MobileMenu() {
 const [open,setOpen] = useState(false); const path = usePathname();
 useEffect(() => {setOpen(false);}, [path]);
 return <div className="mobile-nav"><button onKeyDown={e => {if(e.key === "Escape") setOpen(false);}} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>{open && <nav id="mobile-links" aria-label="Mobile navigation" onKeyDown={e => {if(e.key === "Escape") {setOpen(false); (e.currentTarget.previousElementSibling as HTMLButtonElement)?.focus();}}}>{[["/","Home"],["/about","About us"],["/programs","Services"],["/events","Events"],["/contact","Contact"]].map(([href,label]) => <Link onClick={() => setOpen(false)} href={href} key={href} aria-current={path === href ? "page" : undefined}>{label}<span>↗</span></Link>)}</nav>}</div>;
}
