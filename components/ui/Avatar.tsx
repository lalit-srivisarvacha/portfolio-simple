import Image from "next/image";

export type AvatarProps = {
  src?: string;
  alt: string;
  /** Up to two characters shown when there is no image. */
  initials?: string;
  size?: "md" | "sm";
};

/** 64px round portrait (40px as `sm`). No ring, no status dot. */
export function Avatar({ src, alt, initials = "L", size = "md" }: AvatarProps) {
  const px = size === "sm" ? 40 : 64;
  return (
    <span
      className={["lds-avatar", size === "sm" && "lds-avatar--sm"].filter(Boolean).join(" ")}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <Image src={src} alt="" width={px} height={px} priority />
      ) : (
        initials.slice(0, 2)
      )}
    </span>
  );
}
