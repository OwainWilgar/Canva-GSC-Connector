# Task 001 LIVE proof — Canva ↔ Google Search Console

Date: 2026-10-06  
Stage: **P1 — Prove**  
Decision: **PASS → P2 Build**

## Decision

The direct Canva Data Connector ↔ Google Search Console architecture is viable without a bespoke backend.

The proof demonstrated:
- Canva-managed Google OAuth;
- read-only Search Console access;
- property discovery/selection;
- direct Search Analytics POSTs from the Canva runtime;
- Top Queries, Top Pages and Trend import paths;
- saved non-secret data-source references;
- native Canva Sheets refresh replay through `getDataTable`;
- useful auth/property/no-data recovery states.

No P1 evidence requires a proxy/backend.

## LIVE passes

### OAuth
PASS.
- external/testing Google OAuth works through Canva;
- proof account authorizes with `webmasters.readonly`;
- Canva manages the token lifecycle;
- no OAuth secret/token is committed.

### Property discovery
PASS.
- `sites.list` works from the real Canva runtime;
- empty-property behavior was isolated correctly to an account with no Search Console properties;
- a verified GitHub Pages URL-prefix property appeared reliably in Canva.

### Search Analytics
PASS.
- Top Queries reached Google successfully;
- Top Pages completed without error;
- Trend completed without error;
- the new proof property returned zero rows, which is expected for a newly created property;
- zero rows are returned as a valid completed Canva DataTable, not an app error.

### Refresh
PASS.
- a temporary P1-only non-empty fixture was used solely to make Canva materialize a connected range;
- Canva Business entitlement exposed **Refresh Data**;
- refresh replayed the saved data-source reference into `getDataTable`;
- the fixture timestamp changed after refresh and Canva updated its Last updated time;
- the fixture was then removed from source, UI, data-ref types and tests.

## Failure/recovery evidence

Observed and understood:
- Google External/Testing account not allow-listed → `403 access_denied`;
- authorized Google account with no Search Console properties → successful empty `sites.list`;
- connector now gives an explicit no-property state with Retry and Switch Google account;
- zero Search Analytics rows → valid empty completed table;
- Canva native refresh unavailable without plan entitlement → platform Business/Enterprise gate, not a connector failure.

## LOCAL evidence

Owner machine:
- Node `v24.18.0`;
- npm `12.0.1`;
- dependency install completed;
- deterministic Jest suite passed before and through the proof iterations;
- TypeScript typecheck passed after current Canva OAuth/runtime compatibility fixes.

Key implementation seams corrected during proof:
- Canva OAuth `queryParams` requires a plain string record;
- current app-scripts runtime required Rspack >= 2.2.3;
- zero-row DataTables are valid completed results;
- empty property lists need an explicit user-actionable state.

## Architecture result

Confirmed:
- direct Canva → Google API calls work;
- no backend is required for OAuth/token storage;
- no backend is required for property discovery;
- no backend is required for Search Analytics;
- no custom refresh service is required;
- versioned non-secret data refs are sufficient for refresh replay.

Keep the no-backend architecture unless later evidence forces a change.

## Data truth retained

Search Analytics remains a top-rows API rather than an exhaustive export.

Product language remains:
- **Top Queries**
- **Top Pages**
- **Trend**

Do not market query/page outputs as complete raw exports.

## P1 scope decisions

Accepted:
- property selector;
- dataset selector;
- rolling 7/28/90 day presets;
- clicks / impressions / CTR / average position;
- direct linked refresh;
- explicit reconnect/no-property behavior.

Deferred:
- Country;
- Device;
- query/page filters;
- search type selector;
- larger-result tuning;
- commercial lane.

Rejected for core MVP:
- charts;
- SEO recommendations;
- AI analysis;
- templates;
- custom backend;
- custom refresh mechanism.

## Remaining validation debt

Not architecture-blocking, but mandatory before release:
- LIVE non-zero real Search Console rows once an appropriate mature property is available;
- representative larger-result/SCALE behavior and sensible row defaults;
- revoked-auth / forbidden-property UX in the polished build;
- publication-time competitor recheck.

## Fresh competitor sanity check — 2026-10-06

A fresh web/Canva-oriented search did **not** surface an obvious direct Google Search Console Data Connector inside Canva.

Closest surfaced alternatives were external workflow/data products that can connect Canva and/or Search Console, rather than the same in-product Canva Sheets connector experience.

Treat this as directional whitespace only. Repeat the direct-app check before P3/P5; do not claim exclusivity.

## P1 exit

> **PASS. Move to P2 — Build.**

Rationale:
- the architecture-defining OAuth/API/refresh seams all work;
- no bespoke infrastructure is required;
- the remaining gaps are product-quality, scale and release evidence rather than reasons to reject the bet.
