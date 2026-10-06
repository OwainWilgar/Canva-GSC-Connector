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
