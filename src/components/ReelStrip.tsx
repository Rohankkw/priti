import { Film, Play } from 'lucide-react';
import { REEL_ITEMS } from '../data/travelData';

interface ReelStripProps {
  onSelectReel: (location: string) => void;
}

export function ReelStrip({ onSelectReel }: ReelStripProps) {
  return (
    <section className="bg-[#0B1220] px-5 py-20 text-[#F7F3EC] lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl tracking-[0.03em] sm:text-5xl">
              On Location <span className="font-serif italic font-normal text-[#F4B942]">Reels</span>
            </h2>
            <p className="mt-1 text-sm text-[#F7F3EC]/65">
              @prititravelshub — Live dispatches filmed across India by our journey captains.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FF9933]">
            <Film className="h-4 w-4" /> 9:16 Field Reels
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {REEL_ITEMS.map((reel) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => onSelectReel(reel.location)}
              className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-[#121D32] text-left"
            >
              <img
                src={reel.image}
                alt={`${reel.title} in ${reel.location}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-transparent to-[#0B1220]/30" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[#F7F3EC] backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-[#FF9933] group-hover:text-[#0B1220]">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#F4B942]">
                  {reel.location} · {reel.duration}
                </span>
                <span className="mt-0.5 block text-xs font-semibold leading-snug text-[#F7F3EC]">
                  {reel.title}
                </span>
                <span className="mt-1 block text-[10px] text-[#F7F3EC]/60 tabular-nums">
                  {reel.views} views
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
