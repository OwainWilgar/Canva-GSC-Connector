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


## Diagnostic transport change — visible connector trace

The next attempted console capture was blocked by the Codex browser surface:
- authenticated Canva page interaction remained available;
- DevTools/console contents were not available through that browser-control session;
- the exact loaded bundle could not be independently confirmed against pulled source.

The requested typecheck also exposed a temporary instrumentation-only scope error around `startedAt`; this has now been fixed on `main`.

Decision:
- stop depending on browser console access;
- surface the safe diagnostic lifecycle lines directly in the connector UI after an import failure;
- keep the trace temporary and remove it after the regression is diagnosed.

The visible trace is backed by a shared in-memory diagnostic channel used by both selection UI and `getDataTable`. Because the UI remains subscribed after `updateDataRef` throws, later lifecycle events can appear in the panel as they arrive.

The trace contains only:
- timestamps;
- event names;
- source/title lengths;
- Canva row/column limits;
- dataset kind;
- elapsed milliseconds;
- abort state;
- DataTable row/column counts;
- mapped response status;
- non-sensitive error name/code/message.

It never includes:
- OAuth tokens;
- property identifiers;
- source JSON contents;
- query/page values;
- authorization headers.

Next diagnostic:
- pull latest main;
- typecheck/tests;
- restart preview from the pulled source, preferring the installed global Canva CLI over network-dependent `npx`;
- make exactly one Top Queries import attempt;
- copy all lines visible under **P2 diagnostic trace (temporary)**;
- stop before any further behavioral fix.


## Preview transport blocker — 2026-10-07

Latest Codex run:
- pulled latest source;
- typecheck passed;
- Jest passed with 9 suites / 46 tests;
- global Canva CLI started the pulled source;
- Canva Editor could not load the app bundle from `http://localhost:8080/`;
- HTTPS was tried, but Canva continued requesting the HTTP Development URL;
- no Top Queries import was attempted, so the one-attempt diagnostic budget remains unused.

Current Canva documentation confirms:
- `canva apps start` serves the local app at `http://localhost:8080` by default;
- the Developer Portal's Development URL must point to the running local development server;
- Chrome/Chromium requires explicit local-network access permission for Canva to reach localhost;
- HTTPS is optional and requires both starting the server with HTTPS and configuring the Development URL to the matching HTTPS URL, plus bypassing the self-signed certificate warning.

Interpretation:
- this run did not exercise connector behavior;
- treat it as local preview transport/configuration, not an import regression result;
- do not consume the remaining import attempt until the pulled source is visibly loaded in Canva.

Next preflight:
1. start global `canva apps start`;
2. navigate directly to `http://localhost:8080` and verify minified JavaScript is returned;
3. verify Developer Portal Development URL is exactly `http://localhost:8080`;
4. grant Canva local-network access in Chrome/Chromium;
5. open preview and confirm latest connector UI;
6. only then run the single diagnostic import attempt.


## Preview transport refinement — explicit listener/port check

Latest run:
- global Canva CLI reported successful build/start at `http://localhost:8080`;
- a direct request to that URL timed out after 10 seconds;
- stop rule was respected before Developer Portal/browser/import work;
- diagnostic import budget remains unused.

Important inherited evidence:
- an earlier successful local-preview run found ports 8080 and 8081 already occupied by Node processes;
- that run used port 8090 successfully.

Current interpretation:
- do not assume Canva/Chrome is at fault until the local listener is proven;
- likely boundaries include a stale process owning 8080, a CLI process that built but did not stay/listen, localhost host-resolution/proxy behavior, or sandbox/process-network separation.

Next Phase A:
1. inspect listeners and owning process command lines for 8080/8081/8090;
2. terminate only stale Canva/Node preview processes tied to this repository;
3. start `canva apps start --override-frontend-port 8090`;
4. verify `127.0.0.1:8090` and `localhost:8090` using `curl.exe --noproxy "*"`;
5. only after direct bundle reachability succeeds, align Developer Portal Development URL and reopen Canva;
6. do not consume the remaining import attempt until the current bundle is visibly loaded.


## Preview runtime diagnosis — no listener exists

Latest transport-only run:
- pulled main to `25ec009`;
- confirmed no listeners on 8080, 8081 or 8090 before start;
- started `canva apps start --override-frontend-port 8090`;
- CLI reported `ready` at `http://localhost:8090`;
- Windows still showed no listener on 8080, 8081 or 8090;
- proxy-bypassed direct requests to both `127.0.0.1:8090` and `localhost:8090` failed with connection refused (curl exit 7);
- preview process was stopped;
- Canva was not opened and no import attempt was made;
- the one-attempt import diagnostic budget remains unused;
- pre-existing tracked edits were preserved in stash `preserve P2 evidence during listener cleanup`;
- untracked `package-lock.json` remained untouched.

Interpretation:
- stale port ownership is ruled out for this run;
- Developer Portal URL, browser local-network permission and connector code are not yet relevant because no local HTTP listener exists;
- the remaining boundary is the local Canva CLI/runtime process or its execution isolation.

Next observation should be a single consolidated runtime diagnosis: exact CLI/Node versions and binary path, foreground process lifetime, child process tree, listener state while `ready`, stdout/stderr, and same-boundary versus host-boundary reachability. Do not re-enter Canva until a host-visible listener is proven.


## Preview runtime resolved — approved boundary

The consolidated runtime diagnosis resolved the apparent no-listener contradiction.

Environment:
- main at `d57d4aa`;
- Node `v24.18.0`;
- Canva CLI `2.13.2`;
- global package `@canva/cli@2.13.2`;
- `canva` command resolves to the user's global npm PowerShell shim.

Observed in the approved/host execution boundary:
- `canva apps start --override-frontend-port 8090` remains running;
- port 8090 is listening on IPv6 loopback `::1`, owned directly by the Canva CLI Node process;
- no child process is required;
- `http://localhost:8090` returns the current JavaScript bundle successfully;
- `http://127.0.0.1:8090` is refused because the listener is IPv6-loopback-only;
- port 8080 is separately owned by an existing `canva apps start --preview` process;
- the Codex sandbox cannot see or reach the host listener, while the approved boundary can.

Owner confirmation:
- Canva was opened from the working host preview and the app loaded successfully.

Classification:
- **preview transport RESOLVED**;
- earlier no-listener results were caused by execution-boundary visibility plus the IPv6-only loopback bind, not Canva connector code or a failed CLI server;
- use `localhost`, not `127.0.0.1`, for this preview;
- do not repeat port/runtime diagnosis unless the preview stops loading.

The in-flight import diagnostic attempt remains unused. Next action is exactly one Top Queries import against the now-confirmed current bundle, with the temporary visible diagnostic panel captured only if the import fails.
