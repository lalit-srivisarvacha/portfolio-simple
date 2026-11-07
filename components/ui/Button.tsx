import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Trailing 16px line icon. Icons never lead. */
  icon?: IconName;
  className?: string;
};

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };
type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

const EXTERNAL = /^(https?:|mailto:|tel:)/;

/**
 * Pill-shaped call to action. Primary = ink fill, secondary = bg-surface,
 * ghost = hairline-strong outline. Two per view at most.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, className, children, ...rest } = props;
  const cls = ["lds-btn", `lds-btn--${variant}`, size === "sm" && "lds-btn--sm", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchor } = rest as AsLink;
    return EXTERNAL.test(href) ? (
      <a href={href} className={cls} {...anchor}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} {...anchor}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...(rest as AsButton)}>
      {content}
    </button>
  );
}
