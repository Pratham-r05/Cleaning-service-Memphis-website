/**
 * Single source of truth for business details.
 * Everything here came off Nanci's business card — update in one place.
 */
export const site = {
  name: "Cleaning Service",
  owner: "Nanci",
  tagline: "20 Years of Spotless",
  phone: "(901) 456-2587",
  phoneHref: "tel:+19014562587",
  email: "nancidelgada@gmail.com",
  emailHref: "mailto:nancidelgada@gmail.com",
  city: "Memphis",
  state: "TN",
  areaLabel: "Memphis, TN & surrounding areas",
  yearsExperience: 20,
  hours: "Mon–Sat, 8am – 6pm",
} as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  points: string[];
  /** Card photo in /public/services */
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "houses",
    title: "House Cleaning",
    blurb:
      "Regular upkeep that keeps your home guest-ready — kitchens, bathrooms, floors and every surface in between.",
    points: [
      "Weekly, bi-weekly or monthly",
      "Kitchens, baths, bedrooms, living areas",
      "Vacuum, mop and dust throughout",
      "Same trusted cleaner each visit",
    ],
    image: "/services/house.jpg",
    imageAlt:
      "Gloved hands wiping down a bathroom shelf with glass cleaner",
  },
  {
    slug: "offices",
    title: "Office Cleaning",
    blurb:
      "Dependable commercial cleaning scheduled around your business, so your team walks into a fresh space every morning.",
    points: [
      "Before-hours or after-hours service",
      "Desks, break rooms and restrooms",
      "Trash removal and restocking",
      "Flexible recurring contracts",
    ],
    image: "/services/office.jpg",
    imageAlt:
      "Cleaner mopping an office floor beside a wet floor sign and cart",
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    blurb:
      "Top-to-bottom detail work for spring cleans, move-ins and move-outs — the corners a routine clean never reaches.",
    points: [
      "Baseboards, door frames and vents",
      "Inside ovens, fridges and cabinets",
      "Ceiling fans and light fixtures",
      "Move-in / move-out ready",
    ],
    image: "/services/deep.jpg",
    imageAlt:
      "Technician in protective coveralls steam-cleaning a living room",
  },
  {
    slug: "construction-cleanup",
    title: "Construction Cleanup",
    blurb:
      "Post-build and post-renovation cleanup that turns a dusty job site into a finished, walk-through-ready space.",
    points: [
      "Fine drywall and sawdust removal",
      "Sticker, paint and adhesive scraping",
      "Window, fixture and floor detailing",
      "Final walk-through standard",
    ],
    image: "/services/construction.jpg",
    imageAlt:
      "Worker in a hard hat sweeping debris in a room under renovation",
  },
];

/**
 * Services-section intro. Written for Nanci — deliberately not the competitor's
 * paragraph, which names their business and claims all-natural/non-toxic
 * methods we have no basis to assert on her behalf.
 */
export const servicesIntro = `${site.name} has kept ${site.city} homes, offices and job sites spotless for ${site.yearsExperience} years. ${site.owner} runs every job personally — the same trusted hands each visit, not a rotating crew. Whether it's weekly upkeep, a top-to-bottom deep clean before a move, or clearing drywall dust after a build, the standard doesn't change. Every estimate is free and every clean is guaranteed: if something gets missed, we come back and put it right at no charge. Locally owned, personally run, and answerable to you — not a franchise office three states away.`;

export const stats = [
  { value: "20", suffix: "+", label: "Years of experience" },
  { value: "100", suffix: "%", label: "Satisfaction guaranteed" },
  { value: "Free", suffix: "", label: "Estimates, always" },
  { value: "901", suffix: "", label: "Locally owned & operated" },
];

export const steps = [
  {
    n: "01",
    title: "Call or message",
    body: `Tell ${site.owner} what you need cleaned and how often. No forms to fight with — a real conversation.`,
  },
  {
    n: "02",
    title: "Get a free estimate",
    body: "We walk the space, agree on the scope, and quote a flat price. No surprises added later.",
  },
  {
    n: "03",
    title: "Come home to clean",
    body: "We arrive on schedule with our own supplies and equipment — the same trusted hands every visit.",
  },
  {
    n: "04",
    title: "Get sparkling results",
    body: "We finish with a walk-through so you see the result for yourself. If anything's missed, we come back at no charge.",
  },
];

/**
 * ⚠️  PLACEHOLDER CONTENT — MUST BE REPLACED BEFORE LAUNCH.
 *
 * These are deliberately written as instructions, not as reviews. Publishing
 * invented testimonials for a real business misleads her customers and, in the
 * US, is an FTC matter. Swap in real quotes (Nanci's Google reviews, or written
 * permission from clients) with their actual first name + last initial.
 */
export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  initials: string;
  /** Stars out of 5, as actually left by the customer. */
  rating: number;
  /**
   * Optional path under /public/reviews. Use a real photo only with that
   * customer's permission — initials are the norm for local businesses and
   * read as more credible than a stock or generated face.
   */
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace this with a real review from one of Nanci's customers. Two or three sentences about the job and the result works best.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "Reviews that name the specific service — a deep clean, a move-out, a post-build cleanup — convert better than general praise.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "If a client mentions reliability, or the same cleaner returning each visit, that is worth featuring here.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "Commercial or construction-cleanup clients are especially useful, since no competitor nearby offers that service.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "A review mentioning how the space looked before and after gives readers something concrete to picture.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "Anyone who booked a recurring weekly or bi-weekly clean is worth quoting — it signals people stay on.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "A move-in or move-out clean makes a strong review, since that is when people search hardest for a cleaner.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "If a client noted that the quote matched the final price, feature it. Pricing trust is the biggest hesitation.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "A landlord, realtor or Airbnb host review carries weight with other property owners reading this.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
  {
    quote:
      "A long-standing client mentioning how many years they have used Nanci is the strongest close for this section.",
    name: "Customer name",
    location: `${site.city}, ${site.state}`,
    initials: "—",
    rating: 5,
  },
];

/**
 * Aggregate rating shown above the carousel. Both numbers must come from a
 * real source (Nanci's Google Business Profile) before launch — an invented
 * average is the same problem as an invented review.
 */
export const reviewStats = {
  average: null as number | null,
  count: null as number | null,
  /** Google Business Profile review link, once claimed. */
  reviewUrl: "",
};

export const faqs = [
  {
    q: "Do I need to supply cleaning products or equipment?",
    a: "No. We bring all our own supplies and equipment. If you'd prefer we use a specific product in your home, just leave it out and let us know.",
  },
  {
    q: "How much does a cleaning cost?",
    a: "Every space is different, so we quote after seeing it. Estimates are always free and the price we quote is the price you pay.",
  },
  {
    q: "How often can you come?",
    a: "Weekly, bi-weekly, monthly, or as a one-time deep clean. Construction cleanup is scheduled as a one-off around your build timeline.",
  },
  {
    q: "What areas do you serve?",
    a: `${site.areaLabel}. If you're just outside the area, call and ask — we'll tell you honestly whether we can get to you.`,
  },
  {
    q: "How should I prepare before you arrive?",
    a: "Pick up loose clutter from the surfaces you want cleaned and secure any pets. That's it — we handle the rest.",
  },
  {
    q: "What if I'm not happy with the clean?",
    a: "Call us within 24 hours and we'll come back and make it right at no charge. That's what the service guarantee means.",
  },
];
