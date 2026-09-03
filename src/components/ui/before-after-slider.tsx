"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Skip lazy-loading for the pair that is visible on first paint. */
  priority?: boolean;
  /** Rendered width of the frame, for picking the right source size. */
  sizes?: string;
  className?: string;
};

const MIN = 4;
const MAX = 96;
const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n));

/**
 * Drag-to-wipe comparison of two frames of the same room.
 *
 * The "after" frame sits underneath at full width and the "before" frame is
 * clipped over the top of it, so the wipe only ever moves one edge — the two
 * photos never shift relative to each other. Both sources are cropped to the
 * same 4:3 box at build time, which is what keeps the seam honest.
 *
 * Exposed as a real slider: focusable, arrow-key operable, and announced with
 * a percentage, so the comparison is not drag-only.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 720px",
  className = "",
}: BeforeAfterProps) {
  const frame = useRef<HTMLDivElement>(null);
  const hintTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [pos, setPos] = useState(50);
  // Kept in a ref as well as state: a pointermove can land in the same tick as
  // the pointerdown that started the drag, before the state flip has committed.
  const held = useRef(false);
  const [dragging, setDragging] = useState(false);

  const positionFrom = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    setPos(clamp(((clientX - box.left) / box.width) * 100));
  }, []);

  // Re-centre when the featured pair changes, so a new photo always opens
  // half-and-half. Adjusted during render rather than in an effect — an effect
  // would paint the new photo at the old handle position first.
  const [shown, setShown] = useState(before);
  if (shown !== before) {
    setShown(before);
    setPos(50);
  }

  // A single nudge the first time the slider scrolls into view — enough to
  // read as draggable without turning into an animation that plays forever.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers = hintTimers.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timers.push(
          setTimeout(() => setPos(64), 450),
          setTimeout(() => setPos(50), 1150),
        );
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    held.current = true;
    setDragging(true);
    positionFrom(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!held.current) return;
    positionFrom(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    held.current = false;
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const moves: Record<string, number> = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
    };

    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      setPos(e.key === "Home" ? MIN : MAX);
      return;
    }

    const delta = moves[e.key];
    if (delta === undefined) return;
    e.preventDefault();
    setPos((p) => clamp(p + delta));
  };

  // Only tween when the handle is being moved for us, never under the finger.
  const ease = dragging ? "" : "transition-[clip-path,left] duration-500 ease-out";

  return (
    <div
      ref={frame}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      role="slider"
      tabIndex={0}
      aria-label="Reveal the finished clean"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
      className={`group relative touch-none overflow-hidden bg-ink/5 select-none ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
    >
      {/* Finished frame — the full-width base layer. */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="object-cover"
      />

      {/* Untouched frame, clipped to the left of the handle. */}
      <div
        className={`absolute inset-0 ${ease}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />
        {/* Cools the untouched half a touch so the contrast reads instantly. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-ink/12 mix-blend-multiply"
        />
      </div>

      {/* Corner labels. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/95 px-4 py-2 font-display text-[11px] font-bold tracking-[0.14em] text-ink uppercase sm:top-6 sm:left-6"
      >
        Before
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 right-4 rounded-full bg-lime px-4 py-2 font-display text-[11px] font-bold tracking-[0.14em] text-ink uppercase sm:top-6 sm:right-6"
      >
        After
      </span>

      {/* The handle. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-lime ${ease}`}
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime shadow-[0_6px_24px_rgba(0,0,0,0.28)] transition-transform duration-200 group-hover:scale-110 sm:size-14">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-5 text-ink sm:size-6"
          >
            <path
              d="m10 8-4 4 4 4M14 8l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
