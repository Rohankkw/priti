export interface HeroDestination {
  id: string;
  state: string;
  region: string;
  title: string;
  cardTitle: string;
  tagline: string;
  description: string;
  backdropImage: string;
  cardImage: string;
  startingPrice: string;
  bestSeason: string;
  duration: string;
  highlights: string[];
}

export interface PopularDestination {
  id: string;
  name: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'Islands';
  startingPrice: string;
  priceNum: number;
  duration: string;
  image: string;
  tag: string;
  summary: string;
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  nights: number;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
  theme: string;
  budgetTier: string;
  image: string;
  inclusions: string[];
}

export interface ExperienceTheme {
  id: string;
  name: string;
  tagline: string;
  count: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  trip: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface TravelGuide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface ReelItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  views: string;
  image: string;
}

export const AGENCY_CONFIG = {
  name: 'PRITI TRAVELS HUB',
  tagline: 'Discover Incredible India, One Journey at a Time.',
  phone: '+91 98204 51290',
  whatsappNumber: '919820451290',
  email: 'concierge@prititravelshub.in',
  address: '42 Heritage Courtyard, Fort, Mumbai 400001, India',
};

export const HERO_DESTINATIONS: HeroDestination[] = [
  {
    id: 'rajasthan',
    state: 'Rajasthan',
    region: 'India',
    title: 'UDAIPUR',
    cardTitle: 'Rajasthan',
    tagline: 'City of Dawn & Marble Palaces',
    description:
      'Marble palaces rising from mirror waters as twilight paints the Aravallis in warm gold.',
    backdropImage: '/assets/udaipur.webp',
    cardImage: '/assets/udaipur.webp',
    startingPrice: '₹42,000',
    bestSeason: 'Oct – Mar',
    duration: '5 Nights / 6 Days',
    highlights: [
      'Private sunset boat on Lake Pichola',
      'Royal Taj & City Palace heritage walk',
      'Aravalli candlelit courtyard dining',
    ],
  },
  {
    id: 'kerala',
    state: 'Kerala',
    region: 'South India',
    title: 'KERALA',
    cardTitle: 'Kerala',
    tagline: 'Emerald Backwaters & Spice Hills',
    description:
      'Drift along palm-lined emerald canals aboard a private teak kettuvallam under monsoon-soft skies.',
    backdropImage: '/assets/kerala.webp',
    cardImage: '/assets/kerala.webp',
    startingPrice: '₹38,500',
    bestSeason: 'Sep – Mar',
    duration: '6 Nights / 7 Days',
    highlights: [
      'Private luxury Alleppey houseboat',
      'Munnar mist-shrouded tea estates',
      'Ayurvedic sanctuary in Kumarakom',
    ],
  },
  {
    id: 'himachal',
    state: 'Himachal Pradesh',
    region: 'North India',
    title: 'MANALI',
    cardTitle: 'Himachal Pradesh',
    tagline: 'Alpine Ridges & Cedar Valleys',
    description:
      'Snow-crowned Himalayan peaks emerging through pine mist above secluded mountain chalets.',
    backdropImage: '/assets/himachal%20pradesh.webp',
    cardImage: '/assets/himachal%20pradesh.webp',
    startingPrice: '₹34,000',
    bestSeason: 'Oct – Jun',
    duration: '5 Nights / 6 Days',
    highlights: [
      'Private cedarwood lodge in Old Manali',
      'Atal Tunnel & Solang glacier trail',
      'Riverside Himalayan trout & bonfire',
    ],
  },
  {
    id: 'goa',
    state: 'Goa',
    region: 'West Coast',
    title: 'GOA',
    cardTitle: 'Goa',
    tagline: 'Golden Coves & Portuguese Heritage',
    description:
      'Sun-drenched palm coves along the Arabian Sea paired with centuries-old Latin quarters.',
    backdropImage: '/assets/goa.webp',
    cardImage: '/assets/goa.webp',
    startingPrice: '₹29,500',
    bestSeason: 'Nov – Mar',
    duration: '4 Nights / 5 Days',
    highlights: [
      'Boutique villa in South Goa',
      'Fontainhas heritage evening stroll',
      'Private sunset catamaran charter',
    ],
  },
  {
    id: 'ladakh',
    state: 'Ladakh',
    region: 'Trans-Himalaya',
    title: 'LADAKH',
    cardTitle: 'Ladakh',
    tagline: 'Turquoise Lakes & High Passes',
    description:
      'Cobalt skies over Pangong Tso and ancient cliffside monasteries perched above desert valleys.',
    backdropImage: '/assets/ladakh.webp',
    cardImage: '/assets/ladakh.webp',
    startingPrice: '₹54,000',
    bestSeason: 'May – Sep',
    duration: '7 Nights / 8 Days',
    highlights: [
      'Glamping beside Pangong Tso',
      'Khardung La & Nubra dune expedition',
      'Morning chants at Thiksey Monastery',
    ],
  },
  {
    id: 'uttarakhand',
    state: 'Uttarakhand',
    region: 'Himalayan Foothills',
    title: 'RISHIKESH',
    cardTitle: 'Uttarakhand',
    tagline: 'Sacred Waters & Forest Retreats',
    description:
      'Evening Ganga Aarti lanterns glowing beside Himalayan river gorges and wellness sanctuaries.',
    backdropImage: '/assets/uttrakhand.webp',
    cardImage: '/assets/uttrakhand.webp',
    startingPrice: '₹36,000',
    bestSeason: 'Sep – Apr',
    duration: '4 Nights / 5 Days',
    highlights: [
      'Private Ganga Aarti riverside seating',
      'Himalayan wellness & sound healing',
      'Mussoorie & Tehri scenic ridge drive',
    ],
  },
  {
    id: 'kashmir',
    state: 'Kashmir',
    region: 'North India',
    title: 'KASHMIR',
    cardTitle: 'Kashmir',
    tagline: 'Saffron Meadows & Shikara Waters',
    description:
      'Hand-carved cedar houseboats floating on mirror-still Dal Lake framed by snow-dusted Pir Panjal peaks.',
    backdropImage: '/assets/kashmir.webp',
    cardImage: '/assets/kashmir.webp',
    startingPrice: '₹48,000',
    bestSeason: 'Mar – Oct',
    duration: '6 Nights / 7 Days',
    highlights: [
      'Dawn shikara ride on Dal Lake',
      'Gulmarg gondola above alpine meadows',
      'Pahalgam riverside saffron picnic',
    ],
  },
  {
    id: 'sikkim',
    state: 'Sikkim',
    region: 'North-East India',
    title: 'SIKKIM',
    cardTitle: 'Sikkim',
    tagline: 'Kanchenjunga Mist & Monasteries',
    description:
      'Prayer flags fluttering against dawn light over Kanchenjunga and terraced Himalayan tea gardens.',
    backdropImage: '/assets/sikkim.webp',
    cardImage: '/assets/sikkim.webp',
    startingPrice: '₹44,500',
    bestSeason: 'Mar – Jun',
    duration: '6 Nights / 7 Days',
    highlights: [
      'Sunrise over Tiger Hill & Kanchenjunga',
      'Rumtek Monastery & Gangtok ridge walk',
      'Single-estate organic tea tasting',
    ],
  },
  {
    id: 'andaman',
    state: 'Andaman',
    region: 'Bay of Bengal',
    title: 'ANDAMAN',
    cardTitle: 'Andaman',
    tagline: 'Coral Lagoons & Emerald Isles',
    description:
      'Translucent turquoise reefs, silver crescent beaches, and untouched rainforest islands.',
    backdropImage: '/assets/andaman.webp',
    cardImage: '/assets/andaman.webp',
    startingPrice: '₹52,000',
    bestSeason: 'Nov – Apr',
    duration: '5 Nights / 6 Days',
    highlights: [
      'Havelock Radhanagar sunset beach',
      'Private coral reef scuba & kayak',
      'Neil Island bioluminescent shoreline',
    ],
  },
];

