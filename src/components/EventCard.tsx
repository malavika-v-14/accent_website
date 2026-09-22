import type { EventItem } from "@/types";
import { iconForEventCategory } from "@/components/icons";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  return diff;
}

const categoryColors: Record<string, string> = {
  "Accent Talk": "bg-leaf/15 text-forest",
  "Technical Talk": "bg-accent/15 text-accent",
  "Industrial Visit": "bg-mint text-forest",
  Workshop: "bg-mint text-forest",
  Certification: "bg-forest/10 text-forest-deep",
};

export default function EventCard({ event }: { event: EventItem }) {
  const Icon = iconForEventCategory(event.category);
  const diff = daysUntil(event.date);
  const badge = categoryColors[event.category] ?? "bg-mint text-forest";

  return (
    <div className="group card-glow flex flex-col gap-5 rounded-2xl border border-[#DCEBDF] bg-white p-7 sm:flex-row sm:items-start sm:justify-between hover:border-leaf">
      <div className="flex gap-4">
        <div className="event-date self-start"><strong>{new Date(event.date).getUTCDate()}</strong><span>{new Date(event.date).toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" })}</span></div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${badge}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-accent">{event.category}</span>
            {diff >= 0 && diff <= 30 && (
              <span className="rounded-full bg-leaf/20 px-2.5 py-0.5 text-[11px] font-bold text-forest-deep">
                {diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff} days`}
              </span>
            )}
          </div>
          <h3 className="mb-2 text-lg font-bold text-forest-deep">{event.title}</h3>
          <p className="max-w-lg text-sm leading-relaxed text-ink-soft">{event.description}</p>
        </div>
      </div>
      <div className="shrink-0 text-sm font-medium text-ink-soft sm:pl-4 sm:text-right">
        <div className="text-forest-deep">{formatDate(event.date)}</div>
        <div>{event.location}</div>
      </div>
    </div>
  );
}
