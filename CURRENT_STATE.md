# Current State — Canva Google Search Console Connector

Updated: 2026-10-06

> Before continuation, read `THREAD_INBOX.md`.

## Canonical stage

**P1 — Prove**

- **Stage status:** ACTIVE
- **Current gate:** LIVE Google OAuth passes. Google's own Sites:list API Explorer returns HTTP 200 with an empty object for the current proof account, so property discovery is blocked by Google-account/property access rather than Canva code. Fix the proof account's Search Console access, then resume Search Analytics POST / refresh proof.
- **Exit condition:** Canva-managed Google OAuth works; properties can be selected; Top Queries, Top Pages and Trend can each be returned as refreshable Data Connector data; permission/error/size behavior is understood; no bespoke backend is required for the core path.
- **Next expected stage:** P2 — Build

## Current bet

- **Wager:** **CHEAP-GAMBLE / PROOF**
- **Product value:** strong if contextual Canva distribution makes recurring reporting easier for agencies/marketing teams.
- **Fallback:** Search Console UI → export/copy to Sheets/CSV → import/connect into Canva → repeat on refresh.
- **Primary risk:** first-party/partner absorption, not implementation complexity.
- **Proof budget:** one focused day by default.
- **MVP budget if proof passes:** roughly 2–4 focused implementation days.
- **Next evidence most likely to change the bet:** live Canva Data Connector discovery/refresh behavior, Google OAuth setup friction, and whether the report-ready dataset UX feels materially easier than the fallback.

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

**The owner-authenticated LIVE session is in progress. OAuth passes; the current proof account has zero Search Console properties according to Google's own API Explorer.**

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
- `docs/tasks/001-canva-gsc-proof.md` — ACTIVE
- `docs/tasks/002-production-mvp.md` — PREPARED / blocked on P1 exit

Evidence:
- `docs/evidence/task-001-scaffold-local-2026-10-06.md` — LOCAL scaffold/query/ref proof
- `docs/evidence/`

Owner LIVE bridge:
- `docs/OWNER_LIVE_PROOF.md`

Release:
- `docs/launch/RELEASE_PACKET.md`

## Expected next sequence

1. Run Task 001 without broadening scope.
2. Record DOC/LOCAL/LIVE evidence and explicit P1 decision.
3. If the direct refreshable connector path passes, move immediately to **P2 — Build**.
4. Execute Task 002 as one coherent implementation checkpoint.
5. P3 objective/product-quality pass before owner review.
6. One prepared owner product pass.
7. P5 Canva publication/commercial batching.
