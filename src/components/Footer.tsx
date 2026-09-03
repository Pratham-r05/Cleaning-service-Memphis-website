import { site, services } from "@/lib/site";
import { IconSparkle, IconPhone, IconMail } from "./Icons";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-800 py-14 text-brand-100/80">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 font-heading text-lg font-bold text-white">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-500 text-brand-900">
                <IconSparkle className="size-5" />
              </span>
              {site.name}
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {site.yearsExperience} years cleaning homes, offices and job sites
              across {site.areaLabel}. Locally owned and personally run by{" "}
              {site.owner}.
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
              Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-accent-400"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-accent-400"
                >
                  <IconPhone className="size-4" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2 break-all transition-colors hover:text-accent-400"
                >
                  <IconMail className="size-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-brand-100/60">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-brand-600/50 pt-6 text-xs text-brand-100/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Serving {site.city}, {site.state} & surrounding areas · Free
            estimates
          </p>
        </div>
      </div>
    </footer>
  );
}
