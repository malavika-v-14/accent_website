import AnimatedNumber from "@/components/AnimatedNumber";
import { IconLayers, IconTarget, IconGraduate, IconBriefcase } from "@/components/icons";

const stats = [
  { value: "180+", label: "Programs run", icon: IconLayers },
  { value: "8", label: "Years, since 2017", icon: IconTarget },
  { value: "45+", label: "Partner campuses", icon: IconGraduate },
  { value: "60+", label: "Companies engaged", icon: IconBriefcase },
];

export default function GrowthRings() {
  return (
    <div className="wrap relative z-10 -mt-14 md:-mt-20">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mint bg-mint shadow-xl shadow-forest/10 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="group bg-white px-6 py-9 text-center transition-colors hover:bg-paper">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-mint text-accent transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <AnimatedNumber value={stat.value} />
              <div className="mt-1 text-sm font-medium text-ink-soft">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
