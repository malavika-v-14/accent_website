import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCatalog from "@/components/ServiceCatalog";
import EcosystemExplorer from "@/components/EcosystemExplorer";
import ClosingCta from "@/components/ClosingCta";
import { IconGraduate, IconBriefcase } from "@/components/icons";

export default function HomePage() {
  return <>
    <Hero />
    <div className="brand-ribbon" aria-label="Learn. Mentor. Innovate. Impact."><div className="ribbon-track" aria-hidden="true">{[0,1,2,3].map(n => <div className="ribbon-group" key={n}><span>Learn.</span><b>✳</b><span>Mentor.</span><b>✳</b><span>Innovate.</span><b>✳</b><span>Impact.</span><b>✳</b></div>)}</div></div>
    <section className="pathways-section wrap" id="pathways" data-reveal>
      <div className="section-heading"><div><p className="section-kicker"><span /> YOUR AMBITION. YOUR PATH.</p><h2>Where do you want<br />to <em>grow next?</em></h2></div><p>Different starting points. Shared possibilities.<br />Let’s make the next step count.</p></div>
      <div className="pathway-grid">
        <Link href="/programs#colleges" className="pathway-card"><Image src="/images/campus.jpg" alt="College students collaborating in a library" fill sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /><div className="pathway-overlay" /><span className="pathway-icon"><IconGraduate /></span><div className="pathway-copy"><p>FROM CAMPUS TO WHAT’S NEXT</p><h3>For colleges.<br />For brighter futures.</h3><span>Hands-on learning. Industry exposure. New possibilities.</span><b>Explore college programs <span>↗</span></b></div></Link>
        <Link href="/programs#companies" className="pathway-card"><Image src="/images/team.jpg" alt="Colleagues collaborating in a creative workspace" fill sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /><div className="pathway-overlay" /><span className="pathway-icon"><IconBriefcase /></span><div className="pathway-copy"><p>BETTER TOGETHER. READY FOR MORE.</p><h3>For corporates.<br />For stronger teams.</h3><span>Build capabilities. Spark connection. Move forward.</span><b>Explore corporate programs <span>↗</span></b></div></Link>
      </div>
    </section>
    <ServiceCatalog compact />
    <EcosystemExplorer />
    <section className="experience-section wrap" data-reveal><div className="experience-photo"><Image src="/images/talk.jpg" alt="People exchanging ideas at a community gathering" fill sizes="(max-width: 767px) 90vw, 50vw" className="object-cover" /><span className="experience-label">OFFLINE CONNECTIONS. LASTING POSSIBILITIES.</span></div><div className="experience-copy"><p className="section-kicker"><span /> GET OUT THERE. GET INSPIRED.</p><h2>Your next idea<br />could start with<br /><em>a conversation.</em></h2><p>Fresh perspectives, hands-on workshops, and people who see things differently. Make room for a little discovery.</p><Link href="/events" className="action-solid">Explore our events <span>↗</span></Link></div></section>
    <ClosingCta />
  </>;
}
