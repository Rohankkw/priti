import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_DESTINATIONS, HeroDestination } from '../data/travelData';
import { QuickSearchBar, SearchFilter } from './QuickSearchBar';

interface HeroSectionProps {
  onDiscoverLocation: (destination: HeroDestination) => void;
  onQuickSearch: (filter: SearchFilter) => void;
}

interface RevealExpand {
  id: number;
  targetIdx: number;
  shiftSteps: number;
  hiddenCardId: string;
  image: string;
  alt: string;
  startTransform: string;
  startClip: string;
}

export function HeroSection({ onDiscoverLocation, onQuickSearch }: HeroSectionProps) {
  // activeIndex drives headline/backdrop; carouselIndex stays locked until card expansion finishes
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [activeReveal, setActiveReveal] = useState<RevealExpand | null>(null);
  const [titleRevealKey, setTitleRevealKey] = useState(0);
  const [pendingShiftSteps, setPendingShiftSteps] = useState(0);

  const backdropContainerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const revealIdRef = useRef(0);
  const animRef = useRef<Animation | null>(null);
  const trackAnimRef = useRef<Animation | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const total = HERO_DESTINATIONS.length;
  const activeDest = HERO_DESTINATIONS[activeIndex];
  const settledDest = HERO_DESTINATIONS[settledIndex];

  // Carousel stays anchored to carouselIndex while the selected card expands behind sibling cards
  const visibleCards = useMemo(() => {
    return [1, 2, 3, 4].map((offset) => {
      const idx = (carouselIndex + offset) % total;
      return { dest: HERO_DESTINATIONS[idx], idx, offset };
    });
  }, [carouselIndex, total]);

  // Smooth horizontal slider shift on the track immediately after carouselIndex updates
  useLayoutEffect(() => {
    if (pendingShiftSteps === 0 || !carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const firstCard = cardRefs.current[0];
    if (!firstCard) return;

    trackAnimRef.current?.cancel();
    if (reducedMotionRef.current) {
      setPendingShiftSteps(0);
      return;
    }

    // Card width + gap (21px / 1.4vw) in track pixels
    const cardW = firstCard.getBoundingClientRect().width;
    const gapPx = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '20') || 20;
    const startOffsetPx = pendingShiftSteps * (cardW + gapPx);

    const anim = track.animate(
      [
        { transform: `translate3d(${startOffsetPx.toFixed(1)}px, 0, 0)` },
        { transform: 'translate3d(0px, 0, 0)' },
      ],
      {
        duration: 380,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'none',
      }
    );

    trackAnimRef.current = anim;
    anim.onfinish = () => {
      setPendingShiftSteps(0);
    };
    anim.oncancel = () => {
      setPendingShiftSteps(0);
    };
  }, [carouselIndex, pendingShiftSteps]);

  // GPU-composited FLIP uniform-scale + clip-path expansion so the card itself expands behind other cards
  useEffect(() => {
    if (!activeReveal || !revealLayerRef.current) return;
    const el = revealLayerRef.current;

    animRef.current?.cancel();

    const prefersReduced = reducedMotionRef.current;
    const keyframes: Keyframe[] = prefersReduced
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [
          {
            transform: activeReveal.startTransform,
            clipPath: activeReveal.startClip,
          },
          {
            transform: 'translate3d(0px, 0px, 0px) scale(1)',
            clipPath: 'inset(0px 0px 0px 0px)',
          },
        ];

    const anim = el.animate(keyframes, {
      duration: prefersReduced ? 200 : 460,
      easing: prefersReduced
        ? 'cubic-bezier(0.23, 1, 0.32, 1)'
        : 'cubic-bezier(0.77, 0, 0.175, 1)',
      fill: 'forwards',
    });

    animRef.current = anim;
    const completedIdx = activeReveal.targetIdx;
    const shiftSteps = activeReveal.shiftSteps;
    const currentId = activeReveal.id;

    anim.onfinish = () => {
      setSettledIndex(completedIdx);
      setPendingShiftSteps(shiftSteps);
      setCarouselIndex(completedIdx);
      setActiveReveal((curr) => (curr?.id === currentId ? null : curr));
    };

    return () => {
      anim.cancel();
    };
  }, [activeReveal]);

  const activateDestination = useCallback(
    (targetIdx: number, sourceCardEl?: HTMLElement | null, explicitShift?: number) => {
      const normalized = ((targetIdx % total) + total) % total;
      if (normalized === activeIndex) return;

      const forwardDelta = (normalized - carouselIndex + total) % total;
      const shiftSteps =
        explicitShift !== undefined
          ? explicitShift
          : forwardDelta <= 4
          ? forwardDelta
          : -1;

      const nextDest = HERO_DESTINATIONS[normalized];

      if (sourceCardEl && backdropContainerRef.current) {
        const bgRect = backdropContainerRef.current.getBoundingClientRect();
        const cardRect = sourceCardEl.getBoundingClientRect();

        const scaleX = cardRect.width / bgRect.width;
        const scaleY = cardRect.height / bgRect.height;
        const scale = Math.max(scaleX, scaleY);

        const bgCenterX = bgRect.left + bgRect.width / 2;
        const bgCenterY = bgRect.top + bgRect.height / 2;
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const tx = cardCenterX - bgCenterX;
        const ty = cardCenterY - bgCenterY;

        const scaledW = bgRect.width * scale;
        const scaledH = bgRect.height * scale;
        const cropX = Math.max(0, (scaledW - cardRect.width) / (2 * scale));
        const cropY = Math.max(0, (scaledH - cardRect.height) / (2 * scale));

        const nextId = ++revealIdRef.current;
        setActiveIndex(normalized);
        setTitleRevealKey((k) => k + 1);
        setActiveReveal({
          id: nextId,
          targetIdx: normalized,
          shiftSteps,
          hiddenCardId: nextDest.id,
          image: nextDest.backdropImage,
          alt: `${nextDest.title}, ${nextDest.state} — ${nextDest.tagline}`,
          startTransform: `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0px) scale(${scale.toFixed(4)})`,
          startClip: `inset(${cropY.toFixed(1)}px ${cropX.toFixed(1)}px ${cropY.toFixed(1)}px ${cropX.toFixed(1)}px)`,
        });
      } else {
        setActiveIndex(normalized);
        setPendingShiftSteps(shiftSteps);
        setCarouselIndex(normalized);
        setSettledIndex(normalized);
        setActiveReveal(null);
        setTitleRevealKey((k) => k + 1);
      }
    },
    [activeIndex, carouselIndex, total]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      activateDestination(activeIndex + 1, cardRefs.current[0], 1);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, activateDestination]);

  const toggleBookmark = () => {
    setBookmarked((prev) => ({
      ...prev,
      [activeDest.id]: !prev[activeDest.id],
    }));
  };

  const progressRatio = ((activeIndex + 1) / total) * 100;

  return (
    <section
      id="hero"
      aria-label="Featured Indian Destinations"
      className="relative w-full bg-[#F7F3EC]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden bg-[#F7F3EC] lg:aspect-[1376/768]">
        {/* Full-bleed still backdrop container: zero filters, zero crop, natural colors */}
        <div
          ref={backdropContainerRef}
          className="absolute inset-x-0 top-0 h-[92%] overflow-hidden bg-[#0B1220] lg:h-[var(--r-hero-backdrop-h)]"
        >
          <div key={settledDest.id} className="absolute inset-0 h-full w-full">
            <img
              src={settledDest.backdropImage}
              alt={`${settledDest.title}, ${settledDest.state} — ${settledDest.tagline}`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {activeReveal && (
            <div
              key={activeReveal.id}
              ref={revealLayerRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5] origin-center overflow-hidden will-change-[transform,clip-path]"
              style={{
                transform: activeReveal.startTransform,
                clipPath: activeReveal.startClip,
              }}
            >
              <img
                src={activeReveal.image}
                alt={activeReveal.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}

          {/* Subtle left-side-only darkness so hero text stays crisp while keeping the rest of the photo untouched */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[56%] bg-gradient-to-r from-[#0B1220]/60 via-[#0B1220]/25 to-transparent"
          />
        </div>

        {/* SINGLE SEMANTIC EDITORIAL CONTENT LAYER */}
        <div className="relative z-20 px-5 pt-24 pb-8 lg:static lg:p-0">
          <div>
            <p
              className="text-sm font-medium tracking-[0.02em] text-[#F4B942] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] lg:absolute lg:z-20 lg:flex lg:items-center lg:text-[clamp(14px,1.25vw,18px)] lg:font-normal"
              style={{
                left: '4.65%',
                top: '41%',
                height: '3.8%',
              }}
            >
              {activeDest.state} · {activeDest.region}
            </p>

            <h1
              key={`title-${titleRevealKey}`}
              className="mt-1 font-display text-5xl uppercase leading-[0.9] tracking-[0.02em] text-[#F7F7F8] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] lg:mt-0 lg:absolute lg:z-20 lg:flex lg:items-center lg:w-[40%] lg:text-[clamp(52px,6.4vw,88px)]"
              style={{
                left: '4.65%',
                top: '45.2%',
                height: '12%',
              }}
            >
              {activeDest.title.split('').map((char, i) => (
                <span
                  key={`${activeDest.id}-${i}`}
                  className="inline-block"
                  style={{
                    animation:
                      titleRevealKey > 0
                        ? `fadeUpLetter 0.34s cubic-bezier(0.23,1,0.32,1) ${i * 30}ms both`
                        : undefined,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <p
              className="mt-3 max-w-md text-sm leading-[1.48] text-[#F7F3EC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] lg:mt-0 lg:max-w-none lg:absolute lg:z-20 lg:w-[34%] lg:text-[clamp(13px,1.1vw,15px)]"
              style={{
                left: '4.65%',
                top: '58.0%',
              }}
            >
              {activeDest.description}
            </p>

            <div className="mt-5 flex items-center gap-3 lg:mt-0">
              <button
                type="button"
                onClick={toggleBookmark}
                aria-label={`Bookmark ${activeDest.title}`}
                aria-pressed={Boolean(bookmarked[activeDest.id])}
                className={`flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] transition-colors duration-200 active:scale-95 lg:absolute lg:z-20 lg:h-[6.6%] lg:w-[3.7%] ${
                  bookmarked[activeDest.id]
                    ? 'border-[#FF9933] bg-[#FF9933]/30 text-[#FF9933]'
                    : 'border-[#F5F5F5]/65 bg-[#0B1220]/45 text-[#F5F5F5] hover:border-[#F4B942]'
                }`}
                style={{
                  left: '4.65%',
                  top: '69.0%',
                }}
              >
                <Bookmark
                  className="h-4 w-4 lg:h-[17px] lg:w-[17px]"
                  strokeWidth={2}
                  fill={bookmarked[activeDest.id] ? 'currentColor' : 'none'}
                />
              </button>

              <button
                type="button"
                onClick={() => onDiscoverLocation(activeDest)}
                className="flex h-11 items-center justify-center rounded-full border-[1.5px] border-[#F5F5F5]/90 bg-[#0B1220]/55 px-6 text-sm font-normal tracking-[0.01em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220] active:scale-[0.98] lg:absolute lg:z-20 lg:h-[6.6%] lg:w-[13.6%] lg:px-0 lg:text-[clamp(12px,1.05vw,14px)]"
                style={{
                  left: '9.2%',
                  top: '69.0%',
                }}
              >
                Discover Location
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Card Carousel */}
          <div className="mt-8 flex gap-3.5 overflow-x-auto pb-2 no-scrollbar lg:hidden">
            {visibleCards.map(({ dest, idx, offset }) => {
              const isExpandingThis = activeReveal?.hiddenCardId === dest.id;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={(e) => activateDestination(idx, e.currentTarget, offset)}
                  className={`group relative h-40 w-36 shrink-0 overflow-hidden rounded-none text-left shadow-[0_18px_36px_rgba(7,12,22,0.55)] transition-opacity duration-150 ${
                    isExpandingThis ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <img
                    src={dest.cardImage}
                    alt={`${dest.state} landscape`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/25 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2">
                    <span className="mb-1 block h-[2px] w-3.5 bg-[#F7F3EC]/85" />
                    <span className="block text-[9px] font-medium tracking-wide text-[#F7F3EC]/80">
                      {dest.region}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold leading-[1.1] text-[#F7F3EC]">
                      {dest.cardTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop Slider Viewport — positioned lower and compact so the upper scenery stays open */}
          <div
            className="hidden lg:block lg:absolute lg:z-20 overflow-hidden"
            style={{
              left: '53.5%',
              top: '45.5%',
              width: '46.5%',
              height: '29.5%',
            }}
          >
            <div
              ref={carouselTrackRef}
              className="flex h-full items-stretch gap-[3%] will-change-transform"
            >
              {visibleCards.map(({ dest, idx, offset }, slotIdx) => {
                const isExpandingThis = activeReveal?.hiddenCardId === dest.id;
                return (
                  <button
                    key={dest.id}
                    ref={(el) => {
                      cardRefs.current[slotIdx] = el;
                    }}
                    type="button"
                    onClick={(e) => activateDestination(idx, e.currentTarget, offset)}
                    aria-label={`Explore ${dest.state}`}
                    className={`hero-card-hover group relative h-full w-[27.5%] shrink-0 overflow-hidden rounded-none text-left shadow-[0_24px_48px_rgba(7,12,22,0.55)] ${
                      isExpandingThis ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <img
                      src={dest.cardImage}
                      alt={`${dest.state} destination preview`}
                      className="hero-card-img h-full w-full object-cover object-center"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/20 to-transparent"
                    />
                    <div className="absolute bottom-2.5 left-3 right-2.5">
                      <span className="mb-1 block h-[1.5px] w-3.5 bg-[#F7F3EC]/85" />
                      <span className="block text-[10px] font-medium tracking-wide text-[#F7F3EC]/80 drop-shadow">
                        {dest.region}
                      </span>
                      <span className="mt-0.5 block text-[clamp(13px,1.1vw,16px)] font-bold leading-[1.12] text-[#F5F7F7] drop-shadow">
                        {dest.cardTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Carousel Controls, Progress Line & Counter */}
          <div
            className="mt-4 flex items-center gap-3 lg:mt-0 lg:absolute lg:z-20 lg:w-[41.5%]"
            style={{
              left: '53.5%',
              top: '77.8%',
            }}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => activateDestination(activeIndex - 1, null, -1)}
                aria-label="Previous destination"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-white/15 text-[#F5F5F5] backdrop-blur-md transition-colors duration-200 hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220] active:scale-95 lg:h-7 lg:w-7"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => activateDestination(activeIndex + 1, cardRefs.current[0], 1)}
                aria-label="Next destination"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-white/15 text-[#F5F5F5] backdrop-blur-md transition-colors duration-200 hover:border-[#FF9933] hover:bg-[#FF9933] hover:text-[#0B1220] active:scale-95 lg:h-7 lg:w-7"
              >
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-1 items-center">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-[#FF9933] transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ width: `${progressRatio}%` }}
                />
              </div>
            </div>

            <div className="flex shrink-0 items-baseline justify-end font-display leading-none text-[#F7F3EC] tabular-nums">
              <span className="text-xl lg:text-[clamp(20px,2vw,26px)]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="ml-1 text-xs text-[#F7F3EC]/75 lg:text-[clamp(11px,0.95vw,13px)]">
                / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Overlapping Quick Search Bar */}
          <div
            id="quick-search-dock"
            className="mt-6 lg:mt-0 lg:absolute lg:z-30 lg:h-[var(--r-search-dock-h)] lg:w-[var(--r-search-dock-w)]"
            style={{
              left: 'var(--r-search-dock-x)',
              top: 'var(--r-search-dock-y)',
            }}
          >
            <QuickSearchBar onSearch={onQuickSearch} embeddedInHero />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUpLetter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
