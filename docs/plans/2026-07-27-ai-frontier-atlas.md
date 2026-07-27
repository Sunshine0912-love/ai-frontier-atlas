# AI Frontier Atlas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and deploy an independent AI frontier tracker and systematic learning website with review-first twice-daily maintenance.

**Architecture:** Astro static site backed by curated JSON content. Reusable components render frontier signals and learning tracks; a Node review script audits freshness and coverage before maintenance; GitHub Actions deploys the independent repository to Pages.

**Tech Stack:** Astro, TypeScript, CSS, Node.js built-in test runner, GitHub Pages, OpenClaw cron.

---

### Task 1: Data contracts and failing tests

- Create Node tests for unique slugs, evidence-backed frontier sources, complete lesson pedagogy fields, required routes and site review output.
- Run tests and observe failures because production files do not exist.

### Task 2: Content model and review-first operations

- Create frontier, tracks and lessons JSON with initial verified content.
- Implement `scripts/review-site.mjs` and generate `ops/site-review.json`.
- Make unit tests pass.

### Task 3: Visual site and routes

- Build shared layout, navigation, footer, cards and global styles.
- Build home, frontier, learning index, lesson detail and methodology routes.
- Verify responsive semantics and internal links.

### Task 4: Deployment and maintenance

- Add GitHub Pages workflow and operations runbook.
- Create independent GitHub repository and push `main`.
- Retarget the disabled 09:00/21:00 cron to the new repo and enable it.

### Task 5: Verification

- Run tests, review, Astro check/build and generated-route assertions.
- Verify GitHub Actions and every production route over HTTP.
