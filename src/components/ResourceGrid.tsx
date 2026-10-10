import { InquiryButton } from "./Inquiry";
import { type Audience } from "@/lib/offerings";
import { publicResources } from "@/lib/editable-content";
export default async function ResourceGrid({ audience }: { audience?: Audience }) {
 const resources = await publicResources(); const list = audience ? resources.filter(r => r[0] === audience) : resources;
 return <div className="resource-grid">{list.map(([group,title,description]) => <article className="resource-card" key={title}><span>{group.replace("-", " ")}</span><h3>{title}</h3><p>{description}</p><InquiryButton kind="download" offering={title} audience={group} className="action-text">Download</InquiryButton></article>)}</div>;
}
