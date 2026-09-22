"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { iconForProgram, IconGraduate, IconBriefcase } from "./icons";
import MoUForm from "./MoUForm";
import ConsultationForm from "./ConsultationForm";

const college = [
  {title: "Technical Workshops", tag: "LEARN BY DOING", icon: "⌘", text: "Get hands-on with technology. Explore tools, practise new techniques and turn classroom concepts into working projects.", details: ["Practical, guided exercises", "Topics aligned with your students’ interests", "Space to build, ask and experiment"]},
  {title: "Technical Talks", tag: "FRESH PERSPECTIVES", icon: "↗", text: "Bring industry perspectives to campus through focused conversations on technology, emerging ideas and career possibilities.", details: ["Focused sessions on relevant topics", "Industry perspectives and career insights", "Interactive questions and discussion"]},
  {title: "Certification Programs", tag: "BUILD YOUR CREDENTIALS", icon: "✳", text: "Give learning a clear direction with structured programs that help students develop and demonstrate their skills.", details: ["A structured learning pathway", "Practice and assessment opportunities", "Certification scope agreed for each program"]},
  {title: "Industrial Visits", tag: "BEYOND THE CLASSROOM", icon: "↗", text: "Connect theory with the working world. Discover professional environments and see how teams put their knowledge into practice.", details: ["Exposure to workplace environments", "Connections between theory and practice", "Visit plans coordinated with the institution"]},
  {title: "MoUs", tag: "GROW TOGETHER", icon: "∞", text: "Build a lasting connection between your institution and Accent through an ongoing learning and development partnership.", details: ["An institutional partnership framework", "Programs planned around campus needs", "A shared approach to ongoing learning"]},
];
const employee = [
  {title: "Employee Engagement Programs", tag: "STRONGER CONNECTIONS", icon: "∞", text: "Create opportunities for colleagues to connect, collaborate and participate through purposeful team experiences.", details: ["Collaborative team activities", "Experiences shaped around your people", "A focus on participation and connection"]},
  {title: "Soft Skills Training", tag: "PEOPLE-FIRST GROWTH", icon: "↗", text: "Help your people communicate clearly, collaborate confidently and navigate everyday workplace situations.", details: ["Communication and presentation practice", "Collaboration and leadership topics", "Workplace scenarios and discussion"]},
  {title: "Technical Workshops", tag: "PRACTICAL EXPERTISE", icon: "⌘", text: "Bring focused, hands-on learning to your team with workshops shaped around relevant tools and technical challenges.", details: ["Practical technical exercises", "Topics scoped to your team’s needs", "A guided environment to experiment"]},
  {title: "Employee Upskilling Programs", tag: "READY FOR WHAT’S NEXT", icon: "↗", text: "Support your team’s next stage of growth with a structured learning journey that builds on the skills they already have.", details: ["Learning goals defined with your team", "A progressive program structure", "Opportunities to practise new skills"]},
  {title: "Certification Programs", tag: "RECOGNISE PROGRESS", icon: "✳", text: "Support professional development through focused certification programs aligned with your team’s learning priorities.", details: ["Role-relevant learning pathways", "Structured practice and assessment", "Certification scope agreed before delivery"]},
];
export default function ServiceCatalog({compact = false}: {compact?: boolean}) {
  const [audience, setAudience] = useState("colleges");
  const [expanded, setExpanded] = useState<number | null>(null);
  useEffect(() => {
    const sync = () => {const hash = window.location.hash; if (["#companies", "#employees"].includes(hash)) setAudience("companies"); else if (["#colleges", "#students"].includes(hash)) setAudience("colleges"); setExpanded(null);};
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync);
    return () => {window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync);};
  }, []);
  const isCollege = audience === "colleges";
  const services = isCollege ? college : employee;
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
