import "server-only";
import { NextResponse } from "next/server";
import { getAdmin, SESSION_COOKIE, SESSION_SECONDS } from "./auth";

export class AdminError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export function assertSameOrigin(request: Request) {
  const expected = process.env.APP_ORIGIN || new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(expected).origin) throw new AdminError("This request could not be verified. Refresh the page and try again.", 403);
}

export async function authorize(request: Request) {
  if (!["GET", "HEAD"].includes(request.method)) assertSameOrigin(request);
  const admin = await getAdmin();
  if (!admin) throw new AdminError("Please sign in to continue.", 401);
  return admin;
}

export async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new AdminError("Expected a JSON request.", 415);
  const text = await request.text();
  if (text.length > 32000) throw new AdminError("The submitted content is too large.", 413);
  try {
    const value = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new AdminError("The submitted data is invalid."); }
}

export function field(body: Record<string, unknown>, key: string, max: number, min = 1) {
  const value = body[key];
  if (typeof value !== "string" || value.trim().length < min || value.trim().length > max) throw new AdminError(`${key} must contain ${min}–${max} characters.`);
  return value.trim();
}

export function setSessionCookie(response: NextResponse, token: string, request: Request) {
  const secure = new URL(process.env.APP_ORIGIN || request.url).protocol === "https:";
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure, sameSite: "strict", path: "/", maxAge: token ? SESSION_SECONDS : 0 });
  return response;
}

export function handleError(error: unknown) {
  if (error instanceof AdminError) return json({ error: error.message }, error.status);
  if (error && typeof error === "object" && "code" in error && error.code === "P2025") return json({ error: "This record no longer exists. Refresh the page." }, 404);
  console.error("Admin operation failed; check database availability.");
  return json({ error: "Unable to complete the request. Please try again or check the database connection." }, 503);
}
