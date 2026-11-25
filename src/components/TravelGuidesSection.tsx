import { useState } from 'react';
import { ArrowUpRight, BookOpen, X } from 'lucide-react';
import { TRAVEL_GUIDES, TravelGuide } from '../data/travelData';

export function TravelGuidesSection() {
  const [activeGuide, setActiveGuide] = useState<TravelGuide | null>(null);

  return (
    <section id="guides" className="bg-[#F7F3EC] px-5 py-24 text-[#0B1220] lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-4 border-b border-[#0B1220]/10 pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              Field Notes & <span className="font-serif italic font-normal text-[#C86D10]">Travel Guides</span>
            </h2>
            <p className="mt-2 max-w-xl text-base text-[#0B1220]/70">
              Seasonal timing, route intelligence, and insider notes authored by our India specialists.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B1220]/60">
            Editorial Journal
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TRAVEL_GUIDES.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-[#0B1220]/10 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-[#C86D10]">
                  <span>{guide.category}</span>
                  <span className="text-[#0B1220]/50">{guide.readTime}</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#0B1220] group-hover:text-[#C86D10]">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0B1220]/70">{guide.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0B1220]">
                  Read Dispatch <ArrowUpRight className="h-3.5 w-3.5 text-[#FF9933]" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeGuide.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/80 p-5 backdrop-blur-md"
        >
          <div className="relative max-w-xl overflow-hidden rounded-2xl bg-[#F7F3EC] text-[#0B1220] shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveGuide(null)}
              aria-label="Close guide preview"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1220]/75 text-[#F7F3EC]"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={activeGuide.image} alt={activeGuide.title} className="h-56 w-full object-cover" />
            <div className="p-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C86D10]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>
                  {activeGuide.category} · {activeGuide.date} · {activeGuide.readTime}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-semibold">{activeGuide.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0B1220]/80">
                {activeGuide.excerpt} Our field specialists coordinate seasonal permits, sunrise monument slots, and verified boutique properties so your itinerary breathes naturally around local light and weather.
              </p>
              <button
                type="button"
                onClick={() => setActiveGuide(null)}
                className="mt-6 rounded-full bg-[#0B1220] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EC] hover:bg-[#FF9933] hover:text-[#0B1220]"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
