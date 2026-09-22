import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { serviceKeys } from "@/lib/service-defaults";
import { AdminError, authorize, field, handleError, json, readBody } from "@/lib/admin/http";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await authorize(request);
    if (!serviceKeys.some(s => s.id === params.id)) throw new AdminError("Service not found.", 404);
    const body = await readBody(request);
    const details = body.details;
    if (!Array.isArray(details) || details.length < 1 || details.length > 8 || details.some(d => typeof d !== "string" || !d.trim() || d.length > 200)) throw new AdminError("Add 1–8 detail lines, each up to 200 characters.");
    const data = { title: field(body, "title", 100), tag: field(body, "tag", 60), description: field(body, "description", 800), details: details.map(d => (d as string).trim()) };
    await prisma.serviceContent.upsert({ where: { id: params.id }, create: { id: params.id, ...data }, update: data });
    revalidateTag("service-content"); revalidatePath("/"); revalidatePath("/programs");
    return json({ ok: true });
  } catch (error) { return handleError(error); }
}
