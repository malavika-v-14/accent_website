import { requireAdmin } from "@/lib/admin/auth";
import { offerings, resources } from "@/lib/offerings";
import { offeringKey, resourceKey } from "@/lib/editable-content";
import ContentEditor from "@/components/admin/ContentEditor";
export default async function ContentPage() { await requireAdmin(); const offeringRows=offerings.map(x=>({key:offeringKey(x.audience,x.title),title:x.title,description:x.line,button:x.button,status:x.status})); const resourceRows=resources.map(x=>({key:resourceKey(x[0],x[1]),title:x[1],description:x[2]})); return <><header className="admin-page-header"><div><p className="admin-kicker">CONTENT</p><h1>Offerings & downloads</h1><p>Edit the content shown on public cards.</p></div></header><h2 className="admin-section-title">Offerings</h2><ContentEditor rows={offeringRows}/><h2 className="admin-section-title">Downloads</h2><ContentEditor rows={resourceRows}/></>; }
