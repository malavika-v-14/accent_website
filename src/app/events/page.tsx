import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventsFilter from "@/components/EventsFilter";
import ClosingCta from "@/components/ClosingCta";
import { getEvents } from "@/lib/events";
export const metadata: Metadata = { title: "Events & experiences — Accent", description: "Explore Accent Talks, workshops, certification programs and industrial visits." };
export const revalidate = 3600;

export default async function EventsPage() {
  const events = await getEvents();
  return <>
    <section className="events-banner"><Image src="/images/talk.jpg" alt="People connecting at a community event" fill priority sizes="100vw" className="object-cover" /><div className="events-banner-overlay" /><div className="wrap animate-rise"><p className="section-kicker"><span /> SHOW UP CURIOUS. LEAVE INSPIRED.</p><h1>Great ideas.<br />Good company.<br /><em>Be part of it.</em></h1><p>Conversations, hands-on experiences and new perspectives. Discover what’s happening in the Accent ecosystem.</p></div></section>
    <section className="events-content wrap"><div className="events-intro"><h2>What’s on the calendar.</h2><span>{events.length} experiences to explore</span></div>{events.length === 0 ? <div className="rounded-2xl bg-mint p-10"><h3 className="mb-3 text-xl font-semibold">Something good is on its way.</h3><p className="mb-6 text-sm text-ink-soft">No events scheduled right now. Get in touch to hear about future opportunities.</p><Link href="/contact" className="action-text">Stay connected <span>↗</span></Link></div> : <EventsFilter events={events} />}</section>
    <ClosingCta />
  </>;
}
