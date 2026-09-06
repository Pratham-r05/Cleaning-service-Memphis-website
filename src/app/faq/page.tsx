import type { Metadata } from "next";
import Link from "next/link";
import { BoldNav } from "@/components/bold/BoldNav";
import { BoldFooter } from "@/components/bold/BoldSections";
import { IconChevron, IconMail, IconPhone } from "@/components/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `FAQ | ${site.name} — ${site.city}, ${site.state}`,
  description: `Answers on pricing, supplies, scheduling and service area. Still unsure? Call ${site.owner} at ${site.phone}.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `Frequently asked questions | ${site.name}`,
    description: `Pricing, supplies and scheduling — answered in plain English.`,
    type: "website",
    locale: "en_US",
  },
};

/** Marked up for search engines as well as for readers. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BoldNav />

      <main id="top">
        {/* ---- Dark header band ------------------------------------- */}
        <section className="relative bg-ink pt-16 pb-28 text-white sm:pt-20 sm:pb-32">
          <div className="mx-auto max-w-[1240px] px-6">
            <Reveal>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-display text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase transition-colors hover:text-lime"
              >
                <IconChevron className="size-3.5 rotate-90" />
                Back home
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
              <Reveal>
                <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-white/50 uppercase">
                  <span className="h-2 w-2 rounded-full bg-lime" />
                  Questions
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.15rem,6.4vw,5rem)] leading-[0.92] font-bold tracking-[-0.03em] uppercase">
                  Answered{" "}
                  <span className="font-light text-lime italic">
                    before you ask.
                  </span>
                </h1>
              </Reveal>

              <Reveal>
                <p className="max-w-md leading-relaxed text-white/60">
                  {site.yearsExperience} years of the same questions, answered
                  straight. If yours isn&apos;t here, {site.owner} will pick up
                  the phone and answer it herself.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Same seam treatment as the "why" band on the home page. */}
          <div className="scallop-seam absolute bottom-0 left-0 w-full bg-white" />
        </section>

        {/* ---- Questions -------------------------------------------- */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-ink-30 uppercase">
                  {String(faqs.length).padStart(2, "0")} answers
                </p>
                <h2 className="mt-4 font-display text-2xl leading-tight font-bold tracking-[-0.02em] text-ink uppercase sm:text-3xl">
                  Still unsure about something?
                </h2>
                <p className="mt-4 max-w-sm leading-relaxed text-ink-60">
                  Ask {site.owner} directly — no call centre, no script, no
                  obligation.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={site.phoneHref}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl bg-lime px-6 py-5 transition-colors duration-200 hover:bg-lime-dark"
                  >
                    <IconPhone className="size-5 shrink-0 text-ink" />
                    <span>
                      <span className="block font-display text-[11px] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                        Call {site.owner}
                      </span>
                      <span className="block font-display text-xl font-bold tracking-[-0.02em] text-ink">
                        {site.phone}
                      </span>
                    </span>
                  </a>

                  <a
                    href={site.emailHref}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl border border-hairline px-6 py-5 transition-colors duration-200 hover:border-ink"
                  >
                    <IconMail className="size-5 shrink-0 text-ink" />
                    <span className="min-w-0">
                      <span className="block font-display text-[11px] font-semibold tracking-[0.12em] text-ink-60 uppercase">
                        Email
                      </span>
                      <span className="block wrap-anywhere font-display font-bold tracking-[-0.01em] text-ink">
                        {site.email}
                      </span>
                    </span>
                  </a>
                </div>

                <p className="mt-6 font-display text-[12px] font-semibold tracking-[0.1em] text-ink-30 uppercase">
                  {site.hours}
                </p>
              </Reveal>
            </div>

            <Reveal stagger className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  name="faq-page"
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

        {/* ---- Closing CTA ------------------------------------------ */}
        <section className="bg-white pb-24 sm:pb-32">
          <div className="mx-auto max-w-[1240px] px-6">
            <Reveal className="flex flex-col items-start gap-6 rounded-[28px] bg-lime p-9 sm:flex-row sm:items-center sm:justify-between sm:p-12">
              <p className="max-w-xl font-display text-2xl leading-[1.05] font-bold tracking-[-0.02em] text-ink uppercase sm:text-3xl">
                Answer enough for you?{" "}
                <span className="font-light italic">
                  Let&apos;s book the estimate.
                </span>
              </p>
              <Link
                href="/#contact"
                className="shrink-0 cursor-pointer rounded-full bg-ink px-8 py-4 font-display text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-opacity duration-200 hover:opacity-85"
              >
                Get a free estimate
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <BoldFooter />
    </div>
  );
}
