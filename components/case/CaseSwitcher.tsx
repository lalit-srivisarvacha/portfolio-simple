"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Brandmark, Icon } from "@/components/ui";
import { projects } from "@/content/site";
import styles from "./Case.module.css";

/**
 * Pill that opens a list of every case study. A disclosure of plain links:
 * Tab moves through them, arrow keys too, Escape closes and returns focus.
 */
export function CaseSwitcher() {
  const pathname = usePathname();
  const current = projects.find((p) => pathname === `/work/${p.slug}`);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  // Close when navigation lands on a new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const links = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => links()[e.key === "ArrowUp" ? links().length - 1 : 0]?.focus());
      return;
    }
    const items = links();
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[i === -1 ? 0 : next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={styles.switcher}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.navPill}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={current ? `Case studies, viewing ${current.title}` : "Case studies"}
        onClick={() => setOpen((o) => !o)}
      >
        {current && <Brandmark brand={current.brand} size={20} />}
        <span className={styles.switcherLabel}>{current ? current.title : "Case studies"}</span>
        <Icon name="chevronDown" size={16} className={styles.chevron} />
      </button>
      <div className={styles.menu} hidden={!open}>
        <p className="mono-sm subtle" id={`${listId}-label`}>
          CASE STUDIES
        </p>
        <ul ref={listRef} id={listId} aria-labelledby={`${listId}-label`}>
          {projects.map((p) => {
            const here = p.slug === current?.slug;
            return (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className={styles.menuItem} aria-current={here ? "page" : undefined}>
                  <Brandmark brand={p.brand} size={20} />
                  <span className={styles.menuTitle}>{p.title}</span>
                  {here && <Icon name="check" size={16} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
