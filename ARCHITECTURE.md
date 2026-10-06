# Architecture — Canva Google Search Console Connector

Updated: 2026-10-06  
Status: provisional; P1 must confirm LIVE contracts

## Architecture principle

Keep v1 direct:

> **Canva Data Connector intent → Canva-managed Google OAuth → Search Console API → normalized report dataset → Canva DataTable**

No backend unless P1 evidence forces one.

## External boundaries

### Canva

Use the current Data Connector intent for:
- contextual discovery;
- selection/filter UI;
- data references;
- linked data;
- refresh;
- DataTable handoff.

Register the connector using the current `prepareDataConnector` contract from `@canva/intents/data`.

Use App UI Kit components for the selection UI.

### Google

Use Search Console for:
- accessible properties;
- Search Analytics queries;
- dimensions/filters;
- clicks, impressions, CTR and position.

Use read-only OAuth scope.

## Logical layers

### 1. OAuth/access-token adapter

Responsibilities:
- request authorization through Canva;
- retrieve latest Google access token;
- expose connected/disconnected/recovery states.

No token persistence in app-owned state.

### 2. Search Console client

Responsibilities:
- list accessible properties;
- execute Search Analytics query;
- apply `startRow` / `rowLimit`;
- classify HTTP/auth/quota/query errors.

No Canva table rendering here.

### 3. Query model

Stable internal request:
- property;
- dataset kind;
- date range;
- search type;
- optional filters;
- row limit.

Dataset builders translate this into GSC dimensions:
- Top Queries → `query`
- Top Pages → `page`
- Trend → `date`

### 4. Normalization

Convert GSC rows into stable product rows.

Common measures:
- clicks
- impressions
- ctr
- position

Keep dataset-specific key/dimension explicit.

### 5. Canva Data Connector adapter

`renderSelectionUi`:
- connection state;
- property;
- dataset;
- date range;
- optional advanced filters only where justified;
- preview/update reference.

`getDataTable`:
- read data reference;
- obtain current access token;
- fetch/normalize;
- return DataTable;
- preserve refresh semantics.

## Data reference

Versioned, non-secret structure, conceptually:

```json
{
  "v": 1,
  "property": "sc-domain:example.com",
  "dataset": "top_queries",
  "dateRange": {"kind": "last_n_days", "days": 28},
  "searchType": "web",
  "filters": []
}
```

Prefer relative date contracts for recurring reports where that matches the selected UX, so refresh advances naturally. Use fixed dates only when the user explicitly selects a fixed historical period.

P1 must confirm Canva's actual data-reference type/size contract.

## Row limits

Do not default to GSC's 25,000 maximum simply because it exists.

Choose report-oriented defaults that:
- preview quickly;
- fit Canva DataTable constraints comfortably;
- are useful for charts/reports;
- make top-row semantics clear.

P1 should measure representative 100 / 1,000 / larger requests only as needed to choose the product default.

## Error taxonomy

Normalize at least:
- AUTH_REQUIRED
- AUTH_REVOKED
- PROPERTY_FORBIDDEN
- QUOTA_OR_RATE_LIMIT
- INVALID_QUERY
- NO_DATA
- UPSTREAM_TRANSIENT
- CANVA_OUTPUT_LIMIT
- UNKNOWN

Selection UI should translate these into user actions, not raw API payloads.

## Test/evidence architecture

### LOCAL
Fixtures for:
- each dataset;
- zero rows;
- URL-prefix and domain properties;
- query generation;
- date-range resolution;
- CTR/position formatting;
- auth/permission/quota error mapping;
- refresh from a saved data reference.

### LIVE
One authorized account proves:
- OAuth;
- property listing;
- all three required datasets;
- refresh;
- property access failure or equivalent recovery path where practical.

### SCALE
Only enough to choose sane row limits:
- row count;
- call count;
- rough latency;
- Canva output behavior.

## Suggested source layout after P1 scaffolding

```text
src/
  intents/data_connector/
    index.tsx
    selection_ui.tsx
  auth/
    google.ts
  gsc/
    client.ts
    errors.ts
    query.ts
    normalize.ts
  datasets/
    top_queries.ts
    top_pages.ts
    trend.ts
  data_ref.ts
tests/
  fixtures/
  unit/
docs/evidence/
```

Let the current Canva CLI Data Connector template establish the real generated project structure; adapt this layout to it rather than fighting the template.

## Architecture revisit triggers

Revisit only if LIVE proof shows:
- Canva OAuth cannot supply/refresh Google access cleanly;
- GSC calls require an intermediary because of a real platform restriction;
- data references cannot encode refresh state safely;
- Canva DataTable limits materially change the product;
- public review requires infrastructure that changes the cost model.
