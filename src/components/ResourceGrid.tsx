import { resources, type Audience } from "@/lib/offerings";
export default function ResourceGrid({ audience }: { audience?: Audience }) {
 const list = audience ? resources.filter(r => r[0] === audience) : resources;
 return <div className="resource-grid">{list.map(([group,title,description]) => <article className="resource-card" key={title}><span>{group.replace("-", " ")}</span><h3>{title}</h3><p>{description}</p><button type="button" className="action-text" aria-label={`Download placeholder for ${title}`}>Download placeholder <b>↓</b></button></article>)}</div>;
}
