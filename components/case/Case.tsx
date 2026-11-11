import Link from "next/link";
import type { ReactNode } from "react";
import { Brandmark, Icon, Pill, ScreenPlaceholder, ThemeToggle, type BrandId, type IconName } from "@/components/ui";
import { site } from "@/content/site";
import { CaseSwitcher } from "./CaseSwitcher";
import { CaseToc } from "./CaseToc";
import styles from "./Case.module.css";

/* ───────────────────────────────────────────────────────────────
   Case-study building blocks. Each case study is a hand-coded page
   (app/work/<slug>/page.tsx) assembled from these, so every story
   can have its own shape while sharing one rhythm.
   ─────────────────────────────────────────────────────────────── */

const CONTENT_ID = "case-content";

/** Turns a section label into a stable anchor id: "What I did" → "what-i-did". */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
      <main className={styles.main}>
        <CaseToc contentId={CONTENT_ID} />
        <div id={CONTENT_ID} className={styles.content}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <span className="mono-sm subtle">© {site.year} {site.name.toUpperCase()}</span>
      </footer>
    </div>
  );
}

/**
 * One fact beside the title: a small neutral circle and the value. `icon`
 * puts a line icon in the circle, `brand` the company's mark (in the same
 * neutral tones). The label isn't shown; screen readers still get it.
 */
type Meta = { label: string; value: string; icon?: IconName; brand?: BrandId };

export function CaseHero({
  title,
  description,
  meta,
  tags,
}: {
  title: string;
  /** A sentence or two under the title on what the project was. */
  description?: string;
  meta: Meta[];
  tags?: string[];
}) {
  return (
    <header id="overview" data-toc="Overview" className={styles.hero}>
      <h1 className={`display ${styles.heroTitle}`}>{title}</h1>
      {description && <p className={`body-lg muted ${styles.heroDescription}`}>{description}</p>}
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => (
            <Pill key={t} variant="flat">
              {t}
            </Pill>
          ))}
        </div>
      )}
      <dl className={styles.meta}>
        {meta.map((m) => (
          <div key={m.label} className={styles.metaItem}>
            {m.brand ? (
              <Brandmark brand={m.brand} size={28} neutral />
            ) : m.icon ? (
              <span className={styles.metaIcon}>
                <Icon name={m.icon} size={14} />
              </span>
            ) : null}
            <dt className="sr-only">{m.label}</dt>
            <dd className="body-sm">{m.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/**
 * A chunk of the story. Sections are space-8 apart. `label` is the eyebrow
 * above the subheader: a short name for the section ("Problem", "Outcome")
 * that also gives it its anchor and its link in the side nav. `title` is the
 * subheader, free to say something specific. Pass `id` to pin the anchor if
 * the label might change.
 */
export function Section({
  label,
  title,
  id,
  children,
}: {
  label: string;
  title?: string;
  id?: string;
  children: ReactNode;
}) {
  const anchor = id ?? slugify(label);
  const labelId = `${anchor}-label`;
  return (
    <section id={anchor} data-toc={label} aria-labelledby={labelId} className={styles.section}>
      <p id={labelId} className={`mono-sm subtle ${styles.eyebrow}`}>
        {label.toUpperCase()}
      </p>
      {title && <h2 className="heading">{title}</h2>}
      <div className={styles.prose}>{children}</div>
    </section>
  );
}

/**
 * An image (or any media) in a radius-md well, the full width of the
 * content column. Falls back to a blank app screen until the image is in.
 */
export function Figure({
  children,
  caption,
  aspect = "3 / 2",
}: {
  children?: ReactNode;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.well} style={{ aspectRatio: aspect }}>
        {children ?? (
          <div className={`lds-screen-well ${styles.placeholder}`}>
            <ScreenPlaceholder />
          </div>
        )}
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
