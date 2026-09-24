import { AdminError, field } from "./http";
import type { EventCategory } from "@prisma/client";

import { categoryLabels } from "@/lib/event-categories";

export function eventInput(body: Record<string, unknown>, options: { allowPast?: boolean } = {}) {
  const category = body.category;
  if (typeof category !== "string" || !Object.hasOwn(categoryLabels, category)) throw new AdminError("Choose a valid event category.");
  const value = field(body, "date", 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new AdminError("Choose a valid event date.");
  const date = new Date(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new AdminError("Choose a valid event date.");
  if (!options.allowPast) {
    const today = new Date(); today.setUTCHours(0, 0, 0, 0);
    if (date.getTime() < today.getTime()) throw new AdminError("Event date can't be in the past.");
  }
  if (typeof body.isActive !== "boolean") throw new AdminError("Choose draft or published status.");
  return { title: field(body, "title", 180), category: category as EventCategory, date, location: field(body, "location", 180), description: field(body, "description", 3000), isActive: body.isActive };
}