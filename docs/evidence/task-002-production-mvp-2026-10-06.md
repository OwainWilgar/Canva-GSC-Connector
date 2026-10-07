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

## Owner-machine validation run — 2026-10-06

### Checkout and dependencies

- Ran `git pull --ff-only origin main` on branch `main`.
- Pull fast-forwarded `d04467e` to `59d4aea` (`Record orchestration turn 0034` → current `origin/main`).
- `npm ls --depth=0` completed successfully with all declared dependencies present; `npm install` was skipped because dependency state was complete.
- `package-lock.json` was already untracked before this run and was left untouched.

### Deterministic validation

- `npm run lint:types` — **PASS** (`tsc --noEmit`, exit 0).
- `npm test` — first sandboxed attempt stopped before Jest discovery with `EPERM` resolving the sandbox temp directory. Retried with the approved execution boundary: **PASS**, 8/8 suites and 44/44 tests.
- `npm run build` — first sandboxed attempt could not resolve `@canva/cli` because registry DNS was unavailable in the sandbox. Retried with the approved execution boundary: **PASS**. Canva CLI 1.1.2 built `dist/app.js` (1.31 MB, under the 5 MB limit) and `dist/messages_en.json` (2 bytes, under the 1 MB limit). The CLI emitted its non-blocking publish warning that `BACKEND_HOST` is `localhost`.

### Preview and authenticated Canva smoke

- Started preview with `npx @canva/cli apps start --preview --override-frontend-port 8090` — **PASS**, ready at `http://localhost:8090`; Canva Editor preview URL was `https://www.canva.com/login/?redirect=%2Fdevelopers%2Fapp%2FAAHOGJuURaw%2Fpreview%3Fintent%3Ddata_connector%26surface%3Deditor`.
- Ports 8080 and 8081 were already occupied by existing Node processes, so the preview used 8090. Those processes were left untouched.
- Opened the Canva Editor preview URL in the Codex in-app browser. Canva displayed **“Log in or sign up in seconds”** with login options. Stopped before entering credentials or continuing through an account flow.
- Selection UI, **Update data**, normal import, and connected-source refresh are **NOT RUN**. They require the owner to complete Canva login (and any subsequent 2FA or Google/Canva consent prompt).

### Gate decision

**P2 validation gate: NOT GREEN — awaiting authenticated Canva smoke.** Typecheck, tests, build and preview startup passed, but the required authenticated UI/import/refresh checks have no evidence yet. `CURRENT_STATE.md` and task status remain unchanged; do not advance to P3 until the remaining smoke is completed and recorded.

## Owner-authenticated Canva smoke follow-up — 2026-10-06

The owner completed Canva login and returned to the running preview in an `Untitled design` (800 × 600 Canva editor). The Codex in-app browser showed the Google Search Console draft connector's selection UI with:

- a preselected Search Console property;
- **Top Queries** selected and its clicks/impressions/CTR/average-position description;
- **Last 28 days** and the rolling-window refresh explanation;
- the 100-row Canva import cap;
- **Import data** and **Switch Google account** actions;
- clear copy that query/page reports contain Google's top rows and are not exhaustive exports.

UI render: **PASS**.

The current design showed an empty sheet grid and the connector presented **Import data**, not an existing-source update flow. No existing connected source was available in this design to inspect, so **Update data was NOT VERIFIED**.

Attempted the requested normal Top Queries import using the selected property/date range. Canva completed the loading state and displayed this exact connector error:

> Could not save this Search Console selection in Canva. Try again.

Import: **FAIL**. This is the first product failure in the authenticated smoke. Stopped immediately as directed. **Update data** and **Refresh Data** were not attempted after the failure.

### Gate decision after authenticated attempt

**P2 validation gate: NOT GREEN — Canva import failed while saving the Search Console selection.** UI render passed; existing-source Update data was unavailable in the current empty design; import failed with the exact message above; refresh was not run. Keep Task 002 ACTIVE and canonical stage at P2. Do not advance to P3 until the import failure is diagnosed and a complete authenticated smoke passes.


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


## LIVE import regression diagnosis prepared

The authenticated smoke isolated a fresh-import failure at `RenderSelectionUiRequest.updateDataRef`.

Current Canva API documentation states that `updateDataRef` throws a `bad_request` when:
- the data source reference exceeds its source/title size limits; or
- the completed DataTable exceeds the supplied row/column limit or contains invalid data.

