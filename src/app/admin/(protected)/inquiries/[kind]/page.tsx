import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { isInquiryKind } from "@/lib/admin/inquiries";

export default async function InquiryKindPage({ params }: { params: { kind: string } }) {
  await requireAdmin();
  if (!isInquiryKind(params.kind)) notFound();
  redirect(`/admin/inquiries?kind=${params.kind}`);
}
