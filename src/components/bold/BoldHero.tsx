"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { site } from "@/lib/site";

export function BoldHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", clearProps: "opacity,transform" },
        });

        tl.fromTo(
          ".bh-line",
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        )
          .fromTo(
            ".bh-art",
            { opacity: 0, y: 60, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1 },
            "-=0.55",
          )
          .fromTo(
            ".bh-supplies",
            { opacity: 0, x: -30, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8 },
            "-=0.8",
          )
          .fromTo(
            ".bh-side",
            { opacity: 0, x: 34 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.12 },
            "-=0.7",
          )
          .fromTo(
            ".bh-quote",
            { opacity: 0, scale: 1.2 },
            { opacity: 1, scale: 1, duration: 0.9 },
            "-=0.9",
          );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-[1240px] px-6 pt-4 pb-10">
        {/* Headline */}
        <h1 className="font-display text-[clamp(2.3rem,8vw,6.4rem)] leading-[0.94] font-bold tracking-[-0.035em] text-ink uppercase">
          <span className="bh-line block">
            Premier{" "}
            <span className="font-light italic tracking-[-0.02em]">Cleaning</span>
          </span>
          <span className="bh-line block">Service in {site.city}</span>
        </h1>

        {/* Art + flanking content */}
        <div className="relative mt-6">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:items-end">
            {/* Hero artwork. She already carries a supply bucket, so the
                separate SVG cluster would only fight her for attention.
                Height-constrained so she never overruns the fold. */}
            {/* Cleaner and supply cluster share a baseline so they read as one
                group standing on the same ground line. */}
            <div className="order-1 flex items-end justify-center gap-2 sm:gap-4">
              <Image
                src="/hero-cleaner.png"
                alt="Professional cleaner with a mop and a bucket of cleaning supplies"
                width={2320}
                height={2836}
                priority
                sizes="(max-width: 1024px) 40vw, 340px"
                className="bh-art h-auto w-auto max-h-[34vh] shrink-0 object-contain lg:max-h-[52vh]"
              />
              <Image
                src="/hero-supplies.png"
                alt=""
                aria-hidden
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 1024px) 50vw, 460px"
                className="bh-supplies h-auto w-auto max-h-[24vh] object-contain lg:max-h-[36vh]"
              />
            </div>

            {/* Pull quote + proof */}
            <div className="relative order-2 lg:pb-6">
              {/* Decorative quote mark */}
              <span
                aria-hidden
                className="bh-quote pointer-events-none absolute -top-28 -left-6 z-0 hidden font-display lg:block text-[16rem] leading-[0.62] font-bold text-ink/[0.07] select-none"
              >
                &rdquo;
              </span>

              <p className="bh-side relative z-10 font-display text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.45] font-medium tracking-[-0.01em] text-ink uppercase">
                Best cleaning services for your business and house.
              </p>

              <div className="bh-side relative z-10 mt-10 flex items-center gap-4">
                <span className="font-display text-[2.6rem] leading-none font-bold tracking-[-0.03em] text-ink">
                  {site.yearsExperience}
                </span>
                <span className="h-10 w-px bg-hairline" />
                <span className="font-display text-sm leading-snug font-semibold tracking-[0.04em] text-ink uppercase">
                  Years
                  <br />
                  Experience
                </span>
              </div>

              <p className="bh-side mt-4">
                <span className="inline-block rounded-full bg-lime px-5 py-2 font-display text-[13px] font-bold tracking-[0.06em] text-ink uppercase">
                  Memphis Trusted Cleaning Services
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
