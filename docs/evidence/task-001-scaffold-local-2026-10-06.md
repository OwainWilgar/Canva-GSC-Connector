# Task 001 partial evidence — scaffold + local deterministic proof

Date: 2026-10-06  
Stage: **P1 — Prove**  
Status: **PARTIAL — LIVE gate not yet run**

## Claim tested

Can the intended Canva GSC product be represented as a current Data Connector implementation with a non-secret refresh reference and deterministic GSC query/data-shaping core, without introducing a backend before LIVE evidence requires one?

## DOC

Current Canva evidence used:
- Data Connector template remains the recommended scaffold.
- Data Connector is registered with `prepareDataConnector`.
- selection uses `updateDataRef`; refresh calls `getDataTable` again with the saved reference.
- Canva OAuth manages code exchange, access/refresh token storage and token refresh.
- current OAuth guidance explicitly supports `access_type=offline` and `prompt=select_account` for providers such as Google.
- existing local source can be linked to a Canva app with `canva apps link`.

Current Google evidence used:
- Search Console read-only scope is `webmasters.readonly`.
- Search Analytics dimensions include query/page/date and metrics include clicks/impressions/CTR/position.
- `rowLimit` supports up to 25,000 and `startRow` exists.
- date inputs are interpreted in Pacific Time.
- Google OAuth web-server endpoints are the standard accounts authorization endpoint, oauth2 token endpoint and oauth2 revocation endpoint.

## Implemented repository surface

Added:
- current-template-version package/config baseline;
- Canva Data Connector entrypoint;
- Canva-managed Google OAuth adapter;
- Search Console property listing;
- Search Analytics query client;
- Top Queries / Top Pages / Trend query mapping;
- rolling 7/28/90-day data references;
- Pacific-Time date resolution;
- GSC error classification;
- Canva DataTable shaping;
- selection UI for property / dataset / date range;
- deterministic tests for data refs, dataset dimensions/date windows and error mapping.

## LOCAL

Dependency-free pure TypeScript checks were executed for:
- Top Queries / Top Pages / Trend dimension mapping;
- Pacific date-boundary behavior;
- rolling 7-day date range;
- data-reference round trip;
- HTTP 429 error classification.

Result:

> **PASS — pure LOCAL checks passed**

A syntax-only TypeScript pass over the broader source produced no parser errors; unresolved-module errors are expected because this execution environment cannot install npm dependencies.

## Environment limitation

The current execution environment cannot reach npm/GitHub from the local shell, so the dependency-backed:
- `npm install`;
- `npm test`;
- `npm run lint:types`;
- `canva apps doctor`;
- Canva preview

cannot be truthfully claimed here.

Those checks are part of the prepared owner-authenticated LIVE bridge, not silently upgraded to LOCAL proof.

## Open / LIVE

Still required:
- create/link Canva app;
- push current Data Connector config;
- configure Google OAuth in Canva Developer Portal;
- authenticate;
- list real properties;
- call Google directly from the Canva iframe;
- import all 3 datasets;
- refresh a saved reference;
- observe a real auth/access failure path;
- measure a representative larger query.

## Current decision

**Continue P1.**

No evidence currently forces a backend.

The next decision-changing evidence is the real Canva/Google LIVE lane. If direct `googleapis.com` calls fail because of CORS/CSP or OAuth behavior, revisit architecture before broadening scope.


## Owner-local validation update — 2026-10-06

Environment:
- Node `v24.18.0`
- npm `12.0.1`
- `npm install` completed: 631 packages installed.

Observed:
- `npm test`: **PASS**
- Test suites: **3/3 passed**
- Tests: **11/11 passed**
- `npm run lint:types`: initially exposed one implementation mismatch in `src/auth/google.ts`: Canva's current `requestAuthorization.queryParams` type expects a plain string record, while the scaffold used a `Map<string, string>`.

Fix:
- changed OAuth query params to a plain object:
  - `access_type: "offline"`
  - `prompt: "select_account"`
- fix commit: `f9da19887bd2d74fea9c56038895132c82e50b93`

Pending:
- rerun `npm run lint:types` after pulling the fix.
- continue to Canva CLI/config/LIVE proof only after typecheck is green.

Install notes:
- npm reported transitive deprecation/security warnings and blocked install scripts for `@swc/core` and `unrs-resolver`, but the Jest suite executed successfully.
- do not run `npm audit fix --force` during P1; dependency remediation is not allowed to mutate the proof stack opportunistically.


## Owner-local validation update — app-scripts runtime seam

Observed:
- `npm run lint:types`: **PASS** after OAuth query-param type fix.
- `canva apps start --preview`: did not boot; Canva CLI reported `@canva/app-scripts not found` and fell back to the project's own `start` script, creating a recursive `apps start → npm start → apps start` loop.

Root cause:
- the seeded `package.json` retained the current Canva CLI start/build scripts but omitted the current template's `@canva/app-scripts` runtime dependency.

Fix:
- restored current template runtime dependencies:
  - `@canva/app-scripts: ^1.1.2`
  - `@rspack/core: 2.0.8`
