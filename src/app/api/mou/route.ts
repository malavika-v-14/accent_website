import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { institution, contactName, email, phone, department, notes } = body as {
    institution?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    department?: string;
    notes?: string;
  };

  if (typeof institution !== "string" || typeof contactName !== "string" || typeof email !== "string" || typeof phone !== "string" || !institution.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (institution.length > 180 || contactName.length > 180 || email.length > 254 || phone.length > 50 || (department && department.length > 180) || (notes && notes.length > 5000) || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
  }

  const saved = await prisma.moUApplication.create({
    data: { institution: institution.trim(), contactName: contactName.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), department: department?.trim() || null, notes: notes?.trim() || null },
  });
  await prisma.analyticsEvent.create({ data: { type: "FORM_SUBMIT", page: "/colleges", audience: "colleges" } });

  return NextResponse.json({ id: saved.id }, { status: 201 });
}
