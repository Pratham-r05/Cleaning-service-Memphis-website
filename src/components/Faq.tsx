import { faqs } from "@/lib/site";
import { IconChevron } from "./Icons";
import { Reveal } from "./motion/Reveal";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-sand py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="font-heading text-sm font-semibold tracking-[0.18em] text-accent-600 uppercase">
            Questions
          </p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-brand-800">
            Answered before you ask.
          </h2>
        </Reveal>

        <Reveal stagger className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              name="faq"
              className="group rounded-2xl border border-brand-100 bg-white px-6 open:border-brand-300 open:shadow-md transition-all duration-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading font-semibold text-brand-800 marker:content-none">
                {f.q}
                <IconChevron className="size-5 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 leading-relaxed text-brand-800/75">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
