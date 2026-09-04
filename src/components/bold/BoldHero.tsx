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
    // Fills the fold from lg up so the next section's heading can never creep
    // into the hero viewport; the content centres in whatever height is left.
    <section
      ref={scope}
      id="top"
      className="relative overflow-hidden bg-white lg:flex lg:min-h-[calc(100svh-100px)] lg:items-center"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 pt-4 pb-10">
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
          {/* The copy column's floor is the lime pill's single-line width, so
              the artwork only claims the wider 2.4fr track from xl up, where
              there is spare width to give it. */}
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
            {/* Hero artwork. She already carries a supply bucket, so the
                separate SVG cluster would only fight her for attention.
                Cleaner and supply cluster share a baseline so they read as one
                group standing on the same ground line.
                Widths are clamped rather than height-driven: a height-driven
                pair could out-grow this grid track and, being centred, spill
                over the copy column beside it. */}
            {/* Bleeds left past the container gutter at xl so the pair can grow
                without stealing width from the copy column. */}
            <div className="order-1 flex min-w-0 items-end justify-center gap-3 sm:gap-5 xl:-ml-20">
              <Image
                src="/hero-cleaner.png"
                alt="Professional cleaner with a mop and a bucket of cleaning supplies"
                width={2320}
                height={2836}
                priority
                sizes="(max-width: 767px) 40vw, (max-width: 1023px) 30vw, (max-width: 1280px) 280px, 385px"
                className="bh-art h-auto w-[clamp(120px,22.5vw,280px)] max-h-[64vh] shrink-0 object-contain object-bottom md:w-[clamp(200px,30vw,320px)] lg:w-[clamp(140px,22.5vw,280px)] xl:w-[clamp(280px,27vw,385px)]"
              />
              <Image
                src="/hero-supplies.png"
                alt=""
                aria-hidden
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 767px) 52vw, (max-width: 1023px) 40vw, (max-width: 1280px) 370px, 515px"
                className="bh-supplies h-auto w-[clamp(145px,30vw,370px)] max-h-[50vh] shrink object-contain object-bottom md:w-[clamp(240px,40vw,430px)] lg:w-[clamp(170px,30vw,370px)] xl:-ml-6 xl:w-[clamp(370px,36vw,515px)]"
              />
            </div>

            {/* Pull quote + proof. Centring the group balances the leftover
                height above and below it, rather than pooling it all at the
                top (dead band) or in the middle (justify-between hole). */}
            <div className="relative order-2 flex min-w-0 flex-col justify-center gap-8">
              {/* Decorative quote mark. Pinned to the top of the column so it
                  stays clear of the headline's descenders above. */}
              <span
                aria-hidden
                className="bh-quote pointer-events-none absolute top-0 -left-5 z-0 hidden font-display lg:block text-[13rem] leading-[0.62] font-bold text-ink/[0.07] select-none"
              >
                &rdquo;
              </span>

              <p className="bh-side relative z-10 font-display text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.45] font-medium tracking-[-0.01em] text-ink uppercase">
                Best cleaning services for your business and house.
              </p>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="bh-side flex items-center gap-4">
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

                <p className="bh-side">
                  <span className="inline-block rounded-full bg-lime px-4 py-2 font-display text-[13px] font-bold tracking-[0.04em] text-ink uppercase">
                    Memphis Trusted Cleaning Services
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
