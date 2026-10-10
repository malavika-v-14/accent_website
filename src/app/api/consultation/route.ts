import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { company, contactName, email, teamSize, interest, notes } = body as {
    company?: string;
    contactName?: string;
    email?: string;
    teamSize?: string;
    interest?: string;
    notes?: string;
  };

  if (typeof company !== "string" || typeof contactName !== "string" || typeof email !== "string" || typeof interest !== "string" || !company.trim() || !contactName.trim() || !email.trim() || !interest.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (company.length > 180 || contactName.length > 180 || email.length > 254 || interest.length > 1000 || (teamSize && teamSize.length > 100) || (notes && notes.length > 5000) || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
  }

  const saved = await prisma.consultationRequest.create({
    data: { company: company.trim(), contactName: contactName.trim(), email: email.trim().toLowerCase(), teamSize: teamSize?.trim() || null, interest: interest.trim(), notes: notes?.trim() || null },
  });
  await prisma.analyticsEvent.create({ data: { type: "FORM_SUBMIT", page: "/corporates", audience: "corporates" } });

  return NextResponse.json({ id: saved.id }, { status: 201 });
}
