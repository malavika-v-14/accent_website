import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, tokenHash } from "@/lib/admin/auth";
import { assertSameOrigin, handleError, json, setSessionCookie } from "@/lib/admin/http";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (token) await prisma.adminSession.deleteMany({ where: { tokenHash: tokenHash(token) } });
    return setSessionCookie(json({ ok: true }), "", request);
  } catch (error) { return handleError(error); }
}
