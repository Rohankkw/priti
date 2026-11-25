import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="overflow-hidden bg-[#0B1220] px-5 py-24 text-[#F7F3EC] lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              Traveller <span className="font-serif italic font-normal text-[#F4B942]">Chronicles</span>
            </h2>
            <p className="mt-2 text-base text-[#F7F3EC]/70">
              Drag or step through stories from guests who explored India with our concierge team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Draggable Slider */}
        <motion.div
          data-cursor="Drag"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_e, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
          className="mt-10 grid cursor-grab grid-cols-1 gap-6 active:cursor-grabbing lg:grid-cols-2"
        >
          {[0, 1].map((offset) => {
            const item = TESTIMONIALS[(index + offset) % TESTIMONIALS.length];
            return (
              <article
                key={`${item.id}-${offset}`}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121D32] p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-[#F4B942] text-[#F4B942]" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-[#FF9933]/40" />
                  </div>
                  <p className="mt-6 font-serif text-xl italic leading-relaxed text-[#F7F3EC]/95">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF9933] font-display text-xl text-[#0B1220]">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#F7F3EC]">
                      {item.name} · <span className="text-[#F4B942]">{item.city}</span>
                    </p>
                    <p className="text-xs text-[#F7F3EC]/65">{item.trip}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
