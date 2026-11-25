import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SpecialOffersSectionProps {
  onClaimOffer: () => void;
}

export function SpecialOffersSection({ onClaimOffer }: SpecialOffersSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(5 * 86400 + 14 * 3600 + 38 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!sectionRef.current || !bgLayerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgLayerRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  return (
    <section
      ref={sectionRef}
      id="offers"
      className="relative overflow-hidden bg-[#070C16] px-5 py-28 text-[#F7F3EC] lg:px-12 lg:py-32"
    >
      {/* Parallax layered Himalayas backdrop */}
      <div
        ref={bgLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-12%] opacity-40"
      >
        <img
          src="/assets/himachal%20pradesh.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/85 to-[#0B1220]/70"
      />

      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col justify-between gap-10 rounded-3xl border border-[#F4B942]/30 bg-[#0B1220]/75 p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:p-14">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF9933]/40 bg-[#FF9933]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#FF9933]">
            <Sparkles className="h-3.5 w-3.5" /> Seasonal Privilege · Save up to ₹18,000
          </span>
          <h2 className="mt-4 font-display text-5xl tracking-[0.03em] sm:text-6xl">
            Winter Royal India <span className="font-serif italic font-normal text-[#F4B942]">Early Edition</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#F7F3EC]/80">
            Reserve any 5+ night Rajasthan Palace, Kerala Houseboat, or Andaman Villa departure this week for complimentary private airport chauffeurs and room upgrades.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 lg:items-end">
          <div className="grid grid-cols-4 gap-3 text-center tabular-nums" aria-label="Offer countdown timer">
            {[
              { label: 'Days', val: days },
              { label: 'Hrs', val: hours },
              { label: 'Min', val: mins },
              { label: 'Sec', val: secs },
            ].map((unit) => (
              <div
                key={unit.label}
                className="min-w-[68px] rounded-xl border border-white/15 bg-white/5 px-3 py-3"
              >
                <span className="block font-display text-3xl text-[#F4B942] sm:text-4xl">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F7F3EC]/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClaimOffer}
            className="rounded-full bg-[#FF9933] px-8 py-3.5 text-sm font-semibold text-[#0B1220] shadow-lg transition-colors hover:bg-[#F4B942]"
          >
            Claim Seasonal Offer
          </button>
        </div>
      </div>
    </section>
  );
}
