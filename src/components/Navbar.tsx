"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import AccentMark from "./AccentMark";
const links = [["/", "Home"],["/about", "About us"],["/programs", "Services"],["/events", "Events"],["/contact", "Contact"]];
export default function Navbar() {
 const pathname = usePathname();
 return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="wrap nav-inner"><Link href="/" className="accent-logo" aria-label="Accent home"><AccentMark/>accent<span>®</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label]) => <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><Link href="/contact" className="nav-cta">Let’s talk <span>↗</span></Link><MobileMenu/></div></header></>;
}
