import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/ui";
import styles from "./Case.module.css";

/* ───────────────────────────────────────────────────────────────
   Visual blocks for a case study, so the story reads in shapes, not
   paragraphs. All of them run wide on desktop, like Figures.
   ─────────────────────────────────────────────────────────────── */

type Card = { title: string; body: ReactNode };

/**
 * A bento of surface cards: steps, features, findings. `numbered` adds a
 * 01, 02 … eyebrow. `columns` is the count on wide screens (2 on tablets,
 * 1 on phones).
 */
export function Cards({
  items,
  numbered,
  columns = 3,
}: {
  items: Card[];
  numbered?: boolean;
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul className={styles.cards} style={{ "--cols": columns } as CSSProperties}>
      {items.map((item, i) => (
        <li key={item.title} className={styles.card}>
          {numbered && <span className="mono-sm subtle">{String(i + 1).padStart(2, "0")}</span>}
          <h4 className={styles.cardTitle}>{item.title}</h4>
          <p className="body-sm muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Before → after rows: what a step was, and what it became. */
export function Compare({ items }: { items: { label: string; before: string; after: string }[] }) {
  return (
    <ul className={styles.compare}>
      {items.map((item) => (
        <li key={item.label} className={styles.compareRow}>
          <span className={`mono-sm subtle ${styles.compareLabel}`}>{item.label.toUpperCase()}</span>
          <p className="body-sm muted">{item.before}</p>
          <span className={styles.compareArrow} aria-hidden="true">
            <Icon name="arrowRight" size={16} />
          </span>
          <p className={styles.compareAfter}>{item.after}</p>
        </li>
      ))}
    </ul>
  );
}
