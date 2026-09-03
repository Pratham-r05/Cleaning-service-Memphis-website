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
 * ⚠️  DRAFT COPY — NANCI MUST APPROVE OR CORRECT EVERY QUOTE BEFORE LAUNCH.
 *
 * These are written in the voice of the customers Nanci actually serves, but
 * they are drafts, not collected reviews. Publishing an invented testimonial
 * as a real one misleads customers and, in the US, is an FTC matter. Before
 * this site goes live each entry must either be confirmed by the named client
 * or replaced with their real words (Google review, or written permission).
 *
 * ⚠️  The portraits in /public/reviews are AI-generated stand-ins, not the
 * people named here. They are fine for showing Nanci the layout, but they must
 * be swapped for real customer photos (with permission) or removed in favour
 * of the initials circle before this site is published — a generated face
 * attached to a named review is the same misrepresentation as a fake quote.
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
      "Nanci deep-cleaned our whole house before my daughter's graduation party. She got the kitchen grout and the baseboards looking like the day we moved in. I have used her ever since.",
    name: "Nancy W.",
    location: `${site.city}, ${site.state}`,
    initials: "NW",
    rating: 5,
    photo: "/reviews/nancy-w.jpg",
  },
  {
    quote:
      "We book a bi-weekly clean and it is Nanci at the door every single time. She knows where everything goes now, and I have never had to walk her through the house twice.",
    name: "Dana R.",
    location: `${site.city}, ${site.state}`,
    initials: "DR",
    rating: 5,
    photo: "/reviews/dana-r.jpg",
  },
  {
    quote:
      "Nanci cleans our office after hours so nobody loses a working day. Desks, break room, restrooms. My staff walk in Monday morning and notice immediately.",
    name: "Marcus T.",
    location: `${site.city}, ${site.state}`,
    initials: "MT",
    rating: 5,
    photo: "/reviews/marcus-t.jpg",
  },
  {
    quote:
      "Post-construction cleanup on a remodel we thought would take a week. Drywall dust everywhere. Nanci had it turnover-ready in two days and we handed the keys over on schedule.",
    name: "Alan B.",
    location: `${site.city}, ${site.state}`,
    initials: "AB",
    rating: 5,
    photo: "/reviews/alan-b.jpg",
  },
  {
    quote:
      "I took before and after photos because I did not think anyone would believe it was the same kitchen. What Nanci did to that stovetop alone was worth the money.",
    name: "Lin K.",
    location: `${site.city}, ${site.state}`,
    initials: "LK",
    rating: 5,
    photo: "/reviews/lin-k.jpg",
  },
  {
    quote:
      "Weekly cleans for going on three years. Nanci shows up when she says she will, which after two other companies is the part I appreciate most.",
    name: "Greg P.",
    location: `${site.city}, ${site.state}`,
    initials: "GP",
    rating: 5,
    photo: "/reviews/greg-p.jpg",
  },
  {
    quote:
      "Move-out clean on a rental with a strict landlord. We got the full deposit back with no deductions. I booked Nanci again for the new place before we had unpacked.",
    name: "Sam A.",
    location: `${site.city}, ${site.state}`,
    initials: "SA",
    rating: 5,
    photo: "/reviews/sam-a.jpg",
  },
  {
    quote:
      "Nanci walked the house, gave me a number, and that was the number I paid. No add-ons at the end, no surprises. That is rare.",
    name: "Terrence H.",
    location: `${site.city}, ${site.state}`,
    initials: "TH",
    rating: 5,
    photo: "/reviews/terrence-h.jpg",
  },
  {
    quote:
      "I manage three short-term rentals and turnovers used to run me ragged. Nanci handles all of them between guests and I have not had a cleanliness complaint since.",
    name: "Priya N.",
    location: `${site.city}, ${site.state}`,
    initials: "PN",
    rating: 5,
    photo: "/reviews/priya-n.jpg",
  },
  {
    quote:
      "Eleven years we have had Nanci in our home. She has cleaned us through two moves and a new baby. At this point she is not a service, she is family.",
    name: "Carol M.",
    location: `${site.city}, ${site.state}`,
    initials: "CM",
    rating: 5,
    photo: "/reviews/carol-m.jpg",
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

export type Transformation = {
  slug: string;
  /** Room or space, used as the card title. */
  title: string;
  /** Which of the four services this job falls under. */
  service: string;
  /** One line on what actually changed between the two frames. */
  note: string;
  /** Described for someone who cannot see the pair. */
  beforeAlt: string;
  afterAlt: string;
};

/**
 * Real jobs, shot from the same spot before and after. Both halves of each
 * pair are cropped to 4:3 from the same original frame, so the wipe in
 * <BeforeAfter /> lines up pixel for pixel.
 */
export const transformations: Transformation[] = [
  {
    slug: "kitchen",
    title: "Kitchen",
    service: "House Cleaning",
    note: "Sink emptied, granite polished, cooktop degreased and floors mopped.",
    beforeAlt:
      "Kitchen counter buried in dirty dishes, pans and food packets, with a stained cooktop",
    afterAlt:
      "The same kitchen with clear polished granite, an empty sink and a spotless cooktop",
  },
  {
    slug: "bathroom",
    title: "Bathroom",
    service: "Deep Cleaning",
    note: "Tub and surround scrubbed back to white, counter cleared, fresh towels hung.",
    beforeAlt:
      "Bathroom with a heavily stained tub surround, cluttered counter and towels on the floor",
    afterAlt:
      "The same bathroom with a bright white tub, clear counter and neatly hung towels",
  },
  {
    slug: "home-office",
    title: "Home office",
    service: "House Cleaning",
    note: "Desk cleared, shelves sorted and every surface dusted down.",
    beforeAlt:
      "Home office desk covered in papers, cables, cups and snack wrappers with overflowing shelves",
    afterAlt:
      "The same home office with an empty desk, tidy shelves and clean floor",
  },
  {
    slug: "construction",
    title: "Job site",
    service: "Construction Cleanup",
    note: "Offcuts, sheeting and rubble hauled out; the slab swept walk-through ready.",
    beforeAlt:
      "Building site strewn with timber offcuts, plastic sheeting and rubble",
    afterAlt:
      "The same building site cleared, with materials stacked and the concrete slab swept",
  },
  {
    slug: "office-desk",
    title: "Workstation",
    service: "Office Cleaning",
    note: "Desk wiped down, cables tidied, bin emptied and relined.",
    beforeAlt:
      "Office desk stacked with paperwork, stained mugs, loose cables and an overflowing bin",
    afterAlt:
      "The same office desk clear and wiped down, with a fresh bin liner",
  },
  {
    slug: "bedroom",
    title: "Bedroom",
    service: "House Cleaning",
    note: "Bed made, laundry put away, carpet vacuumed edge to edge.",
    beforeAlt:
      "Bedroom with an unmade bed, clothes over the chair and jeans on the floor",
    afterAlt:
      "The same bedroom with the bed made up under a quilt and the floor clear",
  },
  {
    slug: "guest-room",
    title: "Guest room",
    service: "Deep Cleaning",
    note: "Linens changed, clutter cleared and everything put back in place.",
    beforeAlt:
      "Guest room with rumpled bedding, books piled on the nightstand and clothes on a chair",
    afterAlt:
      "The same guest room made up with a folded quilt and clear surfaces",
  },
];
