import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { InquiryStatus } from "@prisma/client";
import { isInquiryKind, statusLabels } from "@/lib/admin/inquiries";
import { AdminError, authorize, handleError, json, readBody } from "@/lib/admin/http";

export async function PATCH(request: Request, { params }: { params: { kind: string; id: string } }) {
  try {
    await authorize(request);
    if (!isInquiryKind(params.kind)) throw new AdminError("Inbox not found.", 404);
    const body = await readBody(request);
    if (typeof body.status !== "string" || !Object.hasOwn(statusLabels, body.status)) throw new AdminError("Choose a valid enquiry status.");
    if (typeof body.adminNotes !== "string" || body.adminNotes.length > 5000) throw new AdminError("Internal notes must be under 5,000 characters.");
    const data = { status: body.status as InquiryStatus, adminNotes: body.adminNotes.trim() };
    if (params.kind === "contact") await prisma.contactMessage.update({ where: { id: params.id }, data });
    else if (params.kind === "mou") await prisma.moUApplication.update({ where: { id: params.id }, data });
    else await prisma.consultationRequest.update({ where: { id: params.id }, data });
    revalidatePath("/admin");
    return json({ ok: true });
  } catch (error) { return handleError(error); }
}
