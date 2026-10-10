import { InquiryForm } from "./Inquiry";
import Link from "next/link";
import AccentMark from "./AccentMark";

export default function Footer() {
  return <footer className="new-footer"><div className="wrap">
    <section className="footer-callback" aria-label="Request a callback"><div><p className="section-kicker">LET'S TALK</p><h2>Request a callback.</h2><p>Tell us who you are and what you have in mind.</p></div><InquiryForm kind="callback" /></section>
    <div className="footer-main"><div><Link href="/" className="accent-logo"><AccentMark />accent<span>®</span></Link><p>A little curiosity.<br />A world of possibility.</p><span className="footer-location">Kozhikode, Kerala, India<br />Since 2017</span></div><div><h3>FIND YOUR PATH</h3><Link href="/programs">For Job Seekers</Link><Link href="/colleges">For College Students</Link><Link href="/corporates">For Employees</Link><Link href="/events">Upcoming events</Link><Link href="/about">Our story</Link></div><div><h3>LET'S CONNECT</h3><a href="mailto:hello@accent.in">hello@accent.in</a><a href="tel:+919497419212">+91 94974 19212</a><a href="https://instagram.com/accent.live">Instagram</a><Link href="/contact">Get in touch</Link></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Accent. All rights reserved.</span><span>Learn. Mentor. Innovate. Impact.</span><Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy policy</Link></div>
  </div></footer>;
}
