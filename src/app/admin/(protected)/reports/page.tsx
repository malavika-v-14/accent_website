import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/db";

export default async function ReportsPage() {
  await requireAdmin();
  const now = new Date(); const start = new Date(now); start.setDate(now.getDate() - 6); start.setHours(0, 0, 0, 0);
  const [views, submissions, byPage, byAudience] = await Promise.all([
    prisma.analyticsEvent.count({ where: { type: "PAGE_VIEW", createdAt: { gte: start } } }),
    prisma.analyticsEvent.count({ where: { type: "FORM_SUBMIT", createdAt: { gte: start } } }),
    prisma.analyticsEvent.groupBy({ by: ["page"], where: { type: "PAGE_VIEW", createdAt: { gte: start } }, _count: { _all: true }, orderBy: { _count: { page: "desc" } } }),
    prisma.analyticsEvent.groupBy({ by: ["audience"], where: { type: "FORM_SUBMIT", createdAt: { gte: start } }, _count: { _all: true }, orderBy: { _count: { audience: "desc" } } }),
  ]);
  const rate = views ? ((submissions / views) * 100).toFixed(1) : "0.0";
  return <><header className="admin-page-header"><div><p className="admin-kicker">REPORTING</p><h1>Weekly conversion report</h1><p>First-party visits and submitted forms from the last seven days.</p></div></header><div className="admin-stats">{[["Page views", views], ["Form submissions", submissions], ["Conversion rate", `${rate}%`]].map(([label, value]) => <div className="admin-stat" key={String(label)}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="admin-dashboard-grid"><section className="admin-panel"><div className="admin-panel-heading"><h2>Visits by page</h2></div>{byPage.length ? <dl className="admin-detail-list">{byPage.map(x => <div key={x.page || "unknown"}><dt>{x.page || "Unknown"}</dt><dd>{x._count._all}</dd></div>)}</dl> : <div className="admin-empty"><h3>No visits recorded yet.</h3><p>Visits will appear after the updated site is deployed.</p></div>}</section><section className="admin-panel"><div className="admin-panel-heading"><h2>Conversions by audience</h2></div>{byAudience.length ? <dl className="admin-detail-list">{byAudience.map(x => <div key={x.audience || "unknown"}><dt>{x.audience || "Unknown"}</dt><dd>{x._count._all}</dd></div>)}</dl> : <div className="admin-empty"><h3>No submissions this week.</h3><p>Submitted website forms will appear here.</p></div>}</section></div></>;
}
