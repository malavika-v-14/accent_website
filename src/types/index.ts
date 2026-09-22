export type Audience = "colleges" | "companies";

export interface ProgramItem {
  title: string;
  description: string;
}

export type EventCategory =
  | "Accent Talk"
  | "Technical Talk"
  | "Industrial Visit"
  | "Workshop"
  | "Certification";

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO date string
  location: string;
  description: string;
  isActive: boolean;
}
