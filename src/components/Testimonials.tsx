"use client";

import { useEffect, useState } from "react";
import { IconQuote } from "@/components/icons";

const testimonials = [
  {
    quote:
      "The workshop was the first time a 'guest session' actually changed how our final-years wrote code — they were still using the patterns weeks later.",
    name: "Placement Coordinator",
    context: "Partner engineering college",
    initials: "PC",
  },
  {
    quote:
      "We booked Accent for a one-off upskilling sprint and ended up signing a standing quarterly arrangement. The mentors clearly still write code for a living.",
    name: "L&D Lead",
    context: "Mid-size product company",
    initials: "LD",
  },
  {
    quote:
      "Accent Campus gave our chapter something to actually run between visits — not just a WhatsApp group that goes quiet after the event.",
    name: "Student Ambassador",
    context: "Accent Campus chapter lead",
    initials: "SA",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="wrap py-24">
      <p className="eyebrow">Word gets around</p>
      <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-forest-deep md:text-4xl">
        What campuses and companies say after the fact.
      </h2>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto h-32 w-32 shrink-0 lg:mx-0">
          <div
            key={t.initials}
            className="animate-pop-in flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-forest to-accent text-3xl font-extrabold text-white shadow-xl"
          >
            {t.initials}
          </div>
          <span className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-white shadow-lg">
            <IconQuote className="h-5 w-5" />
          </span>
        </div>

        <div key={t.quote} className="animate-rise">
          <p className="text-xl font-medium leading-relaxed text-forest-deep md:text-2xl">&ldquo;{t.quote}&rdquo;</p>
          <div className="mt-6 text-sm">
            <div className="font-bold text-forest-deep">{t.name}</div>
            <div className="text-ink-soft">{t.context}</div>
          </div>

          <div className="mt-8 flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-forest" : "w-2 bg-[#DCEBDF] hover:bg-leaf"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
