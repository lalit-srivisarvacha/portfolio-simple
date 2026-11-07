import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type PillProps = {
  children: ReactNode;
  /** 20px favicon or mark shown in a round well on the left. */
  iconSrc?: string;
  /** Line icon used when there is no iconSrc. */
  icon?: IconName;
  /** Any element for the left well, such as a Brandmark. Takes precedence over iconSrc and icon. */
  mark?: ReactNode;
  /** Accent dot on the left (availability status). */
  dot?: boolean;
  /**
   * float = bg-raised + shadow-float (default; only for use over a card)
   * flat = bg-surface · accent = accent-soft · ink = ink fill
   */
  variant?: "float" | "flat" | "accent" | "ink";
  href?: string;
  className?: string;
};

/** 28px rounded label in `label` type. Never a button. */
export function Pill({ children, iconSrc, icon, mark, dot, variant = "float", href, className }: PillProps) {
  const cls = ["lds-pill", variant !== "float" && `lds-pill--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const hasWell = Boolean(mark || iconSrc || icon);

  const inner = (
    <>
      {mark}
      {!mark && hasWell && (
        <span className="lds-pill__icon">
          {iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- tiny favicon, no optimization needed
            <img src={iconSrc} alt="" width={20} height={20} />
          ) : (
            <Icon name={icon!} size={12} />
          )}
        </span>
      )}
      {!hasWell && dot && <span className="lds-pill__dot" />}
      {children}
    </>
  );

  const style = !hasWell && dot ? { paddingLeft: 0 } : undefined;

  return href ? (
    <a href={href} className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <span className={cls} style={style}>
      {inner}
    </span>
  );
}
