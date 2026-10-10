// Adds published sample master classes once. Re-running this script will not duplicate them.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const events = [
  {
    title: "Sample Masterclass: Build Your First AI Workflow",
    category: "WORKSHOP",
    date: new Date("2026-10-17T10:00:00+05:30"),
    location: "Kozhikode",
    description: "A hands-on sample masterclass on turning everyday tasks into practical AI-assisted workflows.",
  },
  {
    title: "Sample Masterclass: Interview Skills That Stand Out",
    category: "ACCENT_TALK",
    date: new Date("2026-10-24T14:00:00+05:30"),
    location: "Online",
    description: "A practical sample session on communicating your strengths, handling common interview questions and following up well.",
  },
  {
    title: "Sample Masterclass: Career Clarity for Graduates",
    category: "WORKSHOP",
    date: new Date("2026-11-07T10:00:00+05:30"),
    location: "Kochi",
    description: "A sample masterclass for exploring career directions, building a focused plan and taking the next useful step.",
  },
];

async function main() {
  for (const event of events) {
    const existing = await prisma.event.findFirst({ where: { title: event.title } });
    if (existing) {
      await prisma.event.update({ where: { id: existing.id }, data: { ...event, isActive: true } });
    } else {
      await prisma.event.create({ data: { ...event, isActive: true } });
    }
  }
  console.log(`Demo masterclasses are ready (${events.length} published events).`);
}

main().catch((error) => {
  console.error("Unable to seed demo masterclasses:", error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
