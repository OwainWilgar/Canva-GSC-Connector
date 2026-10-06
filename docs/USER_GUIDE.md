# Google Search Console for Canva — User guide

## What this app does

Google Search Console for Canva brings report-ready Search Console data into Canva Sheets so you can build recurring reports without exporting CSV files first.

The app is read-only. It cannot change Search Console settings or website configuration.

## Available reports

### Top Queries

Search terms with:
- clicks;
- impressions;
- CTR;
- average position.

Google Search Console returns top rows for this report. It is not an exhaustive keyword export.

### Top Pages

Landing pages with:
- clicks;
- impressions;
- CTR;
- average position.

The full Search Console page URL is preserved in the imported data.

### Trend

Daily:
- clicks;
- impressions;
- CTR;
- average position.

Only dates returned by Search Console are included. The connector does not invent missing dates.

## Date ranges

Available presets:
- Last 7 days;
- Last 28 days;
- Last 90 days.

These are rolling periods ending yesterday in Search Console reporting time. When Canva refreshes a connected report later, the period advances automatically.

## Refresh

Canva stores a non-secret reference to:
- the Search Console property;
- the selected report;
- the rolling date range;
- the search type.

Canva uses that reference to request fresh data later.

OAuth tokens are managed by Canva and are not stored in the data reference.

## Empty reports

A new, small, or low-traffic Search Console property can legitimately return no rows.

If a report is empty:
1. try a wider date range;
2. confirm you selected the expected property;
3. try another report;
4. allow time for a newly verified Search Console property to accumulate data.

An empty result does not necessarily mean the connection failed.

## Reconnect or change Google account

Use **Switch Google account** in the connector when:
- the wrong Google account is connected;
- Search Console access changed;
- the selected property no longer appears.

If a saved report can no longer refresh because authorization or property access changed, Canva will ask you to reselect the source.

## Size behavior

The connector imports up to 1,000 data rows per report, subject to Canva's current surface limits.

This is intentional: the product is designed for reporting in Canva rather than exhaustive Search Console export.

## Access requirements

Google:
- Google account;
- access to at least one Search Console property;
- read-only Search Console OAuth permission.

Canva:
- a Canva plan/surface that supports Data Connectors and connected-data refresh.

## Privacy and security

The connector:
- requests only the read-only Search Console scope;
- does not request Search Console write/manage access;
- does not store Google OAuth tokens in the report reference;
- does not require a custom backend for the core data path.

## Support checklist

If something fails:
- **No properties:** confirm the same Google account can see properties in Search Console, then retry or switch account.
- **Reconnect requested:** Google authorization or property access changed; reconnect and choose the source again.
- **Temporary Google failure:** retry shortly.
- **Empty report:** widen the period or use a property with existing Search Console performance data.
- **Import-size message:** use Canva Sheets or another surface with enough row/column capacity.
