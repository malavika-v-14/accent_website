import Link from "next/link";
import type { InquiryStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/admin/auth";
import { getInquiries, inquiryKinds, isInquiryKind, statusLabels, type InquiryKind } from "@/lib/admin/inquiries";

const kindLabels: Record<InquiryKind, string> = {
  contact: "General enquiries",
  mou: "College partnerships",
  consultation: "Consultations",
};

export default async function InquiriesPage({ searchParams }: { searchParams: { kind?: string; status?: string; q?: string; page?: string } }) {
  await requireAdmin();
  const kind: InquiryKind = isInquiryKind(searchParams.kind || "") ? (searchParams.kind as InquiryKind) : "contact";
  const status = searchParams.status && Object.hasOwn(statusLabels, searchParams.status) ? (searchParams.status as InquiryStatus) : undefined;
  const q = (searchParams.q || "").trim();
  const page = Math.max(1, Number(searchParams.page) || 1);
  const { rows, total } = await getInquiries(kind, q, status, page);
  const totalPages = Math.max(1, Math.ceil(total / 20));

  const linkFor = (overrides: { status?: string; page?: number }) => {
    const p = new URLSearchParams({ kind });
    if (q) p.set("q", q);
    if (status) p.set("status", status);
    if (overrides.status !== undefined) { if (overrides.status) p.set("status", overrides.status); else p.delete("status"); }
    if (overrides.page) p.set("page", String(overrides.page));
    return `/admin/inquiries?${p.toString()}`;
  };

  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">ENQUIRIES</p>
          <h1>Enquiries</h1>
          <p>Review and respond to messages from the website.</p>
        </div>
      </header>
      <div className="admin-tabs">
        {inquiryKinds.map((k) => (
          <Link key={k} href={`/admin/inquiries?kind=${k}`} className={k === kind ? "active" : undefined}>{kindLabels[k]}</Link>
        ))}
      </div>
      <form className="admin-toolbar" action="/admin/inquiries" method="get">
        <input type="hidden" name="kind" value={kind} />
        <input className="field" type="search" name="q" placeholder="Search by name or email…" defaultValue={q} />
        <select className="field" name="status" defaultValue={status || ""}>
          <option value="">All statuses</option>
          {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button className="admin-button admin-button-outline" type="submit">Filter</button>
      </form>
      {rows.length ? (
        <div className="admin-panel admin-table-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Link className="admin-table-link" href={`/admin/inquiries/${kind}/${row.id}`}>
                      <strong>{row.name}</strong>
                      <span className="admin-muted">{row.email}</span>
                    </Link>
                  </td>
                  <td>{row.subject}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td><span className="admin-badge" data-status={row.status}>{statusLabels[row.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-empty">
          <h3>No enquiries found.</h3>
          <p>Try a different filter or search.</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="admin-pagination">
          {page > 1 ? <Link href={linkFor({ page: page - 1 })}>← Previous</Link> : <span>← Previous</span>}
          <span>Page {page} of {totalPages}</span>
          {page < totalPages ? <Link href={linkFor({ page: page + 1 })}>Next →</Link> : <span>Next →</span>}
        </div>
      )}
    </>
  );
}