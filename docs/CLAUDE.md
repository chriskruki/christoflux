# christoflux.com — Agent Guide

Orientation document for future agents working in this repo. Read this before making changes.

## Site identity

**christoflux.com** is the flashy persona portfolio for Chris Kruki — the "wook engineer" side. It is the persona-side counterpart to the lightweight dev portfolio **chris.kruki.net** (lives at `/Users/chriskruki/gitlab/chriskruki.com/`).

**Goal:** show the creative/persona side — raving, flowing, music, LED, electronics, hobbies. This is the playground; chris.kruki.net is the resume. The About copy explicitly links out to chris.kruki.net for the dev side.

**Tone:** loud, playful, neon-green-on-black, animated. The site leans into spectacle — video background, scroll-driven section morph, 3D cube, animated eye, conic-gradient spinning ring, pulse-glow. If a treatment feels "extra" elsewhere, it's probably right at home here.

**Out of scope here:** dev/professional content (Languages, Frameworks, Work projects, LinkedIn, GitHub). All of that lives on chris.kruki.net. Do not add it back here.

**Repo status:** this folder was forked from `chriskruki.com/` on 2026-04-24 via `rsync` and `git init`. It is **not yet on its own GitHub repo** — the user will move it when ready. No git history was carried over from the source.

## Architecture

Single-page Next.js 15 site with section-by-section anchor scroll. Sections (in order):

1. **Home / portrait** — hero with portrait, conic-gradient spinning ring, animated header.
2. **About** — "Who dis" / "Wook engineer by night, software engineer by day" + persona blurb + link out to chris.kruki.net.
3. **Projects** — creative slice (Totem, Iris). LED + persona projects only.
4. **Skills** — rec-only. Hobbies / Hobby Tech / Music / Gaming. **No Languages or Work Tech sections** — those were stripped during the split.
5. **Contact** — "HMU" → email + `@christoflux` Instagram. **No LinkedIn or GitHub** — those live on the dev site.

Section transitions are scroll-driven via `AnimatedHeader` + `useSectionDetection`. The header morphs as the user scrolls between sections.

## Tech stack

- **Next.js 15.5** (App Router, Turbopack dev)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **framer-motion 12** — used heavily for scroll-driven motion, section reveals, and the animated header
- **three.js + @react-three/fiber + @react-three/drei** — RotatingCube, Stars, ScrollBackground, CursorLight
- **trianglify** — animated triangulated background generator
- **pnpm** package manager

The heavy stack is part of the identity. Do not strip it — it's what makes this site feel like christoflux.

## File layout

```
src/
  app/
    layout.tsx       # MousePositionProvider, Nunito font, metadata
    page.tsx         # client component — orchestrates all sections, scroll refs, page loader
    globals.css      # Tailwind + .gradient + .video-border + pulse-glow keyframes
  components/
    AnimatedHeader.tsx       # scroll-driven morphing top header
    AnimatedEye.tsx          # decorative animated eye
    Background.tsx           # animated trianglify background
    PageLoader.tsx           # initial load gate (preloads green.mp4 etc.)
    LazyVideo.tsx            # IntersectionObserver-driven video loader
    ScreenSection.tsx        # full-viewport section wrapper used by page.tsx
    ContentCard.tsx          # glassy card used inside sections
    SkillsGrid.tsx           # rec-only skills grid (DEV sections removed)
    SkillsSection.tsx        # one category (Hobbies / Music / etc.)
    SkillCard.tsx, SkillChip.tsx, SkillModal.tsx
    ProjectsGrid.tsx         # creative project list (Totem, Iris)
    ProjectCard.tsx, ProjectModal.tsx
    nav/NavBtn.tsx
    threejs/
      ThreeScene.tsx         # canvas root
      RotatingCube.tsx
      Stars.tsx
      ScrollBackground.tsx
      CursorLight.tsx
  contexts/
    MousePositionContext.tsx # cursor light + parallax driver
  hooks/
    useMousePosition.ts
    useSectionDetection.ts   # tracks current scroll section for AnimatedHeader
  utils/
    copy.ts          # SKILLS.REC (HOBBY_TECH, PHYSICAL, MUSIC, GAMES); SOCIALS = {EMAIL, INSTAGRAM}
    constants.ts     # HEADER / SECTIONS / CUBE constants for the morphing header & 3D scene
    helpers.ts
    skillContent.tsx # rec skill modal content (gifs, mov files, descriptions)
    projectContent.tsx # creative project modal content (totem, iris)
public/
  fav/               # favicons
  green.mp4          # primary video background — preloaded by PageLoader
  *.gif / *.mov / *.jpeg / *.mp4   # rec/persona media (flowstar, ripstick, sandball, totem, iris, …)
docs/
  CLAUDE.md          # you are here
  superpowers/       # planning artifacts copied from the original chriskruki.com repo
```

