import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { HERO_DESTINATIONS } from '../data/travelData';

interface EnquiryModalProps {
  isOpen: boolean;
  initialDestination?: string;
  initialDates?: string;
  initialTravellers?: string;
  onClose: () => void;
}

export function EnquiryModal({
  isOpen,
  initialDestination = '',
  initialDates = '',
  initialTravellers = '',
  onClose,
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(initialDestination);
  const [dates, setDates] = useState(initialDates);
  const [travellers, setTravellers] = useState(initialTravellers || '2 Guests');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setDestination(initialDestination);
    setDates(initialDates);
    if (initialTravellers) setTravellers(initialTravellers);
    setSubmittedRef(null);
    setErrors({});
  }, [initialDestination, initialDates, initialTravellers, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = 'Please enter your full name.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Please enter a valid 10-digit mobile or WhatsApp number.';
    if (!destination.trim()) next.destination = 'Select a destination or region.';
    if (!dates.trim()) next.dates = 'Provide preferred travel dates or month.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const code = `PTH-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(code);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Plan My Trip Enquiry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070C16]/80 p-4 backdrop-blur-md"
    >
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/15 bg-[#0B1220] p-7 text-[#F7F3EC] shadow-2xl sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry modal"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F7F3EC] hover:border-[#FF9933]"
        >
          <X className="h-4 w-4" />
        </button>

        {submittedRef ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#138808]/20 text-[#138808]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-4xl tracking-wide text-[#F7F3EC]">
              Concierge Request Received
            </h3>
            <p className="mt-2 text-sm text-[#F7F3EC]/75">
              Reference <span className="font-semibold text-[#F4B942]">{submittedRef}</span> has been assigned to your India journey designer. Expect a curated draft on WhatsApp or call shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-[#FF9933] px-8 py-3 text-sm font-semibold text-[#0B1220] hover:bg-[#F4B942]"
            >
              Return to Priti Travels Hub
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h3 className="font-display text-4xl tracking-wide text-[#F7F3EC]">
              Plan Your <span className="font-serif italic font-normal text-[#F4B942]">Bespoke Journey</span>
            </h3>
            <p className="mt-1 text-sm text-[#F7F3EC]/65">
              Share your outline below—our concierge handles heritage suites, transfers, and permits.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#F7F3EC]/35 focus:border-[#FF9933] focus:outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-[#FF9933]">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#F7F3EC]/35 focus:border-[#FF9933] focus:outline-none"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#FF9933]">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                    Destination *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#121D32] px-4 py-3 text-sm text-[#F7F3EC] focus:border-[#FF9933] focus:outline-none"
                  >
                    <option value="">Choose Indian state</option>
                    {HERO_DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.state}>
                        {d.state} ({d.title})
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="mt-1 text-xs text-[#FF9933]">{errors.destination}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                    Preferred Dates *
                  </label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. 12–18 Dec 2026"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#F7F3EC]/35 focus:border-[#FF9933] focus:outline-none"
                  />
                  {errors.dates && <p className="mt-1 text-xs text-[#FF9933]">{errors.dates}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                    Travellers
                  </label>
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#121D32] px-4 py-3 text-sm text-[#F7F3EC] focus:border-[#FF9933] focus:outline-none"
                  >
                    <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                    <option value="4 Guests (Family)">4 Guests (Family)</option>
                    <option value="6+ Private Group">6+ Private Group</option>
                    <option value="Solo Bespoke">Solo Bespoke</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#F7F3EC]/75">
                  Preferences or Occasion
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Heritage palaces, wellness spa, private boat charters, anniversary dinner..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-[#F7F3EC]/35 focus:border-[#FF9933] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#FF9933] py-3.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#F4B942]"
            >
              Request Custom Itinerary
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
