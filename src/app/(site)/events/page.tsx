import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventsFilter from "@/components/EventsFilter";
import ClosingCta from "@/components/ClosingCta";
import { getEvents } from "@/lib/events";
export const metadata: Metadata = { title: "Events & master classes — Accent", description: "Explore Accent master classes, talks and practical learning experiences." };
export const revalidate = 3600;
export default async function EventsPage(){const events=await getEvents();return <><section className="events-banner"><Image src="/images/talk.jpg" alt="People connecting at a learning event" fill priority sizes="100vw" className="object-cover"/><div className="events-banner-overlay"/><div className="wrap animate-rise"><p className="section-kicker"><span/> SHOW UP CURIOUS. LEAVE INSPIRED.</p><h1>Great ideas.<br/>Useful practice.<br/><em>Join in.</em></h1><p>Master classes, talks and hands-on learning experiences for your next step.</p></div></section><section className="events-content wrap"><div className="events-intro"><h2>What’s on the calendar.</h2><span>{events.length} experiences to explore</span></div>{events.length===0?<div className="rounded-2xl bg-mint p-10"><h3 className="mb-3 text-xl font-semibold">Something useful is on its way.</h3><p className="mb-6 text-sm text-ink-soft">No events are scheduled right now. Get in touch to hear about the next master class.</p><Link href="/contact" className="action-text">Stay connected <span>→</span></Link></div>:<EventsFilter events={events}/>}</section><ClosingCta/></>}
