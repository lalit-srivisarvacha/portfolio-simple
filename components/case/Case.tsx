import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, Pill, PixelBlock, ThemeToggle } from "@/components/ui";
import { site } from "@/content/site";
import { CaseSwitcher } from "./CaseSwitcher";
import styles from "./Case.module.css";

/* ───────────────────────────────────────────────────────────────
   Case-study building blocks. Each case study is a hand-coded page
   (app/work/<slug>/page.tsx) assembled from these, so every story
   can have its own shape while sharing one rhythm.
   ─────────────────────────────────────────────────────────────── */

export function CasePage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <nav className={styles.nav} aria-label="Case study">
        <div className={styles.navGroup}>
          <Link href="/" className={styles.navPill}>
            <Icon name="arrowLeft" size={16} />
            Home
          </Link>
        </div>
        <div className={styles.navGroup}>
          <CaseSwitcher />
          <ThemeToggle />
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Link href="/" className="link body-sm">
          ← All work
        </Link>
        <span className="mono-sm subtle">© {site.year} {site.name.toUpperCase()}</span>
      </footer>
    </div>
  );
}

type Meta = { label: string; value: string };

export function CaseHero({
  title,
  summary,
  meta,
  tags,
}: {
  title: string;
  summary: string;
  meta: Meta[];
  tags?: string[];
}) {
  return (
    <header className={styles.hero}>
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => (
            <Pill key={t} variant="flat">
              {t}
            </Pill>
          ))}
        </div>
      )}
      <h1 className="title">{title}</h1>
      <p className="body-lg muted">{summary}</p>
      <dl className={styles.meta}>
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="mono-sm subtle">{m.label.toUpperCase()}</dt>
            <dd className="body-sm">{m.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/** A titled chunk of the story. Sections are space-8 apart. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className="heading">{title}</h2>
      <div className={styles.prose}>{children}</div>
    </section>
  );
}

/**
 * An image (or any media) in a radius-md well. `wide` breaks out of the
 * 720px measure to content-max. Falls back to a pixel-block placeholder.
 */
export function Figure({
  children,
  caption,
  wide,
  seed = 5,
  aspect = "3 / 2",
}: {
  children?: ReactNode;
  caption?: string;
  wide?: boolean;
  seed?: number;
  aspect?: string;
}) {
  return (
    <figure className={[styles.figure, wide && styles.wide].filter(Boolean).join(" ")}>
      <div className={styles.well} style={{ aspectRatio: aspect }}>
        {children ?? <PixelBlock cols={32} rows={12} density={0.3} seed={seed} style={{ height: "100%", alignContent: "center" }} />}
      </div>
      {caption && <figcaption className="body-sm subtle">{caption}</figcaption>}
    </figure>
  );
}

/** Three-up outcome numbers. Only real numbers; otherwise leave it out. */
export function Outcomes({ items }: { items: { value: string; label: string }[] }) {
  return (
    <ul className={styles.outcomes}>
      {items.map((o) => (
        <li key={o.label}>
          <span className={styles.outcomeValue}>{o.value}</span>
          <span className="body-sm muted">{o.label}</span>
        </li>
      ))}
    </ul>
  );
}
