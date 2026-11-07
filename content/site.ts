/**
 * Site-wide content. Edit here, not in components.
 * Anything in [BRACKETS] is a placeholder to replace.
 */

export const site = {
  name: "Lalit",
  role: "Senior Product Designer",
  location: "Los Angeles",
  email: "hello@example.com", // [EMAIL]
  avatar: undefined as string | undefined, // e.g. "/avatar.jpg" in /public
  available: true,
  /** Update once a year; a live Date() would make every page dynamic. */
  year: 2026,
  bio: {
    lead: "Hi, I'm Lalit — a Senior Product Designer based in Los Angeles.",
    rest: "Over the last [N] years I've designed web and mobile products for teams from early-stage startups to [COMPANY], with a soft spot for the unglamorous flows people use every day.",
    currentlyAt: { name: "[COMPANY]", href: "#" },
  },
  previously: ["[COMPANY]", "[COMPANY]", "[COMPANY]"],
  socials: [
    { icon: "dribbble", label: "Dribbble", href: "https://dribbble.com/" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
    { icon: "x", label: "X", href: "https://x.com/" },
  ] as const,
};

export type Project = {
  slug: string;
  title: string;
  /** One line of outcome, used on case-study pages. Say what the work did. */
  summary: string;
  /** 3:2 image path in /public. Omit for a pixel-block placeholder. */
  image?: string;
  imageAlt?: string;
  iconSrc?: string;
  padded?: boolean;
  seed?: number;
};

/** Order here is display order on the home page. */
export const projects: Project[] = [
  { slug: "project-01", title: "Project 01", summary: "[One line on what this work changed.]", seed: 11 },
  { slug: "project-02", title: "Project 02", summary: "[One line on what this work changed.]", seed: 18 },
  { slug: "project-03", title: "Project 03", summary: "[One line on what this work changed.]", seed: 25 },
  { slug: "project-04", title: "Project 04", summary: "[One line on what this work changed.]", seed: 32 },
  { slug: "project-05", title: "Project 05", summary: "[One line on what this work changed.]", seed: 39 },
  { slug: "project-06", title: "Project 06", summary: "[One line on what this work changed.]", seed: 46 },
];
