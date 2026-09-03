"use client";

import Image from "next/image";
import { useState } from "react";
import { site, transformations } from "@/lib/site";
import { BeforeAfter } from "@/components/ui/before-after-slider";
import { IconChevron } from "../Icons";
import { Reveal } from "../motion/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");
const src = (slug: string, kind: "before" | "after") =>
  `/before-after/${slug}-${kind}.jpg`;

export function BoldResults() {
  const [index, setIndex] = useState(0);
  const current = transformations[index];
  const step = (d: number) =>
    setIndex((i) => (i + d + transformations.length) % transformations.length);

  return (
    <section id="results" className="scroll-mt-8 bg-[#FAFAFA] py-20 sm:scroll-mt-4 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-14">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-ink-60 uppercase">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Before &amp; after
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink uppercase">
              Proof, <span className="font-light italic">not promises.</span>
            </h2>
          </Reveal>

          <Reveal>
            <p className="max-w-md leading-relaxed text-ink-60 lg:pb-1">
              Real jobs from around {site.city}, shot from the same spot before
              we started and after we packed up. Drag the handle across a photo
              to see exactly what changed.
            </p>
          </Reveal>
        </div>

        {/* The photo sits beside its caption rather than above it: the pair is
            shown whole at its native 4:3, and the section stays short enough
            to read the heading and the comparison in one screen. */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-stretch lg:gap-10">
          <Reveal>
            <BeforeAfter
              before={src(current.slug, "before")}
              after={src(current.slug, "after")}
              beforeAlt={current.beforeAlt}
              afterAlt={current.afterAlt}
              className="aspect-[4/3] w-full rounded-[24px] sm:rounded-[28px]"
            />
          </Reveal>

          <Reveal className="flex flex-col justify-between gap-8">
            <div>
              {/* The arrows ride on the counter row rather than below the
                  note: notes run one or two lines depending on the job, and
                  anything under them would jump as you page through. */}
              <div className="flex items-center justify-between gap-6">
                <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-ink-30 uppercase tabular-nums">
                  {pad(index + 1)} / {pad(transformations.length)}
                  <span className="mx-3">·</span>
                  <span className="text-ink-60">{current.service}</span>
                </p>

                <div className="flex shrink-0 items-center gap-2">
                  {([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => step(d)}
                      aria-label={d < 0 ? "Previous job" : "Next job"}
                      className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/20 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <IconChevron
                        className={`size-4 ${d < 0 ? "rotate-90" : "-rotate-90"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="mt-5 font-display text-3xl leading-[0.95] font-bold tracking-[-0.02em] text-ink uppercase sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink-60">
                {current.note}
              </p>
            </div>

            <div className="rounded-[24px] bg-ink p-7 text-white sm:p-8">
              <p className="font-display text-lg leading-snug font-bold tracking-[-0.01em] uppercase sm:text-xl">
                Want your place on this page?{" "}
                <span className="font-light text-lime italic">
                  Estimates are free.
                </span>
              </p>
              <a
                href="#contact"
                className="mt-6 inline-block cursor-pointer rounded-full bg-lime px-7 py-3.5 font-display text-[13px] font-bold tracking-[0.08em] text-ink uppercase transition-colors duration-200 hover:bg-lime-dark"
              >
                Get a free estimate
              </a>
            </div>
          </Reveal>
        </div>

        {/* ---- Job picker ---------------------------------------------- */}
        <Reveal className="mt-8">
          <ul
            className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-7"
            aria-label="Choose a job to compare"
          >
            {transformations.map((t, i) => {
              const active = i === index;
              return (
                <li key={t.slug} className="w-32 shrink-0 snap-start sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active}
                    className="group w-full cursor-pointer text-left"
                  >
                    <span
                      className={`relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/5 ring-2 transition-all duration-200 ${
                        active
                          ? "ring-lime"
                          : "opacity-60 ring-transparent group-hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src(t.slug, "after")}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 128px, 170px"
                        className="object-cover"
                      />
                    </span>
                    <span
                      className={`mt-2.5 block font-display text-[11px] font-bold tracking-[0.06em] uppercase transition-colors ${
                        active
                          ? "text-ink"
                          : "text-ink-30 group-hover:text-ink-60"
                      }`}
                    >
                      {t.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