## Data is the source of truth

- **Skills:** `src/utils/copy.ts` `SKILLS.REC`. Tiers 1–5 map to `TIER_CONFIG`.
- **Projects:** `src/components/ProjectsGrid.tsx` (inline `PROJECTS`) + content in `src/utils/projectContent.tsx`. Creative entries only.
- **Socials:** `src/utils/copy.ts` `SOCIALS = { EMAIL, INSTAGRAM }`. Only those two on this site.
- **Sections / header / 3D scene config:** `src/utils/constants.ts`.

If you add a new persona category (e.g., "Workshop" or "Travel"), add it to `SKILLS.REC` first, then surface it in `SkillsGrid.tsx`.

## Visual rules

- **Background:** keep `green.mp4` video bg + animated trianglify + 3D star field. The neon-green wash is the brand.
- **Color:** emerald/lime/lightgreen, with white text on near-black. Use `text-white/70` for body copy, `lightgreen` for accent links.
- **Typography:** Nunito (200–900) loaded via `next/font/google`.
- **Motion:** scroll-driven section morph, framer-motion reveals, conic-gradient spinning ring on the home portrait, pulse-glow animations. More is more.
- **Cards:** glassy — `ContentCard` provides backdrop blur + thin border + dark gradient fill.

## Patterns to follow

- Sections wrap in `<ScreenSection id='<name>' ref={sectionRefs.<name>}>` — section detection relies on the refs registered in `page.tsx`.
- `useSectionDetection` drives `AnimatedHeader`'s morph state — if you add a new section, register it in `SECTIONS` (`constants.ts`) and add a `sectionRefs.<name>` entry.
- Three.js components live under `src/components/threejs/` and mount inside `ThreeScene`. Don't import three directly outside that folder.
- `LazyVideo` wraps any non-essential `.mov`/`.mp4` so they load only when scrolled into view.
- Cursor parallax / 3D-mouse effects pull from `MousePositionContext`. Wrap your section in or under the provider in `layout.tsx`.

## Anti-patterns (do NOT do these)

- Don't add LinkedIn, GitHub, or any dev-portfolio surface. Those live on chris.kruki.net.
- Don't reintroduce `SKILLS.DEV` (Languages / Frameworks). They were stripped during the split.
- Don't add work / professional projects. Creative-only here.
- Don't strip the heavy stack (3D, video, trianglify, framer-motion) "for performance". The flair is the product.
- Don't change the About link target away from `chris.kruki.net` — that cross-link is intentional.

## Workflow

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # production build (heavier than chris.kruki.net by design)
pnpm tsc --noEmit
pnpm lint
```

The user commits manually. Do not run `git commit` autonomously — write/edit files, then pause and ask. This repo's git history starts at the fork; an initial commit is still pending until the user runs it.

## Background — how this site got here

Originally `chriskruki.com` was a single flashy portfolio with both dev and persona content mixed together. On 2026-04-24 the site was split:

- This folder is the **full copy** of that original site (no git history carried over) reframed as persona-only — dev skills removed, About copy reframed toward "wook engineer," Contact trimmed to email + Instagram, package + metadata renamed to christoflux.
- The original `chriskruki.com` folder was **stripped down in place** (git history preserved) and rebuilt as the lightweight dev portfolio. It now lives at `chris.kruki.net`.

The full design spec and implementation plan live in `docs/superpowers/specs/2026-04-24-portfolio-split-design.md` and `docs/superpowers/plans/2026-04-24-portfolio-split.md` (these were copied over with the rsync and document the split itself, not future work for this repo).
