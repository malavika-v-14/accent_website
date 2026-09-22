import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconGraduate } from "./icons";

export default function Hero() {
  return <section className="hero-section">
    <div className="new-hero wrap">
      <div className="hero-copy animate-rise">
        <p className="section-kicker"><span /> BIG IDEAS. REAL-WORLD POSSIBILITIES.</p>
        <h1>A little curiosity.<br />A whole lot of<br /><span>possibility.</span><svg className="heading-swoosh" viewBox="0 0 400 20" fill="none" aria-hidden="true"><path d="M4 15C105 1 257 1 394 9M62 18C175 10 277 11 352 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></h1>
        <p className="hero-description">Build the skills. Meet your people. Find your next chapter. A learning ecosystem for ambitious students and forward-thinking teams.</p>
        <div className="hero-actions"><Link className="action-solid" href="/programs">Find your next step <IconArrowRight /></Link><Link className="action-text" href="/about"><span className="round-play" aria-hidden="true">↗</span> The Accent story</Link></div>
        <div className="hero-footnote"><span className="footnote-icon"><IconGraduate /></span><p>Rooted in Kozhikode. Built for what’s next.<br /><strong>Learning, connecting & growing since 2017.</strong></p></div>
      </div>
      <div className="hero-collage animate-rise">
        <div className="hero-photo"><Image src="/images/collaborate.jpg" alt="Learners sharing ideas and working together around laptops" fill priority sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /><div className="photo-shade" /><span className="photo-pill"><span /> REAL SKILLS. REAL CONNECTIONS.</span><div className="photo-caption"><span>GOOD THINGS HAPPEN</span><strong>when curious<br />minds connect.</strong></div><Link href="/programs" className="photo-arrow" aria-label="Explore learning programs">↗</Link></div>
        <div className="hero-stamp" aria-label="Learn, connect, grow"><span>LEARN · CONNECT</span><b aria-hidden="true">✳</b><span>GROW · REPEAT</span></div>
        <div className="hero-inset"><Image src="/images/campus.jpg" alt="Students connecting and learning together on campus" fill sizes="220px" className="object-cover" /><span>Made for your next chapter ↗</span></div>
        <div className="hero-note"><span className="note-symbol" aria-hidden="true">↗</span><div>Small beginnings.<br /><strong>Limitless possibilities.</strong></div></div>
        <span className="collage-scribble" aria-hidden="true">✳</span>
      </div>
    </div>
    <div className="hero-bottom wrap"><span>A WORLD OF LEARNING. YOUR WAY IN.</span><a href="#pathways">Take a look around <span>↓</span></a></div>
  </section>;
}
