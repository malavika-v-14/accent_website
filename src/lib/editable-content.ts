import { prisma } from "@/lib/db";
import { offerings, resources } from "@/lib/offerings";
import type { ContentOverride } from "@prisma/client";

export const offeringKey = (audience: string, title: string) => `offering:${audience}:${title}`;
export const resourceKey = (audience: string, title: string) => `resource:${audience}:${title}`;

// Public content must still render when the optional database overrides are
// unavailable. Keep writes strict so an admin never sees a false save success.
async function readOverrides(prefix: "offering:" | "resource:"): Promise<ContentOverride[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    return await prisma.contentOverride.findMany({ where: { key: { startsWith: prefix } } });
  } catch {
    console.warn(`[public-content] Unable to load ${prefix} overrides; using built-in content.`);
    return [];
  }
}

export async function publicOfferings() {
  const overrides = await readOverrides("offering:"); const map = new Map(overrides.map(x => [x.key, x]));
  return offerings.map(item => { const entry = map.get(offeringKey(item.audience, item.title)); return entry ? { ...item, title: entry.title, line: entry.description, button: entry.button || item.button, status: (entry.status || item.status) as typeof item.status } : item; });
}

export async function publicResources() {
  const overrides = await readOverrides("resource:"); const map = new Map(overrides.map(x => [x.key, x]));
  return resources.map(item => { const entry = map.get(resourceKey(item[0], item[1])); return entry ? [item[0], entry.title, entry.description] as const : item; });
}
