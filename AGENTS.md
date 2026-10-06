# AGENTS.md — Canva Google Search Console Connector

This repository is the authoritative product and execution state for the Canva GSC Data Connector.

## Cross-thread relay

Before substantive continuation, read `THREAD_INBOX.md` and process any **UNREAD** item first.

On the next repository write, mark consumed messages **ACKNOWLEDGED** with a short effect note, or **NOT APPLICABLE** with a reason.

## Read first

1. `THREAD_INBOX.md`
2. `CURRENT_STATE.md`
3. active task under `docs/tasks/`
4. `REQUIREMENTS.md`
5. `ARCHITECTURE.md`
6. `docs/SCENARIO_CONTRACTS.md` when product completeness/review matters
7. `docs/launch/RELEASE_PACKET.md` only when release/commercial work matters

Do not replay broad ecosystem research during ordinary implementation.

## Shared factory context

Primary cross-platform layer:
- `OwainWilgar/owain-shared`

Useful mature process precedents:
- `OwainWilgar/Wix-Shared/docs/CANONICAL_PROJECT_STEPS.md`
- `OwainWilgar/Wix-Shared/docs/LONG_RUNNING_THREAD_BOOTSTRAP.md`
- `OwainWilgar/Wix-Shared/docs/HUMAN_UI_GATE.md`
- `OwainWilgar/Wix-Shared/docs/RELEASE_CONVERGENCE_PACKET.md`

Use Wix Shared for **process**, not Wix platform mechanics.

The closest current sibling is:
- `OwainWilgar/Coda-Paddle-Billing-v2`

Reuse its stage/state/evidence/thread/release discipline, not its Coda/Paddle implementation assumptions.

## Current factory edge

Canonical stage: **P2 — Build**.

Active task:
- `docs/tasks/002-production-mvp.md`

P1 passed on 2026-10-06. The direct no-backend Canva ↔ Google Search Console path is proven, including native saved-reference refresh. P2 now owns production-shaped UX, deterministic completeness and bounded scale/release preparation without broadening scope.

## Product contract

> Google Search Console performance data, shaped for reporting, linked directly into Canva and refreshable later.

Required proof/MVP datasets:
- Top Queries
- Top Pages
- Trend

Required measures:
- clicks
- impressions
- CTR
- average position

Required controls:
- property
- date range
- dataset
- search type where useful

Potential cheap follow-ons:
- Country
- Device
- query/page filters

No launch dependency on:
- charts;
- SEO recommendations;
- AI analysis;
- templates;
- warehouse-scale export;
- custom backend.

## Core invariants

- Google Search Console remains authoritative.
- Use `webmasters.readonly`; do not request write scope for a read connector.
- Prefer Canva-managed OAuth/token refresh.
- Do not commit OAuth client secrets, tokens, authorization headers or private account data.
- Treat Search Analytics as a **top-rows reporting API**, not an exhaustive export.
- Dataset names/copy must communicate that limitation honestly.
- Refresh must reconstruct the same user-selected dataset from a durable data reference.
- Errors must distinguish authentication, property access, quota/rate limit and unsupported/invalid query shape.
- Do not add a backend unless evidence forces one.
- Do not add charts, recommendations or AI SEO analysis merely because the data enables them.
- Keep the product small enough that absorption by Canva/Google is an acceptable loss.

## Evidence labels

Keep distinct:
- **DOC** — current Canva/Google documentation.
- **LOCAL** — deterministic fixture/unit/harness evidence.
- **LIVE** — observed Canva ↔ Google behavior with an authorized account.
- **SCALE** — measured behavior on deliberately larger datasets/query windows.
- **RELEASED** — published/installed Marketplace behavior.

Never promote one evidence class into another.

## Product review standard

Before owner review, close objective correctness and obvious UX problems first.

Pressure-test:
> **New user: explain itself. Normal user: guide the decision. Fast user: stay out of the way.**

For this connector:
- use marketer nouns, not API nouns;
- make property/date/dataset selection obvious;
- show what “Top” means;
- make refresh behavior unsurprising;
- keep technical quota/auth detail behind recovery states;
- make empty/low-volume properties understandable;
- do not expose every Search Analytics dimension just because it exists.

Owner review is for usefulness, report shape, terminology, trust and commercial judgment—not OAuth debugging.

## Long-running project threads

If a conversation becomes the persistent implementation/orchestration thread, initialize it using `docs/LONG_RUNNING_THREAD.md`.

For every owner turn in such a thread, persist the visible prompt and all visible assistant updates/final response to the project transcript **before** sending the final response.

Do not store hidden reasoning, raw tool traces or secrets.

## Prepared execution

For substantial local/Codex work, prepare one bounded packet with:
- checkpoint;
- current truth;
- starting files;
- invariants;
- acceptance;
- validation commands;
- non-goals;
- autonomy through obvious fixes/reruns;
- genuine stop rules.

Do not fragment a coherent proof/build into tiny owner-mediated steps.

## GitHub Actions budget

Portfolio constraint as of 2026-10-06:
- 0 Actions minutes remain until 2026-10-10.

Until reset:
- do not dispatch, rerun or depend on Actions;
- use local tests/typechecks/builds and direct LIVE evidence;
- continue normal commits/pushes.

After reset, local validation remains default and Actions remains scarce shared capacity.

## Owner-attention rule

Protect owner attention for:
- unavoidable Google Cloud / Canva Developer Portal authorization setup;
- a LIVE account proof that connected tooling cannot perform;
- product/UX judgment;
- consequential Marketplace/release/account actions.

Do not use the owner for routine test runs, fixture work, query debugging or context reconstruction.

Batch unavoidable account work after the proof harness is ready.

## Durable-state rule

When evidence changes a material assumption:
- update `CURRENT_STATE.md`;
- update requirements/architecture/task packet when their truth changed;
- add a compact evidence artifact;
- correct stale instructions rather than preserving contradictions.

## Stop rules

Continue autonomously through cheap obvious fixes.

Stop only for:
- missing authorization/credential that available tools cannot obtain;
- a consequential irreversible action;
- a real product/business decision;
- a materially new architecture not implied by current requirements;
- the same blocker after two materially different attempts without new evidence.
