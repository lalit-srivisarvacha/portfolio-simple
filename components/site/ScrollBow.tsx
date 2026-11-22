"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Most each side of the stack moves inward, in px, at full scroll speed. */
const MAX_BOW = 36;
/** Px of inset per px of scroll in one frame. */
const GAIN = 0.65;
/** How fast the bow follows the scroll speed, per frame (0 to 1). */
const FOLLOW = 0.16;

/** Height of the chip's middle above the card's bottom edge, in px. */
const CHIP_RISE = 28;

type Card = { el: HTMLElement; w: number; h: number; r: number; on: boolean };

/**
 * The slice of the column's one shape that falls on a card. Both sides are parabolas
 * over the viewport's height, mirrored: scrolling down (d > 0) the stack pinches in at
 * the middle of the screen and stays full width at the top and bottom; scrolling up
 * (d < 0) it narrows at the top and bottom and stays full width in the middle. `top`
 * is the card's top in the viewport and `vh` the viewport height. The outline only
 * ever moves inward, since a card's own box is all clip-path can paint.
 */
function bowPath(w: number, h: number, r: number, d: number, top: number, vh: number) {
  const half = vh / 2;
  // viewport row (-1 top … 1 bottom) of the card's top, its sides' ends, and its bottom
  const t0 = (top - half) / half;
  const tA = (top + r - half) / half;
  const tB = (top + h - r - half) / half;
  const t1 = (top + h - half) / half;
  // each side's inset from the card's edge at row t is base - d * t * t
  const base = Math.max(d, 0);
  const endA = base - d * tA * tA; // inset where a side meets the top corner
  const endB = base - d * tB * tB; // … and the bottom corner
  const ctrl = base - d * tA * tB; // control point of the side's parabola
  const cornerA = base - d * tA * t0; // where the side's tangent meets the top edge
  const cornerB = base - d * tB * t1; // … and the bottom edge
  const f = (n: number) => n.toFixed(2);
  return (
    `path("M${f(cornerA + r)} 0` +
    `L${f(w - cornerA - r)} 0` +
    `Q${f(w - cornerA)} 0 ${f(w - endA)} ${f(r)}` +
    `Q${f(w - ctrl)} ${f(h / 2)} ${f(w - endB)} ${f(h - r)}` +
    `Q${f(w - cornerB)} ${f(h)} ${f(w - cornerB - r)} ${f(h)}` +
    `L${f(cornerB + r)} ${f(h)}` +
    `Q${f(cornerB)} ${f(h)} ${f(endB)} ${f(h - r)}` +
    `Q${f(ctrl)} ${f(h / 2)} ${f(endA)} ${f(r)}` +
    `Q${f(cornerA)} 0 ${f(cornerA + r)} 0Z")`
  );
}

/**
 * Home page scroll feel: the page eases toward where you scrolled (Lenis), and the
 * stack of project cards changes shape as one piece with the scroll's speed and
 * direction: down, it pinches in at the middle of the screen; up, it narrows at the
 * top and bottom instead. It settles flat when the scroll stops. The shape belongs to
 * the screen, not to each card: cards pass through it. The chip rides the left edge at
 * its own height so it is never cut; the product shot stays put. Skipped for reduced
 * motion and for touch screens, which keep native scrolling.
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
          const vh = window.innerHeight;
          const half = vh / 2;
          const base = Math.max(bow, 0);
          // Each side's inset at a viewport y.
          const inset = (y: number) => Math.max(0, base - bow * ((y - half) / half) ** 2);
          for (const c of cards) {
            if (!c.on || !c.w || !c.h) continue;
            const top = c.el.getBoundingClientRect().top;
            c.el.style.clipPath = bowPath(c.w, c.h, c.r, bow, top, vh);
            // The chip follows the left edge at its own height.
            c.el.style.setProperty("--bow-x", `${inset(top + c.h - CHIP_RISE).toFixed(2)}px`);
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
