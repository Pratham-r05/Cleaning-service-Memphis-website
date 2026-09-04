"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { IconMenu, IconClose, IconPhone } from "../Icons";

/**
 * Hrefs are root-relative rather than bare hashes so the same nav works from
 * /faq, where "#services" would have nothing to scroll to.
 */
const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#results", label: "Before & after" },
  { href: "/#process", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

export function BoldNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // Only routes can be "current" here; the hash links all point back at /.
  const isCurrent = (href: string) => href === pathname;

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

  // The panel pushes the page down rather than overlaying it, so a long menu on
  // a short phone would otherwise let the reader scroll the hero out from under
  // it and leave the panel stranded mid-screen.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // The full link row only fits from xl: at lg the five labels plus the logo
  // and the two buttons wrap onto second lines. Everything below xl gets the
  // panel instead, so nothing in the bar ever wraps.
  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.07)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-5 py-4 sm:gap-6 sm:px-6 sm:py-6">
        <Link
          href="/"
          className="font-display text-lg leading-none font-bold tracking-[-0.02em] text-ink uppercase whitespace-nowrap sm:text-xl lg:text-2xl"
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className={`font-display text-[13px] font-medium tracking-[0.06em] whitespace-nowrap uppercase transition-colors hover:text-ink ${
                isCurrent(l.href)
                  ? "text-ink underline decoration-lime decoration-2 underline-offset-8"
                  : "text-ink/75"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Phones get the call, not the mail: there is no room for the pill
              CTA, and tapping a number is the action people actually take. */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.owner}`}
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-lime text-ink transition-colors duration-200 hover:bg-lime-dark sm:hidden"
          >
            <IconPhone className="size-5" />
          </a>
          <a
            href={site.emailHref}
            aria-label={`Email ${site.owner}`}
            className="hidden size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white sm:grid lg:size-12"
          >
            <span aria-hidden className="font-display text-[18px] leading-none font-bold lg:text-[20px]">
              @
            </span>
          </a>
          <Link
            href="/#contact"
            className="hidden cursor-pointer rounded-full bg-lime px-6 py-3.5 font-display text-[13px] font-bold tracking-[0.08em] whitespace-nowrap text-ink uppercase transition-all duration-200 hover:bg-lime-dark sm:block lg:px-8 lg:py-4"
          >
            Contact Us
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="bold-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/25 text-ink xl:hidden lg:size-12"
          >
            {open ? <IconClose className="size-5 lg:size-6" /> : <IconMenu className="size-5 lg:size-6" />}
          </button>
        </div>
      </div>

      <div
        id="bold-mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-hairline bg-white px-5 pb-6 sm:px-6 xl:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className={`border-b border-hairline py-4 font-display text-sm font-semibold tracking-[0.06em] uppercase ${
                isCurrent(l.href) ? "text-ink" : "text-ink/70"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <a
            href={site.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 rounded-full border border-ink/20 py-4 font-display text-base font-bold tracking-[-0.01em] text-ink"
          >
            <IconPhone className="size-5 shrink-0" />
            {site.phone}
          </a>

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-lime py-4 text-center font-display text-sm font-bold tracking-[0.08em] text-ink uppercase"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
