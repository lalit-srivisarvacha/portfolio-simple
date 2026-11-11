# Lalit — Portfolio

Personal portfolio site. Next.js (App Router) · TypeScript · plain CSS · Geist · light and dark themes.

Design system and mockups live in Claude:

- Design system — https://claude.ai/artifact/3dB9FfAA9p8gBdt8gmN48b
- Homepage mockup — https://claude.ai/artifact/EAXyikt7Ry6L7MzsHoe9B8

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things are

| Path | What |
| --- | --- |
| `content/site.ts` | Name, bio, socials, project list. Edit copy here. |
| `app/page.tsx` + `components/site/Sidebar.tsx` | Home page: sticky full-height bio, scrolling work column. |
| `app/work/<slug>/page.tsx` | One hand-coded case study per project. `project-01` is the template. |
| `components/case/Case.tsx` | Case-study building blocks: hero, section, figure, outcomes. |
| `components/ui/` | Button, IconButton, Pill, ProjectCard, Avatar, ThemeToggle, ScreenPlaceholder, Icon. |
| `app/globals.css` | Design tokens (light/dark), type scale, base styles. |
| `components/ui/components.css` | Component styles, mirroring the design system's stylesheet. |
| `CLAUDE.md` | Rules of the system for Claude Code. |

## Add a project

1. Add an entry to `projects` in `content/site.ts` (title, slug, summary, image).
2. Drop a 3:2 image at `public/work/<slug>/cover.jpg` and point `image` at it.
3. Copy `app/work/project-01` to `app/work/<slug>` and write the story.

## Deploy

Push to GitHub, import the repo in Vercel, keep the defaults. Every push to `main` deploys.
