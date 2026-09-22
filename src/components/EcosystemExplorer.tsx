"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconMic, IconCertificate, IconBulb, IconUsers } from "./icons";

const initiatives = [
  { name: "Accent Talks", tag: "A NEW WAY TO SEE THINGS", title: "Big ideas begin with a conversation.", text: "Meet fresh perspectives through conversations with practitioners. Ask the questions that open up your next possibility.", image: "talk", icon: IconMic },
  { name: "Accent Tutors", tag: "A LITTLE GUIDANCE GOES A LONG WAY", title: "Find your direction. Build your confidence.", text: "Turn curiosity into capability with guided learning, mentorship and structured pathways that help you take the next step.", image: "workshop", icon: IconCertificate },
  { name: "Accent Labs", tag: "LESS WHAT IF. MORE LET’S TRY.", title: "Make space for your next big idea.", text: "Learn through experimentation. Bring concepts to life, explore practical challenges and discover what you can build.", image: "collaborate", icon: IconBulb },
  { name: "Accent Campus", tag: "YOUR COMMUNITY. YOUR POSSIBILITIES.", title: "Good things grow when we grow together.", text: "Connect campus learning with the world beyond it. Discover shared experiences, new perspectives and a community to grow with.", image: "campus", icon: IconUsers },
];

export default function EcosystemExplorer() {
  const [active, setActive] = useState(0);
  const item = initiatives[active];
  return <section className="ecosystem-section" data-reveal><div className="wrap">
    <div className="section-heading"><div><p className="section-kicker"><span /> ONE ECOSYSTEM. ENDLESS POSSIBILITIES.</p><h2>More than learning.<br /><em>A place to belong.</em></h2></div><p>Four ways to connect with something bigger.<br />Find the one that sparks your curiosity.</p></div>
    <div className="ecosystem-tabs" role="tablist" aria-label="Explore the Accent ecosystem">{initiatives.map((entry, index) => {const Icon = entry.icon; return <button key={entry.name} id={`ecosystem-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="ecosystem-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={e => {let next = index; if(e.key === "ArrowRight") next = (index + 1) % 4; else if(e.key === "ArrowLeft") next = (index + 3) % 4; else if(e.key === "Home") next = 0; else if(e.key === "End") next = 3; else return; e.preventDefault(); setActive(next); document.getElementById(`ecosystem-tab-${next}`)?.focus();}}><Icon /><span>{entry.name}</span><b>↗</b></button>;})}</div>
    <div className="ecosystem-panel" id="ecosystem-panel" role="tabpanel" aria-labelledby={`ecosystem-tab-${active}`} tabIndex={0}><div className="ecosystem-image"><Image key={item.image} src={`/images/${item.image}.jpg`} alt={`${item.name}: people sharing a learning experience`} fill sizes="(max-width: 767px) 90vw, 50vw" className="object-cover animate-rise" /><span className="ecosystem-image-tag">{item.name} ↗</span></div><div className="ecosystem-copy animate-rise" key={active}><span className="ecosystem-index">0{active + 1} / 04</span><p className="section-kicker">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p><Link href={`/about#${item.image}`} className="action-text">Discover our ecosystem <span>↗</span></Link></div></div>
  </div></section>;
}
