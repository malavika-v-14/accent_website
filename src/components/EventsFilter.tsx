"use client";

import { useMemo, useState } from "react";
import type { EventCategory, EventItem } from "@/types";
import EventCard from "@/components/EventCard";

export default function EventsFilter({ events }: { events: EventItem[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((e) => e.category)));
    return unique as EventCategory[];
  }, [events]);

  const [active, setActive] = useState<EventCategory | "All">("All");

  const filtered = active === "All" ? events : events.filter((e) => e.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          aria-pressed={active === "All"}
          onClick={() => setActive("All")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === "All" ? "bg-forest text-white" : "bg-paper text-ink-soft hover:bg-mint"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat ? "bg-forest text-white" : "bg-paper text-ink-soft hover:bg-mint"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft">Nothing in this category right now.</p>
      ) : (
        <div className="flex flex-col gap-4" key={active}>
          {filtered.map((event) => (
            <div key={event.id} className="animate-rise">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
