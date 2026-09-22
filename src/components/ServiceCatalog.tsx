"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { iconForProgram, IconGraduate, IconBriefcase } from "./icons";
import { defaultCatalog, type ServiceCatalogData } from "@/lib/service-defaults";
import MoUForm from "./MoUForm";
import ConsultationForm from "./ConsultationForm";

export default function ServiceCatalog({compact = false, catalog = defaultCatalog}: {compact?: boolean; catalog?: ServiceCatalogData}) {
  const [audience, setAudience] = useState("colleges");
  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => {
    const sync = () => {const hash = window.location.hash; if (["#companies", "#employees"].includes(hash)) setAudience("companies"); else if (["#colleges", "#students"].includes(hash)) setAudience("colleges"); setExpanded(null);};
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync);
    return () => {window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync);};
  }, []);
  const isCollege = audience === "colleges";
  const services = isCollege ? catalog.colleges : catalog.companies;
  function choose(value: string) {setAudience(value); setExpanded(null); window.history.replaceState(null, "", `#${value}`);}
  return <section className="services-section" id="services" data-reveal><div className="wrap">
    <div className="section-heading"><div><p className="section-kicker">OUR SERVICES</p><h2>Different journeys.<br/><em>The same drive to grow.</em></h2></div><p>Wherever you are in your journey,<br className="desktop-break"/> there’s a next step. Let’s find yours.</p></div>
    <div className="catalog-toolbar"><div className="audience-tabs" role="group" aria-label="Choose your audience">
      <button aria-pressed={isCollege} onClick={() => choose("colleges")}><IconGraduate /> For colleges <span>↗</span></button>
      <button aria-pressed={!isCollege} onClick={() => choose("companies")}><IconBriefcase /> For corporates <span>↗</span></button>
    </div><span className="catalog-count">05 SERVICES · {isCollege ? "CAMPUS TO CAREER" : "PEOPLE TO POTENTIAL"}</span></div>
    <div className="service-grid animate-rise" key={audience} aria-label={isCollege ? "Services for college students" : "Services for employees"}>
      {services.map((service, i) => {const Icon = iconForProgram(service.title); return <article className={`service-tile ${expanded === i ? "is-expanded" : ""}`} key={service.title}>
        <div className="service-top"><span className="service-icon" aria-hidden="true"><Icon /></span><span className="service-number">0{i+1}</span></div>
        <p className="service-tag">{service.tag}</p><h3>{service.title}</h3><p className="service-description">{service.text}</p>
        <button className="service-more" onClick={() => setExpanded(expanded === i ? null : i)} aria-expanded={expanded === i} aria-controls={`details-${audience}-${i}`}>{expanded === i ? "Close details" : "Explore service"}<span aria-hidden="true">{expanded === i ? "−" : "↗"}</span></button>
        <div id={`details-${audience}-${i}`} hidden={expanded !== i} className="service-details"><ul>{service.details.map(d => <li key={d}>{d}</li>)}</ul><a href={compact ? `/programs#${audience}` : "#enquiry"}>{isCollege ? "Discuss a campus program" : "Discuss your team’s needs"} →</a></div>
      </article>;})}
      <article className="service-help"><Image src="/images/workshop.jpg" alt="" fill sizes="400px" className="object-cover" /><div className="service-help-shade" /><span className="help-star" aria-hidden="true">✳</span><h3>A little guidance.<br/>A bigger possibility.</h3><p>Not sure where to start? Tell us what you have in mind. We’ll help you find the right fit.</p><a href={compact ? `/programs#${audience}` : "#enquiry"}>Let’s make a plan <span>↗</span></a><span className="help-watermark" aria-hidden="true">a.</span></article>
    </div>
    {!compact && <div className="enquiry-panel" id="enquiry"><div className="enquiry-intro"><p className="section-kicker">LET’S GET STARTED</p><h2>{isCollege ? "A partnership with possibility." : "Your people. Their next chapter."}</h2><p>{isCollege ? "Representing a college? Start a conversation about an institutional MoU and a learning plan for your campus." : "Tell us about your team and the skills you want to build. Let’s shape a program around your goals."}</p><a href="mailto:hello@accent.in">hello@accent.in ↗</a><p className="enquiry-note">Individual learner? <Link href="/contact">Send us an enquiry.</Link></p></div><div className="enquiry-form" key={audience}><h3>{isCollege ? "Apply for an institutional MoU" : "Request an enterprise consultation"}</h3>{isCollege ? <MoUForm/> : <ConsultationForm/>}</div></div>}
  </div></section>;
}
