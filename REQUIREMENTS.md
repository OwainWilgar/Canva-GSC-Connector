# Requirements — Canva Google Search Console Connector

Updated: 2026-10-06  
Status: MVP-bound requirements; P1 architecture passed

## Product outcome

A marketer can connect Google Search Console to Canva, select a property and a report-ready search-performance dataset, import it into Canva, and refresh it later without repeating CSV/Sheets plumbing.

## Primary user

Agency, growth, content or marketing operator who:
- has Search Console access;
- creates recurring reports/presentations/sheets in Canva;
- currently copies or exports search-performance data through an intermediate tool.

## System of record

Google Search Console is authoritative.

Canva owns downstream visualization, layout, collaboration and design.

## Required user workflow

1. Invoke/select the Google Search Console data source in Canva.
2. Authorize Google if needed.
3. Select a Search Console property.
4. Choose dataset.
5. Choose date range.
6. Preview/import useful data.
7. Refresh later and receive the same dataset definition with current values.

## Required datasets

### Top Queries
Dimensions:
- query

Measures:
- clicks
- impressions
- CTR
- average position

### Top Pages
Dimensions:
- page

Measures:
- clicks
- impressions
- CTR
- average position

### Trend
Dimensions:
- date

Measures:
- clicks
- impressions
- CTR
- average position

## Selection controls

Required:
- property;
- dataset;
- date range.

Add only if useful and clean:
- search type;
- Country;
- Device;
- page/query filter.

Defaults should suit reporting, not API exploration.

## Refresh contract

The Canva data reference must contain enough non-secret information to reproduce the selected dataset:
- property identifier;
- dataset kind;
- date-range contract;
- optional search type/filters;
- output shaping version if required for forward compatibility.

Access tokens/secrets do not belong in the data reference.

## Data correctness

- preserve clicks, impressions, CTR and average position meaning;
- date values must remain unambiguous;
- property identity must support URL-prefix and domain properties;
- empty dates/rows are explicit, not fabricated;
- unsupported or unknown API values are not silently coerced.

## Completeness claim

Never claim exhaustive raw Search Analytics export.

User-facing wording should make clear that query/page datasets are **Top Queries** / **Top Pages** from Search Console.

## Authentication

Use Google OAuth through Canva's supported OAuth capability.

Required Google scope:
- `https://www.googleapis.com/auth/webmasters.readonly`

Do not request `webmasters` write/manage scope.

## Error/recovery requirements

Use Canva's native connector recovery semantics where they fit:
- stale/revoked/inaccessible saved source → re-selection;
- temporary/rate-limit/upstream failure → retryable remote failure;
- invalid user selection → actionable app error.

Distinguish at minimum:
- not connected / authorization required;
- expired/revoked authorization;
- property not accessible;
- quota/rate-limit/transient upstream failure;
- invalid/unsupported query;
- no data for selected period;
- Canva/Data Connector size limitation where encountered.

Every user-facing error should have a next action where possible.

## Non-functional requirements

- no custom backend unless P1 proves it necessary;
- no secrets in source, fixtures, logs or evidence;
- deterministic query-builder and data-shaping tests;
- selection UI uses Canva App UI Kit requirements;
- production code follows current Canva Data Connector intent contract;
- bundle/review constraints checked before P5;
- app remains narrow enough to ship quickly.

## Explicit non-goals

- SEO audits;
- recommendations;
- rank tracking outside Search Console;
- keyword research;
- AI summaries;
- charts/templates;
- scheduled emailing;
- multi-account warehouse;
- all-history export;
- mutation of Search Console state.

## Kill/narrow triggers

### NARROW
- one optional filter/dimension is awkward;
- Country/Device adds UI complexity without enough value;
- useful default row limits need to be lower than API maximum;
- one property shape needs explicit unsupported handling.

### KILL / major reposition
- Canva-managed OAuth cannot support the Google flow cleanly;
- refresh cannot reproduce data reliably;
- Data Connector output constraints make the report datasets too weak;
- a backend becomes mandatory enough to break the cheap experiment;
- a current first-party/direct GSC connector makes the differentiation/distribution thesis obsolete before broad build.
