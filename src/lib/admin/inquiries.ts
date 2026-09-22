import "server-only";
import { prisma } from "@/lib/db";
import { Prisma, type InquiryStatus } from "@prisma/client";

export const inquiryKinds = ["contact", "mou", "consultation"] as const;
export type InquiryKind = typeof inquiryKinds[number];
export const isInquiryKind = (kind: string): kind is InquiryKind => inquiryKinds.includes(kind as InquiryKind);
export const statusLabels: Record<InquiryStatus, string> = { NEW: "New", IN_PROGRESS: "In progress", RESOLVED: "Resolved", ARCHIVED: "Archived" };

export async function getInquiries(kind: InquiryKind, q: string, status: InquiryStatus | undefined, page: number) {
  const common = { status };
  const query = { contains: q, mode: Prisma.QueryMode.insensitive };
  const paging = { orderBy: { createdAt: "desc" as const }, take: 20, skip: (page - 1) * 20 };
  if (kind === "contact") {
    const where = { ...common, ...(q ? { OR: [{ name: query }, { email: query }, { subject: query }] } : {}) };
    const [rows, total] = await prisma.$transaction([prisma.contactMessage.findMany({ where, ...paging }), prisma.contactMessage.count({ where })]);
    return { total, rows: rows.map(r => ({ id: r.id, name: r.name, email: r.email, subject: r.subject || "General enquiry", status: r.status, createdAt: r.createdAt })) };
  }
  if (kind === "mou") {
    const where = { ...common, ...(q ? { OR: [{ institution: query }, { contactName: query }, { email: query }] } : {}) };
    const [rows, total] = await prisma.$transaction([prisma.moUApplication.findMany({ where, ...paging }), prisma.moUApplication.count({ where })]);
    return { total, rows: rows.map(r => ({ id: r.id, name: r.contactName, email: r.email, subject: r.institution, status: r.status, createdAt: r.createdAt })) };
  }
  const where = { ...common, ...(q ? { OR: [{ company: query }, { contactName: query }, { email: query }] } : {}) };
  const [rows, total] = await prisma.$transaction([prisma.consultationRequest.findMany({ where, ...paging }), prisma.consultationRequest.count({ where })]);
  return { total, rows: rows.map(r => ({ id: r.id, name: r.contactName, email: r.email, subject: `${r.company} · ${r.interest}`, status: r.status, createdAt: r.createdAt })) };
}

export async function getInquiry(kind: InquiryKind, id: string) {
  if (kind === "contact") return prisma.contactMessage.findUnique({ where: { id } });
  if (kind === "mou") return prisma.moUApplication.findUnique({ where: { id } });
  return prisma.consultationRequest.findUnique({ where: { id } });
}
