import type { EventItem } from "@/types";

// Placeholder data so the /events page renders before a database is wired
// up. Once DATABASE_URL is set and `prisma db push` has run, swap the body
// of getEvents() below for the Prisma query underneath.
const fallbackEvents: EventItem[] = [
  {
    id: "1",
    title: "Building With Postgres: An Accent Talk",
    category: "Accent Talk",
    date: "2026-10-04",
    location: "Kozhikode",
    description: "An evening talk on schema design from someone who's had to undo a bad one in production.",
    isActive: true,
  },
  {
    id: "2",
    title: "React Fundamentals Workshop",
    category: "Workshop",
    date: "2026-10-11",
    location: "Kozhikode",
    description: "A hands-on day building a small app from an empty folder to something deployed.",
    isActive: true,
  },
  {
    id: "3",
    title: "Industrial Visit: A Manufacturing Floor",
    category: "Industrial Visit",
    date: "2026-10-18",
    location: "Kochi",
    description: "Seeing where the systems engineering talks actually run, on a factory floor.",
    isActive: true,
  },
  {
    id: "4",
    title: "Cloud Fundamentals Certification — Cohort 6",
    category: "Certification",
    date: "2026-11-02",
    location: "Online",
    description: "A four-week track ending in a graded project and an assessment.",
    isActive: true,
  },
];

export async function getEvents(): Promise<EventItem[]> {
  // Once a database is connected, replace this with something like:
  //
  // import { prisma } from "@/lib/db";
  // const events = await prisma.event.findMany({
  //   where: { isActive: true },
  //   orderBy: { date: "asc" },
  // });
  // return events.map(toEventItem);

  return fallbackEvents
    .filter((event) => event.isActive)
    .sort((a, b) => a.date.localeCompare(b.date));
}
