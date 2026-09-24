import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getInquiry, isInquiryKind, type InquiryKind } from "@/lib/admin/inquiries";
import { InquiryForm } from "@/components/admin/Forms";

const kindLabels: Record<InquiryKind, string> = {
  contact: "General enquiry",
  mou: "College partnership (MoU)",
  consultation: "Consultation request",
};

export default async function InquiryDetailPage({ params }: { params: { kind: string; id: string } }) {
  await requireAdmin();
  if (!isInquiryKind(params.kind)) notFound();
  const kind = params.kind;
  const inquiry = await getInquiry(kind, params.id);
  if (!inquiry) notFound();

  const displayName = "contactName" in inquiry ? inquiry.contactName : inquiry.name;

  return (
    <>
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">{kindLabels[kind].toUpperCase()}</p>
          <h1>{displayName}</h1>
          <p>Received {new Date(inquiry.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>
        </div>
        <Link className="admin-button admin-button-outline" href="/admin/inquiries">← Back to enquiries</Link>
      </header>
      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>Details</h2></div>
          <dl className="admin-detail-list">
            <div><dt>Email</dt><dd>{inquiry.email}</dd></div>
            {"phone" in inquiry && <div><dt>Phone</dt><dd>{inquiry.phone}</dd></div>}
            {"institution" in inquiry && <div><dt>Institution</dt><dd>{inquiry.institution}</dd></div>}
            {"department" in inquiry && inquiry.department && <div><dt>Department</dt><dd>{inquiry.department}</dd></div>}
            {"company" in inquiry && <div><dt>Company</dt><dd>{inquiry.company}</dd></div>}
            {"teamSize" in inquiry && inquiry.teamSize && <div><dt>Team size</dt><dd>{inquiry.teamSize}</dd></div>}
            {"interest" in inquiry && <div><dt>Interest</dt><dd>{inquiry.interest}</dd></div>}
            {"subject" in inquiry && inquiry.subject && <div><dt>Subject</dt><dd>{inquiry.subject}</dd></div>}
            {("message" in inquiry || "notes" in inquiry) && (
              <div><dt>Message</dt><dd>{("message" in inquiry ? inquiry.message : inquiry.notes) || "—"}</dd></div>
            )}
          </dl>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading"><h2>Manage</h2></div>
          <InquiryForm kind={kind} id={inquiry.id} status={inquiry.status} notes={inquiry.adminNotes || ""} />
        </section>
      </div>
    </>
  );
}