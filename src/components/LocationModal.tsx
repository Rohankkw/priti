import { Calendar, Check, Clock, X } from 'lucide-react';
import { HeroDestination } from '../data/travelData';

interface LocationModalProps {
  destination: HeroDestination | null;
  onClose: () => void;
  onPlanTrip: (stateName: string) => void;
}

export function LocationModal({ destination, onClose, onPlanTrip }: LocationModalProps) {
  if (!destination) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${destination.title} Location Details`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070C16]/85 p-4 backdrop-blur-md"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0B1220] text-[#F7F3EC] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close location modal"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1220]/75 text-[#F7F3EC] backdrop-blur-md hover:bg-[#FF9933] hover:text-[#0B1220]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={destination.backdropImage}
            alt={destination.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/30 to-transparent" />
          <div className="absolute bottom-5 left-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F4B942]">
              {destination.state} · {destination.region}
            </p>
            <h3 className="font-display text-5xl tracking-wide">{destination.title}</h3>
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <p className="font-serif text-lg italic text-[#F4B942]">{destination.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#F7F3EC]/80">
            {destination.description}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 border-y border-white/10 py-4 text-sm">
            <div>
              <span className="flex items-center gap-1.5 text-xs text-[#F7F3EC]/55">
                <Calendar className="h-3.5 w-3.5 text-[#FF9933]" /> Season
              </span>
              <p className="mt-1 font-semibold">{destination.bestSeason}</p>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-xs text-[#F7F3EC]/55">
                <Clock className="h-3.5 w-3.5 text-[#FF9933]" /> Duration
              </span>
              <p className="mt-1 font-semibold">{destination.duration}</p>
            </div>
            <div>
              <span className="block text-xs text-[#F7F3EC]/55">Concierge From</span>
              <p className="mt-1 font-semibold text-[#FF9933] tabular-nums">
                {destination.startingPrice}
              </p>
            </div>
          </div>

          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#F7F3EC]/60">
            Signature Moments Included
          </h4>
          <ul className="mt-3 space-y-2.5">
            {destination.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-[#F7F3EC]/85">
                <Check className="h-4 w-4 shrink-0 text-[#138808]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onPlanTrip(destination.state);
              }}
              className="rounded-full bg-[#FF9933] px-7 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F4B942]"
            >
              Customise {destination.state} Trip
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-[#F7F3EC] hover:border-[#F4B942]"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
