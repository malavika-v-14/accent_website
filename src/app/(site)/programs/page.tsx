import type { Metadata } from "next";
import ServiceCatalog from "@/components/ManagedServiceCatalog";
export const metadata: Metadata = {title: "Services — Accent", description: "Technical workshops, talks, certifications, industrial visits and MoUs for colleges. Engagement, soft skills and upskilling for employees."};
const faqs = [
  ["How do we choose the right program?", "Start with your audience and learning goals. Share your priorities with Accent and we can discuss the most relevant service or a combination of programs."],
  ["Can a program be tailored to our needs?", "Use the enquiry form to tell us about your students or team, preferred topics and practical requirements. The scope and delivery plan can then be discussed with Accent."],
  ["How are dates, fees and certification confirmed?", "These depend on the program and its scope. Confirm the schedule, pricing and any certification requirements with Accent before booking."],
  ["Can individual students enquire?", "Yes. Individual students can use the Contact page to ask about learning opportunities. The institutional MoU form is intended for college representatives."],
];
export default function ProgramsPage() {return <><section className="services-hero wrap"><p className="section-kicker">ACCENT / SERVICES</p><h1>Skills for today.<br/><span>Possibilities for tomorrow.</span></h1><div className="services-hero-bottom"><p>Purposeful learning for college students and employees.<br/>Find the experience that moves you forward.</p><a href="#services" className="action-text">Find your next step <span>↓</span></a></div></section><ServiceCatalog/><section className="faq-section wrap"><div><p className="section-kicker">A LITTLE MORE CLARITY</p><h2>Good questions.<br/>Clear next steps.</h2><p>Still curious? <a href="/contact">Let’s talk ↗</a></p></div><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section></>}
