import { prisma } from "@/lib/db";
import { consumeLoginAttempt, createSession } from "@/lib/admin/auth";
import { verifyPassword } from "@/lib/admin/password.mjs";
import { AdminError, assertSameOrigin, field, handleError, json, readBody, setSessionCookie } from "@/lib/admin/http";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await readBody(request);
    const email = field(body, "email", 254).toLowerCase();
    const password = body.password;
    if (typeof password !== "string" || !password || password.length > 128) throw new AdminError("Invalid email or password.", 401);
    const allowed = await consumeLoginAttempt(`email:${email}`);
    const globalAllowed = await consumeLoginAttempt("global-login", 100);
    if (!allowed || !globalAllowed) throw new AdminError("Too many sign-in attempts. Please wait 15 minutes before trying again.", 429);
    const user = await prisma.adminUser.findUnique({ where: { email } });
    const valid = await verifyPassword(password, user?.passwordHash);
    if (!valid || !user?.isActive) throw new AdminError("Invalid email or password.", 401);
    const token = await createSession(user.id);
    await Promise.all([prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } }), prisma.adminLoginAttempt.deleteMany({ where: { expiresAt: { lt: new Date() } } })]);
    return setSessionCookie(json({ ok: true }), token, request);
  } catch (error) { return handleError(error); }
}
