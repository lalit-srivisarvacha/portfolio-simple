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

/** Height of the chip's middle above the card's bottom edge, in px. */
const CHIP_RISE = 28;

type Card = { el: HTMLElement; w: number; h: number; r: number; on: boolean };

/**
 * The slice of the column's one curve that falls on a card. The curve is a parabola
 * over the viewport's height: a row at the middle of the screen stays put and rows at
 * the top and bottom sit `d` px to the side, so the whole stack bows right (d > 0) or
 * left (d < 0) as one shape. `top` is the card's top in the viewport and `vh` the
 * viewport height. The outline stays inside the card's own box, which is all clip-path
 * can paint, so the card gives up |d| px of width while it moves.
 */
function bowPath(w: number, h: number, r: number, d: number, top: number, vh: number) {
  const s = Math.abs(d);
  const half = vh / 2;
  // viewport row (-1 top … 1 bottom) of the card's top, its sides' ends, and its bottom
  const t0 = (top - half) / half;
  const tA = (top + r - half) / half;
  const tB = (top + h - r - half) / half;
  const t1 = (top + h - half) / half;
  // x of the left and right edges at the middle of the screen
  const aL = d > 0 ? 0 : s;
  const aR = aL + w - s;
  const endA = d * tA * tA; // side's offset where it meets the top corner
  const endB = d * tB * tB; // … and the bottom corner
  const ctrl = d * tA * tB; // control point of the side's parabola
  const cornerA = d * tA * t0; // where the side's tangent meets the top edge
  const cornerB = d * tB * t1; // … and the bottom edge
  const f = (n: number) => n.toFixed(2);
  return (
    `path("M${f(aL + cornerA + r)} 0` +
    `L${f(aR + cornerA - r)} 0` +
    `Q${f(aR + cornerA)} 0 ${f(aR + endA)} ${f(r)}` +
    `Q${f(aR + ctrl)} ${f(h / 2)} ${f(aR + endB)} ${f(h - r)}` +
    `Q${f(aR + cornerB)} ${f(h)} ${f(aR + cornerB - r)} ${f(h)}` +
    `L${f(aL + cornerB + r)} ${f(h)}` +
    `Q${f(aL + cornerB)} ${f(h)} ${f(aL + endB)} ${f(h - r)}` +
    `Q${f(aL + ctrl)} ${f(h / 2)} ${f(aL + endA)} ${f(r)}` +
    `Q${f(aL + cornerA)} 0 ${f(aL + cornerA + r)} 0Z")`
  );
}

/**
 * Home page scroll feel: the page eases toward where you scrolled (Lenis), and the
 * stack of project cards bows sideways as one shape with the scroll's speed and
 * direction, settling flat when the scroll stops. The curve belongs to the screen, not
 * to each card: cards pass through it, so one near the top or bottom leans while one in
 * the middle stays upright. The chip and the product shot ride the curve at their own
 * height and are never cut. Skipped for reduced motion and for touch screens, which
 * keep native scrolling.
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
          c.el.style.removeProperty("--bow-mid");
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
          const vh = window.innerHeight;
          const half = vh / 2;
          const base = bow > 0 ? 0 : -bow;
          // Left edge's offset at a viewport y.
          const edge = (y: number) => base + bow * ((y - half) / half) ** 2;
          for (const c of cards) {
            if (!c.on || !c.w || !c.h) continue;
            const top = c.el.getBoundingClientRect().top;
            c.el.style.clipPath = bowPath(c.w, c.h, c.r, bow, top, vh);
            // The chip follows the left edge at its own height; the shot follows the
            // card's middle, less half the width the card gave up.
            c.el.style.setProperty("--bow-x", `${edge(top + c.h - CHIP_RISE).toFixed(2)}px`);
            c.el.style.setProperty("--bow-mid", `${(edge(top + c.h / 2) - Math.abs(bow) / 2).toFixed(2)}px`);
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