- restored the Canva template override pin for `@rspack/core` and `nwsapi`.
- fix commit: `1431eff1eea265c81d9e7e03174da3c41f02e19b`

Next:
- owner pulls, runs `npm install`, then reruns typecheck/tests and `canva apps start --preview`.


## Owner-local validation update — Rspack compatibility seam

Observed:
- `canva apps start --preview` reached `@canva/app-scripts 1.1.2`.
- Runtime failed with: `[rsbuild] The current Rspack version does not meet the requirements, the minimum supported version of Rspack is 2.2.3`.

Cross-check:
- Canva's current Data Connector starter repository still declares `@rspack/core: 2.0.8`.
- The installed runtime's explicit minimum requirement is therefore treated as the stronger compatibility signal for this proof.

Fix:
- raised root `@rspack/core` pin from `2.0.8` to exact `2.2.3`;
- retained the existing `@canva/app-scripts -> @rspack/core` override so app-scripts resolves the same root version.
- fix commit: `45f9de6aed0c618a62a13d30be92a22dd25b03c8`

Next:
- owner pulls, runs `npm install`, reruns typecheck/tests, then `canva apps start --preview`.


## LIVE preview update — Canva app discovery

Observed in Canva preview:
- app launches into Canva successfully;
- app details card is visible under the linked app identity;
- Canva shows the expected design-content permission summary;
- Open button is available.

Interpretation:
- CLI/app-scripts boot path is now working;
- local app is discoverable by Canva under the pushed Data Connector app;
- this is partial LIVE evidence only: connector UI and Google authorization are not yet proven until Open is clicked and the app renders.


## LIVE OAuth update — Google test-user gate

Observed:
- Canva app opened successfully.
- Clicking the Google connection path reached Google's OAuth authorization screen.
- Google returned `403 access_denied` with the Testing-mode message that only developer-approved testers can access the app.

Interpretation:
- Canva → Google OAuth launch wiring is working far enough to reach Google.
- This is not evidence that verification is required for P1.
- For an External app in Testing status, the proof account must be explicitly listed under Google Auth Platform → Audience → Test users.

Next:
- add the exact proof Google account as a test user;
- retry Google authorization;
- then validate return-to-Canva, property listing and direct GSC API access.


## LIVE OAuth/property update — PASS

Observed:
- Google OAuth completed successfully after the proof account was added as a test user.
- Canva returned to the connector.
- real Search Console properties appeared in the property selector.

P1 implications:
- Canva-managed Google OAuth is **PASS** for the proof account.
- the app can retrieve a current Google access token from Canva.
- direct browser/iframe access to the Search Console **Sites list** endpoint works in the real Canva runtime.
- property discovery/selection is **PASS**.
- no backend is required for auth or property listing.

Still open:
- Search Analytics POST from the Canva runtime;
- Top Queries import;
- Top Pages import;
- Trend import;
- saved-reference refresh;
- one recovery/failure path after successful auth;
- representative larger-result behavior.

Current decision:
> **Continue P1; the remaining architecture-defining question is Search Analytics + refresh, not OAuth.**


## LIVE property-list reproducibility issue

Observed after an earlier successful property-list result:
- connector remained authorized;
- property selector later showed **No options available**;
- no explicit auth/API error was surfaced.

Interpretation:
- Google `sites.list` returns only sites available to the currently authorized user and can validly return an empty `siteEntry` list.
- because the same proof flow previously returned properties, treat this as an account/token/reload-state reproducibility issue until proven otherwise, not as a product-level “no properties” result.

Product fix:
- added explicit empty-property state;
- added **Retry** using a forced token refresh;
- added **Switch Google account** which deauthorizes and re-runs Google authorization;
- no token or account identifier is persisted by the app.

Next:
- owner pulls latest source;
- confirm the exact proof account still has properties in Search Console;
- use Retry, then Switch Google account if needed;
- continue to Search Analytics only after property listing is stable.


## LIVE property-list diagnostic update

Observed:
- **Retry** still returned zero properties.
- **Switch Google account** followed by re-authorization also returned zero properties.

Interpretation:
- simple stale-token selection is now less likely;
- next diagnostic must isolate Google account/API truth from Canva OAuth state.

Next diagnostic:
- use Google's official **Sites: list** API Explorer while signed into the exact same Google account;
- if API Explorer returns `siteEntry`, investigate Canva OAuth/account binding;
- if API Explorer returns no `siteEntry`, investigate Search Console account/property permissions rather than Canva code.


## LIVE isolation result — Google API Explorer

Observed:
- official Search Console **Sites:list** API Explorer returned HTTP **200**;
- response body was `{}`;
- OAuth 2.0 was enabled in the explorer.

Interpretation:
- request/auth/scope path is valid;
- Google itself sees **zero Search Console properties** for the account used in that API Explorer session;
- the Canva connector's empty property list is therefore consistent with Google's authoritative API response;
- do not change connector architecture/code further for this symptom.

Current blocker:
- identify/use a Google account that actually has Search Console access, or grant the current proof account access to a suitable non-sensitive property.

Resume condition:
- rerun Sites:list in API Explorer and confirm a non-empty `siteEntry`;
- then retry the same account in Canva and continue to Search Analytics dataset/refresh proof.


