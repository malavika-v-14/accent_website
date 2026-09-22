import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { authorize, handleError, json, readBody } from "@/lib/admin/http";
import { eventInput } from "@/lib/admin/events";

export async function POST(request: Request) {
  try {
    await authorize(request);
    const event = await prisma.event.create({ data: eventInput(await readBody(request)) });
    revalidatePath("/events");
    revalidatePath("/admin");
    return json({ id: event.id }, 201);
  } catch (error) { return handleError(error); }
}
