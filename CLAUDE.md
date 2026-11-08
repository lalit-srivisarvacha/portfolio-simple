# Lalit Portfolio — notes for Claude Code

Personal portfolio for Lalit, Senior Product Designer (Los Angeles). Next.js App Router, TypeScript, plain CSS (globals + CSS modules). Deploys on Vercel.

## Source of truth

- **Design system:** https://claude.ai/artifact/3dB9FfAA9p8gBdt8gmN48b — tokens, type scale, component guidelines. `app/globals.css` and `components/ui/components.css` mirror it token-for-token; when a token changes there, change it here with the same name.
- **Homepage mockup:** https://claude.ai/artifact/EAXyikt7Ry6L7MzsHoe9B8 (light, dark, phone artboards).
- **Reference:** kevinbhagat.com — simplicity of color, rounded everything, image-first work list.

## Rules of the system (don't break these)

- Two tones, one hue. Page is `--bg`, surfaces are `--bg-surface`, text is `--ink` / `--ink-muted`. `--accent` (coral) only for marks: the availability dot, link hover underline, focus ring. Never a section or button fill. `--accent-warm` (amber) only inside `PixelBlock`. Company brand colors only inside `Brandmark`, with one exception: a case study passes `brand` to `CasePage` and borrows that company's `accent` (in `BRANDS`) as `--case-accent` for charts and data marks only, never text blocks, section fills or buttons. Each accent has a light-theme shade that holds 3:1 on `--bg-surface` and a dark-theme shade (usually the brand color itself).
- Every interactive thing is a pill (`--radius-pill`). Cards and image wells are `--radius-md`. No square corners on controls.
- No shadows except `--shadow-float` under a `Pill` that overlaps a card. Depth = one tint step.
- Type is Geist 400/500 only. Nothing bold. Sizes come from the `.title` / `.heading` / `.body` … classes in `globals.css`; don't invent new font sizes.
- Spacing on the 4px scale (`--space-1` … `--space-9`). No 20px or 40px gaps.
- Sentence case everywhere. First person, plain, no exclamation marks, no emoji. Say what the work did, not what it is.
- Both themes always. Test anything new with `data-theme="dark"` on `<html>`. Text pairs must hold 4.5:1.
- Accessible by construction: real `<a>` / `<button>`, `aria-label` on icon-only controls, visible focus ring (never remove outlines), `prefers-reduced-motion` respected.

## Layout

- Home: `app/page.tsx`. Left column `components/site/Sidebar.tsx` is sticky, `100dvh`, `overflow: hidden` — it must not scroll on desktop. Right column is a stack of `ProjectCard`s. Below 960px everything stacks.
- Case studies are **hand-coded pages**: one folder per project at `app/work/<slug>/page.tsx`, built from `components/case/Case.tsx` (`CasePage`, `CaseHero`, `Chapter`, `Section`, `Figure`, `FigureRow`, `Video`, `Outcomes`, plus `Cards`, `Compare` and `FeatureTabs` from `Blocks.tsx` / `FeatureTabs.tsx`). Keep prose to a sentence or two per Section and let the blocks carry the story: `Cards` for steps or findings, `Compare` for before → after, `FeatureTabs` for a feature tour where the open item swaps the video (or a chart: items take `media` instead of `video`; `VolumeArc`, `CountUp` and `WorkCalendar` in `ImpactCharts.tsx` animate in once on screen and start finished under reduced motion). Sections are `--case-gap` (96px desktop) apart; chapters add space-7. `app/work/project-01` is the template; `app/work/returning-funds` is the first real one (product recordings as looping `Video`s laid on the grey `Figure` well at their own shape, inset like a ProjectCard shot; pass `size={[w, h]}`). On desktop (960px+) a sticky side nav (`components/case/CaseToc.tsx`) lists anchor links to the hero ("Overview") and each `Chapter`, read from the page. Group the story into a few chapters (e.g. Background, What we built, Results); each has a small mono label header and holds its `Section`s, whose headings stay in the text but aren't nav entries. Its left edge lines up with the Home pill (both at `--case-gutter`, 32px desktop); the story column fills the rest of the width to the right gutter; text (hero, eyebrows, sections) is centered in it at `--measure`, while figures and blocks (`Figure`, `FigureRow`, `Cards`, `Compare`, `FeatureTabs`, `Outcomes`) fill its full width. Below 960px the side nav hides and the same rules apply to the full page width. `app/work/[slug]` is only a stub for projects not written yet.
- Project list and site copy live in `content/site.ts`. Add a project there first, then its page.

## Components (`components/ui`)

`Button`, `IconButton`, `Pill`, `ProjectCard`, `Brandmark`, `Avatar`, `ThemeToggle`, `PixelBlock`, `Icon`. Class names (`lds-*`) match the design system's stylesheet on purpose — keep them in sync rather than forking styles. Icons are Lucide-style paths in `Icon.tsx`; add paths there, never emoji or icon fonts. Company marks live in `BRANDS` in `Brandmark.tsx` (the company's own SVG path, well color and mark color from its LinkedIn avatar); a project names one by id. Never redraw a mark.

## Working here

- `npm run dev` / `npm run build` / `npm run lint`. Run `npm run build` before finishing any change.
- Images go in `public/work/<slug>/` at 3:2 (cards) or 16:9 (case hero), served through `next/image`.
- Placeholders are written `[LIKE THIS]`; search for `[` before shipping.
- Motion: 120ms fills, 200ms theme/image fades, easing `cubic-bezier(0.2, 0, 0, 1)`. If richer motion is added later (Framer Motion, scroll scenes, WebGL), keep it inside `PixelBlock`/hero territory and off body text.
