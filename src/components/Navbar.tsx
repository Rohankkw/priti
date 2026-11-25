import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (defaultDestination?: string) => void;
  onFocusSearch: () => void;
  onNavigate?: (sectionId: string) => void;
  compAligned?: boolean;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Packages', href: '#packages' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Offers', href: '#offers' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenEnquiry, onFocusSearch, onNavigate, compAligned = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When resting at top on desktop, mirror exact comp proportions; when scrolled, dock as fixed blurred glass bar
  if (compAligned && !scrolled) {
    return (
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="relative mx-auto w-full" style={{ aspectRatio: '1376 / 96' }}>
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="pointer-events-auto absolute flex items-center gap-2.5 text-[#F7F3EC] transition-opacity hover:opacity-90"
            style={{
              left: 'var(--r-nav-brand-x)',
              top: '28%',
              height: '48px',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle cx="18" cy="18" r="15.5" stroke="#F4B942" strokeWidth="1.75" />
              <circle cx="18" cy="18" r="11.5" stroke="#FF9933" strokeWidth="0.9" strokeOpacity="0.65" />
              <path
                d="M22.5 13.5L19.6 19.6L13.5 22.5L16.4 16.4L22.5 13.5Z"
                stroke="#F4B942"
                strokeWidth="1.5"
                fill="#FF9933"
                fillOpacity="0.28"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="18" r="1.5" fill="#F4B942" />
            </svg>
            <span className="font-display text-[24px] lg:text-[27px] tracking-[0.04em] leading-none text-[#F4F5F7] whitespace-nowrap">
              PRITI TRAVELS HUB
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="pointer-events-auto absolute hidden lg:flex items-center justify-between"
            style={{
              left: 'var(--r-nav-links-x)',
              top: '38%',
              width: 'var(--r-nav-links-w)',
              height: '30px',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-[17px] xl:text-[18px] font-normal tracking-[0.01em] text-[#EBF5F8] drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-colors hover:text-[#FF9933]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search Icon */}
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Open trip search"
            className="pointer-events-auto absolute hidden lg:flex items-center justify-center rounded-full text-[#F7F3EC]/90 transition-colors hover:bg-white/10 hover:text-[#F4B942]"
            style={{
              left: 'var(--r-nav-search-btn-x)',
              top: '36%',
              width: '36px',
              height: '36px',
            }}
          >
            <Search className="h-[19px] w-[19px]" strokeWidth={1.9} />
          </button>

          {/* Plan My Trip CTA */}
          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="pointer-events-auto absolute hidden lg:flex items-center justify-center rounded-full bg-[#FF9933] px-5 text-[15px] font-semibold text-[#0B1220] shadow-lg transition-all hover:bg-[#F4B942] active:scale-[0.98]"
            style={{
              left: 'var(--r-nav-cta-x)',
              top: '30%',
              width: 'var(--r-nav-cta-w)',
              height: '44px',
            }}
          >
            Plan My Trip
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="pointer-events-auto absolute right-5 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0B1220]/70 text-[#F7F3EC] backdrop-blur-md lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="pointer-events-auto mx-4 mt-2 rounded-2xl border border-white/15 bg-[#0B1220]/95 p-5 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-[#F7F3EC] hover:bg-white/5 hover:text-[#FF9933]"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenEnquiry();
                }}
                className="mt-2 w-full rounded-full bg-[#FF9933] py-3 text-sm font-semibold text-[#0B1220]"
              >
                Plan My Trip
              </button>
            </nav>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0B1220]/85 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-[1376px] items-center justify-between px-5 py-3.5 lg:px-10">
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 text-[#F7F3EC]"
        >
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle cx="18" cy="18" r="15.5" stroke="#F4B942" strokeWidth="1.75" />
            <path
              d="M22.5 13.5L19.6 19.6L13.5 22.5L16.4 16.4L22.5 13.5Z"
              stroke="#F4B942"
              strokeWidth="1.5"
              fill="#FF9933"
              fillOpacity="0.28"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-[22px] tracking-[0.06em] leading-none">
            PRITI TRAVELS HUB
          </span>
        </a>

        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-sm font-medium text-[#F7F3EC]/85 transition-colors hover:text-[#FF9933]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Open trip search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#F7F3EC]/85 transition-colors hover:bg-white/10 hover:text-[#F4B942]"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => onOpenEnquiry()}
            className="rounded-full bg-[#FF9933] px-5 py-2.5 text-sm font-semibold text-[#0B1220] transition-all hover:bg-[#F4B942]"
          >
            Plan My Trip
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#F7F3EC] lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0B1220]/95 px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="rounded-lg px-3 py-2 text-base font-medium text-[#F7F3EC] hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEnquiry();
              }}
              className="mt-2 w-full rounded-full bg-[#FF9933] py-3 text-sm font-semibold text-[#0B1220]"
            >
              Plan My Trip
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
