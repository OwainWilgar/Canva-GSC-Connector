# Current State — Canva Google Search Console Connector

Updated: 2026-10-06

> Before continuation, read `THREAD_INBOX.md`.

## Canonical stage

**P2 — Build**

- **Stage status:** ACTIVE
- **Current gate:** local preview transport is RESOLVED in the approved host boundary. Canva CLI 2.13.2 on Node 24.18.0 listens on IPv6 loopback (`::1`); `http://localhost:8090` serves the current bundle while `127.0.0.1:8090` does not, and the Codex sandbox cannot see the host listener. Canva now loads the app. Resume exactly one Top Queries import against the current bundle and capture the temporary visible P2 diagnostic trace if it fails.
- **Exit condition:** production-shaped connector passes deterministic checks and scenario contracts, required datasets/reconnect/empty/error states are coherent, representative LIVE checks remain green, and the repo is ready to enter P3 — Prepare Review.
- **Next expected stage:** P3 — Prepare Review

## Current bet

- **Wager:** **SHIP QUICKLY / MVP**
- **Product value:** strong if contextual Canva distribution makes recurring reporting easier for agencies/marketing teams.
- **Fallback:** Search Console UI → export/copy to Sheets/CSV → import/connect into Canva → repeat on refresh.
- **Primary risk:** first-party/partner absorption, not implementation complexity.
- **Proof budget:** one focused day by default.
- **MVP budget if proof passes:** roughly 2–4 focused implementation days.
- **Next evidence most likely to change the bet:** whether the production-shaped selection/reconnect/error UX feels obvious in Canva, whether representative larger results fit cleanly, and whether a fresh competitor check still leaves distribution whitespace.

## Accepted product boundary

Required:
- Google OAuth;
- Search Console property selection;
- Top Queries;
- Top Pages;
- Trend;
- date range;
- clicks / impressions / CTR / average position;
- source-linked refresh.

Cheap follow-ons only:
- Country;
- Device;
- query/page filters;
- search type selector if useful and clean.

Explicitly not launch-critical:
- charts;
- SEO recommendations;
- AI analysis;
- templating;
- automated narrative reports;
- exhaustive raw-data export;
- custom backend.

## Important data truth

Search Analytics can return up to 25,000 rows per query page, but Google does not guarantee exhaustive row coverage and documents that the API returns top rows.

Therefore:
- **Top Queries** and **Top Pages** are product names, not implementation details;
- do not describe them as complete exports;
- row limits should optimize Canva/report usefulness rather than chase false exhaustiveness.

## Authentication shape

Intended:
- Canva's OAuth capability configured against Google;
- `https://www.googleapis.com/auth/webmasters.readonly`;
- Canva stores/manages access and refresh tokens;
- app retrieves the current access token and calls Search Console.

No OAuth client secret or token may be committed to the repo.

## Monetization state

Do not couple P1/P2 to a monetization architecture.

Current Canva options include:
- Premium Apps Program usage-based compensation if accepted;
- external payment links for app-managed monetization.

Data Connector access is already limited to Business, Enterprise, Education and Nonprofit plans, which qualifies the audience.

Decide the commercial lane only after the product/distribution proof is credible.

## Current owner need

**Preview transport is resolved. Keep the approved-boundary preview on `http://localhost:8090` running and do not repeat runtime diagnostics. Hand the loaded Canva session back to Codex for exactly one Top Queries import attempt. If it fails, wait several seconds and copy every line under `P2 diagnostic trace (temporary)` plus the visible error, then stop. If it succeeds, record that the in-flight import regression is no longer reproducing and transition immediately to the planned batched Luna/Codex certification campaign rather than another one-check loop.**

Use `docs/OWNER_LIVE_PROOF.md` as the exact handoff. It batches:
1. create the public Canva app;
2. link this existing repository with `canva apps link`;
3. install/run current Canva tooling and push `canva-app.json`;
4. configure a development Google OAuth project + `webmasters.readonly`;
5. configure Canva-managed OAuth using Canva's generated redirect URL;
6. run auth/property/three-dataset/refresh proof.

Do not send OAuth client secrets/tokens back to the thread. Return only bounded results/errors named in the bridge.

## GitHub Actions constraint

As of 2026-10-06, the shared Actions allowance is exhausted until 2026-10-10. Validation must not depend on Actions before reset.

## Active documents

Authoritative:
- `README.md`
- `AGENTS.md`
- `CURRENT_STATE.md`
- `REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `docs/SCENARIO_CONTRACTS.md`

Execution:
- `docs/tasks/001-canva-gsc-proof.md` — COMPLETE / PASS
- `docs/tasks/002-production-mvp.md` — ACTIVE / LIVE IMPORT REGRESSION DIAGNOSIS

Evidence:
- `docs/evidence/task-001-canva-gsc-live-proof-2026-10-06.md` — final P1 LIVE decision memo
- `docs/evidence/task-001-scaffold-local-2026-10-06.md` — accumulated LOCAL/LIVE scaffold notes
- `docs/evidence/task-002-production-mvp-2026-10-06.md` — P2 implementation evidence / validation pending
- `docs/evidence/`

Owner LIVE bridge:
- `docs/OWNER_LIVE_PROOF.md`

Release:
- `docs/launch/RELEASE_PACKET.md`

## Expected next sequence

1. Finish the current single diagnostic reproduction through Luna/Codex local execution; this is the already-in-flight observation, not a new owner cycle.
2. Once the import defect is understood/fixed, run one batched P3 Luna certification campaign covering deterministic checks plus all currently available authenticated import/update/refresh/error scenarios.
3. Continue independent scenarios after failures when safe and return one defect batch rather than alternating one failure/one fix.
4. Send coherent defects to the Sol **web** implementation thread for one correction pass, then run focused Luna regression.
5. Defer representative non-zero/SCALE evidence until a suitable mature property exists unless it becomes decision-critical; do not manufacture data merely to complete certification.
6. Move to **P4 — Review & Refine** for one prepared owner product pass only after objective certification is clean/explicitly blocked.
7. P5 Canva publication/commercial batching.
