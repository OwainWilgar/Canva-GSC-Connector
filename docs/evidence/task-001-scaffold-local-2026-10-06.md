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
