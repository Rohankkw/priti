import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  HERO_DESTINATIONS,
  HeroDestination,
  PopularDestination,
  TourPackage,
} from './data/travelData';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { SearchFilter } from './components/QuickSearchBar';
import { PopularDestinations } from './components/PopularDestinations';
import { FeaturedPackages } from './components/FeaturedPackages';
import { ExperiencesSection } from './components/ExperiencesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { HorizontalGallery } from './components/HorizontalGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TravelGuidesSection } from './components/TravelGuidesSection';
import { ReelStrip } from './components/ReelStrip';
import { CtaBanner } from './components/CtaBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { EnquiryModal } from './components/EnquiryModal';
import { LocationModal } from './components/LocationModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [searchFilter, setSearchFilter] = useState<SearchFilter | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDefaults, setEnquiryDefaults] = useState<{
    destination?: string;
    dates?: string;
    travellers?: string;
  }>({});
  const [spotlightDest, setSpotlightDest] = useState<HeroDestination | null>(null);

  // Smooth scrolling via Lenis synced with GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const openEnquiryWith = (opts?: {
    destination?: string;
    dates?: string;
    travellers?: string;
  }) => {
    setEnquiryDefaults(opts || {});
    setEnquiryOpen(true);
  };

  const handleQuickSearch = (filter: SearchFilter) => {
    setSearchFilter(filter);
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPopular = (dest: PopularDestination) => {
    const matchedHero = HERO_DESTINATIONS.find(
      (h) => h.state.toLowerCase() === dest.state.toLowerCase()
    );
    if (matchedHero) {
      setSpotlightDest(matchedHero);
    } else {
      openEnquiryWith({ destination: dest.state });
    }
  };

  const handleBookPackage = (pkg: TourPackage) => {
    openEnquiryWith({ destination: pkg.destination });
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F7F3EC]">
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}
      <CustomCursor />

      <Navbar
        onOpenEnquiry={(dest) => openEnquiryWith(dest ? { destination: dest } : undefined)}
        onFocusSearch={() => {
          document.getElementById('quick-search-dock')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main>
        {/* 2 + 3. Full-bleed Documentary Hero + Overlapping Glass Quick Search */}
        <HeroSection
          onDiscoverLocation={(dest) => setSpotlightDest(dest)}
          onQuickSearch={handleQuickSearch}
        />

        {/* 4. Popular Destinations (Light Editorial Chapter) */}
        <PopularDestinations onSelectDestination={handleSelectPopular} />

        {/* 5. Featured Tour Packages with 3D Tilt Cards (Light Chapter) */}
        <FeaturedPackages
          activeFilter={searchFilter}
          selectedTheme={selectedTheme}
          onClearFilter={() => {
            setSearchFilter(null);
            setSelectedTheme(null);
          }}
          onBookPackage={handleBookPackage}
        />

        {/* 7. Experiences by Theme (Dark Chapter) */}
        <ExperiencesSection
          selectedTheme={selectedTheme}
          onSelectTheme={(theme) => {
            setSelectedTheme((prev) => (prev === theme ? null : theme));
            document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Scroll-Driven Route & 4-Step How It Works (Light Chapter) */}
        <HowItWorksSection />

        {/* 9. Why Choose Priti Travels Hub Counters & Trust Pillars (Dark Chapter) */}
        <WhyChooseSection />

        {/* 10. Special Offers / Seasonal Deals Countdown with Parallax (Dark/Gold Chapter) */}
        <SpecialOffersSection onClaimOffer={() => openEnquiryWith()} />

        {/* 11. Horizontal Scroll Cinematography Gallery (Light Chapter) */}
        <HorizontalGallery />

        {/* 12. Draggable Traveller Testimonials Slider (Dark Chapter) */}
        <TestimonialsSection />

        {/* 13. Travel Guides & Field Notes Preview (Light Chapter) */}
        <TravelGuidesSection />

        {/* 14. Instagram-style 9:16 Reel Strip (Dark Chapter) */}
        <ReelStrip onSelectReel={(loc) => openEnquiryWith({ destination: loc })} />

        {/* 15. Concierge CTA Banner (Light Chapter) */}
        <CtaBanner onOpenEnquiry={() => openEnquiryWith()} />

        {/* 16. Monthly India Dispatch Newsletter (Light Chapter) */}
        <NewsletterSection />
      </main>

      {/* 17. Footer + Sticky Floating WhatsApp & Enquiry */}
      <Footer />
      <FloatingConcierge onOpenEnquiry={() => openEnquiryWith()} />

      <EnquiryModal
        isOpen={enquiryOpen}
        initialDestination={enquiryDefaults.destination}
        initialDates={enquiryDefaults.dates}
        initialTravellers={enquiryDefaults.travellers}
        onClose={() => setEnquiryOpen(false)}
      />

      <LocationModal
        destination={spotlightDest}
        onClose={() => setSpotlightDest(null)}
        onPlanTrip={(stateName) => openEnquiryWith({ destination: stateName })}
      />
    </div>
  );
}
