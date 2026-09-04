"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  /** Rendered on the reverse face when the card is hovered. */
  title?: string;
  blurb?: string;
  points?: string[];
  eyebrow?: string;
}

interface CardFanCarouselProps {
  cards: CardItem[];
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

const SPREAD_REM = 25; // x units used by getSlotConfig at multiplier 1
const MAX_ROT = 14; // degrees at the outermost slot

/* -- Card sizing -----------------------------------------------------------
   Sized from the container, not from viewport breakpoints. The fan needs a
   roughly 2.7:1 container-to-card ratio before the spread is wide enough to
   leave each card's bottom-left title clear of the card stacked on top of it.
   Viewport breakpoints could not hold that ratio: at 1024 the two-column grid
   kicks in and squeezes the fan into a ~540px column while the old breakpoints
   grew the cards to their widest, which is what clipped "OFFICE CLEANING" and
   "DEEP CLEANING" down to a few letters. Driving the width off the measured
   container keeps the ratio at every width, and the max matches the widest of
   the old breakpoints so desktop renders exactly as before.                 */
const CARD_RATIO = 2.68;
const CARD_MIN = 150;
const CARD_MAX = 264;
const CARD_ASPECT = 4 / 3; // height = width * aspect
const LAYOUT_LEAD = 1.41; // layout height as a multiple of the card height

const cardWidthFor = (containerW: number) =>
  containerW
    ? Math.round(Math.min(CARD_MAX, Math.max(CARD_MIN, containerW / CARD_RATIO)))
    : CARD_MAX;

/**
 * Widest spread that still keeps the outer cards inside `containerW`.
 * Container-relative rather than viewport-relative, so the fan can sit in a
 * narrow column without overflowing it.
 */
function computeMultiplier(containerW: number, cardW: number, cardH: number) {
  if (!containerW || !cardW) return 1;
  // A rotated card occupies a larger axis-aligned box than its own width, so
  // fitting against cardW alone lets the outer cards hang past the container.
  const rad = (MAX_ROT * Math.PI) / 180;
  const rotatedW = cardW * Math.cos(rad) + cardH * Math.sin(rad);
  const usable = (containerW - rotatedW) / 2;
  return Math.max(0.12, Math.min(1, usable / (SPREAD_REM * 16)));
}

/** Scales y-offsets down when the viewport is too short for the ideal layout. */
function getHeightMultiplier(layoutH: number) {
  const available = window.innerHeight * 0.7;
  return available >= layoutH ? 1 : available / layoutH;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];

  // Symmetric spread. The original used `totalCards >> 1` as the centre, which
  // skews even-numbered fans to one side — with 4 cards it produced distances
  // of -1, -0.5, 0, +0.5, leaving the fan visibly lopsided.
  const half = (totalCards - 1) / 2;
  const distance = half > 0 ? (slot - half) / half : 0;
  const abs = Math.abs(distance);

