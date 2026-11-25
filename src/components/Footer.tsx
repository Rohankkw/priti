import { ArrowUp, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/travelData';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="contact" className="bg-[#070C16] px-5 pt-20 pb-10 text-[#F7F3EC] lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <circle cx="18" cy="18" r="15.5" stroke="#F4B942" strokeWidth="1.75" />
                <path
                  d="M22.5 13.5L19.6 19.6L13.5 22.5L16.4 16.4L22.5 13.5Z"
                  stroke="#F4B942"
                  strokeWidth="1.5"
                  fill="#FF9933"
                  fillOpacity="0.28"
                />
              </svg>
              <span className="font-display text-2xl tracking-[0.06em]">PRITI TRAVELS HUB</span>
            </div>
            <p className="mt-4 font-serif italic text-sm text-[#F4B942]">
              {AGENCY_CONFIG.tagline}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#F7F3EC]/60">
              Bespoke domestic tours, heritage palace stays, and curated cultural expeditions across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F4B942]">
              Explore India
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F7F3EC]/75">
              <li><a href="#destinations" className="hover:text-[#FF9933]">Popular Destinations</a></li>
              <li><a href="#packages" className="hover:text-[#FF9933]">Featured Tour Packages</a></li>
              <li><a href="#experiences" className="hover:text-[#FF9933]">Experiences by Theme</a></li>
              <li><a href="#offers" className="hover:text-[#FF9933]">Seasonal Deals</a></li>
              <li><a href="#guides" className="hover:text-[#FF9933]">Travel Field Guides</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F4B942]">
              Concierge Desk
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#F7F3EC]/75">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9933]" />
                <a href={`tel:${AGENCY_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-[#FF9933]">
                  {AGENCY_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9933]" />
                <a href={`mailto:${AGENCY_CONFIG.email}`} className="hover:text-[#FF9933]">
                  {AGENCY_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF9933]" />
                <span>{AGENCY_CONFIG.address}</span>
              </li>
            </ul>
          </div>

          {/* Social & Back to top */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F4B942]">
                Follow Dispatches
              </h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F7F3EC] transition-colors hover:border-[#FF9933] hover:text-[#FF9933]"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F7F3EC] transition-colors hover:border-[#FF9933] hover:text-[#FF9933]"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EC] transition-colors hover:border-[#FF9933] hover:text-[#FF9933]"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#F7F3EC]/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Priti Travels Hub. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF9933]" />
            <span className="inline-block h-2 w-2 rounded-full bg-[#F7F3EC]" />
            <span className="inline-block h-2 w-2 rounded-full bg-[#138808]" />
            <span>Crafted for Domestic Indian Travel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
