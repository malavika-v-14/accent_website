import Link from "next/link";
import { offerings, type Audience } from "@/lib/offerings";
export default function OfferingGrid({ audience }: { audience: Audience }) {
  const sections = [...new Set(offerings.filter(x => x.audience === audience).map(x => x.group))];
  return <>{sections.map(group => <section className="offer-section wrap" key={group}><p className="section-kicker"><span /> {group.toUpperCase()}</p><div className="offering-grid">{offerings.filter(x => x.audience === audience && x.group === group).map(item => <article className="offering-card" key={item.title}><div>{item.status === "Planned" && <span className="soon">Opening soon</span>}<h3>{item.title}</h3><p>{item.line}</p></div><Link href="/contact" className="action-text">{item.button} <span>→</span></Link></article>)}</div></section>)}</>;
}
