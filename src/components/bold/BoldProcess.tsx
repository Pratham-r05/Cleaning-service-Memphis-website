"use client";

import Image from "next/image";
import { useState } from "react";
import { steps, site } from "@/lib/site";
import { IconPhone, IconClock, IconHome, IconSparkle } from "../Icons";
import { Reveal } from "../motion/Reveal";

/** One icon per step, in the same order as `steps`. */
const stepIcons = [IconPhone, IconClock, IconHome, IconSparkle];

/** The two photos the frame crossfades between. */
const shots = [
  {
    src: "/process-cleaner-2.jpg",
    alt: "Cleaner in yellow gloves holding a spray bottle and a microfibre cloth in a living room",
  },
  {
    src: "/process-cleaner.jpg",
    alt: "Cleaner in pink gloves carrying a spray bottle and cloth through a living room",
  },
];

/**
 * Which shot each step shows, and how it is framed. The first half of the list
 * is about reaching a person, so it gets the face; the second half is the work
 * itself. Panning within a shot keeps consecutive steps on the same photo from
 * looking like nothing happened.
 */
const stepShots = [
  // Shot 0 has a face: past roughly 25% the crop starts taking the top of her
  // head, so these two pan only slightly.
  { shot: 0, position: "50% 18%" },
  { shot: 0, position: "50% 24%" },
  { shot: 1, position: "50% 30%" },
  { shot: 1, position: "50% 72%" },
];

export function BoldProcess() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="scroll-mt-32 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink uppercase">
            Four steps. <span className="font-light italic">No runaround.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-ink-60 sm:text-[18px]">
            From the first call to the final walk-through — here is exactly how a
            clean with {site.owner} goes.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ---- Steps ------------------------------------------------ */}
          <Reveal stagger as="ul" className="min-w-0">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              const isActive = i === active;

              return (
                <li key={s.n}>
                  <button
                    type="button"
                    aria-current={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`block w-full cursor-pointer border-l-2 py-5 pl-6 text-left transition-colors duration-300 outline-none focus-visible:bg-lime-soft sm:pl-8 ${
                      isActive ? "border-ink" : "border-hairline"
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <span
                        className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                          isActive
                            ? "bg-lime text-ink"
                            : "bg-[#F4F4F4] text-ink-60"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-display text-sm font-bold tracking-[0.06em] transition-colors duration-300 ${
                              isActive ? "text-lime-dark" : "text-ink-60"
                            }`}
                          >
                            {s.n}
                          </span>
                          <h3
                            className={`font-display text-lg font-bold tracking-[-0.01em] uppercase transition-colors duration-300 sm:text-xl ${
                              isActive ? "text-ink" : "text-ink/70"
                            }`}
                          >
                            {s.title}
                          </h3>
                        </div>
                        <p
                          className={`mt-2 leading-relaxed transition-colors duration-300 ${
                            isActive ? "text-ink/85" : "text-ink-60"
                          }`}
                        >
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </Reveal>

          {/* ---- Photo ------------------------------------------------ */}
          {/* Not inside the rounded frame: the badge hangs past its bottom
              edge, so an overflow-hidden parent would clip it. */}
          <Reveal className="relative min-w-0">
            {/* Both shots are 2:3 portraits of a standing person, so the frame
                has to stay tall or object-cover eats her legs. Capping the
                width on small screens keeps a full-bleed column from going
                wide-and-short and doing exactly that. */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-[28px] bg-[#F4F4F4] lg:aspect-auto lg:h-[clamp(520px,52vw,620px)] lg:max-w-none">
              {shots.map((shot, i) => {
                const isShown = stepShots[active].shot === i;

                return (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    // The hidden shot is still in the DOM, so hide it from
                    // screen readers rather than announcing two photos.
                    aria-hidden={!isShown}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    style={
                      isShown
                        ? { objectPosition: stepShots[active].position }
                        : undefined
                    }
                    className={`object-cover transition-[object-position,opacity] duration-700 ease-out ${
                      isShown ? "opacity-100" : "opacity-0"
                    }`}
                  />
                );
              })}
            </div>

            <div className="absolute -bottom-6 left-5 rounded-2xl bg-lime px-6 py-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] sm:left-8">
              <p className="font-display text-[11px] font-bold tracking-[0.16em] text-ink/70 uppercase">
                Step {steps[active].n}
              </p>
              <p className="mt-1 font-display text-lg font-bold tracking-[-0.01em] text-ink uppercase">
                {steps[active].title}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
