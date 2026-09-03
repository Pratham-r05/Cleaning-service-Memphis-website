"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { testimonials, reviewStats } from "@/lib/site";
import { Reveal } from "../motion/Reveal";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
      ) : (
        <path d="M5 12h14m0 0-6-6m6 6-6 6" />
      )}
    </svg>
  );
}

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < Math.round(rating) ? "text-star" : "text-ink/15"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

/** Quote mark drawn rather than typed, so it sits on the baseline predictably. */
function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 text-lime-dark" aria-hidden>
      <path
        fill="currentColor"
        d="M0 24V13.4C0 6.6 3.7 1.9 10.6 0l1.6 3.6C8.1 5.1 6 7.4 5.8 10.3H12V24H0Zm20 0V13.4C20 6.6 23.7 1.9 30.6 0l1.6 3.6c-4.1 1.5-6.2 3.8-6.4 6.7H32V24H20Z"
      />
    </svg>
  );
}

export function BoldTestimonials() {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(testimonials.length - 1);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scope = useRef<HTMLElement>(null);

  const total = testimonials.length;
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;

      // Step by one card plus the flex gap, read from layout rather than
      // hard-coded, so the responsive card widths stay the single source.
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const step = card.offsetWidth + gap;

      // Stop once the final card is flush with the right edge, rather than
      // letting the last steps strand a single card beside empty space.
      // The viewport deliberately bleeds off-screen so the next card peeks in,
      // so clamp against the width that is actually visible — otherwise the
      // final card comes to rest partly outside the window.
      const viewport = viewportRef.current;
      const rect = viewport?.getBoundingClientRect();
      const GUTTER = 24;
      const visibleW = rect
        ? Math.min(rect.right, window.innerWidth - GUTTER) - rect.left
        : 0;
      const maxScroll = Math.max(0, track.scrollWidth - visibleW);
      const lastIndex = Math.min(total - 1, Math.ceil(maxScroll / step));
      setMaxIndex((prev) => (prev === lastIndex ? prev : lastIndex));

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.to(track, {
        x: Math.max(-maxScroll, -index * step),
        duration: reduced ? 0 : 0.65,
        ease: "power3.out",
      });
    },
    { scope, dependencies: [index] },
  );

  return (
    <section
      ref={scope}
      id="testimonials"
      className="scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:items-center lg:gap-8">
          {/* Heading + controls */}
          <Reveal>
            <h2 className="font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink uppercase">
              What
              <br />
              they say
            </h2>

            {reviewStats.average !== null && reviewStats.count !== null && (
              <div className="mt-6 flex items-center gap-3">
                <span className="font-display text-3xl font-bold tracking-[-0.02em] text-ink">
                  {reviewStats.average.toFixed(1)}
                </span>
                <Stars rating={reviewStats.average} />
                <span className="text-sm text-ink-60">
                  {reviewStats.count} reviews
                </span>
              </div>
            )}

            <div className="mt-10 flex items-center gap-5">
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={!canPrev}
                aria-label="Previous testimonial"
                className="grid size-12 place-items-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
              >
                <Arrow dir="left" />
              </button>

              <p
                className="font-display text-2xl font-bold tracking-[-0.02em] text-ink tabular-nums"
                aria-live="polite"
              >
                {index + 1}
                <span className="text-ink-30">/{total}</span>
              </p>

              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                disabled={!canNext}
                aria-label="Next testimonial"
                className="grid size-12 place-items-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
              >
                <Arrow dir="right" />
              </button>
            </div>
          </Reveal>

          {/* Track. Overflows the column deliberately so the next card peeks in. */}
          {/* overflow-hidden is load-bearing: without it the track slides left
              over the heading column instead of being clipped at its edge. */}
          <div
            ref={viewportRef}
            className="relative min-w-0 overflow-hidden lg:-mr-[12vw]"
          >
            <div
              ref={trackRef}
              className="flex gap-5 will-change-transform"
              role="group"
              aria-roledescription="carousel"
              aria-label="Customer testimonials"
            >
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  aria-hidden={i < index}
                  className={`flex w-[19rem] shrink-0 flex-col rounded-[24px] border border-hairline p-8 sm:w-[22rem] ${
                    i % 2 === 1 ? "bg-[#F4F4F4]" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <QuoteMark />
                    <Stars rating={t.rating} />
                  </div>

                  <blockquote className="mt-6 min-h-[7.5rem] text-[15px] leading-[1.55] font-medium text-ink/85">
                    {t.quote}
                  </blockquote>

                  <hr className="my-7 border-hairline" />

                  <figcaption className="flex items-center gap-4">
                    {t.photo ? (
                      <Image
                        src={t.photo}
                        alt=""
                        width={96}
                        height={96}
                        className="size-12 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="grid size-12 shrink-0 place-items-center rounded-full bg-lime-soft font-display text-lg font-bold text-ink"
                      >
                        {t.initials}
                      </span>
                    )}
                    <span>
                      <span className="block font-display text-sm font-bold tracking-[0.02em] text-ink uppercase">
                        {t.name}
                      </span>
                      <span className="block text-sm text-ink-60">
                        {t.location}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
