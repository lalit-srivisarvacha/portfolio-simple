import {
  AppStoreLogo,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarBlank,
  CaretDown,
  Check,
  Code,
  Cpu,
  Database,
  Dna,
  DribbbleLogo,
  Envelope,
  Files,
  Flask,
  GithubLogo,
  Globe,
  HandCoins,
  Handshake,
  HardDrives,
  Link,
  LinkedinLogo,
  Monitor,
  Moon,
  Package,
  Plus,
  Repeat,
  Scroll,
  SealCheck,
  ShareNetwork,
  Sparkle,
  Stack,
  Storefront,
  Sun,
  Tag,
  User,
  UsersThree,
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
  appStore: AppStoreLogo,
  bookOpen: BookOpen,
  code: Code,
  cpu: Cpu,
  database: Database,
  dna: Dna,
  files: Files,
  flask: Flask,
  globe: Globe,
  handCoins: HandCoins,
  handshake: Handshake,
  hardDrives: HardDrives,
  monitor: Monitor,
  package: Package,
  plus: Plus,
  repeat: Repeat,
  scroll: Scroll,
  sealCheck: SealCheck,
  shareNetwork: ShareNetwork,
  sparkle: Sparkle,
  stack: Stack,
  storefront: Storefront,
  tag: Tag,
  usersThree: UsersThree,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof ICONS;

type Props = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  name: IconName;
  size?: number;
  /** Accessible name; omit for decorative icons. */
  label?: string;
  /** Regular everywhere in the interface. Light is for drawn figures only. */
  weight?: "regular" | "light";
};

export function Icon({ name, size, label, weight = "regular", ...rest }: Props) {
  const Glyph = ICONS[name];
  const a11y = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true as const };
  return <Glyph weight={weight} size={size} {...a11y} {...rest} />;
}
