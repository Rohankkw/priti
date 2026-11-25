import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_FRAMES } from '../data/travelData';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current || !trackRef.current) return;
    if (window.innerWidth < 1024) return;

    const track = trackRef.current;
    const scrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -Math.min(480, scrollAmount()),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollMobile = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden bg-[#F7F3EC] py-24 text-[#0B1220] lg:py-28"
    >
      <div className="mx-auto mb-10 flex max-w-[1320px] items-end justify-between px-5 lg:px-12">
        <div>
          <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
            Cinematography <span className="font-serif italic font-normal text-[#C86D10]">Archive</span>
          </h2>
          <p className="mt-2 max-w-lg text-base text-[#0B1220]/70">
            Frames captured across sunrise ghats, desert forts, and high Himalayan passes.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollMobile(-1)}
            aria-label="Scroll gallery left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B1220]/20 hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollMobile(1)}
            aria-label="Scroll gallery right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0B1220]/20 hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-5 no-scrollbar lg:overflow-visible lg:px-12"
      >
        {GALLERY_FRAMES.map((frame, i) => (
          <figure
            key={frame.id}
            data-cursor="View"
            className={`group relative shrink-0 overflow-hidden rounded-2xl bg-[#0B1220] shadow-xl ${
              i % 2 === 0 ? 'w-[300px] sm:w-[380px] h-[420px]' : 'w-[280px] sm:w-[320px] h-[420px]'
            }`}
          >
            <img
              src={frame.image}
              alt={`${frame.title} in ${frame.place}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 text-[#F7F3EC]">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4B942]">
                {frame.place}
              </span>
              <span className="mt-1 block font-display text-3xl tracking-wide">
                {frame.title}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
