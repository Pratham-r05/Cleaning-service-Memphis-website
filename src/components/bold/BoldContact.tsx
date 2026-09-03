"use client";

import { site, services } from "@/lib/site";
import { IconCheck } from "../Icons";
import { Reveal } from "../motion/Reveal";
import { useEstimateForm } from "../useEstimateForm";

export function BoldContact() {
  const { status, error, onSubmit, reset } = useEstimateForm();

  const control =
    "w-full rounded-full border border-hairline bg-white px-6 py-4 font-display text-[15px] text-ink placeholder:text-ink-30 transition-colors duration-200 focus:border-ink focus:outline-none disabled:opacity-60";
  const label =
    "mb-2 block font-display text-[12px] font-semibold tracking-[0.12em] text-ink-60 uppercase";

  return (
    <section id="contact" className="scroll-mt-4 bg-white py-24 sm:-scroll-mt-4 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="flex items-center gap-3 font-display text-[12px] font-semibold tracking-[0.16em] text-ink-60 uppercase">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Free estimate
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ink uppercase">
              Let&apos;s get your{" "}
              <span className="font-light italic">place spotless.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink-60">
              Call {site.owner} directly, or send the details and we&apos;ll get
              back to you the same day.
            </p>

            <a
              href={site.phoneHref}
              className="mt-9 block rounded-[24px] bg-lime p-8 transition-colors duration-200 hover:bg-lime-dark cursor-pointer"
            >
              <span className="font-display text-[12px] font-semibold tracking-[0.14em] text-ink/70 uppercase">
                Call {site.owner}
              </span>
              <span className="mt-2 block font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none font-bold tracking-[-0.03em] text-ink">
                {site.phone}
              </span>
            </a>

            <div className="mt-6 space-y-2 text-[15px] text-ink-60">
              <p>{site.email}</p>
              <p>{site.hours}</p>
              <p>{site.areaLabel}</p>
            </div>
          </Reveal>

          <Reveal>
            {status === "sent" ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center rounded-[28px] border border-hairline p-12 text-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-lime text-ink">
                  <IconCheck className="size-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em] text-ink uppercase">
                  Request sent
                </h3>
                <p className="mt-3 max-w-sm text-ink-60">
                  {site.owner} will get back to you the same day. Need it
                  sooner? Call {site.phone}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 font-display text-sm font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
                <div className="hidden" aria-hidden>
                  <label htmlFor="b-company">Company</label>
                  <input id="b-company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label className={label} htmlFor="b-name">
                    Your name
                  </label>
                  <input
                    id="b-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className={control}
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label className={label} htmlFor="b-phone">
                    Phone
                  </label>
                  <input
                    id="b-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(901) 000-0000"
                    className={control}
                    disabled={status === "sending"}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="b-email">
                    Email (optional)
                  </label>
                  <input
                    id="b-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={control}
                    disabled={status === "sending"}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="service">
                    What do you need cleaned?
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={`${control} cursor-pointer`}
                    defaultValue={services[0].title}
                    disabled={status === "sending"}
                  >
                    {services.map((s) => (
                      <option key={s.slug}>{s.title}</option>
                    ))}
                    <option>Something else</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="message">
                    Anything we should know?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Size of the space, how often, preferred days…"
                    className="w-full resize-y rounded-[24px] border border-hairline bg-white px-6 py-4 font-display text-[15px] text-ink placeholder:text-ink-30 transition-colors duration-200 focus:border-ink focus:outline-none disabled:opacity-60"
                    disabled={status === "sending"}
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-ink px-10 py-5 font-display text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:bg-lime hover:text-ink disabled:cursor-wait disabled:opacity-70 cursor-pointer"
                  >
                    {status === "sending" ? "Sending…" : "Request my free estimate"}
                  </button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="mt-4 rounded-2xl bg-red-50 px-5 py-4 text-center text-sm text-red-700"
                    >
                      {error}{" "}
                      <a href={site.phoneHref} className="font-semibold underline underline-offset-2">
                        {site.phone}
                      </a>
                    </p>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
