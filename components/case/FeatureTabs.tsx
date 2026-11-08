"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import { CardVideo } from "@/components/ui/CardVideo";
import styles from "./Case.module.css";

export type Feature = {
  title: string;
  body: string;
  /** Who uses it, shown as a small eyebrow: "Operations", "Founder" … */
  who?: string;
  /** A recording for the well… */
  video?: { src: string; poster: string; label: string; size: [number, number] };
  /** …or any other media, such as a chart. */
  media?: ReactNode;
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
        <div className={current.video ? styles.well : `${styles.well} ${styles.chartWell}`}>
          {current.video ? (
            <div
              key={active}
              className={`${styles.stage} ${styles.fadeIn}`}
              style={{ "--shot-ratio": current.video.size[0] / current.video.size[1] } as CSSProperties}
            >
              <CardVideo src={current.video.src} poster={current.video.poster} label={current.video.label} />
            </div>
          ) : (
            <div key={active} className={`${styles.chartStage} ${styles.fadeIn}`}>
              {current.media}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