export const POPULAR_DESTINATIONS: PopularDestination[] = [
  {
    id: 'udaipur-pop',
    name: 'Udaipur & Mewar',
    state: 'Rajasthan',
    region: 'West',
    startingPrice: '₹42,000',
    priceNum: 42000,
    duration: '5D / 4N',
    image: '/assets/udaipur.webp',
    tag: 'Royal Heritage',
    summary: 'Lakeside palace suites, vintage car transfers, and private Aravalli sundowners.',
  },
  {
    id: 'jaipur-pop',
    name: 'Jaipur Pink City',
    state: 'Rajasthan',
    region: 'West',
    startingPrice: '₹35,000',
    priceNum: 35000,
    duration: '4D / 3N',
    image: '/assets/destinations/jaipur.jpg',
    tag: 'Architecture',
    summary: 'Dawn entry to Hawa Mahal, Amber Fort elephant trails, and block-print ateliers.',
  },
  {
    id: 'kerala-pop',
    name: 'Alleppey & Munnar',
    state: 'Kerala',
    region: 'South',
    startingPrice: '₹38,500',
    priceNum: 38500,
    duration: '6D / 5N',
    image: '/assets/kerala.webp',
    tag: 'Wellness & Water',
    summary: 'Teak houseboats, mist-covered spice plantations, and authentic Ayurveda.',
  },
  {
    id: 'ladakh-pop',
    name: 'Leh & Pangong Tso',
    state: 'Ladakh',
    region: 'North',
    startingPrice: '₹54,000',
    priceNum: 54000,
    duration: '7D / 6N',
    image: '/assets/ladakh.webp',
    tag: 'Expedition',
    summary: 'High-altitude turquoise lakes, Nubra dunes, and private monastery mornings.',
  },
  {
    id: 'kashmir-pop',
    name: 'Srinagar & Gulmarg',
    state: 'Kashmir',
    region: 'North',
    startingPrice: '₹48,000',
    priceNum: 48000,
    duration: '6D / 5N',
    image: '/assets/kashmir.webp',
    tag: 'Alpine Romance',
    summary: 'Cedar shikaras on Dal Lake, saffron harvests, and pine-valley chalets.',
  },
  {
    id: 'sikkim-pop',
    name: 'Gangtok & Darjeeling',
    state: 'Sikkim',
    region: 'North-East',
    startingPrice: '₹44,500',
    priceNum: 44500,
    duration: '6D / 5N',
    image: '/assets/sikkim.webp',
    tag: 'Tea & Peaks',
    summary: 'Heritage tea estates overlooking Kanchenjunga and tranquil Himalayan monasteries.',
  },
  {
    id: 'andaman-pop',
    name: 'Havelock & Neil',
    state: 'Andaman',
    region: 'Islands',
    startingPrice: '₹52,000',
    priceNum: 52000,
    duration: '5D / 4N',
    image: '/assets/andaman.webp',
    tag: 'Island Escape',
    summary: 'Coral reef charters, beachfront pool villas, and glowing tide kayaks.',
  },
  {
    id: 'varanasi-pop',
    name: 'Varanasi & Agra',
    state: 'Uttar Pradesh',
    region: 'East',
    startingPrice: '₹39,000',
    priceNum: 39000,
    duration: '5D / 4N',
    image: '/assets/destinations/varanasi.jpg',
    tag: 'Sacred Classics',
    summary: 'Sunrise boat rows along ancient ghats paired with Taj Mahal dawn light.',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-mewar',
    title: 'Royal Mewar & Lakes',
    destination: 'Rajasthan',
    duration: '6 Days / 5 Nights',
    nights: 5,
    price: '₹68,000',
    priceNum: 68000,
    rating: 4.9,
    reviews: 142,
    bestSeller: true,
    theme: 'Heritage',
    budgetTier: '₹60,000 – ₹1,20,000',
    image: '/assets/udaipur.webp',
    inclusions: ['Palace Suite', 'Private Chauffeur', 'Lake Pichola Charter'],
  },
  {
    id: 'pkg-kerala',
    title: 'Malabar Backwater Sanctuary',
    destination: 'Kerala',
    duration: '7 Days / 6 Nights',
    nights: 6,
    price: '₹56,500',
    priceNum: 56500,
    rating: 4.9,
    reviews: 118,
    bestSeller: true,
    theme: 'Honeymoon',
    budgetTier: '₹35,000 – ₹60,000',
    image: '/assets/kerala.webp',
    inclusions: ['Private Kettuvallam', 'Munnar Tea Bungalow', 'Ayurveda Spa'],
  },
  {
    id: 'pkg-ladakh',
    title: 'Trans-Himalayan Sky Trail',
    destination: 'Ladakh',
    duration: '8 Days / 7 Nights',
    nights: 7,
    price: '₹74,000',
    priceNum: 74000,
    rating: 4.8,
    reviews: 94,
    bestSeller: true,
    theme: 'Adventure',
    budgetTier: '₹60,000 – ₹1,20,000',
    image: '/assets/ladakh.webp',
    inclusions: ['Pangong Luxury Camp', 'Oxygenated SUV', 'Monastery Pass'],
  },
  {
    id: 'pkg-ranthambore',
    title: 'Pink City & Royal Tiger Trail',
    destination: 'Rajasthan',
    duration: '5 Days / 4 Nights',
    nights: 4,
    price: '₹59,000',
    priceNum: 59000,
    rating: 4.9,
    reviews: 86,
    theme: 'Wildlife',
    budgetTier: '₹35,000 – ₹60,000',
    image: '/assets/destinations/ranthambore.jpg',
    inclusions: ['Private Canter Safari', 'Haveli Stay', 'Jaipur Food Walk'],
  },
  {
    id: 'pkg-kashmir',
    title: 'Saffron & Shikara Escape',
    destination: 'Kashmir',
    duration: '6 Days / 5 Nights',
    nights: 5,
    price: '₹62,500',
    priceNum: 62500,
    rating: 4.9,
    reviews: 109,
    theme: 'Honeymoon',
    budgetTier: '₹60,000 – ₹1,20,000',
    image: '/assets/kashmir.webp',
    inclusions: ['Heritage Houseboat', 'Gulmarg Gondola', 'Wazwan Feast'],
  },
  {
    id: 'pkg-andaman',
    title: 'Emerald Coral Villa Retreat',
    destination: 'Andaman',
    duration: '5 Days / 4 Nights',
    nights: 4,
    price: '₹64,000',
    priceNum: 64000,
    rating: 4.8,
    reviews: 73,
    theme: 'Beaches',
    budgetTier: '₹60,000 – ₹1,20,000',
    image: '/assets/andaman.webp',
    inclusions: ['Beachfront Villa', 'Private Catamaran', 'Guided Reef Dive'],
  },
];

