import { MessageCircle, Phone } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/travelData';

interface CtaBannerProps {
  onOpenEnquiry: () => void;
}

export function CtaBanner({ onOpenEnquiry }: CtaBannerProps) {
  const whatsappUrl = `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Priti Travels Hub, I would like to plan a bespoke India journey.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#F7F3EC] px-5 py-20 text-[#0B1220] lg:px-12 lg:py-24">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-3xl bg-[#0B1220] p-10 text-[#F7F3EC] shadow-2xl lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF9933]/15 blur-3xl"
        />
        <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl tracking-[0.03em] sm:text-7xl leading-[0.94]">
              Your Next Story <span className="font-serif italic font-normal text-[#F4B942]">Starts Here</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#F7F3EC]/75">
              Speak directly with our senior India journey designers—receive a custom day-by-day route & boutique stay shortlist within 4 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#138808] px-7 py-4 text-sm font-semibold text-[#F7F3EC] shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#169b0a]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href={`tel:${AGENCY_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-[#F7F3EC] transition-colors hover:border-[#F4B942] hover:text-[#F4B942]"
            >
              <Phone className="h-4 w-4" />
              <span>{AGENCY_CONFIG.phone}</span>
            </a>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="inline-flex items-center rounded-full bg-[#FF9933] px-7 py-4 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F4B942]"
            >
              Enquire Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
