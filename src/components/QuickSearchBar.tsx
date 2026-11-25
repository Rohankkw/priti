import { useState, FormEvent } from 'react';
import { Calendar, ChevronDown, MapPin, Search, Users, Wallet } from 'lucide-react';
import { HERO_DESTINATIONS } from '../data/travelData';

export interface SearchFilter {
  destination: string;
  dates: string;
  travellers: string;
  budget: string;
}

interface QuickSearchBarProps {
  onSearch: (filter: SearchFilter) => void;
  embeddedInHero?: boolean;
}

export function QuickSearchBar({ onSearch, embeddedInHero = false }: QuickSearchBarProps) {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travellers, setTravellers] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ destination, dates, travellers, budget });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Quick Trip Search"
      className={
        embeddedInHero
          ? 'flex h-full w-full items-center justify-between rounded-[16px] border border-white/25 bg-gradient-to-b from-[#1E2A3F]/95 to-[#101827]/95 px-4 py-2 shadow-[0_24px_48px_rgba(7,12,22,0.5)] backdrop-blur-xl'
          : 'mx-auto flex w-full max-w-[820px] flex-col gap-3 rounded-2xl border border-white/20 bg-[#121927]/95 p-3 shadow-[0_24px_48px_rgba(7,12,22,0.45)] backdrop-blur-xl md:flex-row md:items-center md:gap-0 md:px-4 md:py-2.5'
      }
    >
      <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/15">
        {/* Destination */}
        <label className="group flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5">
          <MapPin className="h-4 w-4 shrink-0 text-[#F4B942] opacity-80 group-focus-within:opacity-100 lg:hidden" />
          <div className="relative w-full">
            <select
              aria-label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full appearance-none bg-transparent text-center text-[15px] lg:text-[18px] font-medium text-[#F7F3EC] outline-none cursor-pointer"
            >
              <option value="" className="bg-[#0B1220] text-[#F7F3EC]">
                Destination
              </option>
              {HERO_DESTINATIONS.map((d) => (
                <option key={d.id} value={d.state} className="bg-[#0B1220] text-[#F7F3EC]">
                  {d.state}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#F7F3EC]/50 lg:hidden" />
          </div>
        </label>

        {/* Dates */}
        <label className="group flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5">
          <Calendar className="h-4 w-4 shrink-0 text-[#F4B942] opacity-80 lg:hidden" />
          <select
            aria-label="Dates"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-full appearance-none bg-transparent text-center text-[15px] lg:text-[18px] font-medium text-[#F7F3EC] outline-none cursor-pointer"
          >
            <option value="" className="bg-[#0B1220] text-[#F7F3EC]">
              Dates
            </option>
            <option value="This Month" className="bg-[#0B1220] text-[#F7F3EC]">
              This Month
            </option>
            <option value="Next 30–60 Days" className="bg-[#0B1220] text-[#F7F3EC]">
              Next 30–60 Days
            </option>
            <option value="Winter Season (Dec–Feb)" className="bg-[#0B1220] text-[#F7F3EC]">
              Winter (Dec–Feb)
            </option>
            <option value="Spring / Summer" className="bg-[#0B1220] text-[#F7F3EC]">
              Spring / Summer
            </option>
          </select>
        </label>

        {/* Travellers */}
        <label className="group flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5">
          <Users className="h-4 w-4 shrink-0 text-[#F4B942] opacity-80 lg:hidden" />
          <select
            aria-label="Travellers"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            className="w-full appearance-none bg-transparent text-center text-[15px] lg:text-[18px] font-medium text-[#F7F3EC] outline-none cursor-pointer"
          >
            <option value="" className="bg-[#0B1220] text-[#F7F3EC]">
              Travellers
            </option>
            <option value="2 Guests (Couple)" className="bg-[#0B1220] text-[#F7F3EC]">
              2 Guests (Couple)
            </option>
            <option value="4 Guests (Family)" className="bg-[#0B1220] text-[#F7F3EC]">
              4 Guests (Family)
            </option>
            <option value="6+ Private Group" className="bg-[#0B1220] text-[#F7F3EC]">
              6+ Private Group
            </option>
            <option value="Solo Bespoke" className="bg-[#0B1220] text-[#F7F3EC]">
              Solo Bespoke
            </option>
          </select>
        </label>

        {/* Budget */}
        <label className="group flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5">
          <Wallet className="h-4 w-4 shrink-0 text-[#F4B942] opacity-80 lg:hidden" />
          <select
            aria-label="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full appearance-none bg-transparent text-center text-[15px] lg:text-[18px] font-medium text-[#F7F3EC] outline-none cursor-pointer"
          >
            <option value="" className="bg-[#0B1220] text-[#F7F3EC]">
              Budget
            </option>
            <option value="Under ₹35,000" className="bg-[#0B1220] text-[#F7F3EC]">
              Under ₹35,000
            </option>
            <option value="₹35,000 – ₹60,000" className="bg-[#0B1220] text-[#F7F3EC]">
              ₹35,000 – ₹60,000
            </option>
            <option value="₹60,000 – ₹1,20,000" className="bg-[#0B1220] text-[#F7F3EC]">
              ₹60,000 – ₹1,20,000
            </option>
            <option value="₹1,20,000+ Ultra Luxury" className="bg-[#0B1220] text-[#F7F3EC]">
              ₹1,20,000+ Luxury
            </option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#FF9933] px-7 text-[16px] lg:text-[17px] font-semibold text-[#0B1220] shadow-md transition-all hover:bg-[#F4B942] active:scale-[0.98]"
      >
        <Search className="h-4 w-4 lg:hidden" />
        <span>Find Trips</span>
      </button>
    </form>
  );
}
