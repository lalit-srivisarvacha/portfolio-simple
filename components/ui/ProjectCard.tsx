import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CardVideo } from "./CardVideo";
import { Pill } from "./Pill";
import { PixelBlock } from "./PixelBlock";

export type ProjectCompany = {
  name: string;
  /** Square brandmark (svg or png) in /public, shown in the chip's round well. */
  logo?: string;
};

export type ProjectCardProps = {
  /** Product name — the chip's text, next to the company brandmark. */
  title: string;
  company: ProjectCompany;
  href: string;
  /** Product shot in /public, centered in the well at its own aspect ratio. */
  image?: string;
  imageAlt?: string;
  /** Looping product animation (mp4/webm) in /public, centered like an image. */
  video?: string;
  /** Still frame for the video; also what reduced-motion visitors see. */
  poster?: string;
  /** Fill the whole well edge to edge instead of centering the shot. */
  bleed?: boolean;
  /** Any element to place in the media well instead of an image or video. */
  media?: ReactNode;
  /** Seed for the placeholder tiles when there is no media. */
  seed?: number;
  priority?: boolean;
};

/**
 * One case study on the home page: a radius-md well on bg-surface with the product shot
 * or animation centered inside, and a chip in the bottom-left corner with the company
 * brandmark and the product title. The company name stays in the link's accessible name.
 * The whole card is the link.
 */
export function ProjectCard({
  title,
  company,
  href,
  image,
  imageAlt = "",
  video,
  poster,
  bleed,
  media,
  seed = 7,
  priority,
}: ProjectCardProps) {
  const hasShot = Boolean(media || video || image);

  return (
    <Link href={href} className="lds-card" aria-label={`${company.name}, ${title}`}>
      <div className={["lds-card__media", bleed && "lds-card__media--bleed"].filter(Boolean).join(" ")}>
        {hasShot ? (
          <div className="lds-card__stage">
            {media ??
              (video ? (
                <CardVideo src={video} poster={poster} label={imageAlt || undefined} />
              ) : (
                <Image
                  src={image!}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 959px) 100vw, 60vw"
                  priority={priority}
                />
              ))}
          </div>
        ) : (
          <PixelBlock cols={30} rows={12} density={0.32} seed={seed} style={{ height: "100%", alignContent: "center" }} />
        )}
      </div>
      <Pill
        className="lds-card__label"
        iconSrc={company.logo}
        monogram={company.logo ? undefined : company.name}
      >
        <span className="lds-card__product">{title}</span>
      </Pill>
    </Link>
  );
}
