# Current State — Canva Google Search Console Connector

Updated: 2026-10-06

> Before continuation, read `THREAD_INBOX.md`.

## Canonical stage

**P1 — Prove**

- **Stage status:** ACTIVE
- **Current gate:** prove the smallest real Canva Data Connector ↔ Google Search Console path that can still reshape or kill the product.
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

**None yet by default.**

If P1 reaches the LIVE seam without usable OAuth setup, batch one owner action covering:
1. Google Cloud project / Search Console API enablement if not already available;
2. OAuth client configuration needed by Canva Developer Portal;
3. one Google account with access to a non-sensitive Search Console property suitable for proof.

Do not request credentials before the harness and exact redirect/config values are ready.

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
- `docs/evidence/`

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
