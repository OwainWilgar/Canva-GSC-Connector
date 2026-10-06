# Task 001 — Canva ↔ Google Search Console proof

Canonical stage: **P1 — Prove**  
Status: **ACTIVE**

## Decision

Prove that a direct, refreshable Canva Data Connector can authenticate to Google Search Console and return the three report-ready datasets without bespoke infrastructure.

This task does not build the polished app.

## Proof budget

Maximum default budget:

> **one focused implementation day before the gate is explicitly reviewed**

If the same blocker survives two materially different approaches, record it and review architecture/scope rather than wandering.

## First implementation step

**Completed to the LOCAL boundary.**

The repository now carries a minimal GSC implementation shaped against the current official Canva Data Connector template and its current package/API contracts.

Do **not** create a second scaffold/repository now. For the real Canva app:

```bash
canva login
canva apps link
npm install
canva apps doctor
canva apps config status
canva apps config push
```

Use `docs/OWNER_LIVE_PROOF.md` for the exact owner-authenticated sequence.

The current Canva template remains the source of truth for SDK/tooling compatibility.

## Required proof

1. Register Data Connector intent.
2. Configure Google OAuth through Canva.
3. Request only `webmasters.readonly`.
4. List/select an accessible Search Console property.
5. Import **Top Queries**.
6. Import **Top Pages**.
7. Import **Trend**.
8. Save enough data-reference state for Canva refresh to reproduce the selection.
9. Refresh at least one imported dataset.
10. Classify auth/property/quota/invalid-query/empty-data behavior.
11. Confirm whether any backend is actually required.

## Required dataset shape

For each required dataset:
- clicks;
- impressions;
- CTR;
- average position.

Dimensions:
- Top Queries → query
- Top Pages → page
- Trend → date

## Proof row limit

Do not use 25,000 as the initial UI default.

Start with a small report-friendly limit for query/page proof and test a larger request separately only to understand scale/output behavior.

## Product-killing / architecture-defining assumptions

1. Canva OAuth can support Google's authorization flow cleanly.
2. Canva can retrieve/use the current access token for Search Console calls.
3. Data Connector data refs can encode selection state without secrets.
4. Refresh reproduces the intended rolling/fixed period semantics.
5. The three datasets fit Canva's DataTable contract cleanly.
6. Errors can be made user-actionable without a proxy service.
7. Direct connector distribution remains meaningfully open at the time broad build starts.

## DOC evidence

Start from:
- `docs/evidence/seed-doc-evidence-2026-10-06.md`

Only add docs that resolve an actual proof question.

## LOCAL evidence

Build the smallest deterministic tests for:
- dataset → dimensions mapping;
- query construction;
- date-range resolution;
- data-reference round trip;
- row normalization;
- zero-row behavior;
- representative Google error mapping.

## LIVE evidence

Prove in Canva with an authorized Google account:
- auth;
- property selection;
- each required dataset;
- refresh;
- one recovery/failure path where practical.

## SCALE evidence

Enough only to choose product defaults:
- row count;
- request count;
- rough latency;
- Canva output/preview behavior for a larger query/page result.

No generic performance project.

## Acceptance — PASS

P1 passes when:
- Google auth works through the intended Canva mechanism;
- property selection works;
- Top Queries, Top Pages and Trend import correctly;
- at least one dataset refreshes from saved selection state;
- failure states are understood enough to implement;
- no core requirement forces a bespoke backend;
- evidence is written under `docs/evidence/`;
- a fresh direct-competitor check still supports broad build.

Then:
1. update `CURRENT_STATE.md` to **P2 — Build**;
2. mark this task complete;
3. activate Task 002.

## NARROW

Narrow if:
- Country/Device or advanced filters complicate UX;
- only a smaller row limit is sensible;
- one property/search type needs explicit exclusion;
- relative vs fixed date refresh must be simplified.

## KILL / major reposition

Escalate if:
- Google OAuth cannot be made clean enough through Canva;
- refresh cannot reconstruct selection reliably;
- Data Connector output constraints make the core reporting datasets weak;
- required backend/support burden breaks the cheap-experiment thesis;
- a direct current GSC connector/first-party feature closes the distribution gap before P2.

## Non-goals

- polished Marketplace UI;
- charts;
- recommendations;
- AI;
- templates;
- monetization;
- backend;
- all dimensions/filters;
- exhaustive data export.

## Owner gate

**READY.** The harness/scaffold is prepared and connected tooling cannot perform the owner's Canva CLI/browser OAuth seam.

Use exactly:
- `docs/OWNER_LIVE_PROOF.md`

It batches Canva app creation/linking, Google Cloud OAuth configuration, Canva OAuth configuration and the LIVE proof into one session.

Never ask for secrets in chat or commit them.

## Handoff

Create:
`docs/evidence/task-001-canva-gsc-live-proof-YYYY-MM-DD.md`

State:
- passed;
- failed;
- open;
- measurements;
- accepted scope changes;
- rejected/deferred scope;
- exact P1 decision and next stage.
