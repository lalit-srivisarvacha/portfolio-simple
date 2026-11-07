import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

type Common = {
  icon: IconName;
  /** Required accessible name, e.g. "LinkedIn". */
  label: string;
  /** bg-surface fill without the hairline ring. One per row at most. */
  filled?: boolean;
  className?: string;
};

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "aria-label"> & { href: string };
type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "aria-label"> & { href?: undefined };

export type IconButtonProps = AsLink | AsButton;

/** 32px round control holding one 18px line icon, ringed by hairline. */
export function IconButton(props: IconButtonProps) {
  const { icon, label, filled, className, ...rest } = props;
  const cls = ["lds-iconbtn", filled && "lds-iconbtn--filled", className].filter(Boolean).join(" ");

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <a className={cls} aria-label={label} title={label} {...(rest as AsLink)}>
        <Icon name={icon} />
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...(rest as AsButton)}>
      <Icon name={icon} />
    </button>
  );
}
