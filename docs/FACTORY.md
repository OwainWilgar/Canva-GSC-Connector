# Factory contract — Canva GSC Connector

This repo adapts the mature factory process to a non-Wix Canva app.

## Canonical stages

Use the seven-stage human-readable lifecycle from Wix Shared as a cross-platform process:

- **P0 Define** — job, user, fallback, product boundary, scenarios.
- **P1 Prove** — smallest product-killing/platform-defining assumption.
- **P2 Build** — one coherent intended product slice.
- **P3 Prepare Review** — objective validation, completeness, Human UI.
- **P4 Review & Refine** — owner judges usefulness/workflow/taste; coherent correction pass.
- **P5 Release** — publication/commercial/account work batched; released truth verified.
- **P6 Operate** — production/support/commercial evidence feeds back.

Current stage lives in `CURRENT_STATE.md`.

## Core lifecycle rule

> project reaches stage → relevant accumulated lessons appear → agent owns that stage to its exit criteria → owner enters only at the deliberately human boundary

Do not introduce a second machine-readable sub-stage taxonomy.

## Bet tracking

At meaningful evidence gates update:
- STRENGTHEN
- WEAKEN
- NARROW
- PIVOT
- CHEAP-GAMBLE
- KILL

This product starts as **CHEAP-GAMBLE / PROOF** because absorption risk is high and implementation should be cheap.

## Decision-grade proof

P1 must test the hinge that can actually reshape the product:
- Canva-managed Google OAuth;
- Data Connector selection + refresh;
- property access;
- useful report-ready GSC data;
- output/size/error constraints;
- no unexpected backend requirement.

Do not spend the proof on polishing or generic research.

## Dual-lane validation

Keep:
- **LIVE lane** for Canva/Google integration truth;
- **deterministic fixture lane** for scenario breadth, query/data-shaping and UI states.

Do not force every UX/product scenario through repeated live API manipulation.

## Human UI gate before owner review

Adapt the mature rule:
> New user: explain itself. Normal user: guide the decision. Fast user: stay out of the way.

Before P4:
- marketer nouns/verbs;
- concise copy;
- obvious property/dataset/date controls;
- local error/result feedback;
- progressive disclosure for technical detail;
- empty/loading/error states;
- sensible defaults;
- responsive/focus/accessibility pass;
- no raw IDs/token/API jargon in the normal path.

Fix obvious defects before asking the owner.

## Evidence discipline

- DOC
- LOCAL
- LIVE
- SCALE
- RELEASED

Record only decision-relevant proof in `docs/evidence/`.

## Owner attention

Hand back only for a genuine seam:
- **LOCAL_AUTH / ACCOUNT_UI** equivalent for Google/Canva credentials/configuration;
- **NATIVE_UI_PROOF** where real Canva interaction itself is the evidence;
- **CONSEQUENTIAL** publication/payment/legal/release action;
- real product/business judgment.

Batch known owner actions.

## Long-running thread logging

Persistent implementation/orchestration threads use `docs/LONG_RUNNING_THREAD.md`.

Visible conversation belongs in the repo transcript; current truth belongs in current state/tasks/requirements/code.

## Release convergence

Prepare P5 facts before the owner release session:
- exact source/build identity;
- OAuth scopes/config;
- permissions;
- privacy/support/legal facts;
- monetization lane;
- listing copy/category;
- screenshots/reviewer path;
- final publish action.

Do not discover these sequentially with the owner watching.

## Reuse extraction

After a stable connector exists, extract reusable patterns only if they are genuinely stable:
- Canva Data Connector auth shell;
- selection/ref/refresh skeleton;
- external API error mapping;
- report-dataset normalization.

Do not prematurely create a generic connector framework during this proof.
