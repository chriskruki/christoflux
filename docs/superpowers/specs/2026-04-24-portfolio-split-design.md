# Portfolio Split: chris.kruki.net + christoflux.com

**Date:** 2026-04-24
**Status:** Approved for planning

## Goal

Split the existing single portfolio at `/Users/chriskruki/gitlab/chriskruki.com/` into two distinct sites:

- **christoflux.com** — flashy persona/wook portfolio. Inherits the existing animated theme as-is, with content reframed toward the persona side. Lives in a new folder, will later move to its own repo.
- **chris.kruki.net** — lightweight professional dev portfolio. Single-scroll page, dialed-down green theme, dev signal only.

Both sites use the same stack (Next.js 15, React 19, Tailwind 4, framer-motion, TypeScript).

## Repo Layout

- **Copy** the entire current project into a new sibling folder: `/Users/chriskruki/gitlab/christoflux.com/` (full copy, no git history needed — user will move to its own repo).
- **Strip down** the existing `/Users/chriskruki/gitlab/chriskruki.com/` in place. This folder retains its git history and becomes the lightweight personal site.

After the split, both folders are independent Next.js projects that run with `pnpm install && pnpm dev`.

## Site 1: christoflux.com (flashy)

### What stays
All existing visual systems remain: video background (`green.mp4`), `Background.tsx` trianglify, `RotatingCube`, `ThreeScene`, `AnimatedHeader` scroll-driven morph, `AnimatedEye`, `PageLoader`, framer-motion scroll animations, conic-gradient spinning ring on the home portrait, all rec content, all hobby modals.

