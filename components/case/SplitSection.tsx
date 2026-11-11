"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { slugify } from "./slug";
import styles from "./Case.module.css";

export type SplitItem = {
  /** Tab title. */
  title: string;
  /** A sentence or two under the title. Inline content only: it sits inside the tab's button. */
  body: ReactNode;
  /** What the image well shows while this tab is selected: an image, video or drawn figure. */
  media: ReactNode;
};

/**
 * A section with one full-width image well and a row of tabs under it. The
 * eyebrow, subheader and intro run on top; the well shows the selected tab's
 * media; each tab is a title with its text beneath, side by side on desktop
 * and stacked on phones. One tab is always selected, so the well is never
 * empty. Arrow keys move between tabs.
 *
 * The tabs advance on their own: the selected tab's rule fills with the
 * accent as a countdown (quick at first, slowing toward the end) and the next
 * tab takes over when it is full. The countdown is a CSS animation, so it
 * only runs while the section is on screen, holds while the pointer is over
 * the section or keyboard focus is inside it, and is skipped entirely under
 * reduced motion, where tabs change only when chosen.
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
  /** Intro prose above the image. */
  children?: ReactNode;
  items: SplitItem[];
}) {
  const [active, setActive] = useState(0);
  /* Bumped on every selection so the countdown restarts, even on the same tab. */
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const anchor = id ?? slugify(label);
  const labelId = `${anchor}-label`;
  const panelId = `${uid}-panel`;

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id={anchor} data-toc={label} aria-labelledby={labelId} className={styles.section}>
      <p id={labelId} className={`mono-sm subtle ${styles.eyebrow}`}>
        {label.toUpperCase()}
      </p>
      {title && <h2 className="heading">{title}</h2>}
      {children && <div className={`${styles.prose} ${styles.splitIntro}`}>{children}</div>}
      <div ref={root} className={styles.split} data-inview={inView || undefined}>
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          className={styles.splitStage}
        >
          {/* Keyed so the media remounts, and its entrance replays, on every switch. */}
          <div key={`${active}-${cycle}`} className={styles.splitMedia}>
            {items[active]?.media}
          </div>
        </div>
        <div
          role="tablist"
          aria-labelledby={labelId}
          className={styles.tabs}
          style={{ "--tabs": items.length } as React.CSSProperties}
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabRule} aria-hidden="true">
                  {selected && (
                    <span
                      key={cycle}
                      className={styles.tabProgress}
                      onAnimationEnd={() => select((i + 1) % items.length)}
                    />
                  )}
                </span>
                <span className={`subheading ${styles.tabTitle}`}>{item.title}</span>
                <span className={`body-lg ${styles.tabBody}`}>{item.body}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
