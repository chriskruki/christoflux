# Portfolio Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the existing portfolio at `/Users/chriskruki/gitlab/chriskruki.com/` into two independent Next.js sites — `/gitlab/christoflux.com/` (flashy persona, retains current theme) and `/gitlab/chriskruki.com/` in place (lightweight dev portfolio with sticky-timeline experience section).

**Architecture:**

- **Step 1 — Clone phase:** Full directory copy of `chriskruki.com/` → `christoflux.com/`. Both folders compile independently.
- **Step 2 — Christoflux content edits:** strip dev skills, reframe About copy toward persona, drop dev projects, drop LinkedIn/GitHub from contact, rename package + metadata.
- **Step 3 — Chris.kruki.net teardown + rebuild:** delete heavy components (3D, video, modals, rec sections), drop unused deps, rebuild around 5 new lean components: Header, Hero, Experience (sticky 20/80 timeline), Skills (dev-only chips), Projects (flat dev tiles), Contact (LinkedIn + Email + GitHub).

**Tech Stack:** Next.js 15.5, React 19, Tailwind 4, framer-motion 12, TypeScript 5, pnpm.

**Spec:** See [`docs/superpowers/specs/2026-04-24-portfolio-split-design.md`](../specs/2026-04-24-portfolio-split-design.md).

**Important — commit policy:** Per the user's global CLAUDE.md, **NEVER run `git commit` autonomously**. Each task ends with a "Pause for user to commit" step that lists the suggested commit message and waits for explicit approval before continuing. The user batches small intermediate steps and commits at task boundaries.

**Verification model:** This is UI work. Each task ends with a manual verification step that runs `pnpm dev` and checks specific visible behavior in the browser at `http://localhost:3000`. Type-check runs at the end of each phase via `pnpm tsc --noEmit`.

---

## Phase 1 — Clone the project

### Task 1: Copy chriskruki.com → christoflux.com

**Files:**

- Source: `/Users/chriskruki/gitlab/chriskruki.com/` (entire directory)
- Target (create): `/Users/chriskruki/gitlab/christoflux.com/`

- [ ] **Step 1: Verify source state is clean**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:

```bash
git status
```

