# Task 002 — Production-shaped Canva GSC MVP

Canonical stage: **P2 — Build**  
Status: **ACTIVE — implementation complete, validation pending**

## Outcome

Build the coherent smallest public-quality product:

> **Refreshable Google Search Console reporting data in Canva.**

Do not broaden into an SEO suite.

## Current truth to inherit

- P1 **PASSED** on 2026-10-06.
- GSC remains authoritative.
- Canva owns charts/design/report composition.
- OAuth is Canva-managed.
- Direct Canva → Google Search Console API calls work.
- Saved non-secret data refs refresh correctly through Canva.
- No bespoke backend is required for the core path.
- Top rows are intentional product semantics.
- Required datasets are Top Queries, Top Pages and Trend.
- LIVE non-zero rows and representative larger-result behavior remain pre-release validation debt, not P2 architecture blockers.
- P1 evidence overrides assumptions in this packet.

## Implement

### Connector core
- current Data Connector intent registration;
- Google OAuth connection/recovery;
- Search Console property listing;
- stable query builder;
- error taxonomy;
- versioned non-secret data reference;
- refresh path.

### Selection UI
Required:
- property;
- dataset;
- date range;
- clear import/preview/update flow.

Only add:
- search type;
- Country;
- Device;
- query/page filter

when P1/user-shape evidence shows clear value without clutter.

### Dataset output
Top Queries, Top Pages, Trend with:
- clear dimension label;
- clicks;
- impressions;
- CTR;
- average position.

Use product-oriented column names/order.

### States
Cover:
- loading;
- disconnected;
- connected/no property;
- empty/no data;
- normal data;
- revoked auth;
- property forbidden;
- quota/transient error;
- invalid query;
- large-result/output-limit behavior.

### Documentation
- read-only Google permission explanation;
- what refresh does;
- “Top” / non-exhaustive data note;
- support/reconnect path.

## Hard invariants

- no secrets in repo/tests/logs;
- no write Search Console scope;
- no backend unless P1 evidence requires it;
- no false exhaustive-export claim;
- no charts/recommendations/AI scope creep;
- no owner review until P3 objective/product-quality checks are complete.

## Deterministic acceptance

- type/build pass locally;
- dataset/query/date-ref tests pass;
- saved data-ref refresh tests pass;
- all required dataset fixtures pass;
- zero-row and error mapping pass;
- no credential material in fixtures;
- visible copy avoids raw API/implementation jargon.

## LIVE acceptance before P3 exit

At least one representative connection:
- authorize Google;
- select property;
- import each required dataset;
- refresh one rolling-period dataset;
- recover from at least one auth/access failure path where practical.

## Product completeness pass

Re-run `docs/SCENARIO_CONTRACTS.md`.

Ask:
- can a cold user understand why/what they are connecting?
- is property/date/dataset selection obvious?
- is “Top” semantics honest but not scary?
- are rolling vs fixed dates unsurprising?
- does refresh do what the report owner expects?
- do errors say what to do next?
- is the result shaped for Canva reporting rather than API completeness?

Fix obvious gaps before owner review.

## Human UI gate

Before P4:
- App UI Kit baseline;
- concise marketer language;
- one obvious primary action;
- progressive disclosure;
- local feedback;
- empty/error states;
- keyboard/focus/accessibility basics;
- narrow/responsive pass where applicable.

## Non-goals

- custom analytics dashboard;
- SEO strategy;
- AI summaries;
- templates;
- warehouse sync;
- arbitrary query builder;
- generic “Google connector framework.”

## Execution mode

Prefer one prepared local/Codex implementation/test loop.

Executor should continue through ordinary compile/test failures and obvious fixes rather than returning after each one.

## Validation gate

Run from the latest `main` on the already configured owner machine:

```bash
git pull
npm install
npm run lint:types
npm test
npm run build
```

If those pass, run the narrow Canva smoke:
1. start preview;
2. open the connector in Canva Sheets;
3. confirm the hardened selection UI renders;
4. edit an existing connected source and confirm **Update data** appears;
5. import one normal dataset;
6. refresh that connected source once.

This is technical validation only. Do not turn it into owner product review.

## Handoff

Current evidence:
- `docs/evidence/task-002-production-mvp-2026-10-06.md`

After the validation gate is green:
- mark this task complete;
- update `CURRENT_STATE.md` to **P3 — Prepare Review**;
- prepare the exact owner review surface;
- do not ask the owner to debug OAuth/query mechanics.
