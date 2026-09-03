"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { IconMenu, IconClose } from "../Icons";

const links = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function BoldNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.07)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-6">
        <a
          href="#top"
          className="font-display text-2xl leading-none font-bold tracking-[-0.02em] text-ink uppercase"
        >
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[13px] font-medium tracking-[0.06em] text-ink/75 uppercase transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.emailHref}
            aria-label={`Email ${site.owner}`}
            className="hidden size-12 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white sm:grid cursor-pointer"
          >
            <span aria-hidden className="font-display text-[20px] leading-none font-bold">
              @
            </span>
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-lime px-8 py-4 font-display text-[13px] font-bold tracking-[0.08em] text-ink uppercase transition-all duration-200 hover:bg-lime-dark sm:block cursor-pointer"
          >
            Contact Us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="bold-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center rounded-full border border-ink/25 text-ink lg:hidden cursor-pointer"
          >
            {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="bold-mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-white px-6 pb-6 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline py-4 font-display text-sm font-semibold tracking-[0.06em] text-ink uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 rounded-full bg-lime py-4 text-center font-display text-sm font-bold tracking-[0.08em] text-ink uppercase"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
