"use client";
import { InquiryButton } from "./Inquiry";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import AccentMark from "./AccentMark";
const links = [["/programs", "Programs"],["/colleges", "Colleges"],["/corporates", "Corporates"],["/events", "Events"],["/resources", "Resources"],["/about", "About"]];
export default function Navbar() {
 const pathname = usePathname();
 return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="wrap nav-inner"><Link href="/" className="accent-logo" aria-label="Accent home"><AccentMark /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label]) => <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><InquiryButton className="nav-cta">Let’s talk <span>↗</span></InquiryButton><MobileMenu/></div></header></>;
}
