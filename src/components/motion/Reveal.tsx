"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  /** Seconds to wait before the tween starts. */
  delay?: number;
  /** Distance in px the element travels up into place. */
  y?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered fade-and-rise.
 *
 * Uses fromTo (never `from`) so the end state is stated explicitly. With `from`,
 * a double-invoked effect records the already-hidden opacity as the "natural"
 * value and animates 0 -> 0, leaving the section permanently invisible.
 *
 * The start state is applied inside useGSAP, which runs pre-paint, so there is
 * no flash of hidden content and the markup stays visible without JS.
 */
export function Reveal({
  children,
  stagger = false,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;

        const targets = stagger
          ? gsap.utils.toArray<HTMLElement>(root.children)
          : [root];

        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay,
            ease: "power2.out",
            stagger: stagger ? { each: 0.08, from: "start" } : 0,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  );
}
