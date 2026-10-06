# Current State — Canva Google Search Console Connector

Updated: 2026-10-06

> Before continuation, read `THREAD_INBOX.md`.

## Canonical stage

**P2 — Build**

- **Stage status:** ACTIVE
- **Current gate:** deterministic P2 validation is green (typecheck, 8/8 Jest suites / 44/44 tests, build, preview startup). Only the authenticated Canva Sheets smoke remains: hardened UI render, Update data on an existing source, normal import, and one native refresh.
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

**Owner action now is only to complete Canva login in the already-open Codex browser tab (plus any 2FA/consent prompt). Then hand control back to Codex to finish the four-step authenticated smoke. Do not rerun terminal validation unless source changes.**

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
- `docs/tasks/002-production-mvp.md` — ACTIVE / AUTHENTICATED SMOKE PENDING

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

1. Execute Task 002 as one coherent implementation checkpoint.
2. Re-run deterministic tests and `docs/SCENARIO_CONTRACTS.md`.
3. Capture representative LIVE/non-zero/SCALE evidence when a suitable property is available.
4. Move to **P3 — Prepare Review** only after objective/product-quality checks pass.
5. One prepared owner product pass.
6. P5 Canva publication/commercial batching.
