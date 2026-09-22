import type { EventCategory } from "@prisma/client";
export const categoryLabels: Record<EventCategory, string> = {
  ACCENT_TALK: "Accent Talk", TECHNICAL_TALK: "Technical Talk", INDUSTRIAL_VISIT: "Industrial Visit", WORKSHOP: "Workshop", CERTIFICATION: "Certification",
};
