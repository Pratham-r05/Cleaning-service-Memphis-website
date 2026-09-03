import { IconCheck } from "./Icons";

const items = [
  "Free estimates",
  "Guaranteed service",
  "Own supplies & equipment",
  "20 years experience",
  "Locally owned",
  "Flexible scheduling",
];

/**
 * Static strip rather than an auto-scrolling marquee — a carousel here would
 * need pause/stop controls to stay accessible, and buys nothing at 6 items.
 */
export function TrustStrip() {
  return (
    <div className="border-y border-brand-100 bg-white">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-center gap-2 text-sm font-semibold text-brand-700"
          >
            <IconCheck className="size-4 text-accent-500" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
