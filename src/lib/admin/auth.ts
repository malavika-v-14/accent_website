import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const SESSION_COOKIE = "accent_admin_session";
export const SESSION_SECONDS = 8 * 60 * 60;
export const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

export async function getAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: tokenHash(token) },
    select: { expiresAt: true, admin: { select: { id: true, email: true, name: true, isActive: true } } },
  });
  if (!session || session.expiresAt <= new Date() || !session.admin.isActive) return null;
  return session.admin;
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function createSession(adminId: string) {
  const token = randomBytes(32).toString("hex");
  await prisma.adminSession.create({ data: { adminId, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + SESSION_SECONDS * 1000) } });
  return token;
}

export async function consumeLoginAttempt(identity: string, limit = 5) {
  const windowMs = 15 * 60 * 1000;
  const window = Math.floor(Date.now() / windowMs);
  const attempt = await prisma.adminLoginAttempt.upsert({
    where: { key: `${tokenHash(identity)}:${window}` },
    create: { key: `${tokenHash(identity)}:${window}`, expiresAt: new Date((window + 1) * windowMs) },
    update: { count: { increment: 1 } },
  });
  return attempt.count <= limit;
}