## LIVE proof-property update — property discovery PASS

Observed:
- temporary GitHub Pages site was verified in Search Console;
- the verified URL-prefix property now appears in the Canva connector property selector.

Conclusion:
- property discovery is reproducible and **PASS** with a known-good Search Console property;
- prior empty-list behavior was correctly caused by an account with no properties;
- next gate is Search Analytics POST behavior for Top Queries / Top Pages / Trend and saved-reference refresh.

Caveat:
- this newly created property may have no performance rows yet, so a clean no-data response is acceptable evidence for the request path but does not satisfy the non-empty dataset proof required before release.


## LIVE Search Analytics update — Top Queries request path PASS

Observed:
- Top Queries / Last 28 days against the verified proof property returned the app's explicit no-data message.
- That message is only emitted after the Search Analytics POST succeeds and returns a response with no rows.

Conclusion:
- direct Canva runtime → Google Search Analytics POST is **PASS**;
- no backend is required for the core query request path;
- zero rows are expected for the newly created proof property.

Product correction:
- Canva's current Data Connector contract permits successful completed data tables with `rows: []`;
- changed zero Search Analytics rows from `app_error` to `completed` with the correct dataset column schema;
- added deterministic empty-table tests for Top Queries and Trend.

Next:
- owner pulls latest source;
- reruns typecheck/tests;
- imports Top Queries, Top Pages and Trend as linked empty datasets;
- refreshes at least one linked dataset to prove saved-reference replay.


## LIVE empty import update — Top Queries PASS

Observed:
- after the zero-row handling patch, Top Queries import produced an empty Canva table;
- no connector/API error was shown;
- Canva accepted the data source reference and rendered the empty result.

Interpretation:
- Top Queries selection → `updateDataRef` → `getDataTable` → completed DataTable path is **PASS**;
- the current UI lacked positive confirmation even though linking succeeded.

Product correction:
- added explicit post-import confirmation:
  - “Data source linked successfully. Canva can refresh this selection later.”

Still open:
- Top Pages empty import;
- Trend empty import;
- one refresh of a linked source.


## LIVE Canva Sheets update — zero-row range limitation

Observed:
- importing the verified proof property's zero-row dataset in Canva Sheets completes without error;
- after import, the sheet remains visually unchanged because there are no rows/cells to materialize;
- therefore there is no visible connected range to select for the refresh UI.

Interpretation:
- this does **not** invalidate the already-proven live Google request/import path;
- it means a zero-row live property cannot by itself exercise Canva's connected-range refresh affordance.

P1-only proof fixture:
- added dataset option **Refresh Fixture (P1 only)**, visible only for the temporary GitHub Pages proof property;
- it returns one clearly labeled synthetic row;
- the row includes the current invocation timestamp so a manual refresh can prove `getDataTable` ran again;
- it is explicitly development/proof-only and must be removed before P2.

Next:
- pull latest source;
- run typecheck/tests;
- import **Refresh Fixture (P1 only)** in Canva Sheets;
- finish import, select the resulting connected range, refresh it, and confirm the timestamp changes.


## LIVE Canva entitlement gate — native refresh

Observed:
- the P1 Refresh Fixture imports successfully as a non-empty connected dataset;
- Canva blocks the native Sheets refresh action on the current account and requires Canva Business.

Current Canva product docs:
- Canva Sheets data connectors are available on Canva Business and Canva Enterprise;
- linked connector data is refreshed by Canva by replaying the saved data source reference into the connector's data-fetch path.

Interpretation:
- the current blocker is a **Canva subscription entitlement**, not connector architecture, OAuth, Google API access, data shaping, or saved-reference design;
- there is no supported app-code bypass for Canva's native refresh entitlement;
- do not add custom refresh machinery just to bypass Canva's product gate.

Decision options:
1. **Full LIVE closure now:** use a qualified Canva Business/Enterprise account or the offered Business trial, refresh the P1 fixture, confirm its timestamp changes, then remove the fixture.
2. **Factory exception:** continue implementation without starting a paid/trial entitlement; retain native Canva refresh as a mandatory P3/pre-release gate, supported meanwhile by Canva's documented refresh contract plus deterministic data-reference/fixture tests.

This entitlement does not change the target-market thesis because the product is already intentionally aimed at plan-qualified Canva users.


## LIVE native refresh update — PASS

Observed:
- Canva Business trial enabled the native connected-data refresh control;
- the non-empty P1 fixture imported as a connected dataset;
- Canva showed the connected source in **Edit data** with **Refresh Data**;
- after refresh, the fixture row carried a fresh invocation timestamp and Canva showed a matching **Last updated** time.

Conclusion:
- Canva saved the data source reference and replayed it into `getDataTable` on refresh;
- native connected-data refresh is **LIVE-PASS**;
- no custom backend or custom refresh mechanism is required.

Cleanup:
- the P1-only refresh fixture has now been removed from source, UI, data-ref types and tests;
- no synthetic dataset remains in the product path.

Remaining P1 LIVE checks:
- Top Pages import completes cleanly;
- Trend import completes cleanly.
