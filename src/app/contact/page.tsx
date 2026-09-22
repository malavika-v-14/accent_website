import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
export const metadata: Metadata = { title: "Say hello — Accent", description: "Start a conversation with Accent in Kozhikode. Get in touch about campus programs, corporate learning or your next big idea." };

export default function ContactPage() {
  return <section className="page-hero wrap"><div className="page-hero-copy animate-rise"><p className="section-kicker"><span /> A CONVERSATION CAN CHANGE THINGS</p><h1>Big plans? Small question?<br /><em>Let’s talk.</em></h1><p>Tell us what’s on your mind. We’ll help you find your next step.</p></div><div className="contact-layout">
    <div><div className="contact-info"><div><h3>COME FIND US</h3><p>Kozhikode, Kerala<br />India</p></div><div><h3>GIVE US A RING</h3><a href="tel:+919497419212">+91 94974 19212 ↗</a></div><div><h3>DROP A NOTE</h3><a href="mailto:hello@accent.in">hello@accent.in ↗</a></div><div><h3>STAY IN THE LOOP</h3><a href="https://instagram.com/accent.live" target="_blank" rel="noreferrer">@accent.live ↗</a></div></div><div className="contact-map"><iframe title="Kozhikode, Kerala — Accent's home city" src="https://www.google.com/maps?q=Kozhikode,Kerala,India&output=embed" width="100%" height="280" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><p className="mt-4 text-xs leading-relaxed text-ink-soft">Based in Kozhikode. Connected by curiosity.</p></div>
    <div className="contact-form-panel"><p className="section-kicker"><span /> YOUR NEXT CHAPTER</p><h2>Start with a hello.</h2><p>A little about you, a little about your idea.<br />We’ll take it from there.</p><ContactForm /></div>
  </div></section>;
}
