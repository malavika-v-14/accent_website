"use client";

import { useState } from "react";
import Image from "next/image";
import { photo } from "@/lib/images";

const initiatives = [
  {
    name: "Accent Talks",
    tagline: "The room where the next question gets asked.",
    copy: "Short, frequent talks that put a working professional in front of a room of students — no keynote formality.",
    image: photo("talk", 900),
  },
  {
    name: "Accent Tutors",
    tagline: "Certification tracks taught by people still doing the job.",
    copy: "Structured technical training with an assessment at the end that actually means something on a resume.",
    image: photo("mentor", 900),
  },
  {
    name: "Accent Labs",
    tagline: "Where a project outlives the workshop that started it.",
    copy: "Hands-on build spaces and industrial visits — the follow-through after the theory.",
    image: photo("workshop", 900),
  },
  {
    name: "Accent Campus",
    tagline: "The chapter that keeps running after the event ends.",
    copy: "Student-led ambassador groups that carry the community forward between visits.",
    image: photo("campus", 900),
  },
];

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const current = initiatives[active];

  return (
    <section className="bg-paper py-24">
      <div className="wrap">
        <p className="eyebrow">One ecosystem, four roots</p>
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-forest-deep md:text-4xl">
          Every program traces back to one of these.
        </h2>
        <p className="mt-4 max-w-lg text-ink-soft">
          They feed the same thing: a pipeline between classrooms and the
          companies waiting on the other side of them.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Tab list */}
          <div className="flex flex-col gap-2">
            {initiatives.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  active === i
                    ? "border-leaf bg-white shadow-lg shadow-forest/5"
                    : "border-transparent hover:border-[#DCEBDF] hover:bg-white/60"
                }`}
              >
                <span
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    active === i ? "bg-forest text-white" : "bg-mint text-forest"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className={`block text-sm font-semibold ${active === i ? "text-accent" : "text-ink-soft"}`}>
                    {item.name}
                  </span>
                  <span className="mt-1 block text-base font-bold leading-snug text-forest-deep">{item.tagline}</span>
                  {active === i && (
                    <span className="mt-2 block text-sm leading-relaxed text-ink-soft animate-rise">{item.copy}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Image panel */}
          <div key={current.name} className="animate-rise relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-forest/10">
            <Image src={current.image} alt={current.tagline} fill className="object-cover" unoptimized />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/85 to-transparent p-6 pt-16">
              <div className="text-sm font-semibold text-leaf">{current.name}</div>
              <div className="text-lg font-bold text-white">{current.tagline}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
