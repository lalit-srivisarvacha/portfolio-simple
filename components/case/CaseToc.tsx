"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./Case.module.css";

type Entry = { id: string; label: string };

/**
 * Sticky list of anchor links to each part of the case study (desktop only).
 * Entries are read from the page itself — anything inside the content column
 * with an id and a `data-toc` label — so a new <Section> shows up here with
 * no extra wiring. The link for the part being read is marked aria-current.
 */
export function CaseToc({ contentId }: { contentId: string }) {
  const pathname = usePathname();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = document.getElementById(contentId);
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[id][data-toc]"));
    if (targets.length === 0) return;

    // The current part is the last one whose top has passed a line a third
    // of the way down the viewport. At the very bottom, the last part wins.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = targets[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = targets[targets.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // First read after paint: the entries, then where the reader is.
    const initial = requestAnimationFrame(() => {
      setEntries(targets.map((el) => ({ id: el.id, label: el.dataset.toc ?? el.id })));
      update();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(initial);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [contentId, pathname]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <aside className={styles.toc}>
      {entries.length > 0 && (
        <nav aria-label="On this page">
          <ul className={styles.tocList}>
            {entries.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className={styles.tocLink}
                  aria-current={active === entry.id ? "location" : undefined}
                  onClick={(e) => onClick(e, entry.id)}
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
