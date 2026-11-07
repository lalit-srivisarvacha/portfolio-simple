import type { CSSProperties } from "react";

export type PixelBlockProps = {
  cols?: number;
  rows?: number;
  /** Fraction of tiles lit, 0–1. */
  density?: number;
  /** Stable seed so the pattern doesn't change between renders. */
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

/** Deterministic tile levels: 0 surface · 1 soft · 2 warm · 3 accent. */
function makeTiles(seed: number, cols: number, rows: number, density: number): number[] {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: number[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = rnd() < density;
      const x = c / (cols - 1);
      const v = rnd();
      out.push(!on ? 0 : x < 0.4 ? 3 : x < 0.75 ? (v < 0.6 ? 3 : 2) : v < 0.5 ? 2 : 1);
    }
  }
  return out;
}

/**
 * The system's one ornament: square tiles lit coral → amber → peach, left to right.
 * Deterministic from `seed`, so server and client render the same field.
 */
export function PixelBlock({ cols = 16, rows = 6, density = 0.45, seed = 7, className, style }: PixelBlockProps) {
  const tiles = makeTiles(seed, cols, rows, density);
  return (
    <div
      className={["lds-pixels", className].filter(Boolean).join(" ")}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
      aria-hidden="true"
    >
      {tiles.map((l, i) => (
        <i key={i} data-l={l || undefined} />
      ))}
    </div>
  );
}
