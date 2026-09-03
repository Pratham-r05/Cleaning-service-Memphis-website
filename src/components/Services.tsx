import { services } from "@/lib/site";
import { serviceIcons, IconCheck } from "./Icons";
import { Reveal } from "./motion/Reveal";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="font-heading text-sm font-semibold tracking-[0.18em] text-accent-600 uppercase">
            What we clean
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-[clamp(2rem,4vw,2.9rem)] leading-tight font-bold text-brand-800">
            Four services, one standard.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-brand-800/70">
            Whether it&apos;s a weekly tidy or a job site covered in drywall
            dust, the same eye for detail shows up every time.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
            return (
              <article
                key={s.slug}
                className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/8"
              >
                <span
                  aria-hidden
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150"
                />
                <div className="relative">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white transition-all duration-300 group-hover:bg-accent-500 group-hover:text-brand-900">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-brand-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-800/70">
                    {s.blurb}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm text-brand-800/80"
                      >
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-brand-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