export const EXPERIENCE_THEMES: ExperienceTheme[] = [
  { id: 'honeymoon', name: 'Honeymoon', tagline: 'Candlelit lakes & private pool villas', count: '14 Journeys', image: '/assets/kashmir.webp' },
  { id: 'adventure', name: 'Adventure', tagline: 'High passes, glaciers & river rapids', count: '11 Journeys', image: '/assets/ladakh.webp' },
  { id: 'spiritual', name: 'Spiritual / Pilgrimage', tagline: 'Dawn aartis & Himalayan ashrams', count: '9 Journeys', image: '/assets/uttrakhand.webp' },
  { id: 'wildlife', name: 'Wildlife', tagline: 'Bengal tiger safaris & forest lodges', count: '8 Journeys', image: '/assets/destinations/ranthambore.jpg' },
  { id: 'beaches', name: 'Beaches', tagline: 'Coral lagoons & barefoot coastal coves', count: '10 Journeys', image: '/assets/andaman.webp' },
  { id: 'heritage', name: 'Heritage', tagline: 'Living palaces & royal forts', count: '16 Journeys', image: '/assets/destinations/jaipur.jpg' },
  { id: 'family', name: 'Family', tagline: 'Multi-generational seamless pacing', count: '12 Journeys', image: '/assets/kerala.webp' },
  { id: 'hills', name: 'Hill Stations', tagline: 'Cedar chalets & mist-draped tea gardens', count: '13 Journeys', image: '/assets/sikkim.webp' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose',
    subtitle: 'Select your mood & region',
    description:
      'Explore India by season, landscape, or pacing—from lakeside palaces in Udaipur to Himalayan sanctuaries.',
  },
  {
    step: '02',
    title: 'Customise',
    subtitle: 'Co-design with your concierge',
    description:
      'Your dedicated India specialist shapes boutique stays, private chauffeurs, and exclusive cultural access.',
  },
  {
    step: '03',
    title: 'Travel',
    subtitle: 'Arrive with everything handled',
    description:
      'Step off the tarmac into private transfers, pre-cleared monument entries, and 24x7 WhatsApp concierge support.',
  },
  {
    step: '04',
    title: 'Relax',
    subtitle: 'Live the story unhurried',
    description:
      'Savor slow mornings on Dal Lake or sunset safaris in Ranthambore while our ground team monitors every detail.',
  },
];

