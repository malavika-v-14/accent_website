import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconMic, IconCertificate, IconBulb, IconUsers } from "@/components/icons";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = { title: "Our story — Accent", description: "Rooted in Kozhikode since 2017. Discover the Accent learning ecosystem: Talks, Tutors, Labs and Campus." };
const initiatives = [
  { name: "Accent Talks", id: "talk", icon: IconMic, detail: "Conversations that open up new ways of thinking. Connect with practitioners, explore ideas and bring your questions to the room." },
  { name: "Accent Tutors", id: "workshop", icon: IconCertificate, detail: "Guidance to help you move forward. Build skills and confidence through mentorship, structured learning and certification programs." },
  { name: "Accent Labs", id: "collaborate", icon: IconBulb, detail: "A space for curiosity to become something tangible. Explore practical challenges, experiment with ideas and learn by building." },
  { name: "Accent Campus", id: "campus", icon: IconUsers, detail: "A connection between education and opportunity. Bring meaningful learning experiences and industry perspectives to your campus community." },
];

export default function AboutPage() {
  return <>
    <section className="page-hero wrap page-hero-grid"><div className="page-hero-copy animate-rise"><p className="section-kicker"><span /> OUR STORY · SINCE 2017</p><h1>Curiosity brought<br />us here.<br /><em>People keep<br />us growing.</em></h1><p>Rooted in Kozhikode, Accent brings learning, mentorship and industry exposure together. We believe possibilities open up when the right people, ideas and experiences connect.</p><p>From a student’s first workshop to a team’s next challenge, we’re here to help turn potential into progress.</p><Link href="/programs" className="action-text mt-7">Find your place at Accent <span>↗</span></Link></div><div className="page-hero-photo animate-rise"><Image src="/images/campus.jpg" alt="Students sharing ideas in a campus setting" fill priority sizes="(max-width:767px) 90vw, 45vw" className="object-cover" /><div className="image-caption"><strong>Since 2017</strong><span>Rooted in Kozhikode. Growing together.</span></div></div></section>
    <div className="story-facts" data-reveal><div><strong>2017</strong><span>Where our story begins</span></div><div><strong>04</strong><span>Connected initiatives</span></div><div><strong>01</strong><span>Shared drive to grow</span></div></div>
    <section className="initiatives-section wrap" data-reveal><div className="section-heading"><div><p className="section-kicker"><span /> CONNECTED BY CURIOSITY</p><h2>Four initiatives.<br /><em>One growing community.</em></h2></div><p>Different ways to learn, connect and create.<br />The same belief in what comes next.</p></div><div className="initiative-grid">{initiatives.map((item,i) => {const Icon = item.icon;return <article className="initiative-card" id={item.id} key={item.name}><div><Icon className="h-9 w-9" /><span>0{i + 1} / 04</span></div><h3>{item.name}</h3><p>{item.detail}</p></article>;})}</div></section>
    <ClosingCta />
  </>;
}
