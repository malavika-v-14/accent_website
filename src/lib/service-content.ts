import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import { defaultCatalog, type ServiceCatalogData } from "./service-defaults";

export const getServiceCatalog = unstable_cache(async (): Promise<ServiceCatalogData> => {
  if (!process.env.DATABASE_URL) return defaultCatalog;
  const rows = await prisma.serviceContent.findMany();
  const merge = (audience: keyof ServiceCatalogData) => defaultCatalog[audience].map((service, index) => {
    const row = rows.find(row => row.id === `${audience}-${index}`);
    return row ? { ...service, title: row.title, tag: row.tag, text: row.description, details: row.details } : service;
  });
  return { colleges: merge("colleges"), companies: merge("companies") };
}, ["service-content"], { tags: ["service-content"], revalidate: 60 });
