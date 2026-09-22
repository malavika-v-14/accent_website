import type { ProgramItem } from "@/types";
import { iconForProgram, IconArrowRight } from "@/components/icons";

export default function ProgramCard({ title, description }: ProgramItem) {
  const Icon = iconForProgram(title);

  return (
    <div className="group card-glow rounded-xl border border-[#DCEBDF] bg-white p-6 hover:border-leaf">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-mint text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-forest group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-base font-bold text-forest-deep transition-colors group-hover:text-accent">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-leaf opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
        Ask about this
        <IconArrowRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}