Expected: working tree is either clean or only contains `D public/chris.png` (which is the known pre-existing state per the session's gitStatus snapshot). If there are unrelated dirty changes, stop and ask the user before proceeding.

- [ ] **Step 2: Copy directory excluding build artifacts**

Run:

```bash
mkdir -p /Users/chriskruki/gitlab/christoflux.com
rsync -a --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='tsconfig.tsbuildinfo' /Users/chriskruki/gitlab/chriskruki.com/ /Users/chriskruki/gitlab/christoflux.com/
```

Expected: rsync completes silently. No git history is copied (the user will `git init` later when moving to its own repo).

- [ ] **Step 3: Initialize an isolated git history for christoflux.com**

Run:

```bash
cd /Users/chriskruki/gitlab/christoflux.com && git init -b main && git add -A
```

Expected: empty `main` branch with all files staged. Do NOT commit — the user commits manually.

- [ ] **Step 4: Install dependencies in the new folder**

Run:

```bash
cd /Users/chriskruki/gitlab/christoflux.com && pnpm install
```

Expected: pnpm completes without errors. `node_modules/` populated.

- [ ] **Step 5: Verify the cloned project runs**

Run:

```bash
cd /Users/chriskruki/gitlab/christoflux.com && pnpm dev
```

Expected: Next dev server starts on `http://localhost:3000`. Open it in a browser, confirm the existing flashy site renders identically (video bg, animated header, all sections). Stop the dev server with Ctrl+C.

- [ ] **Step 6: Pause for user to commit**

Suggested commit message for `chriskruki.com` repo: _(no commit needed in source — nothing changed there)_
Suggested commit for `christoflux.com` repo: `chore: initial fork from chriskruki.com`
Wait for user approval before continuing.

---

## Phase 2 — Convert christoflux.com to persona-only

All work in this phase is in `/Users/chriskruki/gitlab/christoflux.com/`. The original `chriskruki.com/` is untouched until Phase 3.

### Task 2: Rename project identity

**Files:**

- Modify: `/Users/chriskruki/gitlab/christoflux.com/package.json`
- Modify: `/Users/chriskruki/gitlab/christoflux.com/README.md`
- Modify: `/Users/chriskruki/gitlab/christoflux.com/src/app/layout.tsx`

- [ ] **Step 1: Update `package.json` name**

Edit `/Users/chriskruki/gitlab/christoflux.com/package.json`:

Replace:

```json
"name": "chris.kruki.net",
```

With:

```json
"name": "christoflux.com",
```

- [ ] **Step 2: Replace README contents**

Overwrite `/Users/chriskruki/gitlab/christoflux.com/README.md`:

````markdown
# christoflux.com

Christoflux — persona portfolio. Raving, flowing, music, LED, electronics.

## Dev

```bash
pnpm install
pnpm dev
```
````

````

- [ ] **Step 3: Update layout metadata**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/app/layout.tsx`:

Replace the `metadata` block:
```ts
export const metadata: Metadata = {
  title: 'Chris Kruki',
  description: 'Hello',
  icons: { /* … unchanged … */ },
}
````

With:

```ts
export const metadata: Metadata = {
  title: 'Christoflux',
  description: 'Raving, flowing, music, LED, electronics — the persona side.',
  icons: {
    icon: [
      { url: '/fav/favicon.ico' },
      { url: '/fav/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/fav/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/fav/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/fav/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}
```

- [ ] **Step 4: Verify the dev server still loads with new title**

Run from `/Users/chriskruki/gitlab/christoflux.com/`:

```bash
pnpm dev
```

Open browser to `localhost:3000`. Confirm the tab title is "Christoflux". Stop the server.

- [ ] **Step 5: Pause for user to commit**

Suggested message: `chore: rename to christoflux.com (package, README, metadata)`

---

### Task 3: Strip dev skills from christoflux's data layer

**Files:**

- Modify: `/Users/chriskruki/gitlab/christoflux.com/src/utils/copy.ts`

- [ ] **Step 1: Remove the `DEV` block from `SKILLS`**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/utils/copy.ts`:

Replace the entire `SKILLS` export with:

```ts
export const SKILLS = {
  REC: {
    HOBBY_TECH: [
      { name: '3D Printing', tier: 2 },
      { name: 'LED Lighting', tier: 2 },
      { name: 'Soldering', tier: 3 },
      { name: 'Electronics', tier: 3 },
    ],
    PHYSICAL: [
      {
        name: 'Ripsticking',
        tier: 1,
        since: '1/1/2012',
        content: 'ripsticking',
      },
      { name: 'Sand Balls', tier: 1, since: '8/1/2017', content: 'sandball' },
      { name: 'Flowstar', tier: 2, since: '3/10/2025', content: 'flowstar' },
      { name: 'Shuffling', tier: 2, since: '2012' },
      { name: 'Snowboarding', tier: 3, since: '1/15/2014' },
      { name: 'Surfing', tier: 4, since: '1/1/2020' },
      { name: 'Skydiving', tier: 4, since: '1/1/2019' },
    ],
    MUSIC: [
      { name: 'Whistling', tier: 1 },
      { name: 'Piano', tier: 2 },
      { name: 'Beatboxing', tier: 3 },
      { name: 'Singing', tier: 3 },
      { name: 'Alto Saxophone', tier: 3 },
      { name: 'Ableton', tier: 4 },
    ],
    GAMES: [
      { name: 'CS2', tier: 1 },
      { name: 'Minecraft', tier: 1 },
      { name: 'Halo', tier: 2 },
      { name: 'Roblox', tier: 2 },
    ],
  },
}
```

Leave `TIER_CONFIG` and `SOCIALS` exports unchanged in this task.

- [ ] **Step 2: Remove dev sections from `SkillsGrid.tsx`**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/components/SkillsGrid.tsx`. Replace lines 28–33 (the `getAllSkillsWithContent` function body) with:

```ts
const getAllSkillsWithContent = (): Skill[] => {
  const allSkills: Skill[] = []
  Object.values(SKILLS.REC).forEach(skills => allSkills.push(...skills))
  return allSkills.filter(skill => skill.content)
}
```

Then remove the two dev sections from the JSX. Find this block (lines ~95–110):

```tsx
      <SkillsSection
        title='Languages'
        subTitle='Programming Languages & Markup'
        skills={SKILLS.DEV.LANGUAGES}
        delay={0.1}
        onSkillClick={handleSkillClick}
        variant='chip'
      />
      <SkillsSection
        title='Work Tech'
        subTitle='Frameworks, Libraries & Tools'
        skills={SKILLS.DEV.FRAMEWORKS}
        delay={0.1}
        onSkillClick={handleSkillClick}
        variant='chip'
      />
```

Delete it entirely. The remaining `SkillsSection` calls (Hobbies, Hobby Tech, Music, Gaming) stay.

- [ ] **Step 3: Type-check**

Run from `/Users/chriskruki/gitlab/christoflux.com/`:

```bash
pnpm tsc --noEmit
```

Expected: 0 errors. If there are errors referencing `SKILLS.DEV`, search the codebase and remove those references.

- [ ] **Step 4: Verify in browser**

Run `pnpm dev`, open `localhost:3000`, scroll to the Skills section. Confirm: no "Languages" or "Work Tech" sections, only Hobbies / Hobby Tech / Music / Gaming. Stop the server.

- [ ] **Step 5: Pause for user to commit**

Suggested message: `feat(christoflux): strip dev skills, keep rec only`

---

### Task 4: Reframe About copy + add link to chris.kruki.net

**Files:**

- Modify: `/Users/chriskruki/gitlab/christoflux.com/src/app/page.tsx`

- [ ] **Step 1: Replace the About section content**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/app/page.tsx`. Find the `<ScreenSection id='about' …>` block (lines ~173–208). Replace its inner content with:

```tsx
<ScreenSection id='about' ref={sectionRefs.about}>
  <div className='flex items-center justify-center min-h-screen'>
    <ContentCard>
      <div className='text-center text-white/70'>
        <h2 className='text-4xl font-light mb-4'>Who dis</h2>
        <p className='text-lg mb-6'>
          Wook engineer by night, software engineer by day
        </p>
        <div className='max-w-2xl mx-auto text-left space-y-4'>
          <p className='text-base leading-relaxed'>
            {`I rave, flow, mix and make music, and hyperfixate on
                          random LED + electronics projects. This site is the playground
                          for that side.`}
          </p>
          <p className='text-base leading-relaxed'>
            For the dev side, see{' '}
            <Link
              href='https://chris.kruki.net'
              style={{ color: 'lightgreen' }}
              target='_blank'
            >
              chris.kruki.net
            </Link>
            .
          </p>
        </div>
      </div>
    </ContentCard>
  </div>
</ScreenSection>
```

- [ ] **Step 2: Verify in browser**

Run `pnpm dev`, scroll to About. Confirm: copy now reads "Wook engineer by night, software engineer by day", LED/music blurb, and link to chris.kruki.net. Stop the server.

- [ ] **Step 3: Pause for user to commit**

Suggested message: `feat(christoflux): reframe About copy toward persona; link to dev site`

---

### Task 5: Filter projects to creative-only on christoflux

**Files:**

- Inspect: `/Users/chriskruki/gitlab/christoflux.com/src/components/ProjectsGrid.tsx`

- [ ] **Step 1: Verify current project list is already creative-only**

Open `/Users/chriskruki/gitlab/christoflux.com/src/components/ProjectsGrid.tsx`. The existing `PROJECTS` array (lines 17–33) contains only `Totem` and `Iris` — both creative. No filtering needed.

- [ ] **Step 2: No-op — confirm and skip**

This task is informational. The current project list is already aligned with christoflux's content. Move to the next task. (If the user later adds dev projects to chris.kruki.net's project list, those will be added on the dev-site side, not removed from here.)

- [ ] **Step 3: Pause for user to commit**

No commit needed for this task.

---

### Task 6: Restrict contact to Instagram + email only

**Files:**

- Modify: `/Users/chriskruki/gitlab/christoflux.com/src/utils/copy.ts`
- Modify: `/Users/chriskruki/gitlab/christoflux.com/src/app/page.tsx`

- [ ] **Step 1: Trim `SOCIALS` in copy.ts**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/utils/copy.ts`. Replace the `SOCIALS` export with:

```ts
export const SOCIALS = {
  EMAIL: 'chriskruki@gmail.com',
  INSTAGRAM: 'https://www.instagram.com/christoflux/',
}
```

(LinkedIn, GitHub, RESUME removed.)

- [ ] **Step 2: Update Contact section to surface Instagram**

Edit `/Users/chriskruki/gitlab/christoflux.com/src/app/page.tsx`. Find the `<ScreenSection id='contact' …>` block (lines ~238–249). Replace inner content with:

```tsx
<ScreenSection id='contact' ref={sectionRefs.contact}>
  <div className='flex items-center justify-center min-h-screen'>
    <ContentCard>
      <div className='text-center text-white/70 space-y-4'>
        <h2 className='text-4xl font-light mb-4'>HMU</h2>
        <div>
          <Link href={'mailto:' + SOCIALS.EMAIL} target='_blank'>
            {SOCIALS.EMAIL}
          </Link>
        </div>
        <div>
          <Link
            href={SOCIALS.INSTAGRAM}
            target='_blank'
            style={{ color: 'lightgreen' }}
          >
            @christoflux
          </Link>
        </div>
      </div>
    </ContentCard>
  </div>
</ScreenSection>
```

- [ ] **Step 3: Type-check + verify**

Run from `/Users/chriskruki/gitlab/christoflux.com/`:

```bash
pnpm tsc --noEmit && pnpm dev
```

Expected: 0 type errors. In browser, scroll to Contact — confirm email + @christoflux Instagram link visible. Confirm no LinkedIn/GitHub references anywhere on the page. Stop the server.

- [ ] **Step 4: Pause for user to commit**

Suggested message: `feat(christoflux): contact = email + instagram only`

---

### Task 7: Final christoflux verification

**Files:**

- None modified — verification only.

- [ ] **Step 1: Full type-check**

Run from `/Users/chriskruki/gitlab/christoflux.com/`:

```bash
pnpm tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Production build**

Run:

```bash
pnpm build
```

Expected: build succeeds with no errors. Output shows the `app/page` route building.

- [ ] **Step 3: Smoke-test the production build**

Run:

```bash
pnpm start
```

Expected: server starts on port 3000. Open the browser, click through all sections (Home → About → Projects → Skills → Contact). Confirm:

- Title is "Christoflux"
- About copy reframed (wook/persona) with link to chris.kruki.net
- Skills shows Hobbies / Hobby Tech / Music / Gaming only — no Languages or Work Tech
- Projects shows Totem + Iris
- Contact shows email + Instagram only

Stop the server.

- [ ] **Step 4: Pause for user to commit + handoff**

No code changes — this is a checkpoint. Phase 2 complete.

---

## Phase 3 — Strip down chris.kruki.net to lightweight site

All work in this phase is in `/Users/chriskruki/gitlab/chriskruki.com/`. The git history of this folder is preserved.

### Task 8: Delete heavy components, hooks, contexts

**Files:**

- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/threejs/` (entire dir)
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/AnimatedEye.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/PageLoader.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/LazyVideo.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/Background.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/AnimatedHeader.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillModal.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ProjectModal.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillCard.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillsSection.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillsGrid.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ProjectsGrid.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ProjectCard.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ContentCard.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ScreenSection.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/components/nav/` (entire dir — NavBtn no longer needed)
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/contexts/MousePositionContext.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/contexts/` (entire dir if empty after above)
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/hooks/useMousePosition.ts`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/hooks/useSectionDetection.ts` (replaced by IntersectionObserver in new Header)
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/utils/skillContent.tsx`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/src/utils/projectContent.tsx`

- [ ] **Step 1: Delete the components**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:

```bash
rm -rf src/components/threejs src/components/nav
rm src/components/AnimatedEye.tsx
rm src/components/PageLoader.tsx
rm src/components/LazyVideo.tsx
rm src/components/Background.tsx
rm src/components/AnimatedHeader.tsx
rm src/components/SkillModal.tsx
rm src/components/ProjectModal.tsx
rm src/components/SkillCard.tsx
rm src/components/SkillsSection.tsx
rm src/components/SkillsGrid.tsx
rm src/components/ProjectsGrid.tsx
rm src/components/ProjectCard.tsx
rm src/components/ContentCard.tsx
rm src/components/ScreenSection.tsx
```

- [ ] **Step 2: Delete contexts + hooks + utils**

Run:

```bash
rm -rf src/contexts
rm src/hooks/useMousePosition.ts
rm src/hooks/useSectionDetection.ts
rm src/utils/skillContent.tsx
rm src/utils/projectContent.tsx
```

After this, `src/hooks/` should be empty. Remove it:

```bash
rmdir src/hooks
```

- [ ] **Step 3: Verify SkillChip is the only component left**

Run:

```bash
ls src/components
```

Expected output: `SkillChip.tsx` only. (`SkillChip.tsx` will be reused in Task 13.)

- [ ] **Step 4: Pause for user to commit**

The project will NOT compile at this point because `page.tsx` still imports the deleted modules. That's expected — `page.tsx` is rewritten in Task 14. Don't try to run `pnpm dev` until then.

Suggested message: `chore(chriskruki): delete heavy components, contexts, hooks (3D, video, modals)`

---

### Task 9: Delete heavy media from public/

**Files:**

- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/green.mp4`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/blue-fluid.gif`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/blue-hd.gif`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/white.gif`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/flowstar.mov`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/iris.jpeg`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/iris_hf.jpeg`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/iris_hf_1.mov`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/ripstick.mp4`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/sandball.mov`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/totem.jpeg`
- Delete: `/Users/chriskruki/gitlab/chriskruki.com/public/totem_1.mov`

The `public/fav/` directory and `public/chris.png` (already deleted per gitStatus snapshot) stay.

- [ ] **Step 1: Delete the media files**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:

```bash
rm -f public/green.mp4 public/blue-fluid.gif public/blue-hd.gif public/white.gif \
      public/flowstar.mov public/iris.jpeg public/iris_hf.jpeg public/iris_hf_1.mov \
      public/ripstick.mp4 public/sandball.mov public/totem.jpeg public/totem_1.mov
```

- [ ] **Step 2: Confirm only fav/ remains**

Run:

```bash
ls public
```

Expected output: `fav/` directory only. (Possibly also `chris.png` if it was restored — that's fine, it's referenced by no code after Task 14.)

- [ ] **Step 3: Pause for user to commit**

Suggested message: `chore(chriskruki): remove heavy media (video, gif, mov assets)`

---

### Task 10: Drop unused dependencies

**Files:**

- Modify: `/Users/chriskruki/gitlab/chriskruki.com/package.json`

- [ ] **Step 1: Remove three.js + trianglify deps**

Edit `/Users/chriskruki/gitlab/chriskruki.com/package.json`. In `dependencies`, remove:

- `@react-three/drei`
- `@react-three/fiber`
- `@types/three`
- `three`
- `trianglify`

In `devDependencies`, remove:

- `@types/trianglify`

The resulting `package.json` should look like:

```json
{
  "name": "chris.kruki.net",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^12.19.1",
    "next": "15.5.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Reinstall**

Run:

```bash
cd /Users/chriskruki/gitlab/chriskruki.com && pnpm install
```

Expected: pnpm prunes the removed deps. `pnpm-lock.yaml` updates.

- [ ] **Step 3: Pause for user to commit**

Suggested message: `chore(chriskruki): drop three.js + trianglify deps`

---

### Task 11: Update copy.ts for the lightweight site

**Files:**

- Modify: `/Users/chriskruki/gitlab/chriskruki.com/src/utils/copy.ts`

- [ ] **Step 1: Replace copy.ts with dev-only version**

Overwrite `/Users/chriskruki/gitlab/chriskruki.com/src/utils/copy.ts`:

```ts
export const SKILLS = {
  DEV: {
    LANGUAGES: [
      { name: 'TypeScript', tier: 1 },
      { name: 'HTML', tier: 1 },
      { name: 'CSS', tier: 1 },
      { name: 'Python', tier: 3 },
      { name: 'C++', tier: 3 },
      { name: 'SQL', tier: 3 },
      { name: 'Java', tier: 4 },
    ],
    FRAMEWORKS: [
      { name: 'Next.js', tier: 1 },
      { name: 'React', tier: 1 },
      { name: 'Tailwind CSS', tier: 1 },
      { name: 'Node.JS', tier: 1 },
      { name: 'Express', tier: 2 },
      { name: 'MongoDB', tier: 3 },
      { name: 'PostgreSQL', tier: 3 },
      { name: 'MySQL', tier: 3 },
    ],
  },
}

export const TIER_CONFIG = {
  1: {
    label: 'Expert',
    color: '#FFD700',
    bgGradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20',
    borderColor: 'border-yellow-400/50',
    textColor: 'text-yellow-400',
    stars: 5,
  },
  2: {
    label: 'Advanced',
    color: '#10b981',
    bgGradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
    borderColor: 'border-emerald-400/50',
    textColor: 'text-emerald-400',
    stars: 4,
  },
  3: {
    label: 'Intermediate',
    color: '#C0C0C0',
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 3,
  },
  4: {
    label: 'Familiar',
    color: '#808080',
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 2,
  },
  5: {
    label: 'Learning',
    color: '#666666',
    bgGradient: 'from-gray-400/20 via-slate-500/10 to-gray-600/20',
    borderColor: 'border-gray-400/50',
    textColor: 'text-gray-300',
    stars: 1,
  },
}

export const SOCIALS = {
  LINKEDIN: 'https://www.linkedin.com/in/chriskruki/',
  GITHUB: 'https://github.com/chriskruki',
  EMAIL: 'chriskruki@gmail.com',
}
```

- [ ] **Step 2: Delete `src/utils/constants.ts`**

This file is full of HEADER/SECTIONS/CUBE constants tied to the deleted scroll-driven header and 3D cube. Run:

```bash
rm src/utils/constants.ts
```

- [ ] **Step 3: Inspect helpers.ts**

Read `src/utils/helpers.ts` (113B). If it only contains helpers used by deleted components, delete it. If it has anything that might be reused, leave it. The contents at this stage of planning are unknown — the executing agent must read the file and decide. If kept, note what's inside in the commit message.

- [ ] **Step 4: Pause for user to commit**

Suggested message: `feat(chriskruki): trim copy.ts to dev only; drop deleted constants`

---

### Task 12: Create the experience data file

**Files:**

- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/utils/experience.ts`

- [ ] **Step 1: Write experience.ts**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/utils/experience.ts`:

```ts
export type ExperienceType = 'work' | 'education'

export interface ExperienceEntry {
  id: string
  type: ExperienceType
  title: string
  org: string
  location?: string
  employmentType?: string
  dateLabel: string
  bullets?: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'ulri-rs2',
    type: 'work',
    title: 'Research Scientist II',
    org: 'UL Research Institutes',
    location: 'Remote',
    employmentType: 'Full-time',
    dateLabel: 'Mar 2026 – Present',
  },
  {
    id: 'ulri-arsi',
    type: 'work',
    title: 'Associate Research Scientist',
    org: 'UL Research Institutes',
    location: 'Remote',
    employmentType: 'Full-time',
    dateLabel: 'Jan 2024 – Mar 2026',
  },
  {
    id: 'klexity',
    type: 'work',
    title: 'Software Engineer',
    org: 'Klexity, Inc.',
    location: 'Remote',
    employmentType: 'Freelance',
    dateLabel: 'Jan 2023 – Jan 2024',
  },
  {
    id: 'chapman-ur',
    type: 'work',
    title: 'Undergraduate Researcher',
    org: 'Chapman University',
    location: 'Orange, CA · Hybrid',
    employmentType: 'Part-time',
    dateLabel: 'Mar 2023 – May 2023',
    bullets: [
      'Led development of an economic experiment engine using React, Tailwind CSS, TypeScript, Socket.IO, and Google Blockly — initial iteration of a revamp of Chapman’s software for student-volunteer behavioral economics experiments.',
      'Worked alongside economics and engineering professors driving conceptualization and planning of new features; converted theoretical knowledge into working systems.',
    ],
  },
  {
    id: 'chapman-bs',
    type: 'education',
    title: 'B.S. Computer Science',
    org: 'Chapman University',
    dateLabel: '2021 – 2023',
  },
  {
    id: 'syntiant-se',
    type: 'work',
    title: 'Software Engineer',
    org: 'Syntiant Corp.',
    location: 'Irvine, CA',
    employmentType: 'Full-time',
    dateLabel: 'Aug 2020 – Aug 2021',
    bullets: [
      'Full-stack web development of audio data labeling software using HTML, CSS (Bootstrap), JavaScript (jQuery), Python (Flask), and MySQL.',
      'Managed and instructed a team of interns performing ML data preparation.',
      'Developed and maintained data utility scripts interfacing with MySQL, Amazon S3, and MongoDB.',
    ],
  },
  {
    id: 'syntiant-intern',
    type: 'work',
    title: 'Software Engineering Intern',
    org: 'Syntiant Corp.',
    location: 'Irvine, CA',
    employmentType: 'Part-time',
    dateLabel: 'Dec 2019 – Aug 2020',
  },
  {
    id: 'ivc',
    type: 'education',
    title: 'Transfer, Computer Science',
    org: 'Irvine Valley College',
    dateLabel: '2018 – 2021',
  },
]
```

- [ ] **Step 2: Type-check the new file in isolation**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:

```bash
pnpm tsc --noEmit src/utils/experience.ts
```

(Or just `pnpm tsc --noEmit` — it'll fail elsewhere on the still-broken page.tsx, that's OK.) Confirm experience.ts itself has no errors.

- [ ] **Step 3: Pause for user to commit**

Suggested message: `feat(chriskruki): add experience data (work + education)`

---

### Task 13: Build new components — Header, Hero, Contact, SkillsSection, ProjectsSection

**Files:**

- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/Header.tsx`
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/Hero.tsx`
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/Contact.tsx`
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillsSection.tsx`
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ProjectsSection.tsx`
- Modify: `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillChip.tsx` (flatten — drop modal trigger)
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/utils/projects.ts`

- [ ] **Step 1: Create dev projects data file**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/utils/projects.ts`:

```ts
export interface DevProject {
  name: string
  description: string
  tags: string[]
  href?: string
}

export const PROJECTS: DevProject[] = [
  {
    name: 'dyff.io',
    description:
      'Full-stack platform for auditing AI systems for safety and compliance — built at the Digital Safety Research Institute.',
    tags: ['TypeScript', 'Next.js', 'React', 'Node.JS'],
    href: 'https://dyff.io',
  },
]
```

This stub starts with `dyff.io` (the user's current professional project). The user can extend it with more dev projects later — out of scope here.

- [ ] **Step 2: Create `Header.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/Header.tsx`:

```tsx
'use client'

import Link from 'next/link'

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-emerald-400/10 bg-black/80 backdrop-blur-md'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6'>
        <Link
          href='#top'
          className='text-base font-semibold tracking-tight text-white hover:text-emerald-400 transition-colors'
        >
          Chris Kruki
        </Link>
        <nav className='flex items-center gap-5 text-sm text-white/70'>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='hover:text-emerald-400 transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create `Hero.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/Hero.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id='top'
      className='flex min-h-[60vh] items-center justify-center px-4'
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight text-center'
      >
        Chris Kruki
      </motion.h1>
    </section>
  )
}
```

- [ ] **Step 4: Create `Contact.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/Contact.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { SOCIALS } from '@/utils/copy'

