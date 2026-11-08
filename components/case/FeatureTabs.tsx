"use client";

import { useId, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui";
import { CardVideo } from "@/components/ui/CardVideo";
import styles from "./Case.module.css";

export type Feature = {
  title: string;
  body: string;
  /** Who uses it, shown as a small eyebrow: "Operations", "Founder" … */
  who?: string;
  video: { src: string; poster: string; label: string; size: [number, number] };
};

/**
 * Accordion of features beside one media well. Opening an item swaps the
 * recording to match, so a whole product tour fits in one screen. One item
 * is always open. On phones the well sits above the list.
 */
export function FeatureTabs({ items }: { items: Feature[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const current = items[active];
  const [w, h] = current.video.size;

  return (
    <div className={styles.features}>
      <div className={styles.featureList}>
        {items.map((item, i) => {
          const open = i === active;
          return (
            <div key={item.title} className={styles.featureItem} data-open={open || undefined}>
              <h4>
                <button
                  type="button"
                  className={styles.featureButton}
                  aria-expanded={open}
                  aria-controls={`${base}-${i}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.featureHead}>
                    {item.who && <span className="mono-sm subtle">{item.who.toUpperCase()}</span>}
                    <span className={styles.cardTitle}>{item.title}</span>
                  </span>
                  <Icon name="chevronDown" size={16} />
                </button>
              </h4>
              <div id={`${base}-${i}`} className={styles.featureBody} role="region" aria-label={item.title}>
                <div>
                  <p className="body-sm muted">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.featureMedia}>
        <div className={styles.well}>
          <div key={current.video.src} className={`${styles.stage} ${styles.fadeIn}`} style={{ "--shot-ratio": w / h } as CSSProperties}>
            <CardVideo src={current.video.src} poster={current.video.poster} label={current.video.label} />
          </div>
        </div>
      </div>
    </div>
  );
}
