"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [["/programs","Programs"],["/colleges","Colleges"],["/corporates","Corporates"],["/events","Events"],["/resources","Resources"],["/about","About"]];
export default function MobileMenu(){const [open,setOpen]=useState(false);const path=usePathname();useEffect(()=>setOpen(false),[path]);return <div className="mobile-nav"><button onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-links" onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button>{open&&<nav id="mobile-links" aria-label="Mobile navigation">{links.map(([href,label])=><Link onClick={()=>setOpen(false)} href={href} key={href} aria-current={path===href?"page":undefined}>{label}<span>→</span></Link>)}<Link onClick={()=>setOpen(false)} href="/contact">Let’s talk <span>→</span></Link></nav>}</div>}
