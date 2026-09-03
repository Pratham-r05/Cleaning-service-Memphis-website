import { steps } from "@/lib/site";
import { Reveal } from "./motion/Reveal";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="font-heading text-sm font-semibold tracking-[0.18em] text-accent-600 uppercase">
            How it works
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-brand-800">
            Three steps. No runaround.
          </h2>
        </Reveal>

        <Reveal stagger className="relative mt-16 grid gap-10 sm:grid-cols-3">
          {/* Connecting rule behind the steps */}
          <span
            aria-hidden
            className="absolute top-7 left-0 hidden h-px w-full bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 sm:block"
          />
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <span className="relative z-10 grid size-14 place-items-center rounded-full border-4 border-cream bg-brand-600 font-heading text-lg font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-6 font-heading text-xl font-semibold text-brand-800">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-800/70">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