  return {
    rot: distance * 14,
    scale: 1 - 0.1 * abs,
    x: distance * 25,
    y: abs * abs * 4,
    // Strictly increasing left-to-right so each card is only ever covered on
    // its right edge. Titles sit bottom-left, so a centre-on-top stack hid the
    // start of longer ones ("CONSTRUCTION CLEANUP" read as "RUCTION CLEANUP").
    zIndex: slot + 1,
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 bg-black/5 text-black/40 cursor-pointer shrink-0 z-30 outline-none transition-colors duration-300 hover:border-black/25 hover:text-black/70 active:opacity-70";

export default function CardFanCarousel({ cards }: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(
    needsPagination ? HALF : totalCards >> 1,
  );
  // Touch has no hover, so a tap toggles the reverse face.
  const [flipped, setFlipped] = useState<number | null>(null);
  const [cardW, setCardW] = useState(CARD_MAX);

  const cardH = Math.round(cardW * CARD_ASPECT);
  const layoutH = Math.round(cardH * LAYOUT_LEAD);

  // Measure before paint so the first fan animation starts from the right size.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const next = cardWidthFor(container.offsetWidth);
      setCardW((prev) => (prev === next ? prev : next));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!needsPagination) {
        cards.forEach((_, i) => map.set(i, i));
        return map;
      }
      for (let slot = 0; slot < MAX_VISIBLE; slot++) {
        map.set(
          (((center + slot - HALF) % totalCards) + totalCards) % totalCards,
          slot,
        );
      }
      return map;
    },
    [totalCards, needsPagination, cards],
  );

  const cycle = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating.current || !needsPagination) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === "right"
          ? (prev + 1) % totalCards
          : (prev - 1 + totalCards) % totalCards,
      );
    },
    [totalCards, needsPagination],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".fan-card"),
    );
    if (!cardElements.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const card0 = cardElements[0];
    const multiplier = computeMultiplier(
      container.offsetWidth,
      card0.offsetWidth,
      card0.offsetHeight,
    );
    const hMult = getHeightMultiplier(layoutH);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount && !reduced) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        // Reduced motion: land in the final layout with no travel.
        if (reduced) {
          gsap.set(card, target);
          hasEntered.current = true;
          return;
        }

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05,.78)",
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * hMult}rem`,
            rotation: direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.6,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "power2.out",
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, {
          x: `${exitX}rem`,
          opacity: 0,
          scale: 0.5,
          rotation: direction === "right" ? -30 : 30,
          duration: 0.4,
          ease: "power2.in",
          zIndex: 0,
        });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    if (reduced) return;

    // --- Hover: lift the hovered card, push its neighbours aside ---
    const visibleEntries: { el: HTMLElement; slot: number }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const centerSlot = visibleEntries.length >> 1;

    const updateHoverLayout = (hoveredSlot: number | null) => {
      const mult = computeMultiplier(
        container.offsetWidth,
        cardElements[0].offsetWidth,
        cardElements[0].offsetHeight,
      );
      const hM = getHeightMultiplier(layoutH);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetRot = 0; // straighten so the reverse face reads flat
            targetScale *= 1.08;
          } else {
            const normalized =
              centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength =
              8 *
              (1 - Math.abs(normalized)) *
              (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot)
              targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`,
          y: `${targetY}rem`,
          rotation: targetRot,
          scale: targetScale,
          duration: 0.5,
          delay,
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, {
          zIndex: slot === hoveredSlot ? 20 : base.zIndex,
        });
      });
    };

    const enterHandlers = visibleEntries.map(({ el, slot }) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (activeSlot !== slot) {
          activeSlot = slot;
          updateHoverLayout(slot);
        }
      };
      el.addEventListener("mouseenter", handler);
      return { el, handler };
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        updateHoverLayout(null);
      }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      if (!isAnimating.current) updateHoverLayout(activeSlot);
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      enterHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mouseenter", handler),
      );
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination, layoutH]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg
      className="relative z-[2] h-4 w-4 md:h-5 md:w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  /** Front and reverse faces, shared by the fan and the phone-width row. */
  const cardFace = (card: CardItem, index: number, compact: boolean) => (
    <div
      className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] ${
        flipped === index ? "[transform:rotateY(180deg)]" : ""
      }`}
    >
      {/* Front */}
      <div className="absolute inset-0 overflow-hidden rounded-[1.4rem] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.4)] [backface-visibility:hidden]">
        <Image
          src={card.imgUrl}
          alt={card.alt ?? ""}
          fill
          sizes={compact ? "(max-width: 640px) 78vw, 288px" : "(max-width: 768px) 45vw, 288px"}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-14">
          <p
            className={`font-display font-bold tracking-[-0.01em] text-white uppercase ${
              compact
                ? "text-[15px] leading-[1.15]"
                : "max-w-[6rem] text-[12px] leading-[1.12] sm:max-w-[6.8rem] sm:text-[13px]"
            }`}
          >
            {card.title}
          </p>
        </div>
      </div>

      {/* Reverse */}
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.4rem] bg-ink p-5 text-white sm:p-7 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
        {card.eyebrow && (
          <p className="font-display text-[11px] font-bold tracking-[0.18em] text-lime uppercase">
            {card.eyebrow}
          </p>
        )}
        <p className="mt-1.5 font-display text-base leading-[1.1] font-bold tracking-[-0.01em] text-white uppercase sm:mt-2 sm:text-xl">
          {card.title}
        </p>
        <p className="mt-2.5 text-[13px] leading-[1.45] font-medium text-white/95 sm:mt-3 sm:text-[15px]">
          {card.blurb}
        </p>
        <ul
          className={`mt-4 space-y-2 sm:mt-5 sm:space-y-2.5 sm:[&>li:nth-child(n+3)]:flex ${
            compact ? "" : "[&>li:nth-child(n+3)]:hidden"
          }`}
        >
          {card.points?.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 text-[12px] leading-snug font-medium text-white sm:gap-2.5 sm:text-[14px]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-lime"
                aria-hidden
              >
                <path d="m4.5 12.5 5 5 10-11" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const flipHandlers = (index: number) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-expanded": flipped === index,
    "aria-label": `${cards[index].title} — show details`,
    "data-flipped": flipped === index,
    onClick: () => setFlipped(flipped === index ? null : index),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setFlipped(flipped === index ? null : index);
      }
    },
  });

  return (
    <div className="relative z-20 w-full">
      {/* -- Phone widths: a snap-scrolling row -------------------------------
          Four fanned cards cannot both fit and stay legible under ~640px — the
          spread collapses until each title is covered by the card in front of
          it. A row shows one card whole with the next peeking, which is also
          the gesture a phone reader expects. Kept as a CSS swap rather than a
          JS media query so there is no hydration flash, and the hidden branch's
          lazy images never enter the viewport, so neither branch pays for the
          other's downloads. */}
      <div className="sm:hidden">
        <ul
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Services"
        >
          {cards.map((card, index) => (
            <li
              key={index}
              className="w-[78vw] max-w-[19rem] shrink-0 snap-center"
            >
              <div
                className="group relative aspect-[3/4] w-full cursor-pointer [perspective:1400px]"
                {...flipHandlers(index)}
              >
                {cardFace(card, index, true)}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-center font-display text-[11px] font-bold tracking-[0.14em] text-ink-30 uppercase">
          Swipe · tap a card for details
        </p>
      </div>

      {/* -- sm and up: the fan --------------------------------------------- */}
      <section className="hidden w-full flex-col items-center overflow-x-clip sm:flex">
        <div className="flex w-full items-center justify-center">
          <div
            ref={containerRef}
            className="fan-layout relative flex w-full items-center justify-center"
            style={{ height: layoutH }}
          >
            {cards.map((card, index) => {
              const cls =
                "fan-card group absolute [perspective:1400px] cursor-pointer will-change-transform data-[flipped=true]:z-30!";
              const size = { width: cardW, height: cardH };

              return card.linkUrl ? (
                <a
                  key={index}
                  href={card.linkUrl}
                  target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className={cls}
                  style={size}
                >
                  {cardFace(card, index, false)}
                </a>
              ) : (
                <div
                  key={index}
                  className={cls}
                  style={size}
                  {...flipHandlers(index)}
                >
                  {cardFace(card, index, false)}
                </div>
              );
            })}
          </div>
        </div>

        {needsPagination && (
          <div className="z-30 mt-4 flex items-center justify-center gap-4 md:mt-6">
            <button
              className={`${ARROW_CLASSES} h-10 w-10 md:h-12 md:w-12`}
              onClick={() => cycle("left")}
              aria-label="Previous"
            >
              {chevron("left")}
            </button>
            <div className="flex items-center gap-2">
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i === centerIndex ? "scale-[1.3] bg-black/70" : "bg-black/15"
                  }`}
                />
              ))}
            </div>
            <button
              className={`${ARROW_CLASSES} h-10 w-10 md:h-12 md:w-12`}
              onClick={() => cycle("right")}
              aria-label="Next"
            >
              {chevron("right")}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
