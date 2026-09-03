import { services, servicesIntro, steps, faqs, site } from "@/lib/site";
import { IconCheck, IconChevron } from "../Icons";
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
    <section id="services" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <Display className="max-w-3xl">
            Four services.{" "}
            <span className="font-light italic">One standard.</span>
          </Display>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.62fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <CardFanCarousel cards={cards} />
          </div>

          <Reveal className="min-w-0">
            <p className="text-[17px] leading-[1.6] font-medium text-ink sm:text-[18px]">
              {servicesIntro}
            </p>

            <p className="mt-6 font-display text-sm font-bold tracking-[0.04em] text-ink/75 uppercase">
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
  const cards = [
    {
      k: "20",
      unit: "Years",
      t: "Two decades of practice",
      b: `We already know where the dirt hides in a ${site.city} home. Experience shows up in the corners.`,
    },
    {
      k: "100",
      unit: "%",
      t: "Guaranteed service",
      b: "If something's missed, we come back and fix it free. You never pay twice for one clean.",
    },
    {
      k: "Free",
      unit: "Estimates",
      t: "Free estimates, flat prices",
      b: "We quote after seeing the space, and the number we give is the number you pay.",
    },
  ];

  return (
    <section id="why" className="scroll-mt-24 bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-white/50 uppercase">
            <span className="h-2 w-2 rounded-full bg-lime" />
            Why {site.owner}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase">
            The difference{" "}
            <span className="font-light italic text-lime">20 years</span> makes.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/60">
            Locally owned and personally run. When you call, you reach{" "}
            {site.owner} — not a call centre, not a franchise dispatcher.
            That&apos;s why the standard never slips.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.t}
              className="rounded-[24px] border border-white/12 p-9 transition-colors duration-300 hover:border-lime/50 hover:bg-white/[0.04]"
            >
              <p className="font-display text-6xl leading-none font-bold tracking-[-0.04em] text-lime">
                {c.k}
                <span className="ml-1 align-top text-lg font-semibold tracking-normal text-white/50">
                  {c.unit}
                </span>
              </p>
              <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.01em] uppercase">
                {c.t}
              </h3>
              <p className="mt-3 leading-relaxed text-white/60">{c.b}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 rounded-[24px] bg-lime p-9 sm:p-11">
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
              <li key={i} className="flex items-start gap-3 font-medium text-ink">
                <IconCheck className="mt-0.5 size-4 shrink-0" />
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BoldProcess() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <Display>
            Three steps. <span className="font-light italic">No runaround.</span>
          </Display>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t-2 border-ink pt-7">
              <span className="font-display text-6xl leading-none font-bold tracking-[-0.04em] text-lime-dark">
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.01em] text-ink uppercase">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-60">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BoldFaq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-[#FAFAFA] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Display>
            Answered <span className="font-light italic">before you ask.</span>
          </Display>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-60">
            Still unsure about something? Call {site.owner} at{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
        </Reveal>

        <Reveal stagger className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              name="bold-faq"
              className="group rounded-2xl border border-hairline bg-white px-7 transition-colors duration-200 open:border-ink"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-display font-semibold tracking-[-0.01em] text-ink marker:content-none">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime-soft transition-all duration-300 group-open:rotate-180 group-open:bg-lime">
                  <IconChevron className="size-4" />
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-ink-60">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function BoldFooter() {
  return (
    <footer className="mt-auto bg-ink py-16 text-white/70">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 border-b border-white/12 pb-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-none font-bold tracking-[-0.02em] text-white uppercase">
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
                  <a href="#services" className="transition-colors hover:text-lime">
                    {s.title}
                  </a>
                </li>
              ))}
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
