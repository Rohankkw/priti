import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Respect reduced motion immediately so initial viewport is never obscured
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const start = performance.now();
    const duration = 360;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onComplete, 180);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Loading Priti Travels Hub"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1220] text-[#F7F3EC] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        exiting ? 'pointer-events-none opacity-0 -translate-y-4' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Rotating compass dial */}
        <svg
          width="76"
          height="76"
          viewBox="0 0 76 76"
          fill="none"
          aria-hidden="true"
          className="animate-[spin_6s_linear_infinite]"
        >
          <circle cx="38" cy="38" r="35" stroke="#F4B942" strokeOpacity="0.35" strokeWidth="1.2" />
          <circle
            cx="38"
            cy="38"
            r="27"
            stroke="#FF9933"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path d="M38 6V14M38 62V70M6 38H14M62 38H70" stroke="#F4B942" strokeWidth="1.5" />
        </svg>

        <p className="mt-6 font-display text-4xl tracking-[0.12em] text-[#F7F3EC]">
          PRITI TRAVELS HUB
        </p>
        <p className="mt-1 font-serif italic text-sm text-[#F4B942]">
          Discover Incredible India, One Journey at a Time
        </p>

        <div className="mt-7 flex items-center gap-4">
          <div className="h-[2px] w-44 overflow-hidden bg-white/15">
            <div
              className="h-full bg-[#FF9933] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-display text-2xl tracking-wider text-[#FF9933] tabular-nums">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            setExiting(true);
            setTimeout(onComplete, 200);
          }}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-[#F7F3EC]/50 transition-colors hover:text-[#F7F3EC]"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
}
