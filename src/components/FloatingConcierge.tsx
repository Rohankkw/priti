import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Sparkles } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/travelData';

interface FloatingConciergeProps {
  onOpenEnquiry: () => void;
}

export function FloatingConcierge({ onOpenEnquiry }: FloatingConciergeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Priti Travels Hub, I would like a custom India itinerary.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0B1220]/90 text-[#F7F3EC] shadow-xl backdrop-blur-md transition-colors hover:border-[#F4B942] hover:text-[#F4B942]"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-11 items-center gap-2 rounded-full bg-[#138808] px-4 text-xs font-semibold text-[#F7F3EC] shadow-xl transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={onOpenEnquiry}
        className="flex h-11 items-center gap-2 rounded-full bg-[#FF9933] px-5 text-xs font-bold uppercase tracking-wider text-[#0B1220] shadow-xl transition-colors hover:bg-[#F4B942]"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Enquire Now</span>
      </button>
    </div>
  );
}