The current connector:
- serializes a small versioned data reference;
- caps titles to 255 characters;
- caps rows to Canva's supplied limit and the 1,000-row product limit;
- emits five columns only when the supplied surface allows at least five.

Because the UI previously replaced all thrown host errors with a generic message, the exact rejection reason was not observable.

Temporary diagnostic instrumentation has therefore been added. It logs only:
- data-source byte length;
- title length;
- dataset kind;
- Canva row/column limits;
- returned DataTable row/column counts;
- thrown Canva error name/code/message.

It does **not** log:
- Google access tokens;
- property identifiers;
- query/page row contents;
- authorization headers;
- data-source JSON contents.

Next diagnostic:
1. pull latest main in the existing Codex validation session;
2. run typecheck/tests because source changed;
3. let the running preview rebuild/restart if required;
4. reproduce one Top Queries import in the authenticated Canva session;
5. capture the two `[GSC connector]` console entries and exact visible error;
6. stop before further code changes so the next patch is evidence-driven.


## Owner-machine diagnostic reproduction — 2026-10-07

### Checkout and deterministic checks

- Pulled `origin/main` from `86aceed` to `4be40b6` (`Record orchestration turn 0039`). The intervening commits added the temporary `updateDataRef` and DataTable diagnostics.
- `npm run lint:types` — **PASS** (`tsc --noEmit`, no diagnostics).
- `npm test` — **PASS**, 8/8 suites and 44/44 tests.
- Did not rerun `npm run build`; source was changed only to add the requested diagnostics, and the already-running Canva preview session remained active. The preview session reported a successful rebuild of `intents\\data_connector\\index.tsx` and its companion module after the pull.

### One authenticated import attempt

- Confirmed no `[GSC connector]` entries were present before the attempt.
- In the signed-in Canva editor, opened the draft connector with **Top Queries**, **Last 28 days**, and the existing selected property; the UI displayed **Import data**.
- Clicked **Import data exactly once**. Canva completed loading and displayed:

> Could not save this Search Console selection in Canva. Try again.

- No retry or further import was made.

### Browser console capture

The in-app browser's console API returned the following two `updateDataRef` entries (timestamps are UTC; both report the same Canva Sentry browser script URL):

```text
2026-10-07T01:39:24.478Z DEBUG [GSC connector] updateDataRef request Object
https://static.canva.com/web/8eebcb6ebc79a02b.sentry_browser.js

2026-10-07T01:39:25.588Z ERROR [GSC connector] updateDataRef threw Object
https://static.canva.com/web/8eebcb6ebc79a02b.sentry_browser.js
```

The capture API exposed the console `message`, timestamp, level, and source URL, but rendered each logged object argument as the literal `Object`; it did not expose the object's property values. The source logs request fields `sourceBytes`, `titleLength`, `limit`, and `dataset`, and thrown-error fields `name`, `code`, and `message`.

The same single attempt also emitted one additional diagnostic entry:

```text
2026-10-07T01:39:28.910Z DEBUG [GSC connector] data table summary Object
https://static.canva.com/web/8eebcb6ebc79a02b.sentry_browser.js
```

Its object argument was likewise collapsed to `Object` by the capture API. No credential or row contents appeared in the captured messages.

### Stop condition

The exact user-visible error and all `[GSC connector]` messages returned by the browser API are recorded above. No speculative fix was made. The import remains **FAIL** and the P2 gate remains **NOT GREEN**; Task 002 stays ACTIVE and canonical stage stays P2.


## Diagnostic refinement — lifecycle ordering

The first safe trace produced a useful ordering signal:
- `updateDataRef request`: 01:39:24.478Z
- `updateDataRef threw`: 01:39:25.588Z
- `data table summary`: 01:39:28.910Z

This means the Canva host rejected `updateDataRef` before the connector logged its final completed DataTable summary.

The public Canva API reference documents source/title/data-table validity failures for `updateDataRef`, but does not document a one-second timeout. Do not infer a timeout from one sample.

The diagnostic instrumentation has been refined to emit primitive JSON strings so the Codex browser capture preserves field values. New checkpoints include:
- updateDataRef request / resolve / throw with elapsed time;
- getDataTable start;
- access-token readiness;
- Search Analytics completion;
- AbortSignal firing;
- final DataTable row/column/limit summary;
- getDataTable failure status/name/message.

All logs remain non-sensitive: no property identifiers, tokens, row values, authorization headers, or data-source contents are emitted.

Next stop:
- exactly one authenticated Top Queries import;
- capture every `[GSC connector]` line in timestamp order;
- no speculative fix until that trace is recorded.
