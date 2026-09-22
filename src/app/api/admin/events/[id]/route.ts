import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { authorize, handleError, json, readBody } from "@/lib/admin/http";
import { eventInput } from "@/lib/admin/events";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await authorize(request);
    await prisma.event.update({ where: { id: params.id }, data: eventInput(await readBody(request)) });
    revalidatePath("/events");
    revalidatePath("/admin");
    return json({ ok: true });
  } catch (error) { return handleError(error); }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await authorize(request);
    await prisma.event.delete({ where: { id: params.id } });
    revalidatePath("/events");
    revalidatePath("/admin");
    return json({ ok: true });
  } catch (error) { return handleError(error); }
}