### Content edits
- **About copy** reframed toward persona. Lead with "wook engineer," followed by a brief mention of dev work that links out: *"For the dev side, see [chris.kruki.net](https://chris.kruki.net)."* Keep the existing tone for raving/flowing/music/LED hobbies.
- **Skills section** keeps **rec only** — `SKILLS.REC` (HOBBY_TECH, PHYSICAL, MUSIC, GAMES). Remove `SKILLS.DEV` and any DEV rendering paths from `SkillsGrid` / `SkillsSection`.
- **Projects** keeps the creative slice — LED, totem, music, electronics. Drop dev-only/professional projects (these move to chris.kruki.net's projects). Exact filter list to be settled in the implementation plan based on the contents of `projectContent.tsx`.
- **Contact** keeps Instagram + email. Remove LinkedIn and GitHub from the visible contact section (they belong on the dev site).

### Metadata / branding
- `package.json` `"name": "christoflux.com"`.
- `README.md` updated with new site purpose.
- `app/layout.tsx` `metadata`: title "Christoflux", description for the persona site, OG image placeholder.
- Favicon: keep the current `public/fav/` assets for now.

## Site 2: chris.kruki.net (lightweight)

### Page structure (single scroll page, anchor-scroll nav)

1. **Hero** — "Chris Kruki" plain text wordmark, no tagline. Subtle fade-in on load. No portrait, no video, no spinning ring.
2. **Experience** — sticky-left timeline (see "Experience timeline" below).
3. **Skills** — dev only, tier-tinted chips.
4. **Projects** — dev/professional projects only.
5. **Contact** — LinkedIn, Email, GitHub.

### Navigation
Top nav bar with name on the left and anchor links on the right: `Experience / Skills / Projects / Contact`. Sticky on scroll. No section morph, no scroll-driven animation — just a static, slim header.

### Experience timeline (centerpiece)

Two-column CSS grid, **20% / 80%**.

- **Left column (20%):** date ranges (year + month). The container uses `position: sticky` so the visible date label pins as you scroll past entries on the right. The displayed date corresponds to the entry currently in view; as the user scrolls, the left column updates to advance through ranges. A simple implementation: each entry pairs a left date block + right entry block in the same grid row, and the *date block itself* is `position: sticky; top: <nav-height>` so each one pins until the next one pushes it up. (If per-row sticky proves visually weak, fall back to a single observer-driven sticky label.)
- **Right column (80%):** stacked entries, mixed work + education, reverse-chronological.
- **Visual distinction:** education entries get a different left border color (e.g., emerald-600 vs emerald-400) or a small icon to differentiate from work entries. Decision deferred to the implementation plan.
- **Per entry:** title, organization, location (where applicable), employment type (full-time / freelance / part-time / intern), and 1–3 bullet points where copy is provided.

**Data (reverse-chronological):**

| Dates | Title | Org | Location | Type | Bullets |
|---|---|---|---|---|---|
| Mar 2026 – Present | Research Scientist II | UL Research Institutes | Remote | Full-time | — |
| Jan 2024 – Mar 2026 | Associate Research Scientist | UL Research Institutes | Remote | Full-time | — |
| Jan 2023 – Jan 2024 | Software Engineer | Klexity, Inc. | Remote | Freelance | — |
| Mar 2023 – May 2023 | Undergraduate Researcher | Chapman University | Orange, CA · Hybrid | Part-time | Led development of an economic experiment engine using React, Tailwind CSS, TypeScript, Socket.IO, and Google Blockly — initial iteration of a revamp of Chapman's existing software for student-volunteer behavioral economics experiments. / Worked alongside economics and engineering professors driving conceptualization and planning of new features; converted theoretical knowledge into working systems. |
| 2021 – 2023 | B.S. Computer Science | Chapman University | — | Education | — |
| Aug 2020 – Aug 2021 | Software Engineer | Syntiant Corp. | Irvine, CA | Full-time | Full-stack web development of audio data labeling software using HTML, CSS (Bootstrap), JavaScript (jQuery), Python (Flask), MySQL. / Managed and instructed a team of interns performing ML data preparation. / Developed and maintained data utility scripts interfacing with MySQL, Amazon S3, MongoDB. |
| Dec 2019 – Aug 2020 | Software Engineering Intern | Syntiant Corp. | Irvine, CA | Part-time | — |
| 2018 – 2021 | Transfer, Computer Science | Irvine Valley College | — | Education | — |

The above will live in a typed data file (`src/utils/experience.ts`) so the timeline component reads from a single source of truth.

### Skills (dev only)
Source data from existing `SKILLS.DEV.LANGUAGES` and `SKILLS.DEV.FRAMEWORKS` in `copy.ts`. Render as tier-tinted chips reusing the existing `SkillChip` component, with the heavy hover/glow trimmed to a flat hover. No `SkillModal`, no rec sections, no expanding cards.

### Projects (dev only)
Filter `projectContent.tsx` down to dev/professional entries. Reuse a slimmed `ProjectsGrid` and `ProjectCard` — drop the modal flourishes, keep cards as flat tiles with thumbnail, title, short description, and link. Exact filter list confirmed during implementation.

### Contact
Three flat icon-text links in a horizontal row:
- LinkedIn → `https://www.linkedin.com/in/chriskruki/`
- Email → `mailto:chriskruki@gmail.com`
- GitHub → `https://github.com/chriskruki`

No Instagram. No resume link (deferred until a PDF is provided).

### Visual style
- **Background:** keep `Background.tsx` trianglify generation, but **static** — generate once on mount, no animation loop, no regenerate. Slow it down or skip the loop entirely.
- **Removed:** `green.mp4` video background, `RotatingCube`, `ThreeScene`, `AnimatedEye`, `PageLoader` (no longer needed without the heavy video preload), scroll-driven `AnimatedHeader` morph, conic-gradient spinning ring, pulse-glow.
- **Cards:** flatten — drop backdrop blur and heavy gradient backgrounds, use a thin emerald border + dark fill.
- **Color:** emerald/green retained, dialed down — fewer glow effects, no neon pulse.
- **Animations:** subtle fade-in on load, light hover transitions on links/cards. No scroll-driven motion.

### Metadata / branding
- `package.json` `"name": "chris.kruki.net"`.
- `README.md` updated.
- `app/layout.tsx` `metadata`: title "Chris Kruki", description for a software engineer portfolio, OG image placeholder.
- Favicon: keep current `public/fav/` for now.

## Component / Module Plan

### Removed from chris.kruki.net
- `src/components/threejs/` (entire dir — RotatingCube, ScrollBackground, Stars, ThreeScene)
- `src/components/AnimatedEye.tsx`
- `src/components/PageLoader.tsx`
- `src/components/LazyVideo.tsx`
- `src/components/SkillModal.tsx`, `SkillsSection.tsx` (rec sections)
- `src/components/ProjectModal.tsx`
- Hooks/contexts for cursor light + 3D mouse if unused after the above.
- `public/*.mov`, `public/*.gif`, `public/green.mp4`, etc. (heavy media)
- `@react-three/drei`, `@react-three/fiber`, `three`, `@types/three`, `trianglify` (last one stays if static trianglify retained — TBD during implementation)

### Modified on chris.kruki.net
- `src/app/page.tsx` — rewritten around the new section list.
- `src/components/AnimatedHeader.tsx` → replaced with a slim `Header.tsx` (static nav bar).
- `src/components/Background.tsx` — switched to static (one-shot) trianglify, or removed entirely if it doesn't fit the dialed-down aesthetic.
- `src/components/SkillsGrid.tsx`, `SkillCard.tsx`, `SkillChip.tsx` — slimmed to dev-only, flat hover.
- `src/components/ProjectsGrid.tsx`, `ProjectCard.tsx` — slimmed to flat cards.
- `src/utils/copy.ts` — strip rec content, keep dev skills, update SOCIALS to drop INSTAGRAM and RESUME.
- `src/utils/projectContent.tsx` — filter to dev-only.

### Added to chris.kruki.net
- `src/components/Hero.tsx` — wordmark + fade-in.
- `src/components/Header.tsx` — sticky nav.
- `src/components/Experience.tsx` — sticky-left timeline.
- `src/components/ExperienceEntry.tsx` — single entry card.
- `src/components/Contact.tsx` — three-link row.
- `src/utils/experience.ts` — typed experience + education data.

## Out of Scope

- Setting up deployment (Vercel/CI). Both projects will be ready locally; deployment config beyond `next.config.ts` and metadata is deferred.
- Moving christoflux.com to its own git repo. The user does this manually after verifying the split.
- Resume PDF — link omitted from chris.kruki.net until provided.
- Custom OG images. Placeholders only.
- Mobile-specific design polish beyond what the existing components already handle. Both sites should remain responsive but no new mobile-only treatment is part of this work.

## Success Criteria

1. `/Users/chriskruki/gitlab/christoflux.com/` exists, runs (`pnpm dev`), and renders the existing flashy site with persona-only content (rec skills, creative projects, persona-leaning About copy with link to chris.kruki.net, Instagram/email contact).
2. `/Users/chriskruki/gitlab/chriskruki.com/` runs (`pnpm dev`) and renders the lightweight single-page site: Hero → Experience (sticky 20/80 timeline with all 8 entries above) → Skills (dev only) → Projects (dev only) → Contact (LinkedIn + Email + GitHub).
3. No 3D, no video, no scroll morph, no spinning rings on chris.kruki.net.
4. Both projects type-check (`pnpm tsc --noEmit`) and build (`pnpm build`) without errors.
5. Each project's `package.json` name and `app/layout.tsx` metadata reflect its identity.

## Open Items for Implementation Plan

These are intentional details to settle when writing the plan, not unresolved design questions:

- Final filter list for dev-only projects in `projectContent.tsx`.
- Final filter list for creative-only projects on christoflux.com.
- Whether to keep static trianglify or drop it entirely on chris.kruki.net.
- Education-vs-work visual differentiation (border color vs icon).
- Per-row sticky vs single observer-driven sticky for the timeline left column.
