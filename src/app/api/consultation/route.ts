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

  if (!company || !contactName || !email || !interest) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const saved = await prisma.consultationRequest.create({
    data: { company, contactName, email, teamSize, interest, notes },
  });

  return NextResponse.json({ id: saved.id }, { status: 201 });
}
