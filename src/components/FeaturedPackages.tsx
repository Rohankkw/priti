import { useRef, useState } from 'react';
import { Check, Clock, Star, X } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';
import { SearchFilter } from './QuickSearchBar';

interface FeaturedPackagesProps {
  activeFilter: SearchFilter | null;
  selectedTheme: string | null;
  onClearFilter: () => void;
  onBookPackage: (pkg: TourPackage) => void;
}

function TiltPackageCard({
  pkg,
  onBook,
}: {
  pkg: TourPackage;
  onBook: (pkg: TourPackage) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (py - 0.5) * -8,
      ry: (px - 0.5) * 10,
      gx: px * 100,
      gy: py * 100,
      hovered: true,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.hovered ? 'transform 80ms ease-out' : 'transform 380ms cubic-bezier(0.23,1,0.32,1)',
      }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-[#0B1220]/10 bg-white shadow-[0_20px_44px_rgba(11,18,32,0.08)]"
    >
      {/* Subtle dynamic glare overlay */}
      {tilt.hovered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-35"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.6), transparent 55%)`,
          }}
        />
      )}

      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {pkg.bestSeller && (
            <span className="rounded-full bg-[#FF9933] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0B1220]">
              Best Seller
            </span>
          )}
          <span className="rounded-full bg-[#0B1220]/75 px-3 py-1 text-[11px] font-medium text-[#F7F3EC] backdrop-blur-md">
            {pkg.theme}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F7F3EC]">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="h-3.5 w-3.5 text-[#F4B942]" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-[#F4B942] text-[#F4B942]" /> {pkg.rating} ({pkg.reviews})
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 text-[#0B1220]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C86D10]">
            {pkg.destination}
          </p>
          <h3 className="mt-1 font-display text-3xl tracking-wide text-[#0B1220]">
            {pkg.title}
          </h3>
          <ul className="mt-4 space-y-2">
            {pkg.inclusions.map((inc) => (
              <li key={inc} className="flex items-center gap-2 text-sm text-[#0B1220]/75">
                <Check className="h-4 w-4 shrink-0 text-[#138808]" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#0B1220]/10 pt-5">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-[#0B1220]/50">
              Per Guest
            </span>
            <span className="font-display text-3xl tracking-wide text-[#0B1220] tabular-nums">
              {pkg.price}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onBook(pkg)}
            className="rounded-full bg-[#0B1220] px-6 py-3 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#FF9933] hover:text-[#0B1220]"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedPackages({
  activeFilter,
  selectedTheme,
  onClearFilter,
  onBookPackage,
}: FeaturedPackagesProps) {
  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (activeFilter?.destination && pkg.destination.toLowerCase() !== activeFilter.destination.toLowerCase()) {
      return false;
    }
    if (selectedTheme && pkg.theme.toLowerCase() !== selectedTheme.toLowerCase()) {
      return false;
    }
    return true;
  });

  const displayList = filteredPackages.length > 0 ? filteredPackages : TOUR_PACKAGES;
  const hasActiveFilter = Boolean(activeFilter?.destination || activeFilter?.budget || selectedTheme);

  return (
    <section
      id="packages"
      className="border-t border-[#0B1220]/10 bg-[#F7F3EC] px-5 py-24 text-[#0B1220] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 border-b border-[#0B1220]/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-6xl">
              Featured <span className="font-serif italic font-normal text-[#C86D10]">Tour Packages</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#0B1220]/70">
              Signature private itineraries with verified heritage properties, hand-picked chauffeurs, and flexible departures.
            </p>
          </div>

          {hasActiveFilter && (
            <div className="flex items-center gap-3 rounded-full border border-[#0B1220]/15 bg-white px-4 py-2 text-xs font-medium text-[#0B1220]">
              <span>
                Filtered:{' '}
                {[activeFilter?.destination, activeFilter?.budget, selectedTheme]
                  .filter(Boolean)
                  .join(' · ')}
                {filteredPackages.length === 0 && ' (showing all curated matches)'}
              </span>
              <button
                type="button"
                onClick={onClearFilter}
                aria-label="Clear package filters"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B1220] text-[#F7F3EC] hover:bg-[#FF9933] hover:text-[#0B1220]"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayList.map((pkg) => (
            <TiltPackageCard key={pkg.id} pkg={pkg} onBook={onBookPackage} />
          ))}
        </div>
      </div>
    </section>
  );
}
