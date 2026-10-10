import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/auth";

export default async function DashboardPage() {
  const admin = await requireAdmin();
  let unavailable = false;
  let events = 0, drafts = 0, contacts = 0, mous = 0, consultations = 0;
  let recent: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    [events, drafts, contacts, mous, consultations, recent] = await Promise.all([
      prisma.event.count({ where: { isActive: true } }), prisma.event.count({ where: { isActive: false } }),
      prisma.contactMessage.count({ where: { status: "NEW" } }), prisma.moUApplication.count({ where: { status: "NEW" } }),
      prisma.consultationRequest.count({ where: { status: "NEW" } }), prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);
  } catch { unavailable = true; }
  const stats = [["Published events", events, "/admin/events?visibility=published"], ["New messages", contacts, "/admin/inquiries?kind=contact&status=NEW"], ["New MoU applications", mous, "/admin/inquiries?kind=mou&status=NEW"], ["New consultations", consultations, "/admin/inquiries?kind=consultation&status=NEW"]] as const;
  return <><header className="admin-page-header"><div><p className="admin-kicker">YOUR WORKSPACE AT A GLANCE</p><h1>Hello, {admin.name}.</h1><p>Keep your community informed and your conversations moving.</p></div><Link className="admin-button" href="/admin/events/new">Create event <span>+</span></Link></header>{unavailable && <p className="admin-notice admin-notice-error" role="alert">The database is temporarily unavailable. Counts and recent enquiries will return when the connection recovers.</p>}<div className="admin-stats">{stats.map(([label, value, href]) => <Link href={href} className="admin-stat" key={label}><span>{label}</span><strong>{unavailable ? "—" : value}</strong><b>View details</b></Link>)}</div><div className="admin-dashboard-grid"><section className="admin-panel"><div className="admin-panel-heading"><h2>Recent messages</h2><Link href="/admin/inquiries">View inbox</Link></div>{unavailable ? <div className="admin-empty"><h3>Inbox temporarily unavailable.</h3><p>Please try again when the database connection recovers.</p></div> : recent.length ? <div className="admin-recent-list">{recent.map(item => <Link href={`/admin/inquiries/contact/${item.id}`} key={item.id}><div><strong>{item.name}</strong><p>{item.subject || "General enquiry"}</p></div><span className="admin-badge" data-status={item.status}>{item.status.replaceAll("_", " ")}</span></Link>)}</div> : <div className="admin-empty"><h3>Your inbox is clear.</h3><p>New website enquiries will appear here.</p></div>}</section><section className="admin-panel"><p className="admin-kicker">KEEP THINGS GROWING</p><h2>Ready for what’s next.</h2><p className="admin-muted">{unavailable ? "Event information is temporarily unavailable." : `${drafts} event${drafts === 1 ? "" : "s"} in draft.`} Review upcoming experiences or update program information.</p><div className="admin-quick-links"><Link href="/admin/events?visibility=draft">Review draft events</Link><Link href="/admin/services">Edit service descriptions</Link><Link href="/admin/inquiries?kind=mou">Review college partnerships</Link></div></section></div></>;
}