const LINK_CLASS =
  'inline-flex items-center gap-2 rounded-md border border-emerald-400/30 bg-black/40 px-4 py-2 text-sm text-white/90 hover:border-emerald-400 hover:text-emerald-400 transition-colors'

export default function Contact() {
  return (
    <section id='contact' className='py-24 px-4'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='mb-8 text-3xl font-light text-white'>Get in touch</h2>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Link href={SOCIALS.LINKEDIN} target='_blank' className={LINK_CLASS}>
            LinkedIn
          </Link>
          <Link href={`mailto:${SOCIALS.EMAIL}`} className={LINK_CLASS}>
            Email
          </Link>
          <Link href={SOCIALS.GITHUB} target='_blank' className={LINK_CLASS}>
            GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Flatten `SkillChip.tsx`**

Overwrite `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillChip.tsx`:

```tsx
'use client'

import { TIER_CONFIG } from '@/utils/copy'

interface Skill {
  name: string
  tier: number
}

interface SkillChipProps {
  skill: Skill
}

export default function SkillChip({ skill }: SkillChipProps) {
  const config = TIER_CONFIG[skill.tier as keyof typeof TIER_CONFIG]

  return (
    <span
      className='inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm transition-colors hover:border-emerald-400/60'
      title={config.label}
    >
      <span
        className='inline-block h-1.5 w-1.5 rounded-full'
        style={{ backgroundColor: config.color }}
      />
      <span className='text-white/85'>{skill.name}</span>
    </span>
  )
}
```

(All framer-motion + interactive modal logic removed — chip is now static.)

- [ ] **Step 6: Create `SkillsSection.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/SkillsSection.tsx`:

```tsx
'use client'

import { SKILLS } from '@/utils/copy'
import SkillChip from './SkillChip'

export default function SkillsSection() {
  return (
    <section id='skills' className='py-24 px-4'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='mb-10 text-3xl font-light text-white'>Skills</h2>

        <div className='space-y-8'>
          <div>
            <h3 className='mb-3 text-sm uppercase tracking-wider text-white/50'>
              Languages
            </h3>
            <div className='flex flex-wrap gap-2'>
              {SKILLS.DEV.LANGUAGES.map(skill => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div>
            <h3 className='mb-3 text-sm uppercase tracking-wider text-white/50'>
              Frameworks &amp; Tools
            </h3>
            <div className='flex flex-wrap gap-2'>
              {SKILLS.DEV.FRAMEWORKS.map(skill => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `ProjectsSection.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/ProjectsSection.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { PROJECTS } from '@/utils/projects'

export default function ProjectsSection() {
  return (
    <section id='projects' className='py-24 px-4'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='mb-10 text-3xl font-light text-white'>Projects</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {PROJECTS.map(project => {
            const cardInner = (
              <div className='h-full rounded-lg border border-white/10 bg-black/40 p-5 transition-colors hover:border-emerald-400/50'>
                <h3 className='mb-2 text-lg font-semibold text-white'>
                  {project.name}
                </h3>
                <p className='mb-4 text-sm text-white/70'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className='rounded-full border border-emerald-400/30 px-2 py-0.5 text-xs text-emerald-300'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )

            return project.href ? (
              <Link
                key={project.name}
                href={project.href}
                target='_blank'
                className='block'
              >
                {cardInner}
              </Link>
            ) : (
              <div key={project.name}>{cardInner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Pause for user to commit**

Project still won't compile (page.tsx still references the old world; Experience component not yet built). That's fine.

Suggested message: `feat(chriskruki): add Header, Hero, Contact, SkillsSection, ProjectsSection; flatten SkillChip`

---

### Task 14: Build the sticky-timeline Experience section

**Files:**

- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/Experience.tsx`
- Create: `/Users/chriskruki/gitlab/chriskruki.com/src/components/ExperienceEntry.tsx`

- [ ] **Step 1: Create `ExperienceEntry.tsx`**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/ExperienceEntry.tsx`:

```tsx
'use client'

import type { ExperienceEntry as Entry } from '@/utils/experience'

interface ExperienceEntryProps {
  entry: Entry
}

export default function ExperienceEntry({ entry }: ExperienceEntryProps) {
  const isEducation = entry.type === 'education'
  const accent = isEducation
    ? 'border-l-emerald-700/60'
    : 'border-l-emerald-400/60'

  return (
    <article className={`border-l-2 ${accent} pl-4 sm:pl-6 py-4`}>
      <header className='mb-2'>
        <h3 className='text-lg font-semibold text-white'>{entry.title}</h3>
        <p className='text-sm text-white/70'>
          {entry.org}
          {entry.employmentType && (
            <span className='text-white/40'> · {entry.employmentType}</span>
          )}
        </p>
        {entry.location && (
          <p className='text-xs text-white/40 mt-0.5'>{entry.location}</p>
        )}
      </header>

      {entry.bullets && entry.bullets.length > 0 && (
        <ul className='mt-2 space-y-1.5 text-sm text-white/70 list-disc list-outside ml-4'>
          {entry.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
```

- [ ] **Step 2: Create `Experience.tsx` with sticky 20/80 layout**

Create `/Users/chriskruki/gitlab/chriskruki.com/src/components/Experience.tsx`:

```tsx
'use client'

import { EXPERIENCE } from '@/utils/experience'
import ExperienceEntry from './ExperienceEntry'

export default function Experience() {
  return (
    <section id='experience' className='py-24 px-4'>
      <div className='mx-auto max-w-5xl'>
        <h2 className='mb-10 text-3xl font-light text-white'>Experience</h2>

        <div className='grid grid-cols-[20%_80%] gap-4 sm:gap-6'>
          {EXPERIENCE.map(entry => (
            <div key={entry.id} className='contents'>
              {/* Left column: sticky date label */}
              <div className='relative'>
                <div className='sticky top-20 text-right text-sm text-white/60 font-mono leading-snug pr-2 sm:pr-4'>
                  {entry.dateLabel}
                </div>
              </div>

              {/* Right column: entry */}
              <ExperienceEntry entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Why this works:** the parent `grid` lays each `dateLabel` in its own row at column 1 and the entry at column 2. The wrapper `<div>` in column 1 is `relative`, and the inner `<div>` is `sticky top-20`. Each row's sticky child pins inside its own row container — when you scroll, the date stays visible until the row leaves the viewport, then the next row's date takes over. `top-20` (5rem) clears the 14-unit (3.5rem) sticky `Header` plus a small gap.

The `className='contents'` on the wrapping `<div>` makes the wrapper invisible to grid layout — the date and entry slot directly into the grid as siblings. (Without `contents`, each row would be its own grid which breaks the alignment.)

- [ ] **Step 3: Pause for user to commit**

Project still won't compile until Task 15 wires everything into page.tsx.

Suggested message: `feat(chriskruki): add sticky 20/80 Experience timeline`

---

### Task 15: Rewrite page.tsx, layout.tsx, globals.css

**Files:**

- Modify: `/Users/chriskruki/gitlab/chriskruki.com/src/app/page.tsx`
- Modify: `/Users/chriskruki/gitlab/chriskruki.com/src/app/layout.tsx`
- Modify: `/Users/chriskruki/gitlab/chriskruki.com/src/app/globals.css`

- [ ] **Step 1: Replace `page.tsx`**

Overwrite `/Users/chriskruki/gitlab/chriskruki.com/src/app/page.tsx`:

```tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main className='mx-auto'>
        <Hero />
        <Experience />
        <SkillsSection />
        <ProjectsSection />
        <Contact />
      </main>
    </>
  )
}
```

(Note: top-level component is no longer `'use client'` — only the leaf components that need framer-motion are client components.)

- [ ] **Step 2: Update `layout.tsx`**

Edit `/Users/chriskruki/gitlab/chriskruki.com/src/app/layout.tsx`:

Replace the file's contents with:

```tsx
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Chris Kruki — Software Engineer',
  description:
    'Software engineer at UL Research Institutes. Full-stack development, TypeScript, React, Next.js.',
  icons: {
    icon: [
      { url: '/fav/favicon.ico' },
      { url: '/fav/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/fav/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/fav/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/fav/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${nunito.variable} antialiased bg-black text-white font-nunito`}
      >
        {children}
      </body>
    </html>
  )
}
```

(Removed `MousePositionProvider` — the context was deleted in Task 8. Added `scroll-smooth` on `<html>` so anchor links scroll smoothly.)

- [ ] **Step 3: Trim `globals.css`**

Overwrite `/Users/chriskruki/gitlab/chriskruki.com/src/app/globals.css`:

```css
@import 'tailwindcss';

.font-nunito {
  font-family:
    var(--font-nunito),
    system-ui,
    -apple-system,
    sans-serif;
}

body {
  background-color: #000;
}
```

(Removed `.gradient`, `@keyframes pulse-glow`, and `.video-border` — none referenced after the rebuild.)

- [ ] **Step 4: Type-check the full project**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:

```bash
pnpm tsc --noEmit
```

Expected: 0 errors. If errors appear, they'll point to leftover imports of deleted modules — fix them.

- [ ] **Step 5: Run dev server and verify visually**

Run:

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser. Verify the following, in order:

1. **Header**: sticky at top, "Chris Kruki" on left, four anchor links on right (Experience / Skills / Projects / Contact). Links change to emerald-400 on hover.
2. **Hero**: large "Chris Kruki" wordmark centered, fades in. No portrait, no video, no spinning ring.
3. **Experience timeline**: 20/80 grid. Left column shows date labels (e.g., "Mar 2026 – Present"). Right column shows entries: Research Scientist II → Associate Research Scientist → Klexity SE → Chapman Undergrad Researcher (with two bullets) → Chapman B.S. CS (education) → Syntiant Software Engineer (with three bullets) → Syntiant Intern → Irvine Valley College (education).
4. **Sticky behavior**: as you scroll through the Experience section, the date label on the left **pins under the header** as the corresponding right-side entry passes. When you scroll into the next entry, the next date takes over. Education entries have a darker (emerald-700) left border vs. work entries (emerald-400).
5. **Skills**: two subsections — "Languages" (TS, HTML, CSS, Python, C++, SQL, Java) and "Frameworks & Tools" (Next.js, React, Tailwind, Node, Express, Mongo, Postgres, MySQL). Each chip is flat with a tier-color dot. No modals, no popups on click.
6. **Projects**: dyff.io card, click opens it in a new tab.
7. **Contact**: three flat link buttons — LinkedIn, Email, GitHub.
8. **Anchor scroll**: clicking each header link smoothly scrolls to its section.

If any check fails, fix and re-verify before continuing.

- [ ] **Step 6: Pause for user to commit**

Suggested message: `feat(chriskruki): single-page lightweight portfolio (hero, sticky timeline, dev skills, dev projects, contact)`

---

### Task 16: Update README + final build verification

**Files:**

- Modify: `/Users/chriskruki/gitlab/chriskruki.com/README.md`

- [ ] **Step 1: Replace README**

Overwrite `/Users/chriskruki/gitlab/chriskruki.com/README.md`:

````markdown
# chris.kruki.net

Personal dev portfolio. Single-page Next.js site — hero, experience timeline, skills, projects, contact.

## Dev

```bash
pnpm install
pnpm dev
```
````

````

- [ ] **Step 2: Production build**

Run from `/Users/chriskruki/gitlab/chriskruki.com/`:
```bash
pnpm build
````

Expected: build succeeds. Output shows `app/page` building. Bundle size should be noticeably smaller than before (no three.js, no trianglify, no media).

- [ ] **Step 3: Smoke-test production build**

Run:

```bash
pnpm start
```

Re-verify the visual checklist from Task 15 Step 5 against the production build. Stop the server.

- [ ] **Step 4: Lint pass**

Run:

```bash
pnpm lint
```

Expected: 0 lint errors. If lint complains about unused imports anywhere (it shouldn't, since deletions in Task 8 were thorough), fix them.

- [ ] **Step 5: Pause for user to commit + final handoff**

Suggested message: `chore(chriskruki): update README; final build pass`

Phase 3 complete. Both sites should now run independently:

- `cd /Users/chriskruki/gitlab/christoflux.com && pnpm dev` → flashy persona portfolio at localhost:3000
- `cd /Users/chriskruki/gitlab/chriskruki.com && pnpm dev` → lightweight dev portfolio at localhost:3000

---

## Self-Review Notes

**Spec coverage:**

- Repo split: Task 1 ✔
- Christoflux content edits (About reframe, dev skills strip, projects filter, contact trim): Tasks 3–6 ✔
- Christoflux metadata: Task 2 ✔
- chris.kruki.net teardown (heavy components, deps, media): Tasks 8–10 ✔
- chris.kruki.net data layer (copy.ts trim, experience data, projects data): Tasks 11–12 ✔
- chris.kruki.net components (Header, Hero, Experience, Skills, Projects, Contact): Tasks 13–14 ✔
- chris.kruki.net page wiring + layout + CSS: Task 15 ✔
- chris.kruki.net README + final build: Task 16 ✔

**Open spec items I locked in during planning:**

- Education vs. work distinction → emerald-700 vs emerald-400 left border (Task 14, ExperienceEntry).
- Sticky timeline technique → per-row sticky inside CSS grid using `display: contents` wrappers (Task 14, Experience.tsx). Single observer-driven sticky was the alternative — rejected because per-row sticky is simpler and avoids JS scroll listeners.
- Trianglify → dropped entirely on chris.kruki.net (Task 8 deletes Background.tsx). Solid black background only.
- Dev project list → starts with `dyff.io` only (Task 13). User can extend.

**Type consistency check:**

- `ExperienceEntry` interface in `experience.ts` used by `ExperienceEntry.tsx` (component) — shadowed name is fine (component imports the type as `Entry` to avoid clash).
- `DevProject` interface in `projects.ts` used by `ProjectsSection.tsx` consistently.
- `Skill` shape used by `SkillChip` matches what `SKILLS.DEV.LANGUAGES` / `FRAMEWORKS` export (both have `{ name: string; tier: number }`).
- `SOCIALS` export trimmed to `LINKEDIN / GITHUB / EMAIL` on chris.kruki.net side and `EMAIL / INSTAGRAM` on christoflux side — both consumers (Contact.tsx, christoflux page.tsx) reference only existing keys.

**Placeholder scan:** No "TBD" / "TODO" / "implement later" left. Each step has the actual content.
