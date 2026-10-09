import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = { title: "Our story — Accent", description: "Rooted in Kozhikode since 2017. Discover the Accent learning ecosystem: Talks, Tutors, Labs and Campus." };

export default function AboutPage() {
  return <>
    <section className="page-hero wrap page-hero-grid"><div className="page-hero-copy animate-rise"><p className="section-kicker"><span /> OUR STORY · SINCE 2017</p><h1>Curiosity brought<br />us here.<br /><em>People keep<br />us growing.</em></h1><p>Rooted in Kozhikode, Accent brings learning, mentorship and industry exposure together. We believe possibilities open up when the right people, ideas and experiences connect.</p><p>From a student’s first workshop to a team’s next challenge, we’re here to help turn potential into progress.</p><Link href="/programs" className="action-text mt-7">Find your place at Accent <span>↗</span></Link></div><div className="page-hero-photo animate-rise"><Image src="/images/campus.jpg" alt="Students sharing ideas in a campus setting" fill priority sizes="(max-width:767px) 90vw, 45vw" className="object-cover" /><div className="image-caption"><strong>Since 2017</strong><span>Rooted in Kozhikode. Growing together.</span></div></div></section>
    <ClosingCta />
  </>;
}
