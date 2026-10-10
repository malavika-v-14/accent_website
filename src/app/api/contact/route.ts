import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (name.length > 180 || email.length > 254 || (subject && subject.length > 180) || message.length > 5000 || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
  }

  const saved = await prisma.contactMessage.create({
    data: { name: name.trim(), email: email.trim().toLowerCase(), subject: subject?.trim() || null, message: message.trim() },
  });
  await prisma.analyticsEvent.create({ data: { type: "FORM_SUBMIT", page: "/contact", audience: "general" } });

  return NextResponse.json({ id: saved.id }, { status: 201 });
}
