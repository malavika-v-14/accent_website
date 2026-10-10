import { InquiryButton, type FormKind } from "./Inquiry";
import { type Audience } from "@/lib/offerings";
import { publicOfferings } from "@/lib/editable-content";
export default async function OfferingGrid({ audience }: { audience: Audience }) {
  const offerings = await publicOfferings();
  const sections = [...new Set(offerings.filter(x => x.audience === audience).map(x => x.group))];
  return <>{sections.map(group => <section className="offer-section wrap" key={group}><p className="section-kicker"><span /> {group.toUpperCase()}</p><div className="offering-grid">{offerings.filter(x => x.audience === audience && x.group === group).map(item => <article className="offering-card" key={item.title}><div>{item.status === "Planned" && <span className="soon">Opening soon</span>}<h3>{item.title}</h3><p>{item.line}</p></div><InquiryButton className="action-text" offering={item.title} audience={audience} kind={audience === "colleges" ? "college" : audience === "corporates" ? "corporate" : item.title === "Career guidance" ? "guidance" : item.title === "Opportunity updates" ? "updates" : item.button === "Reserve your seat" ? "master" : "callback"}>{item.button}</InquiryButton></article>)}</div></section>)}</>;
}
