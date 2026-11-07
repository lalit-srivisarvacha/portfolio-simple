"use client";

import { useEffect, useRef } from "react";

type CardVideoProps = {
  src: string;
  /** Still frame shown before playback and for reduced-motion visitors. */
  poster?: string;
  label?: string;
};

/**
 * Muted, looping product animation for a ProjectCard. Autoplays only when the
 * visitor hasn't asked for reduced motion; otherwise it rests on the poster frame.
 */
export function CardVideo({ src, poster, label }: CardVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        video.play().catch(() => {});
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
