import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/admin/password.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    return NextResponse.json({ error: "ADMIN_EMAIL or ADMIN_PASSWORD not set" }, { status: 400 });
  }
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    return NextResponse.json({ message: "An admin already exists — nothing to do." });
  }
  const passwordHash = await hashPassword(password);
  const admin = await prisma.adminUser.create({
    data: { email, name: "Admin", passwordHash },
  });
  return NextResponse.json({ message: `Admin created: ${admin.email}` });
}