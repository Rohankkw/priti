import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { POPULAR_DESTINATIONS, PopularDestination } from '../data/travelData';

interface PopularDestinationsProps {
  onSelectDestination: (dest: PopularDestination) => void;
}

const REGIONS = ['All', 'North', 'West', 'South', 'East', 'North-East', 'Islands'] as const;

export function PopularDestinations({ onSelectDestination }: PopularDestinationsProps) {
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>('All');

  const filtered =
    regionFilter === 'All'
      ? POPULAR_DESTINATIONS
      : POPULAR_DESTINATIONS.filter((d) => d.region === regionFilter);

  return (
    <section
      id="destinations"
      className="bg-[#F7F3EC] px-5 pt-20 pb-24 text-[#0B1220] lg:px-12 lg:pt-24 lg:pb-28"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 border-b border-[#0B1220]/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] text-[#0B1220] sm:text-6xl">
              Popular <span className="font-serif italic font-normal text-[#C86D10]">Destinations</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#0B1220]/70">
              Hand-curated Indian sanctuaries filmed in golden hour—hover any destination to preview starting concierge tariffs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter destinations by Indian region">
            {REGIONS.map((reg) => {
              const active = reg === regionFilter;
              return (
                <button
                  key={reg}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRegionFilter(reg)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? 'bg-[#0B1220] text-[#F7F3EC]'
                      : 'border border-[#0B1220]/15 bg-white/60 text-[#0B1220]/75 hover:border-[#FF9933] hover:text-[#0B1220]'
                  }`}
                >
                  {reg}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((dest) => (
            <article
              key={dest.id}
              data-cursor="View"
              onClick={() => onSelectDestination(dest)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#0B1220] shadow-[0_18px_40px_rgba(11,18,32,0.12)]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.state}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/35 to-transparent transition-opacity duration-300"
              />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-full bg-[#0B1220]/75 px-3 py-1 text-[11px] font-medium tracking-wide text-[#F4B942] backdrop-blur-md">
                  {dest.tag}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[#F7F3EC] opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-[#F7F3EC]">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#F4B942]">
                  {dest.state}
                </p>
                <h3 className="mt-1 font-display text-3xl tracking-wide leading-none">
                  {dest.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#F7F3EC]/80">
                  {dest.summary}
                </p>

                {/* Price reveal on hover / always readable on touch */}
                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
                  <span className="flex items-center gap-1.5 text-xs text-[#F7F3EC]/75">
                    <Clock className="h-3.5 w-3.5 text-[#FF9933]" />
                    {dest.duration}
                  </span>
                  <span className="text-sm font-semibold text-[#FF9933] transition-transform duration-300 group-hover:translate-x-0.5 tabular-nums">
                    from {dest.startingPrice}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
