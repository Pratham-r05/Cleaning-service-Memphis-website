"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { IconPhone, IconMenu, IconClose, IconSparkle } from "./Icons";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#process", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-brand-100)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-heading text-lg font-bold text-brand-800"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white transition-transform duration-300 group-hover:rotate-12">
            <IconSparkle className="size-5" />
          </span>
          <span className="leading-none">
            {site.name}
            <span className="block text-[11px] font-normal tracking-wide text-brand-600/80">
              {site.city}, {site.state}
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative py-1 text-sm text-brand-800/80 transition-colors hover:text-brand-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-md sm:inline-flex cursor-pointer"
          >
            <IconPhone className="size-4" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-xl text-brand-800 transition-colors hover:bg-brand-100 md:hidden cursor-pointer"
          >
            {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-brand-100 bg-cream px-5 pb-5 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-brand-100/70 py-4 text-brand-800 transition-colors hover:text-brand-600"
            >
              {n.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 font-semibold text-white"
          >
            <IconPhone className="size-4" />
            Call {site.owner} — {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
