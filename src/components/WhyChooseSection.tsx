import { useEffect, useRef, useState } from 'react';
import { Award, BadgeIndianRupee, Compass, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRUST_PILLARS, WHY_CHOOSE_STATS } from '../data/travelData';

gsap.registerPlugin(ScrollTrigger);

const PILLAR_ICONS = [Headphones, Compass, BadgeIndianRupee, Award];

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(WHY_CHOOSE_STATS.map((s) => s.value));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    const state = WHY_CHOOSE_STATS.map(() => ({ val: 0 }));

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          WHY_CHOOSE_STATS.forEach((stat, idx) => {
            gsap.to(state[idx], {
              val: stat.value,
              duration: 0.75,
              ease: 'power3.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[idx] = state[idx].val;
                  return next;
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B1220] px-5 py-24 text-[#F7F3EC] lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              Why <span className="font-serif italic font-normal text-[#F4B942]">Priti Travels Hub</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#F7F3EC]/75">
              Fourteen years of private hospitality relationships across 64 Indian destinations—built so you experience heritage India without logistical friction.
            </p>

            {/* Animated Counters */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              {WHY_CHOOSE_STATS.map((stat, idx) => {
                const formatted = stat.decimals
                  ? counts[idx].toFixed(stat.decimals)
                  : Math.round(counts[idx]).toLocaleString('en-IN');
                return (
                  <div key={stat.label}>
                    <p className="font-display text-4xl tracking-wide text-[#FF9933] tabular-nums sm:text-5xl">
                      {formatted}
                      {stat.suffix}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#F7F3EC]/65">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-[#121D32]/80 p-7 transition-colors hover:border-[#F4B942]/45"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF9933]/15 text-[#FF9933]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-wide text-[#F7F3EC]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F7F3EC]/70">
                    {pillar.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
