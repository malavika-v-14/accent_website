import Link from "next/link";
export default function ClosingCta() {
  return <section className="closing-section wrap" data-reveal><div className="home-closing"><span className="closing-flower" aria-hidden="true">✳</span><div><p className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</p><h2>Good things start<br />with <em>a hello.</em></h2><p>A question, an idea, or a big ambition. We’re all ears.</p></div><Link href="/contact" className="action-solid">Let’s make it happen <span>↗</span></Link><span className="closing-ring" aria-hidden="true" /></div></section>;
}
