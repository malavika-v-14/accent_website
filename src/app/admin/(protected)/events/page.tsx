import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/auth";
import { categoryLabels } from "@/lib/event-categories";

export default async function EventsPage({ searchParams }: { searchParams: { visibility?: string; saved?: string; deleted?: string } }) {
  await requireAdmin();
  const visibility = searchParams.visibility === "draft" ? false : searchParams.visibility === "published" ? true : undefined;
  const events = await prisma.event.findMany({ where: visibility === undefined ? {} : { isActive: visibility }, orderBy: { date: "desc" } });
  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">EVENTS</p>
          <h1>Events</h1>
          <p>Manage what appears on the public events page.</p>
        </div>
        <Link className="admin-button" href="/admin/events/new">Create event <span>+</span></Link>
      </header>
      {searchParams.saved && <p className="admin-notice" role="status">Event saved.</p>}
      {searchParams.deleted && <p className="admin-notice" role="status">Event deleted.</p>}
      <div className="admin-tabs">
        <Link href="/admin/events" className={!searchParams.visibility ? "active" : undefined}>All</Link>
        <Link href="/admin/events?visibility=published" className={searchParams.visibility === "published" ? "active" : undefined}>Published</Link>
        <Link href="/admin/events?visibility=draft" className={searchParams.visibility === "draft" ? "active" : undefined}>Draft</Link>
      </div>
      {events.length ? (
        <div className="admin-panel admin-table-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td><Link className="admin-table-link" href={`/admin/events/${event.id}`}>{event.title}</Link></td>
                  <td>{categoryLabels[event.category]}</td>
                  <td>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td>{event.location}</td>
                  <td><span className="admin-badge" data-status={event.isActive ? "PUBLISHED" : "DRAFT"}>{event.isActive ? "Published" : "Draft"}</span></td>
                  <td><Link className="admin-text-link" href={`/admin/events/${event.id}`}>Edit{event.isActive ? "" : " / Publish"} →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-empty">
          <h3>No events found.</h3>
          <p>{visibility === undefined ? "Create your first event to see it here." : "Try a different filter."}</p>
        </div>
      )}
    </>
  );
}