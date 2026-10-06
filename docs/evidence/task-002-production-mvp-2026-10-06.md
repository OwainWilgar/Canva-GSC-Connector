# Task 002 evidence — production-shaped MVP

Date: 2026-10-06  
Stage: **P2 — Build**  
Status: **IMPLEMENTED — executable validation pending**

## Outcome targeted

Turn the P1-proven Canva ↔ Google Search Console mechanics into the smallest production-shaped connector without broadening into an SEO suite.

## Implemented

### Connector core
- retained direct Canva-managed OAuth → Google Search Console architecture;
- sanitized decoded data-source references so unknown fields cannot propagate;
- mapped stale auth/property references to Canva `outdated_source_ref`;
- mapped quota/transient/network failures to Canva `remote_request_failed`;
- retained actionable `app_error` only for application/selection failures;
- corrected Canva row-limit handling: headers are column config, not a data row;
- enforce the five-column report requirement;
- cap product output at 1,000 rows, further constrained by Canva's surface limit;
- added provider/empty-result metadata.

### Property discovery
- normalize property identifiers;
- drop blank/duplicate entries;
- sort domain properties before URL-prefix properties for stable selection.

### Data correctness
- preserve full query/page identity;
- preserve Google metric values;
- reject missing/non-finite metrics rather than fabricating zeros;
- reject invalid Trend dates rather than emitting invalid date cells;
- preserve zero-row results as valid completed tables.

### Selection/recovery UX
- clear read-only explanation;
- explicit top-row / non-exhaustive wording;
- marketer-facing dataset descriptions;
- rolling-date explanation that states refresh advances the window;
- Import vs Update action based on saved-source context;
- loading state during data-reference validation;
- explicit Switch Google account action;
- stable fallback when a saved property is no longer present;
- recovery notice for outdated/app-error invocation contexts;
- size-limit copy before import;
- data-source titles capped to Canva's current 255-character limit.

### Documentation
- added `docs/USER_GUIDE.md`;
- promoted requirements/architecture from proof/provisional to MVP/post-P1 truth;
- mapped S1–S7 scenario contracts to deterministic implementation coverage.

## Deterministic coverage added

Tests now cover:
- sanitized/versioned non-secret data refs;
- invalid ref values;
- rolling Pacific date windows and refresh advancement;
- dataset → dimension mapping;
- 25k Google request cap;
- Canva output row/column constraints;
- 1,000-row product boundary;
- Top Queries, Top Pages and Trend table shaping;
- empty tables;
- full page identity;
- invalid/missing row rejection;
- property normalization/sorting;
- product labels/descriptions/title length;
- Google HTTP error classification;
- Canva connector error-status mapping.

## Repository hygiene

Targeted code search found no committed:
- client secrets;
- refresh/access tokens;
- Bearer authorization values;
- Google API keys;
- private-key blocks.

The public Search Console verification meta tag on the temporary GitHub Pages proof site is not a credential.

## P1 LIVE truth inherited

Already LIVE-PASS:
- Google OAuth;
- Search Console property discovery;
- Top Queries / Top Pages / Trend request/import paths;
- saved-reference native Canva refresh;
- no bespoke backend requirement.

## Validation still required before P2 exit

Executable environment must run from latest `main`:
- `npm install`;
- `npm run lint:types`;
- `npm test`;
- `npm run build`.

Then one technical Canva smoke pass should confirm:
- selection UI renders with current App UI Kit;
- editing an existing source shows **Update data**;
- a normal import still completes;
- native refresh remains green.

This is validation, not owner product review.

## Known release debt, not P2 architecture blockers

- non-zero mature Search Console data is still needed before release to inspect real report usefulness;
- representative real larger-result latency/output behavior is still needed;
- public Google OAuth verification requirements remain a P5 gate;
- direct competitor whitespace must be rechecked before P3/P5;
- npm dependency audit warnings need deliberate review; do not use `npm audit fix --force` blindly.

## Current P2 decision

> **Implementation complete enough for executable validation. Do not move to P3 until typecheck/tests/build and the narrow Canva smoke pass are green.**


## Owner-local validation update — deterministic suite

Observed on latest P2 validation attempt:
- 7/8 Jest suites passed;
- 43/44 tests passed;
- only failure was `tests/limits.test.ts`;
- production behavior was correct: a 4-column Canva surface raised `This Canva surface allows 4 columns, but this report needs 5.`;
- the stale test expected the obsolete phrase `five-column`.

Classification:
- **test assertion defect, not product-code defect**.

Fix:
- changed the assertion to match the actual user-facing contract: `needs 5`.

Next:
- pull latest main;
- rerun `npm test`;
- then continue `npm run build` and the narrow Canva smoke if green.
