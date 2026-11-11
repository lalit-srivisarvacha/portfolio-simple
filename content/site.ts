import type { BrandId } from "@/components/ui/Brandmark";
import type { ScreenKind } from "@/components/ui/ScreenPlaceholder";

/**
 * Site-wide content. Edit here, not in components.
 * Anything in [BRACKETS] is a placeholder to replace.
 */

export const site = {
  name: "Lalit",
  fullName: "Lalit Srivisarvacha",
  role: "Senior Product Designer",
  location: "Los Angeles",
  email: "lalit93@me.com",
  avatar: "/avatar.jpg" as string | undefined,
  /** Update once a year; a live Date() would make every page dynamic. */
  year: 2026,
  bio: {
    lead: "A senior product designer with 6 years of experience based in Los Angeles.",
    currentlyAt: { name: "SimpleClosure", href: "https://simpleclosure.com" },
    rest: "streamlining the way founders wind down their businesses.",
  },
  linkedin: "https://www.linkedin.com/in/lalit-srivisarvacha/",
};

export type Project = {
  slug: string;
  title: string;
  /** One line of outcome, used on case-study pages. Say what the work did. */
  summary: string;
  /** Company the work was for: a key of BRANDS in components/ui/Brandmark.tsx. */
  brand: BrandId;
  /**
   * Product shot in /public/work/<slug>/, centered in the card at its own aspect ratio:
   * a real screen of the product (web app, dashboard, a panel or card from the UI), not a
   * mood image. Landscape or square only; a portrait shot comes out too small in the card.
   * Omit image and video and a blank app screen holds the place.
   */
  image?: string;
  /** Describes the image or animation for screen readers. */
  imageAlt?: string;
  /** Looping product animation (mp4/webm). Takes the image's place when set. */
  video?: string;
  /** Still frame for the video; shown before playback and with reduced motion. */
  poster?: string;
  /** Fill the card edge to edge instead of centering the shot. */
  bleed?: boolean;
  /** Blank screen shown until there is an image or video: "desktop" (16:10, default) or "square". */
  placeholder?: ScreenKind;
};

/** Order here is display order on the home page. [CHECK] brands are placeholders; match each to its project. */
export const projects: Project[] = [
  { slug: "returning-funds", title: "Returning funds back to investors", brand: "simpleclosure", summary: "[One line on what this work changed for founders returning money to their investors.]" },
  { slug: "project-02", title: "[Product title]", brand: "rev", summary: "[One line on what this work changed.]", placeholder: "square" },
  { slug: "project-03", title: "[Product title]", brand: "oscar", summary: "[One line on what this work changed.]" },
  { slug: "project-04", title: "[Product title]", brand: "sleepreset", summary: "[One line on what this work changed.]", placeholder: "square" },
  { slug: "project-05", title: "[Product title]", brand: "gojilabs", summary: "[One line on what this work changed.]" },
  { slug: "project-06", title: "[Product title]", brand: "simpleclosure", summary: "[One line on what this work changed.]" },
];
