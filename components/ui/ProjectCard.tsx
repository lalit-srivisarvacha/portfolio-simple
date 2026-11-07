import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Pill } from "./Pill";
import { PixelBlock } from "./PixelBlock";

export type ProjectCardProps = {
  /** Project name — the floating Pill label and the link's accessible name. */
  title: string;
  href: string;
  /** 3:2 image in /public. Omit for a pixel-block placeholder. */
  image?: string;
  imageAlt?: string;
  /** Favicon for the Pill; falls back to an arrow glyph. */
  iconSrc?: string;
  /** space-5 of surface around the shot, for images with their own device chrome. */
  padded?: boolean;
  /** Any element to place in the media well instead of an image. */
  media?: ReactNode;
  /** Seed for the placeholder tiles when there is no image. */
  seed?: number;
  priority?: boolean;
};

/**
 * One case study on the home page: a radius-md well on bg-surface holding a 3:2 image,
 * with a floating Pill half-overlapping the bottom-left corner. The whole card is the link.
 */
export function ProjectCard({
  title,
  href,
  image,
  imageAlt = "",
  iconSrc,
  padded,
  media,
  seed = 7,
  priority,
}: ProjectCardProps) {
  return (
    <Link href={href} className="lds-card" aria-label={title}>
      <div className={["lds-card__media", padded && "lds-card__media--padded"].filter(Boolean).join(" ")}>
        {media ??
          (image ? (
            <Image
              src={image}
              alt={imageAlt}
              width={1200}
              height={800}
              sizes="(max-width: 959px) 100vw, 60vw"
              priority={priority}
            />
          ) : (
            <PixelBlock cols={30} rows={12} density={0.32} seed={seed} style={{ height: "100%", alignContent: "center" }} />
          ))}
      </div>
      <Pill className="lds-card__label" iconSrc={iconSrc} icon={iconSrc ? undefined : "arrowUpRight"}>
        {title}
      </Pill>
    </Link>
  );
}
