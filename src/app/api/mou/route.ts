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

  if (!institution || !contactName || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const saved = await prisma.moUApplication.create({
    data: { institution, contactName, email, phone, department, notes },
  });

  return NextResponse.json({ id: saved.id }, { status: 201 });
}
