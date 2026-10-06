# Scenario contracts — Canva Google Search Console Connector

These are lightweight product/review forcing cases. They do not replace LIVE integration proof.

## S1 — First connection

**Actor:** marketer creating a recurring search-performance report.  
**Trigger:** wants GSC data in Canva without CSV/Sheets plumbing.  
**Starting state:** app not authorized.  
**Job:** connect Google, select a property and import a useful dataset.  
**Must learn:** the app is read-only and which Google account/property is being used.  
**Failure to avoid:** asking for write/manage Search Console scope.  
**Stop:** first table imports successfully.

## S2 — Top Queries report

**Actor:** content/growth marketer.  
**Trigger:** needs the strongest search queries for a reporting period.  
**Job:** select Top Queries + date range and get clicks, impressions, CTR, position.  
**Must preserve:** clear top-row semantics; useful ordering; understandable query labels.  
**Failure to avoid:** presenting the table as an exhaustive keyword export.  
**Stop:** data is ready for a Canva chart/table/report.

## S3 — Top Pages report

**Actor:** SEO/content lead.  
**Trigger:** wants landing-page search performance.  
**Job:** select Top Pages and see report-ready page metrics.  
**Must preserve:** full/usable page identity without overwhelming display.  
**Failure to avoid:** mangled URLs or unexplained truncation.  
**Stop:** user can identify strongest/weakest pages for the reporting context.

## S4 — Trend

**Actor:** marketing lead preparing a monthly/weekly report.  
**Trigger:** needs performance over time.  
**Job:** select Trend and a useful date range.  
**Must preserve:** dates, missing-data semantics, clicks/impressions/CTR/position.  
**Failure to avoid:** fabricating zero rows for dates Google omitted.  
**Stop:** data can drive a time-series visualization.

## S5 — Refresh next period

**Actor:** recurring report owner.  
**Trigger:** opens a previously connected Canva report later.  
**Starting state:** saved data reference; authorization still valid.  
**Job:** refresh without rebuilding property/dataset selection.  
**Must preserve:** same dataset contract and relative/fixed date behavior chosen originally.  
**Failure to avoid:** stale fixed dates when the user chose a rolling period, or silently changing filters.  
**Stop:** report updates with current data.

## S6 — Access/auth failure

**Actor:** teammate or account whose access changed.  
**Trigger:** refresh/import fails.  
**Starting state:** revoked auth, inaccessible property or quota/transient failure.  
**Job:** understand the failure and the smallest recovery action.  
**Failure to avoid:** raw Google error JSON or generic “Something went wrong.”  
**Stop:** user can reconnect, select another property, retry later or understand no data exists.

## S7 — Low/no data

**Actor:** marketer on a new/small site or narrow period.  
**Trigger:** selected dataset returns few/no rows.  
**Job:** understand whether the connector worked and what to change.  
**Failure to avoid:** blank/broken UI that looks like connector failure.  
**Stop:** user can widen the period/change property/dataset or accept the legitimate empty state.

## Review coverage

Before P4 owner review, P3 should exercise:
- S1–S7 in deterministic form where possible;
- one LIVE Google account for auth/property/dataset/refresh truth;
- at least one larger Top Queries/Top Pages request to choose sane row limits.

Owner review should judge reporting usefulness and interaction feel, not API correctness already covered.


## P2 deterministic coverage map

Current production-shaped implementation covers the scenarios as follows:

- **S1 First connection:** selection UI states that access is read-only, shows one primary Connect Google action, lists normalized properties, and offers explicit account switching.
- **S2 Top Queries:** query dimension and non-zero/empty table shaping are deterministic tests; visible copy states that query/page reports are top rows rather than exhaustive exports.
- **S3 Top Pages:** full page URL identity and metric shaping are deterministic tests.
- **S4 Trend:** date dimension/query generation and Canva date-cell conversion are deterministic tests; missing dates are not fabricated.
- **S5 Refresh next period:** data refs are versioned/non-secret; rolling-date recomputation is a deterministic test; native saved-reference refresh is P1 LIVE-PASS.
- **S6 Access/auth failure:** GSC HTTP errors map to Canva re-selection, retryable remote failure, or actionable app error; no raw Google payload is surfaced.
- **S7 Low/no data:** zero rows are a valid completed DataTable; metadata/user guide explain legitimate empty results and recovery choices.

P3 must still inspect these flows in the real Canva UI and capture representative non-zero/SCALE behavior before owner review.
