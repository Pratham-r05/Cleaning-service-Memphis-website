import { services, servicesIntro, site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { IconCheck, IconClock, IconShield, IconSparkle } from "../Icons";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { Reveal } from "../motion/Reveal";

/* ------------------------------------------------------------------ */

function Display({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink uppercase ${className}`}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */

export function BoldServices() {
  const cards: CardItem[] = services.map((s, i) => ({
    imgUrl: s.image,
    alt: s.imageAlt,
    title: s.title,
    blurb: s.blurb,
    points: s.points,
    eyebrow: `0${i + 1} — Service`,
  }));

  return (
    // Keeps the shared section rhythm so this heading stays fully below the
    // fold and never peeks up into the hero.
    <section id="services" className="scroll-mt-4 bg-white py-24 sm:-scroll-mt-4 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <Display className="max-w-3xl">
            Four services.{" "}
            <span className="font-light italic">One standard.</span>
          </Display>
        </Reveal>

        {/* Two columns only from xl. At lg the fan is squeezed into a ~540px
            track, and no card size that still reads as a card leaves each
            title clear of the card stacked on top of it — 1024 rendered
            "OFFICE CLEANIN" and "DEEP CLEANIN". Below xl the fan takes the
            full container instead, which is the layout that already works
            at tablet widths. */}
        <div className="mt-10 grid items-center gap-10 sm:mt-14 xl:grid-cols-[1.62fr_1fr] xl:gap-12">
          <div className="min-w-0">
            <CardFanCarousel cards={cards} />
          </div>

          <Reveal className="min-w-0">
            {/* Capped so the single-column tablet layout does not run this to a
                90-character measure across the full container. */}
            <p className="max-w-[62ch] text-[17px] leading-[1.6] font-medium text-ink sm:text-[18px] xl:max-w-none">
              {servicesIntro}
            </p>

            <p className="mt-6 hidden font-display text-sm font-bold tracking-[0.04em] text-ink/75 uppercase sm:block">
              Hover or tap a card for details
            </p>

            <a
              href="#contact"
              className="mt-7 inline-block rounded-full bg-lime px-8 py-4 font-display text-[13px] font-bold tracking-[0.08em] text-ink uppercase transition-colors duration-200 hover:bg-lime-dark cursor-pointer"
            >
              Get a free estimate
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BoldWhy() {
  const proof = [
    {
      Icon: IconClock,
      t: `20 years in ${site.city}`,
      b: "Experience shows up in the corners.",
    },
    {
      Icon: IconCheck,
      t: "Free estimates",
      b: "We quote flat, after seeing the space.",
    },
    {
      Icon: IconShield,
      t: "Guaranteed clean",
      b: "Something missed? We come back free.",
    },
    {
      Icon: IconSparkle,
      t: "Supplies included",
      b: "We bring our own kit, every visit.",
    },
  ];

  return (
    <section id="why" className="scroll-mt-4 sm:-scroll-mt-4">
      {/* ---- Dark band: heading + the two photos ---------------------- */}
      <div className="relative bg-ink pt-24 text-white sm:pt-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="max-w-3xl">
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Why {site.owner}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
              The difference{" "}
              <span className="font-light text-lime italic">20 years</span>{" "}
              makes.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/60">
              Locally owned and personally run. When you call, you reach{" "}
              {site.owner} — not a call centre, not a franchise dispatcher.
              That&apos;s why the standard never slips.
            </p>
          </Reveal>

          {/* Bottom padding clears the scalloped seam, which is absolutely
              positioned over the band's last 44px. */}
          <Reveal className="relative mt-14 pb-16 sm:mt-16 sm:pb-20">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white/5">
                <Image
                  src="/why-left.jpg"
                  alt="Gloved hands wiping a bathroom shelf with spray cleaner"
                  fill
                  sizes="(max-width: 640px) 100vw, 44vw"
                  className="object-cover object-[50%_40%]"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white/5">
                <Image
                  src="/why-right.jpg"
                  alt="Cleaner in protective coveralls disinfecting a table top"
                  fill
                  sizes="(max-width: 640px) 100vw, 44vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </div>

            {/* Rotating sticker, sat on the seam between the two photos.
                Hidden below sm, where the photos stack and there is no seam
                for it to sit on. */}
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 hidden size-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center sm:grid"
            >
              <svg
                viewBox="0 0 132 132"
                className="animate-badge-spin absolute inset-0 size-full"
              >
                <defs>
                  <path
                    id="why-badge-arc"
                    d="M66 66 m -52 0 a 52 52 0 1 1 104 0 a 52 52 0 1 1 -104 0"
                    fill="none"
                  />
                </defs>
                <text
                  className="fill-white font-display text-[11px] font-bold tracking-[0.22em] uppercase"
                  style={{ letterSpacing: "0.22em" }}
                >
                  <textPath href="#why-badge-arc" startOffset="0">
                    Guaranteed clean · Flat price · Free estimate ·
                  </textPath>
                </text>
              </svg>
              <span className="grid size-16 place-items-center rounded-full bg-lime text-ink">
                <IconSparkle className="size-7" />
              </span>
            </div>
          </Reveal>
        </div>

        {/* The seam takes its colour from the section below it. */}
        <div className="scallop-seam absolute bottom-0 left-0 w-full bg-white" />
      </div>

      {/* ---- Light band: proof points around the cut-out -------------- */}
      <div className="bg-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1240px] px-6">
          <Reveal className="grid items-end gap-y-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
            {/* The cut-out is source-ordered first so it leads on mobile,
                then re-ordered into the middle column from lg. */}
            <div className="order-first flex justify-center lg:order-none lg:col-start-2 lg:row-start-1">
              <Image
                src="/why-cutout.png"
                alt={`${site.owner} in uniform with a spray bottle and cloth`}
                width={1600}
                height={2400}
                sizes="(max-width: 1024px) 60vw, 340px"
                className="h-auto w-[min(66vw,300px)] object-contain lg:w-[clamp(260px,26vw,340px)]"
              />
            </div>

            {[proof.slice(0, 2), proof.slice(2)].map((column, ci) => (
              <div
                key={ci}
                className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-14 ${
                  ci === 0
                    ? "lg:col-start-1 lg:row-start-1"
                    : "lg:col-start-3 lg:row-start-1"
                }`}
              >
                {column.map(({ Icon, t, b }) => (
                  <div key={t} className="text-center">
                    <span className="mx-auto grid size-14 place-items-center rounded-full bg-lime-soft text-ink">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em] text-ink uppercase">
                      {t}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-60">{b}</p>
                  </div>
                ))}
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16 rounded-[24px] bg-lime p-9 sm:p-11">
            <p className="font-display text-lg font-bold tracking-[-0.01em] text-ink uppercase">
              Every clean includes
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "All supplies & equipment",
                "Kitchens & bathrooms",
                "Floors vacuumed & mopped",
                "Dusting throughout",
                "Trash removed",
                "Final walk-through",
              ].map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-medium text-ink"
                >
                  <IconCheck className="mt-0.5 size-4 shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BoldFooter() {
  return (
    <footer className="mt-auto bg-ink py-16 text-white/70">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-10 border-b border-white/12 pb-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-2xl leading-none font-bold tracking-[-0.02em] text-white uppercase sm:text-3xl">
              {site.name}
            </p>
            <p className="mt-5 max-w-sm leading-relaxed">
              {site.yearsExperience} years cleaning homes, offices and job sites
              across {site.areaLabel}. Locally owned and personally run by{" "}
              {site.owner}.
            </p>
            <a
              href={site.phoneHref}
              className="mt-7 inline-block font-display text-2xl font-bold tracking-[-0.02em] text-lime"
            >
              {site.phone}
            </a>
          </div>

          <div>
            <p className="font-display text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/#services"
                    className="transition-colors hover:text-lime"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="transition-colors hover:text-lime">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.emailHref} className="break-all transition-colors hover:text-lime">
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
              <li>{site.areaLabel}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-7 text-sm text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Free estimates · Guaranteed service</p>
        </div>
      </div>
    </footer>
  );
}
