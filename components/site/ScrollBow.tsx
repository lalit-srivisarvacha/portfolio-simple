"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Most a card's edge moves sideways, in px, at full scroll speed. */
const MAX_BOW = 44;
/** Px of bow per px of scroll in one frame. */
const GAIN = 0.8;
/** How fast the bow follows the scroll speed, per frame (0 to 1). */
const FOLLOW = 0.16;

type Card = { el: HTMLElement; w: number; h: number; r: number; on: boolean };

/**
 * A card outline whose sides are parabolas: the top and bottom rows sit `d` px to the
 * side of the middle row, so the card bows right (d > 0) or left (d < 0). The whole
 * outline stays inside the card's own box, which is what clip-path can paint.
 */
function bowPath(w: number, h: number, r: number, d: number) {
  const s = Math.abs(d);
  // x of the left and right edges at the middle row
  const aL = d > 0 ? 0 : s;
  const aR = d > 0 ? w - s : w;
  // the sides run between the corner radii: rows -u … u of the -1 … 1 height
  const u = 1 - (2 * r) / h;
  const end = d * u * u; // side's offset where it meets a corner
  const corner = d * (2 * u - u * u); // where the side's tangent meets the top/bottom
  const ctrl = -d * u * u; // control point offset for the side's parabola
  const f = (n: number) => n.toFixed(2);
  return (
    `path("M${f(aL + corner + r)} 0` +
    `L${f(aR + corner - r)} 0` +
    `Q${f(aR + corner)} 0 ${f(aR + end)} ${f(r)}` +
    `Q${f(aR + ctrl)} ${f(h / 2)} ${f(aR + end)} ${f(h - r)}` +
    `Q${f(aR + corner)} ${f(h)} ${f(aR + corner - r)} ${f(h)}` +
    `L${f(aL + corner + r)} ${f(h)}` +
    `Q${f(aL + corner)} ${f(h)} ${f(aL + end)} ${f(h - r)}` +
    `Q${f(aL + ctrl)} ${f(h / 2)} ${f(aL + end)} ${f(r)}` +
    `Q${f(aL + corner)} 0 ${f(aL + corner + r)} 0Z")`
  );
}

/**
 * Home page scroll feel: the page eases toward where you scrolled (Lenis), and each
 * project card bows sideways with the scroll's speed and direction, settling flat when
 * the scroll stops. Only the card's outline moves; the chip rides the edge so it is
 * never cut, and the product shot stays flat. Skipped for reduced motion and for
 * touch screens, which keep native scrolling.
 */
export function ScrollBow({ target = ".lds-card" }: { target?: string }) {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let stop: (() => void) | undefined;

    const start = () => {
      const cards: Card[] = Array.from(document.querySelectorAll<HTMLElement>(target)).map((el) => ({
        el,
        w: el.offsetWidth,
        h: el.offsetHeight,
        r: parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
        on: false,
      }));
      const byEl = new Map(cards.map((c) => [c.el as Element, c]));

      const sizes = new ResizeObserver((entries) => {
        for (const e of entries) {
          const c = byEl.get(e.target);
          if (c) {
            c.w = c.el.offsetWidth;
            c.h = c.el.offsetHeight;
          }
        }
      });
      const inView = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const c = byEl.get(e.target);
          if (c) c.on = e.isIntersecting;
        }
      });
      cards.forEach((c) => {
        sizes.observe(c.el);
        inView.observe(c.el);
      });

      const lenis = new Lenis({ autoRaf: false });
      let bow = 0;
      let flat = true;
      let frame = 0;

      const clear = () => {
        for (const c of cards) {
          c.el.style.clipPath = "";
          c.el.style.removeProperty("--bow-x");
        }
        flat = true;
      };

      const tick = (time: number) => {
        lenis.raf(time);
        const goal = Math.max(-MAX_BOW, Math.min(MAX_BOW, lenis.velocity * GAIN));
        bow += (goal - bow) * FOLLOW;

        if (Math.abs(bow) < 0.2 && Math.abs(goal) < 0.2) {
          bow = 0;
          // At rest the card is its plain rounded rectangle again, focus ring included.
          if (!flat) clear();
        } else {
          flat = false;
          for (const c of cards) {
            if (!c.on || !c.w || !c.h) continue;
            c.el.style.clipPath = bowPath(c.w, c.h, c.r, bow);
            // The chip sits near the bottom row, so it moves with the left edge there.
            c.el.style.setProperty("--bow-x", `${Math.max(0, bow).toFixed(2)}px`);
          }
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        sizes.disconnect();
        inView.disconnect();
        clear();
      };
    };

    const sync = () => {
      stop?.();
      stop = !calm.matches && pointer.matches ? start() : undefined;
    };
    sync();
    calm.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      calm.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
      stop?.();
    };
  }, [target]);

  return null;
}
