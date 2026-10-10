import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { page?: unknown };
    if (typeof body.page !== "string" || !body.page.startsWith("/") || body.page.length > 300) return NextResponse.json({ error: "Invalid page." }, { status: 400 });
    await prisma.analyticsEvent.create({ data: { type: "PAGE_VIEW", page: body.page } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ ok: false }, { status: 202 }); }
}
