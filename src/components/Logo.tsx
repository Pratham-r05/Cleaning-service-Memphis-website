/**
 * Brand mark: sparkling house + leaf icon, with the stacked CLEANING / SERVICES
 * wordmark. Pure vector — stays crisp at any size and in print.
 *
 * Everything scales off the root font-size, so `size` (or a font-size class)
 * is the only knob you need.
 */

type Tone = "dark" | "light";

type ToneSpec = {
  house: string;
  sparkle: string;
  primary: string;
  secondary: string;
  /** Outline behind "SERVICES" — the yellow is too pale to hold on its own. */
  secondaryOutline?: string;
};

const tones = {
  // On dark / photo backgrounds — the artwork off the van and business card.
  dark: {
    house: "#ffffff",
    sparkle: "#ffffff",
    primary: "#ffffff",
    secondary: "#ffd91f",
  },
  // On white — house and "CLEANING" drop to one deep green (mirroring the way
  // they share white on dark). "SERVICES" keeps the exact same yellow, but
  // #ffd91f is ~1.7:1 on white, so it gets a green outline to carve it out.
  light: {
    house: "#14532d",
    sparkle: "#14532d",
    primary: "#14532d",
    secondary: "#ffd91f",
    secondaryOutline: "#14532d",
  },
} satisfies Record<Tone, ToneSpec>;

/** Four-point sparkle with concave sides, centred on (cx, cy). */
function sparkle(cx: number, cy: number, r: number) {
  const w = r * 0.17;
  return [
    `M${cx} ${cy - r}`,
    `Q${cx + w} ${cy - w} ${cx + r} ${cy}`,
    `Q${cx + w} ${cy + w} ${cx} ${cy + r}`,
    `Q${cx - w} ${cy + w} ${cx - r} ${cy}`,
    `Q${cx - w} ${cy - w} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

export function LogoMark({
  tone = "dark",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const c = tones[tone];
  const id = tone === "dark" ? "d" : "l";

  return (
    <svg
      viewBox="1 0 64 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={`lg-swoosh-${id}`} x1="4" y1="56" x2="60" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f6fae" />
          <stop offset="0.45" stopColor="#29abe2" />
          <stop offset="1" stopColor="#8cc63f" />
        </linearGradient>
        <linearGradient id={`lg-leaf-${id}`} x1="30" y1="52" x2="58" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4a9d2d" />
          <stop offset="1" stopColor="#a5d84a" />
        </linearGradient>
      </defs>

      {/* House: open outline, thick rounded stroke */}
      <g
        stroke={c.house}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 34 L30 11 L56 34" />
        <path d="M11 31 V57" />
        <path d="M49 31 V40" />
      </g>

      {/* Window inside the house */}
      <g fill={c.house}>
        <rect x="20" y="36" width="5" height="7" rx="2.5" />
        <rect x="29" y="36" width="5" height="7" rx="2.5" />
      </g>

      {/* Swoosh sweeping under the house */}
      <path
        d="M6 58 C20 52 30 48 42 40 C50 34 56 30 62 27"
        stroke={`url(#lg-swoosh-${id})`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Leaf riding the swoosh */}
      <path
        d="M33 50 C33 38 42 29 60 26 C60 42 50 51 33 50 Z"
        fill={`url(#lg-leaf-${id})`}
      />
      <path
        d="M37 48 C44 41 51 34 58 29"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Sparkles off the roofline */}
      <g fill={c.sparkle}>
        <path d={sparkle(44, 13, 11)} />
        <path d={sparkle(59, 20, 5.5)} />
        <path d={sparkle(53, 5, 4)} />
      </g>
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  markOnly = false,
}: {
  tone?: Tone;
  /** Sets the scale — everything is sized in `em`. */
  className?: string;
  markOnly?: boolean;
}) {
  const c: ToneSpec = tones[tone];
  const outline = c.secondaryOutline;

  const secondaryStyle = {
    color: c.secondary,
    ...(outline
      ? {
          // paint-order keeps the stroke behind the fill, so the letters stay
          // as heavy as the line above them.
          WebkitTextStroke: `0.05em ${outline}`,
          paintOrder: "stroke",
        }
      : null),
  };

  if (markOnly) {
    return (
      <LogoMark
        tone={tone}
        className={`h-[2.5em] w-auto ${className ?? ""}`}
      />
    );
  }

  /**
   * Lockup from the van artwork: the house sits up top beside "CLEANING",
   * and "SERVICES" runs the full width underneath — tucked in under the
   * house rather than indented beside it.
   */
  return (
    <span
      className={`font-display inline-flex flex-col items-start leading-none font-black uppercase ${className ?? ""}`}
      role="img"
      aria-label="Cleaning Services"
    >
      <span className="flex items-end gap-[0.2em]">
        <LogoMark tone={tone} className="h-[2.5em] w-auto shrink-0" />
        <span
          style={{ color: c.primary }}
          className="block text-[1em] leading-[0.8] tracking-[-0.035em]"
        >
          Cleaning
        </span>
      </span>
      {/* Sized so the word spans the house + "CLEANING" above it */}
      <span
        style={secondaryStyle}
        className="mt-[0.07em] block text-[1.38em] leading-[0.8] tracking-[-0.04em]"
      >
        Services
      </span>
    </span>
  );
}
