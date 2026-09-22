import Link from "next/link";
import Image from "next/image";
import { IconGraduate, IconBriefcase, IconArrowRight } from "@/components/icons";
import { photo } from "@/lib/images";

export default function AudienceTeaser() {
  return (
    <section className="wrap py-24">
      <p className="eyebrow">Two sides of the same pipeline</p>
      <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-forest-deep md:text-4xl">
        Built for wherever you're standing right now.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/programs#colleges"
          className="group relative overflow-hidden rounded-2xl p-10 text-white transition-transform hover:-translate-y-1"
        >
          <Image
            src={photo("campus", 900)}
            alt=""
            fill
            className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-forest/90 to-forest-deep/95" />
          <div className="relative">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-leaf">
              <IconGraduate />
            </div>
            <div className="mb-2 text-sm font-semibold text-leaf">For college students</div>
            <h3 className="mb-3 text-2xl font-extrabold">Get in front of the people hiring.</h3>
            <p className="text-sm leading-relaxed text-white/75">
              Technical workshops, certification tracks and industrial visits —
              plus how your campus can set up a partnership with us.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf transition-transform group-hover:translate-x-1">
              See the college programs
              <IconArrowRight />
            </span>
          </div>
        </Link>

        <Link
          href="/programs#companies"
          className="group relative overflow-hidden rounded-2xl p-10 text-white transition-transform hover:-translate-y-1"
        >
          <Image
            src={photo("corporate", 900)}
            alt=""
            fill
            className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#123D22]/95 via-accent/85 to-[#0d2b18]/95" />
          <div className="relative">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-mint">
              <IconBriefcase />
            </div>
            <div className="mb-2 text-sm font-semibold text-leaf">For companies</div>
            <h3 className="mb-3 text-2xl font-extrabold">Build the pipeline before you need it.</h3>
            <p className="text-sm leading-relaxed text-white/80">
              Employee upskilling, soft-skills training and engagement programs
              — with a direct line to book a consultation.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mint transition-transform group-hover:translate-x-1">
              See the company programs
              <IconArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
