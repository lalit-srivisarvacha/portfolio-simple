"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import { slugify } from "./slug";
import styles from "./Case.module.css";

export type SplitItem = {
  /** Accordion heading. */
  title: string;
  /** Text shown while the accordion is open. */
  body: ReactNode;
  /** What the image well shows while this accordion is open: an image, video or drawn figure. */
  media: ReactNode;
};

/**
 * A two-column section: eyebrow, subheader, intro and a set of accordions on
 * the left; one image well on the right that shows the open accordion's
 * media. One accordion is always open, so the well is never empty. Below
 * 960px the well drops under the text.
 */
export function SplitSection({
  label,
  title,
  id,
  children,
  items,
}: {
  label: string;
  title?: string;
  id?: string;
  /** Intro prose above the accordions. */
  children?: ReactNode;
  items: SplitItem[];
}) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const anchor = id ?? slugify(label);
  const labelId = `${anchor}-label`;

  return (
    <section id={anchor} data-toc={label} aria-labelledby={labelId} className={`${styles.section} ${styles.split}`}>
      <div className={styles.splitText}>
        <p id={labelId} className={`mono-sm subtle ${styles.eyebrow}`}>
          {label.toUpperCase()}
        </p>
        {title && <h2 className="heading">{title}</h2>}
        {children && <div className={styles.prose}>{children}</div>}
        <div className={styles.accordion}>
          {items.map((item, i) => {
            const isOpen = i === open;
            return (
              <div key={item.title} className={styles.accItem} data-open={isOpen || undefined}>
                <h3 className={styles.accHeading}>
                  <button
                    type="button"
                    id={`${uid}-head-${i}`}
                    className={`subheading ${styles.accButton}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-panel-${i}`}
                    onClick={() => setOpen(i)}
                  >
                    {item.title}
                    <span className={styles.accMark}>
                      <Icon name="plus" size={14} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-head-${i}`}
                  className={styles.accPanel}
                  inert={!isOpen}
                >
                  <div className={`body muted ${styles.accBody}`}>{item.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.splitStage}>
        {/* Keyed so the media remounts, and its entrance replays, on every switch. */}
        <div key={open} className={styles.splitMedia}>
          {items[open]?.media}
        </div>
      </div>
    </section>
  );
}
