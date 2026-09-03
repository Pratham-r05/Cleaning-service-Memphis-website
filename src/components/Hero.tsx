"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site, stats } from "@/lib/site";
import { IconPhone, IconShield, IconPin, IconClock } from "./Icons";

/** Deterministic bubble field — no Math.random, so SSR and client agree. */
const bubbles = [
  { l: 6, s: 120, d: 0, dur: 15, o: 0.22 },
  { l: 18, s: 58, d: 2.5, dur: 12, o: 0.3 },
  { l: 31, s: 88, d: 5, dur: 18, o: 0.18 },
  { l: 44, s: 42, d: 1.2, dur: 11, o: 0.34 },
  { l: 57, s: 150, d: 6.5, dur: 21, o: 0.14 },
  { l: 69, s: 66, d: 3.4, dur: 13, o: 0.28 },
  { l: 79, s: 104, d: 7.8, dur: 17, o: 0.2 },
  { l: 90, s: 50, d: 4.2, dur: 14, o: 0.32 },
  { l: 96, s: 78, d: 9, dur: 19, o: 0.16 },
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Staged entrance — headline reads first, then supporting copy, then CTAs.
        // fromTo throughout: `from` infers the end state from whatever the
        // element currently is, which breaks if the effect runs twice.
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", clearProps: "opacity,transform" },
        });

        tl.fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
        )
          .fromTo(
            ".hero-line",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
            "-=0.25",
          )
          .fromTo(
            ".hero-sub",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4",
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
            "-=0.35",
          )
          .fromTo(
            ".hero-badge",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
            "-=0.3",
          )
          .fromTo(
            ".hero-stat",
            { opacity: 0, y: 24, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: { each: 0.07 },
              ease: "back.out(1.4)",
            },
            "-=0.25",
          );

        // Bubbles drift upward on a loop, each on its own phase.
        gsap.utils.toArray<HTMLElement>(".bubble").forEach((el) => {
          const dur = Number(el.dataset.dur ?? 15);
          const delay = Number(el.dataset.delay ?? 0);
          gsap.fromTo(
            el,
            { yPercent: 60, x: 0 },
            {
              yPercent: -180,
              x: "+=40",
              duration: dur,
              delay: -delay,
              ease: "none",
              repeat: -1,
            },
          );
        });

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 via-cream to-cream pt-10 pb-20 sm:pt-16 sm:pb-28"
    >
      {/* Decorative bubble field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="bubble absolute bottom-0 rounded-full bg-gradient-to-br from-brand-300 to-brand-500"
            data-dur={b.dur}
            data-delay={b.d}
            style={{
              left: `${b.l}%`,
              width: b.s,
              height: b.s,
              opacity: b.o,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700 uppercase">
            <span className="size-1.5 rounded-full bg-accent-500" />
            {site.yearsExperience} years experience · {site.city}, {site.state}
          </p>

          <h1 className="mt-6 font-heading text-[clamp(2.4rem,6vw,4.1rem)] leading-[1.04] font-bold text-brand-800">
            <span className="hero-line block">A spotless space,</span>
            <span className="hero-line block">
              <span className="relative inline-block">
                <span className="relative z-10">every single time.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1.5 -z-0 h-3.5 rounded-full bg-accent-400/45"
                />
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-brand-800/75">
            {site.owner} has been cleaning {site.city} homes, offices and
            job sites for {site.yearsExperience} years. Houses, deep cleans and
            construction cleanup — done right, guaranteed, with a free estimate
            before you commit.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={site.phoneHref}
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-7 py-4 font-heading font-semibold text-brand-900 shadow-lg shadow-accent-500/25 transition-all duration-200 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/30 cursor-pointer"
            >
              <IconPhone className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
              Call for a free estimate
            </a>
            <a
              href="#contact"
              className="hero-cta inline-flex items-center gap-2 rounded-full border-2 border-brand-600 px-7 py-4 font-heading font-semibold text-brand-700 transition-all duration-200 hover:bg-brand-600 hover:text-white cursor-pointer"
            >
              Request a quote
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-brand-800/70">
            {[
              { Icon: IconShield, text: "Service guaranteed" },
              { Icon: IconClock, text: site.hours },
              { Icon: IconPin, text: site.areaLabel },
            ].map(({ Icon, text }) => (
              <li key={text} className="hero-badge flex items-center gap-2">
                <Icon className="size-4 text-brand-600" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="hero-stat rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-heading text-4xl font-bold text-brand-600">
                {s.value}
                <span className="text-accent-500">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm leading-snug text-brand-800/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
