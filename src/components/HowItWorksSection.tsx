import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOW_IT_WORKS_STEPS } from '../data/travelData';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'bottom 55%',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(path, { strokeDashoffset: totalLength * (1 - p) });
          const stepIdx = Math.min(3, Math.floor(p * 4));
          setActiveStep(stepIdx);

          if (planeRef.current) {
            const pt = path.getPointAtLength(totalLength * p);
            const nextPt = path.getPointAtLength(Math.min(totalLength, totalLength * p + 2));
            const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
            planeRef.current.setAttribute(
              'transform',
              `translate(${pt.x}, ${pt.y}) rotate(${angle})`
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-[#F7F3EC] px-5 py-24 text-[#0B1220] lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              How Your Journey <span className="font-serif italic font-normal text-[#C86D10]">Unfolds</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#0B1220]/70">
              From your first destination spark to arriving at a candlelit courtyard, every mile is choreographed in four calm stages.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#138808]">
            Scroll to Trace Route
          </span>
        </div>

        {/* Scroll-driven SVG flight/rail path connecting Indian hubs */}
        <div className="relative mt-12">
          <svg
            viewBox="0 0 1200 130"
            className="hidden w-full overflow-visible lg:block"
            aria-hidden="true"
          >
            {/* Base subtle dotted guide */}
            <path
              d="M 60 85 Q 240 18 420 75 T 780 65 T 1140 50"
              fill="none"
              stroke="#0B1220"
              strokeOpacity="0.14"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            {/* Animated saffron route line */}
            <path
              ref={pathRef}
              d="M 60 85 Q 240 18 420 75 T 780 65 T 1140 50"
              fill="none"
              stroke="#FF9933"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Route hub dots */}
            {[
              { x: 60, y: 85, city: 'Delhi / Udaipur' },
              { x: 420, y: 75, city: 'Concierge Studio' },
              { x: 780, y: 65, city: 'Kerala / Ladakh' },
              { x: 1140, y: 50, city: 'Sanctuary Arrival' },
            ].map((hub, idx) => (
              <g key={hub.city}>
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={idx <= activeStep ? 8 : 5}
                  fill={idx <= activeStep ? '#FF9933' : '#0B1220'}
                  fillOpacity={idx <= activeStep ? 1 : 0.3}
                />
                <text
                  x={hub.x}
                  y={hub.y + 28}
                  textAnchor="middle"
                  fill="#0B1220"
                  fillOpacity="0.65"
                  fontSize="12"
                  fontWeight="600"
                >
                  {hub.city}
                </text>
              </g>
            ))}

            {/* Animated plane icon following path */}
            <g ref={planeRef} transform="translate(60, 85)">
              <circle r="16" fill="#0B1220" />
              <path
                d="M-6 0 L4 -5 L2 -1 L8 0 L2 1 L4 5 Z"
                fill="#F4B942"
              />
            </g>
          </svg>

          {/* 4 Steps Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((item, idx) => {
              const active = idx === activeStep;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col justify-between rounded-2xl border p-7 text-left transition-all duration-300 ${
                    active
                      ? 'border-[#FF9933] bg-[#0B1220] text-[#F7F3EC] shadow-[0_24px_48px_rgba(11,18,32,0.18)]'
                      : 'border-[#0B1220]/10 bg-white text-[#0B1220] hover:border-[#0B1220]/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display text-4xl tracking-wider ${
                          active ? 'text-[#FF9933]' : 'text-[#0B1220]/30'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          active ? 'bg-[#138808]' : 'bg-[#0B1220]/15'
                        }`}
                      />
                    </div>
                    <h3 className="mt-5 font-display text-4xl tracking-wide">
                      {item.title}
                    </h3>
                    <p
                      className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        active ? 'text-[#F4B942]' : 'text-[#C86D10]'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      active ? 'text-[#F7F3EC]/80' : 'text-[#0B1220]/70'
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
