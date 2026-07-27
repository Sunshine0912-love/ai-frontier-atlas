# Readability and Research Lessons Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the site comfortably readable on desktop and mobile, expose a complete curriculum, and turn all six published lessons into substantial research-grade technical articles.

**Architecture:** Keep `lessons.json` as lesson metadata and practical exercises, add `articles.json` for long-form chapters/formulas/examples, and add `syllabus.json` for the complete planned curriculum. The lesson route joins these datasets at build time and renders local pre-rendered KaTeX, while CSS tokens enforce a 12px UI floor and 17px reading text.

**Tech Stack:** Astro 7, JSON content, Node test runner, KaTeX, CSS.

---

### Task 1: Lock readability and completeness in tests

**Files:**
- Modify: `test/content.test.mjs`
- Modify: `test/site-structure.test.mjs`

1. Add a CSS test that rejects any explicit font size below 12px and checks the body/long-form defaults.
2. Add curriculum tests requiring every track to have an ordered syllabus matching `plannedLessons`.
3. Add article tests requiring all published lessons to have substantial chapter prose, formulas, worked examples, implementation mapping, limitations, and authoritative sources.
4. Run `npm test` and verify the new tests fail for the missing data/rendering.

### Task 2: Rebuild the typography system

**Files:**
- Modify: `src/styles/global.css`

1. Replace every 7–11px declaration with a minimum 12px size.
2. Replace low-contrast gray tokens and Chinese serif body copy with a high-legibility sans-serif reading stack.
3. Set 16px body text, 17px long-form text, 1.85 line height, 70-character reading width, and mobile sizes that do not shrink body copy.
4. Run the readability test until it passes.

### Task 3: Publish the complete syllabus

**Files:**
- Create: `src/data/syllabus.json`
- Modify: `src/pages/learn/index.astro`
- Modify: `src/styles/global.css`

1. Add the full ordered lesson sequence for all six tracks, with available/planned state and one-sentence learning focus.
2. Render both published and upcoming lessons; only published items link to article routes.
3. Show truthful progress counts and a clear legend.
4. Run content and build checks.

### Task 4: Convert six lesson outlines into long-form articles

**Files:**
- Create: `src/data/articles.json`
- Create: `src/components/MathBlock.astro`
- Modify: `src/components/Layout.astro`
- Modify: `src/pages/learn/[slug].astro`
- Modify: `src/styles/global.css`
- Modify: `package.json`
- Modify: `package-lock.json`

1. Add KaTeX and local CSS.
2. Write structured chapters for each lesson: problem setup, baseline, formalization, worked example, implementation path, complexity/trade-offs, failure boundaries, and reading path.
3. Define every formula’s symbols and interpretation immediately after the formula.
4. Preserve practical labs, decision tables, self-check questions, and primary sources.
5. Render chapters, formulas, examples, source mapping, and article navigation.
6. Run tests, Astro checks, build, and verify that generated HTML contains KaTeX without raw formulas.

### Task 5: Visual and production verification

**Files:**
- Modify: `ops/site-review.json`
- Create: `ops/logs/2026-07-27-<time>-readability-content.md`
- Modify: `README.md`

1. Build and serve locally.
2. Capture 1440px desktop and 390px mobile screenshots for homepage, curriculum, and a lesson.
3. Inspect real-size text, long lines, overflow, sticky navigation, and formula wrapping.
4. Run `npm test`, `npm run check`, `npm run build`, `npm run verify:build`, and the site review.
5. Commit, merge to `main`, push, inspect deployment, and verify production routes.
