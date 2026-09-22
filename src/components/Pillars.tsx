"use client";

import { IconCompass, IconHandshake, IconBulb, IconTarget } from "@/components/icons";

const pillars = [
  {
    name: "Learn",
    icon: IconCompass,
    copy: "Skills built by doing, not just watching — workshops end with something you shipped.",
    back: "Every workshop closes with a working build — a script, a deployed page, a small tool — not just a slide deck to forget.",
  },
  {
    name: "Mentor",
    icon: IconHandshake,
    copy: "Everyone leading a session was on the other side of the table once.",
    back: "Our mentors are practitioners first, teachers second — engineers, designers and managers still doing the job on weekdays.",
  },
  {
    name: "Innovate",
    icon: IconBulb,
    copy: "Labs and site visits turn a theory into a thing you can point to.",
    back: "Accent Labs and industrial visits are where a workshop idea gets a second life as an actual project.",
  },
  {
    name: "Impact",
    icon: IconTarget,
    copy: "Measured in campuses reached and the companies that keep coming back.",
    back: "45+ partner campuses, 60+ companies engaged, and a growing list of programs that got renewed, not just run once.",
  },
];

export default function Pillars() {
  return (
    <section className="wrap py-24">
      <p className="eyebrow">What we stand on</p>
      <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-forest-deep md:text-4xl">
        Four ideas run through everything we build.
      </h2>
      <p className="mt-3 max-w-md text-sm text-ink-soft">Hover a card (or tap on mobile) to see what it looks like in practice.</p>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.name} className="group [perspective:1200px]" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative h-64 w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col rounded-2xl border border-[#E2ECE3] bg-white p-7 [backface-visibility:hidden]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-mint text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-forest-deep">{pillar.name}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{pillar.copy}</p>
                  <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wide text-leaf">
                    Flip for an example →
                  </span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="mb-4 text-sm font-semibold text-leaf">{pillar.name}, in practice</div>
                  <p className="text-sm leading-relaxed text-white/85">{pillar.back}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
