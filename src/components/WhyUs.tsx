"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";
import { IconShield, IconSparkle, IconClock, IconCheck } from "./Icons";
import { Reveal } from "./motion/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reasons = [
  {
    Icon: IconClock,
    title: "Two decades of practice",
    body: `${site.yearsExperience} years of cleaning means we already know where the dirt hides in a ${site.city} home. Experience shows up in the corners.`,
  },
  {
    Icon: IconShield,
    title: "Same hands, every time",
    body: `${site.owner} runs every job personally — you get the same trusted cleaner each visit, not a rotating crew.`,
  },
  {
    Icon: IconSparkle,
    title: "Free estimates, flat prices",
    body: "We quote after seeing the space, and the number we give you is the number you pay. No hourly surprises.",
  },
];

export function WhyUs() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Gentle parallax on the accent panel — scrubbed to scroll position.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".why-panel",
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="why"
      ref={scope}
      className="scroll-mt-24 overflow-hidden bg-brand-800 py-24 text-white sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-heading text-sm font-semibold tracking-[0.18em] text-accent-400 uppercase">
            Why {site.owner}
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold">
            The difference {site.yearsExperience} years makes.
          </h2>
          <p className="mt-5 leading-relaxed text-brand-100/80">
            {site.name} is locally owned and personally run. When you call, you
            reach {site.owner} — not a call centre, not a franchise dispatcher.
            That&apos;s why the standard never slips.
          </p>

          <div className="why-panel mt-10 rounded-3xl border border-brand-600/60 bg-brand-700/50 p-7 backdrop-blur-sm">
            <p className="font-heading text-lg font-semibold text-accent-400">
              Every clean includes
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "All supplies & equipment",
                "Kitchens & bathrooms",
                "Floors vacuumed & mopped",
                "Dusting throughout",
                "Trash removed",
                "Final walk-through",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-brand-50/90"
                >
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group flex gap-5 rounded-2xl border border-brand-600/50 bg-brand-700/30 p-7 transition-colors duration-300 hover:border-accent-400/60 hover:bg-brand-700/60"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-500 text-brand-900 transition-transform duration-300 group-hover:scale-110">
                <r.Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-brand-100/75">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
