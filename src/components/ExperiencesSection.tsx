import { ArrowRight } from 'lucide-react';
import { EXPERIENCE_THEMES } from '../data/travelData';

interface ExperiencesSectionProps {
  selectedTheme: string | null;
  onSelectTheme: (theme: string) => void;
}

export function ExperiencesSection({ selectedTheme, onSelectTheme }: ExperiencesSectionProps) {
  return (
    <section
      id="experiences"
      className="bg-[#0B1220] px-5 py-24 text-[#F7F3EC] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              Experiences <span className="font-serif italic font-normal text-[#F4B942]">by Mood</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#F7F3EC]/70">
              Every traveller arrives in India seeking a different rhythm. Choose your atmosphere to filter curated departures.
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#FF9933]">
            8 Signature Styles
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE_THEMES.map((item) => {
            const active = selectedTheme?.toLowerCase() === item.name.toLowerCase();
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTheme(item.name)}
                className={`group relative h-64 overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                  active ? 'ring-2 ring-[#FF9933]' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4B942]">
                    {item.count}
                  </span>
                  <h3 className="mt-1 flex items-center justify-between font-display text-3xl tracking-wide text-[#F7F3EC]">
                    <span>{item.name}</span>
                    <ArrowRight className="h-5 w-5 text-[#FF9933] transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-1 text-xs text-[#F7F3EC]/75">{item.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
