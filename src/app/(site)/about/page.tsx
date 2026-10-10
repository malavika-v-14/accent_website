import { Facts, FAQ } from "@/components/BriefSections";
import { InquiryButton } from "@/components/Inquiry";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = { title: "Our story — Accent", description: "Rooted in Kozhikode since 2017. Master classes, mentorship, hands-on learning and industry programs for job seekers, colleges and corporates." };

export default function AboutPage() {
  return <>
    <section className="page-hero wrap page-hero-grid"><div className="page-hero-copy animate-rise"><p className="section-kicker"><span /> OUR STORY · SINCE 2017</p><h1>Curiosity brought<br />us here.<br /><em>People keep<br />us growing.</em></h1><p>Accent is based in Kerala and offers master classes, mentorship, hands-on learning and industry programs for job seekers, colleges and corporates. We believe possibilities open up when the right people, ideas and experiences connect.</p><p>From a student’s first workshop to a team’s next challenge, we’re here to help turn potential into progress.</p><InquiryButton className="action-text mt-7">Let’s talk ↗</InquiryButton></div><div className="page-hero-photo animate-rise"><Image src="/images/campus.jpg" alt="Students sharing ideas in a campus setting" fill priority sizes="(max-width:767px) 90vw, 45vw" className="object-cover" /><div className="image-caption"><strong>Since 2017</strong><span>Rooted in Kozhikode. Growing together.</span></div></div></section>
    <Facts/><section className="wrap initiatives-section"><p className="section-kicker">OUR APPROACH</p><h2>Learn. Mentor. Innovate. Impact.</h2><p className="mt-6">Practical learning, guidance and industry exposure, shaped around the people taking part.</p><h2 className="mt-12">The people behind Accent</h2><p className="mt-6">Team profiles will be shared here soon.</p></section><FAQ/><ClosingCta />
  </>;
}
