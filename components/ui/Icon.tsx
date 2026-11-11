import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  CaretDown,
  Check,
  DribbbleLogo,
  Envelope,
  GithubLogo,
  Link,
  LinkedinLogo,
  Moon,
  Sun,
  User,
  XLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { SVGProps } from "react";

/**
 * Phosphor icons (phosphoricons.com), regular weight. The site's names map to
 * Phosphor's here; to add an icon, import it above and give it a name below.
 * Never emoji or icon fonts.
 */
export const ICONS = {
  arrowUpRight: ArrowUpRight,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronDown: CaretDown,
  check: Check,
  mail: Envelope,
  user: User,
  calendar: CalendarBlank,
  sun: Sun,
  moon: Moon,
  link: Link,
  dribbble: DribbbleLogo,
  linkedin: LinkedinLogo,
  x: XLogo,
  github: GithubLogo,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof ICONS;

type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  name: IconName;
  size?: number;
  /** Accessible name; omit for decorative icons. */
  label?: string;
};

export function Icon({ name, size, label, ...rest }: Props) {
  const Glyph = ICONS[name];
  const a11y = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true as const };
  return <Glyph weight="regular" size={size} {...a11y} {...rest} />;
}
