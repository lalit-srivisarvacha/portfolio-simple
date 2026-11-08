import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon, Pill, PixelBlock, ThemeToggle } from "@/components/ui";
import { CardVideo } from "@/components/ui/CardVideo";
import { site } from "@/content/site";
import { CaseSwitcher } from "./CaseSwitcher";
import { CaseToc } from "./CaseToc";

export { Cards, Compare } from "./Blocks";
export { FeatureTabs, type Feature } from "./FeatureTabs";
import styles from "./Case.module.css";

/* ───────────────────────────────────────────────────────────────
   Case-study building blocks. Each case study is a hand-coded page
   (app/work/<slug>/page.tsx) assembled from these, so every story
   can have its own shape while sharing one rhythm.
   ─────────────────────────────────────────────────────────────── */

const CONTENT_ID = "case-content";

/** Turns a section title into a stable anchor id: "What I did" → "what-i-did". */
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

type Meta = { label: string; value: string };

export function CaseHero({
  title,
  meta,
  tags,
}: {
  title: string;
  meta: Meta[];
  tags?: string[];
}) {
  return (
    <header id="overview" data-toc="Overview" className={styles.hero}>
      <h1 className="title">{title}</h1>
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
          <div key={m.label}>
            <dt className="mono-sm subtle">{m.label.toUpperCase()}</dt>
            <dd className="body-sm">{m.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/**
 * A top-level part of the story: Background, What we built, Results. Each
 * chapter gets a small labelled header, an anchor and one link in the side
 * nav, and holds the Sections, Figures and Outcomes that belong to it. Keep
 * a case study to a handful of chapters so the nav stays short. Pass `id` to
 * pin the anchor if the title might change.
 */
export function Chapter({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  const anchor = id ?? slugify(title);
  return (
    <section id={anchor} data-toc={title} aria-labelledby={`${anchor}-title`} className={styles.chapter}>
      <h2 id={`${anchor}-title`} className={`mono-sm subtle ${styles.chapterTitle}`}>
        {title.toUpperCase()}
      </h2>
      {children}
    </section>
  );
}

/**
 * A titled chunk of the story inside a Chapter. Its heading stays in the
 * text but it isn't a nav entry; the Chapter is. Sections are space-8 apart.
 */
export function Section({ title, id, children }: { title: string; id?: string; children?: ReactNode }) {
  return (
    <div id={id ?? slugify(title)} className={styles.section}>
      <h3 className="heading">{title}</h3>
      {children && <div className={styles.prose}>{children}</div>}
    </div>
  );
}

/**
 * An image (or any media) in a radius-md well, the full width of the
 * content column. Falls back to a pixel-block placeholder. `aspect` is the
 * well's shape; a Video inside sits on it at its own shape.
 */
export function Figure({
  children,
  caption,
  seed = 5,
  aspect = "3 / 2",
}: {
  children?: ReactNode;
  caption?: string;
  seed?: number;
  aspect?: string;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.well} style={{ aspectRatio: aspect }}>
        {children ?? <PixelBlock cols={32} rows={12} density={0.3} seed={seed} style={{ height: "100%", alignContent: "center" }} />}
      </div>
      {caption && <figcaption className="body-sm subtle">{caption}</figcaption>}
    </figure>
  );
}

/** Two Figures side by side; stacks on phones. */
export function FigureRow({ children }: { children: ReactNode }) {
  return <div className={styles.figureRow}>{children}</div>;
}

/**
 * A looping, muted product recording for a Figure, laid on the grey well at
 * its own shape (`size` is its pixel width and height) with the well showing
 * around it. Rests on its poster for reduced-motion visitors. `label`
 * describes what happens in it.
 */
export function Video({
  src,
  poster,
  label,
  size: [w, h],
}: {
  src: string;
  poster: string;
  label: string;
  size: [number, number];
}) {
  return (
    <div className={styles.stage} style={{ "--shot-ratio": w / h } as CSSProperties}>
      <CardVideo src={src} poster={poster} label={label} />
    </div>
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
