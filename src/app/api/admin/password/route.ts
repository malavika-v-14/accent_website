import { prisma } from "@/lib/db";
import { consumeLoginAttempt } from "@/lib/admin/auth";
import { hashPassword, verifyPassword } from "@/lib/admin/password.mjs";
import { AdminError, authorize, handleError, json, readBody, setSessionCookie } from "@/lib/admin/http";

export async function POST(request: Request) {
  try {
    const admin = await authorize(request);
    const body = await readBody(request);
    if (typeof body.currentPassword !== "string" || body.currentPassword.length > 128 || typeof body.password !== "string" || body.password.length < 12 || body.password.length > 128) throw new AdminError("Use a new password between 12 and 128 characters.");
    if (!(await consumeLoginAttempt(`password:${admin.id}`))) throw new AdminError("Too many attempts. Please try again in 15 minutes.", 429);
    const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: admin.id } });
    if (!(await verifyPassword(body.currentPassword, user.passwordHash))) throw new AdminError("Your current password is incorrect.");
    await prisma.$transaction([
      prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(body.password) } }),
      prisma.adminSession.deleteMany({ where: { adminId: admin.id } }),
    ]);
    return setSessionCookie(json({ ok: true }), "", request);
  } catch (error) { return handleError(error); }
}
