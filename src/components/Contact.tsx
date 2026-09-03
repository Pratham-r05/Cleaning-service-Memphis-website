"use client";

import { site, services } from "@/lib/site";
import { IconPhone, IconMail, IconPin, IconClock, IconCheck } from "./Icons";
import { Reveal } from "./motion/Reveal";
import { useEstimateForm } from "./useEstimateForm";

export function Contact() {
  const { status, error, onSubmit, reset } = useEstimateForm();

  const field =
    "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-800 placeholder:text-brand-800/40 transition-colors duration-200 focus:border-brand-500 focus:outline-none disabled:opacity-60";
  const label = "block text-sm font-semibold text-brand-800 mb-1.5";

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-cream p-8 sm:p-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="font-heading text-sm font-semibold tracking-[0.18em] text-accent-600 uppercase">
              Free estimate
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.6vw,2.7rem)] leading-tight font-bold text-brand-800">
              Let&apos;s get your place spotless.
            </h2>
            <p className="mt-4 leading-relaxed text-brand-800/70">
              Call {site.owner} directly, or send the details and we&apos;ll get
              back to you the same day.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={site.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-all duration-200 hover:border-brand-300 hover:shadow-md cursor-pointer"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition-transform duration-300 group-hover:-rotate-12">
                  <IconPhone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs tracking-wide text-brand-800/60 uppercase">
                    Call {site.owner}
                  </span>
                  <span className="font-heading text-lg font-semibold text-brand-800">
                    {site.phone}
                  </span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-all duration-200 hover:border-brand-300 hover:shadow-md cursor-pointer"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition-transform duration-300 group-hover:-rotate-12">
                  <IconMail className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs tracking-wide text-brand-800/60 uppercase">
                    Email
                  </span>
                  <span className="block truncate font-heading font-semibold text-brand-800">
                    {site.email}
                  </span>
                </span>
              </a>

              <div className="flex flex-wrap gap-x-6 gap-y-2 px-1 pt-2 text-sm text-brand-800/70">
                <span className="flex items-center gap-2">
                  <IconPin className="size-4 text-brand-600" />
                  {site.areaLabel}
                </span>
                <span className="flex items-center gap-2">
                  <IconClock className="size-4 text-brand-600" />
                  {site.hours}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            {status === "sent" ? (
              <div
                role="status"
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-brand-200 bg-white p-10 text-center"
              >
                <span className="grid size-14 place-items-center rounded-full bg-brand-600 text-white">
                  <IconCheck className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-brand-800">
                  Request sent
                </h3>
                <p className="mt-2 max-w-sm text-brand-800/70">
                  {site.owner} will get back to you the same day. Need it
                  sooner? Call {site.phone}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-sm font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                {/* Honeypot — hidden from people, catches bots. */}
                <div className="hidden" aria-hidden>
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className={label} htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className={field}
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label className={label} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(901) 000-0000"
                    className={field}
                    disabled={status === "sending"}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={label} htmlFor="email">
                    Email{" "}
                    <span className="font-normal text-brand-800/50">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={field}
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
                    className={field}
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
                    className={`${field} resize-y`}
                    disabled={status === "sending"}
                  />
                  <p className="mt-1.5 text-xs text-brand-800/55">
                    Rough square footage and how often you&apos;d like us helps
                    us quote faster.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-accent-500 px-8 py-4 font-heading font-semibold text-brand-900 shadow-lg shadow-accent-500/25 transition-all duration-200 hover:bg-accent-400 hover:shadow-xl disabled:cursor-wait disabled:opacity-70 cursor-pointer"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : "Request my free estimate"}
                  </button>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700"
                    >
                      {error}{" "}
                      <a
                        href={site.phoneHref}
                        className="font-semibold underline underline-offset-2"
                      >
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
