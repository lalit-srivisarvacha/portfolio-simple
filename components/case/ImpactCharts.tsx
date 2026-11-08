"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Case.module.css";

/* ───────────────────────────────────────────────────────────────
   Impact charts for a FeatureTabs media well. Each one animates in
   the first time it is on screen and starts finished for visitors who
   prefer reduced motion. Ink and ink-muted only; no accent fills.
   ─────────────────────────────────────────────────────────────── */

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);
  return reduce;
}

/** True once the element has been at least partly on screen. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/* ---------- Volume: companies on the inner arc, investors fanned out ---------- */

/** Illustrative split of `total` investors across `companies`, each between min and max. Deterministic. */
function splitInvestors(companies: number, total: number, min: number, max: number) {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const counts = Array.from({ length: companies }, () => min + Math.floor((max - min) * rand() ** 2.2));
  let diff = total - counts.reduce((a, b) => a + b, 0);
  while (diff !== 0) {
    const i = Math.floor(rand() * companies);
    const step = diff > 0 ? 1 : -1;
    if (counts[i] + step >= min && counts[i] + step <= max) {
      counts[i] += step;
      diff -= step;
    }
  }
  return counts;
}

type Dot = { x: number; y: number };
type Group = { company: Dot; investors: Dot[]; count: number; wedge: string };

const W = 600;
const H = 330;
const CX = W / 2;
const CY = 310;

function buildArc(companies: number, total: number): Group[] {
  const counts = splitInvestors(companies, total, 5, 50);
  // Slots on concentric half rings, a little more than needed, ordered left to right.
  const slots: { a: number; r: number }[] = [];
  for (let r = 132; r <= 290; r += 12.2) {
    const n = Math.floor((Math.PI * r) / 7.4);
    for (let k = 0; k <= n; k++) slots.push({ a: Math.PI - (k / n) * Math.PI, r });
  }
  slots.sort((p, q) => q.a - p.a || p.r - q.r);
  const picked = Array.from({ length: total }, (_, k) => slots[Math.floor((k * slots.length) / total)]);
  const at = (a: number, r: number): Dot => ({ x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) });

  let cursor = 0;
  return counts.map((count) => {
    const chunk = picked.slice(cursor, cursor + count);
    cursor += count;
    const mid = chunk.reduce((s, p) => s + p.a, 0) / chunk.length;
    // Invisible hover target: the slice of the fan this company covers.
    const a0 = Math.max(...chunk.map((p) => p.a)) + 0.012;
    const a1 = Math.min(...chunk.map((p) => p.a)) - 0.012;
    const [p0, p1, p2, p3] = [at(a0, 80), at(a0, 300), at(a1, 300), at(a1, 80)];
    const wedge = `M${p0.x} ${p0.y}L${p1.x} ${p1.y}A300 300 0 0 1 ${p2.x} ${p2.y}L${p3.x} ${p3.y}A80 80 0 0 0 ${p0.x} ${p0.y}Z`;
    return { count, wedge, company: at(mid, 92), investors: chunk.map((p) => at(p.a, p.r)) };
  });
}

/**
 * Semicircle of companies on the inner arc, each fanning out to its
 * investors on the outer rings. Hover or focus a company to see its count.
 */
export function VolumeArc({ companies, investors }: { companies: number; investors: number }) {
  const [groups] = useState(() => buildArc(companies, investors));
  const [ref, seen] = useSeen<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const shown = seen || reduce;

  return (
    <div ref={ref} className={styles.chart}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.arc}
        data-shown={shown || undefined}
        data-hover={hover !== null || undefined}
        role="img"
        aria-label={`Semicircle of ${companies} companies on the inner arc, each sending funds out to its investors on the outer rings: ${investors.toLocaleString("en-US")} investors in total, between 5 and 50 per company.`}
      >
        {groups.map((g, i) => (
          <g
            key={i}
            className={styles.arcGroup}
            data-on={hover === i || undefined}
            style={{ "--d": `${i * 14}ms` } as CSSProperties}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            aria-hidden="true"
          >
            <path d={g.wedge} className={styles.arcHit} />
            {g.investors.map((p, k) => (
              <circle key={k} cx={p.x} cy={p.y} r={2.4} className={styles.arcInvestor} />
            ))}
            <circle cx={g.company.x} cy={g.company.y} r={3.6} className={styles.arcCompany} />
          </g>
        ))}
      </svg>
      <div className={styles.arcLabel} aria-hidden="true">
        <span className="title">{hover === null ? investors.toLocaleString("en-US") : groups[hover].count}</span>
        <span className="body-sm muted">
          {hover === null ? `investors across ${companies} companies` : `investors at company ${hover + 1}`}
        </span>
      </div>
      <p className={styles.chartKey}>
        <span><i data-kind="company" />Company</span>
        <span><i />Investor</span>
        <span className="subtle">Totals actual; per-company split illustrative</span>
      </p>
    </div>
  );
}

/* ---------- Capital returned: a counting figure ---------- */

/** A large figure that counts up from zero once, when it comes into view. */
export function CountUp({ value, prefix = "", caption }: { value: number; prefix?: string; caption: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const dur = 1400;
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [seen, reduce, value]);

  const full = `${prefix}${value.toLocaleString("en-US")}`;
  return (
    <div ref={ref} className={`${styles.chart} ${styles.chartCenter}`}>
      <p className={`display ${styles.countFigure}`} aria-label={full}>
        <span aria-hidden="true">
          {prefix}
          {n.toLocaleString("en-US")}
        </span>
      </p>
      <p className="body muted">{caption}</p>
    </div>
  );
}

/* ---------- Operational productivity: a calendar of saved workdays ---------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/**
 * Five-day work weeks filled with the workdays saved; a partial day fills
 * part of its square. `hours` / 8 gives the day count.
 */
export function WorkCalendar({ hours }: { hours: number }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const reduce = useReducedMotion();
  const days = hours / 8;
  const weeks = Math.ceil(days / 5);
  const shown = seen || reduce;

  return (
    <div ref={ref} className={styles.chart}>
      <div
        className={styles.calendar}
        data-shown={shown || undefined}
        role="img"
        aria-label={`Calendar of 40-hour work weeks: ${days.toFixed(1)} eight-hour workdays saved, filling ${Math.floor(days / 5)} full weeks and part of the next.`}
      >
        <span />
        {DAYS.map((d) => (
          <span key={d} className="mono-sm subtle" aria-hidden="true">
            {d.toUpperCase()}
          </span>
        ))}
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className={styles.calendarRow} aria-hidden="true">
            <span className="mono-sm subtle">WEEK {w + 1}</span>
            {DAYS.map((_, d) => {
              const i = w * 5 + d;
              const fill = Math.max(0, Math.min(1, days - i));
              return (
                <span
                  key={d}
                  className={styles.calendarDay}
                  style={{ "--fill": fill, "--d": `${i * 45}ms` } as CSSProperties}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className={styles.chartKey}>
        <span><i data-kind="day" />1 workday (8 hrs)</span>
        <span className="subtle">
          {days.toFixed(1)} days · {hours.toLocaleString("en-US")} hrs
        </span>
      </p>
    </div>
  );
}
