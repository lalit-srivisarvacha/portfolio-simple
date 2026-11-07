import type { SVGProps } from "react";

/** Lucide-style 24px line icons, 1.5 stroke. Add paths here; never emoji. */
export const ICONS = {
  arrowUpRight: "M7 17 17 7M7 7h10v10",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  chevronDown: "M6 9l6 6 6-6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  sun: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  dribbble: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM7 5.5c3 2.5 5.5 6 7 11M3.5 10.5c5 .5 10-1 13.5-4.5M20.5 13c-4-1-8 0-11 4",
  linkedin: "M6 9v9M6 6v.1M10 18v-5a3 3 0 0 1 6 0v5M10 9v9",
  x: "M5 4l14 16M19 4 5 20",
  github: "M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.3 4.5 4.5 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.1 5.4 2.4 5.4 2.4a4.5 4.5 0 0 0-.1 3.3A4.8 4.8 0 0 0 4 9c0 4.8 3 5.9 5.8 6.2a3 3 0 0 0-.8 2.3V21",
} as const;

export type IconName = keyof typeof ICONS;

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Accessible name; omit for decorative icons. */
  label?: string;
};

export function Icon({ name, size, label, ...rest }: Props) {
  const a11y = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true as const };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
      {...rest}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