export const WHY_CHOOSE_STATS = [
  { label: 'Happy Travellers', value: 18400, suffix: '+' },
  { label: 'Indian Destinations', value: 64, suffix: '+' },
  { label: 'Years Crafting India', value: 14, suffix: ' Yrs' },
  { label: 'Verified Guest Rating', value: 4.9, suffix: ' / 5', decimals: 1 },
];

export const TRUST_PILLARS = [
  {
    title: '24x7 Concierge Support',
    detail: 'Real human trip captains reachable on WhatsApp & direct phone at every hour of your journey.',
  },
  {
    title: '100% Custom Itineraries',
    detail: 'Never boxed into rigid group buses—every departure flexes around your rhythm and interests.',
  },
  {
    title: 'Best-Price Guarantee',
    detail: 'Direct heritage hotel & airline contracts with transparent INR pricing and zero hidden markups.',
  },
  {
    title: 'Hand-Verified Stays',
    detail: 'Every palace hotel, houseboat, and forest lodge is personally audited by our founders each season.',
  },
];

export const GALLERY_FRAMES = [
  { id: 'g1', title: 'City Palace Dusk', place: 'Udaipur, Rajasthan', image: '/assets/udaipur.webp' },
  { id: 'g2', title: 'Taj Dawn Reflection', place: 'Agra, Uttar Pradesh', image: '/assets/destinations/tajmahal.jpg' },
  { id: 'g3', title: 'Alleppey Houseboat', place: 'Kerala Backwaters', image: '/assets/kerala.webp' },
  { id: 'g4', title: 'Pangong Horizon', place: 'Leh-Ladakh', image: '/assets/ladakh.webp' },
  { id: 'g5', title: 'Hawa Mahal Facade', place: 'Jaipur, Rajasthan', image: '/assets/destinations/jaipur.jpg' },
  { id: 'g6', title: 'Ganga Aarti Lamps', place: 'Rishikesh, Uttarakhand', image: '/assets/uttrakhand.webp' },
  { id: 'g7', title: 'Bengal Tiger Gaze', place: 'Ranthambore National Park', image: '/assets/destinations/ranthambore.jpg' },
  { id: 'g8', title: 'Kanchenjunga Sunrise', place: 'Sikkim & Darjeeling', image: '/assets/sikkim.webp' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Ananya & Vikram Mehta',
    city: 'Mumbai',
    trip: 'Royal Mewar & Udaipur Honeymoon (6 Days)',
    rating: 5,
    quote:
      'Watching the City Palace light up from our private Pichola boat felt straight out of a Merchant Ivory film. Priti Travels Hub anticipated every transfer before we even asked.',
    avatar: 'AM',
  },
  {
    id: 't2',
    name: 'Dr. Rajeshwari Iyer',
    city: 'Bengaluru',
    trip: 'Malabar Backwater & Ayurveda Retreat (7 Days)',
    rating: 5,
    quote:
      'Seamless multi-generational pacing for my parents and kids alike. Our Alleppey houseboat chef and Munnar naturalist made Kerala unforgettable.',
    avatar: 'RI',
  },
  {
    id: 't3',
    name: 'Karanvir Singhania',
    city: 'New Delhi',
    trip: 'Trans-Himalayan Ladakh Expedition (8 Days)',
    rating: 5,
    quote:
      'From acclimatization planning to private early-morning entry at Thiksey Monastery, their ground team handled high-altitude logistics effortlessly.',
    avatar: 'KS',
  },
  {
    id: 't4',
    name: 'Meera & Siddharth Rao',
    city: 'Hyderabad',
    trip: 'Saffron & Shikara Kashmir Escape (6 Days)',
    rating: 5,
    quote:
      'The cedar houseboat on Dal Lake and private saffron-meadow picnic in Pahalgam exceeded every expectation. Genuine warmth and zero tourist traps.',
    avatar: 'MR',
  },
];

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'guide-1',
    title: 'When to Visit Udaipur vs Jaipur: A Monsoon-to-Winter Field Guide',
    category: 'Rajasthan Journal',
    readTime: '5 min read',
    excerpt:
      'How October mist, winter courtyard light, and palace festivals transform Rajasthan’s lake cities.',
    image: '/assets/destinations/jaipur.jpg',
    date: 'Nov 2026',
  },
  {
    id: 'guide-2',
    title: 'Slow Travel in Kerala: Choosing the Right Backwater Canal',
    category: 'South India Notes',
    readTime: '4 min read',
    excerpt:
      'Why quieter Kumarakom lagoons and heritage spice bungalows outshine crowded day-cruise routes.',
    image: '/assets/kerala.webp',
    date: 'Oct 2026',
  },
  {
    id: 'guide-3',
    title: 'First-Timer’s Altitude & Packing Playbook for Leh-Ladakh',
    category: 'Himalayan Dispatch',
    readTime: '6 min read',
    excerpt:
      'Acclimatization milestones, scenic passes, and what to carry for sub-zero starry nights at Pangong.',
    image: '/assets/ladakh.webp',
    date: 'Sep 2026',
  },
];

export const REEL_ITEMS: ReelItem[] = [
  { id: 'r1', title: 'Twilight on Lake Pichola', location: 'Udaipur', duration: '0:28', views: '148K', image: '/assets/udaipur.webp' },
  { id: 'r2', title: 'Dawn Shikara Mist', location: 'Srinagar', duration: '0:34', views: '212K', image: '/assets/kashmir.webp' },
  { id: 'r3', title: 'Evening Ganga Aarti', location: 'Rishikesh', duration: '0:42', views: '194K', image: '/assets/uttrakhand.webp' },
  { id: 'r4', title: 'Prayer Flags & Tea Hills', location: 'Sikkim', duration: '0:24', views: '119K', image: '/assets/sikkim.webp' },
  { id: 'r5', title: 'Coral Tide Kayaking', location: 'Andaman', duration: '0:31', views: '176K', image: '/assets/andaman.webp' },
  { id: 'r6', title: 'Morning Ghats Walk', location: 'Varanasi', duration: '0:37', views: '165K', image: '/assets/destinations/varanasi.jpg' },
];
