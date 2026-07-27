# AI Frontier Atlas Research Workbench Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the template-like portal with a high-density, evidence-driven AI research and systematic learning workbench.

**Architecture:** Keep Astro static generation and JSON-backed content, but expand the content schema and render it through research-oriented dashboard, intelligence timeline, curriculum map, and deep lesson templates. Preserve the independent repository and GitHub Pages deployment.

**Tech Stack:** Astro 7, TypeScript, JSON content, CSS, Node test runner, GitHub Pages.

---

### Task 1: Encode professional content requirements

**Files:**
- Modify: `test/content.test.mjs`
- Modify: `test/site-structure.test.mjs`
- Modify: `scripts/verify-build.mjs`

**Steps:**
1. Add failing assertions for four frontier scores, mechanism, next observation, multi-source-ready schema, and one complete lesson per track.
2. Add failing assertions for dashboard, intelligence matrix, four curriculum stages, lab and sticky lesson navigation markers.
3. Run `npm test` and confirm the new tests fail because the richer schema/UI is missing.
4. Commit the RED tests.

### Task 2: Upgrade research and curriculum data

**Files:**
- Modify: `src/data/frontier.json`
- Modify: `src/data/tracks.json`
- Modify: `src/data/lessons.json`
- Modify: `scripts/review-site.mjs`

**Steps:**
1. Extend all frontier entries with domain, stage, organization, mechanism, watchNext, and four 1–5 scores.
2. Extend all tracks with stage, prerequisites, outcomes, planned lesson count, lab count, and status.
3. Upgrade existing lessons and add training/alignment, multimodal contrastive learning, and holistic evaluation lessons.
4. Update review output to detect shallow lessons, source gaps, track readiness, and frontier score coverage.
5. Run content and review tests; confirm GREEN.
6. Commit the data-model upgrade.

### Task 3: Build the research workbench UI

**Files:**
- Create: `src/components/SignalRow.astro`
- Create: `src/components/ScoreBars.astro`
- Create: `src/components/DomainMatrix.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Layout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/frontier/index.astro`
- Modify: `src/pages/learn/index.astro`
- Modify: `src/pages/method/index.astro`
- Modify: `src/pages/learn/[slug].astro`
- Modify: `src/styles/global.css`

**Steps:**
1. Build compact shared signal and score components.
2. Replace the homepage hero/cards with research brief, signal table, domain matrix and staged learning path.
3. Replace the frontier card grid with a filterable intelligence timeline and score matrix.
4. Replace equal-weight track cards with a four-stage curriculum and explicit prerequisites/outcomes.
5. Replace list-only lessons with a sticky table of contents, objectives, mechanisms, pseudocode, decision table and lab.
6. Rewrite the method page around source strength, claim confidence and scoring definitions.
7. Implement responsive, accessible CSS and keyboard-visible focus.
8. Run tests and Astro check; confirm GREEN.
9. Commit the interface redesign.

### Task 4: Validate, review and publish

**Files:**
- Modify: `README.md`
- Modify: `ops/MAINTENANCE.md`
- Create: `ops/logs/2026-07-27-<time>-redesign.md`
- Generated: `ops/site-review.json`

**Steps:**
1. Update project and maintenance documentation for the richer schema.
2. Run `npm test`, `npm run review:site`, `npm run check`, `npm run build`, `npm run verify:build`, `npm audit --audit-level=high`, and `git diff --check`.
3. Inspect generated HTML for all primary routes and every lesson.
4. Merge the redesign branch into `main`, push, and watch GitHub Actions.
5. Verify production routes return HTTP 200 and key content markers.
6. Record the final commit, Actions run and next content direction.

