# Canva release packet — early skeleton

Status: **P3/P5 preparation skeleton — do not freeze final copy/screenshots yet**

Purpose:
- expose late Marketplace/account/privacy/monetization blockers early;
- batch owner-only release work;
- avoid composing release facts live in an owner session.

## 1. Product identity

Working name:
**Google Search Console**

Positioning line:
> **Bring refreshable Search Console queries, pages and performance trends directly into Canva.**

Keep the listing focused on recurring reporting.

Avoid:
- “complete export”;
- “all Search Console data”;
- SEO recommendation claims;
- AI language unless later product scope actually adds it.

## 2. Audience

Data Connector availability currently targets:
- Canva Business;
- Canva Enterprise;
- Canva for Education;
- Canva for Nonprofits.

This is acceptable audience qualification for a marketing/reporting connector, but released distribution must be verified.

## 3. Candidate listing bullets

Draft only:
- Connect a Google Search Console property without CSV exports.
- Import Top Queries with clicks, impressions, CTR and average position.
- Import Top Pages for content/landing-page reporting.
- Import Trend data for recurring performance charts.
- Refresh linked data later from Canva.

## 4. Connection/setup material

Prepare:
- Google authorization explanation;
- read-only scope explanation;
- accessible-property selection;
- reconnect/revoked-access recovery;
- no-data guidance.

Do not expose OAuth client secrets or technical token handling to users.

Before public launch, confirm the Google Cloud project's actual classification for `webmasters.readonly`. Google requires verification for apps requesting sensitive or restricted scopes; do not assume development/test OAuth approval is production-ready.

## 5. Privacy/security/support facts

Before publication, make explicit:
- exact Google scope;
- whether a backend exists (expected: no for core v1);
- what Search Console data the app reads;
- whether telemetry exists;
- data retention behavior;
- support contact/path;
- privacy policy URL/need;
- terms URL/need;
- authorization revocation/deletion story.

Do not invent legal claims.

## 6. Monetization lane

Decide after product/distribution proof:
- Premium Apps Program application/eligibility and usage-based compensation; or
- external app-managed plan/payment link if strategically better; or
- free distribution experiment if learning value dominates.

Do not build monetization infrastructure during P1.

## 7. Review/demo path

Prepare a reviewer flow:
1. authorize Google;
2. choose property;
3. import Top Queries;
4. switch/import Top Pages;
5. import Trend;
6. refresh a saved dataset;
7. show empty/error/reconnect handling.

If reviewers need an account/property, provide it through an approved secure mechanism, never the repository.

## 8. Screenshots

Capture only after P4 acceptance.

Prioritize:
- simple property/dataset/date selection;
- Top Queries result;
- Trend result;
- refresh/reconnect confidence.

## 9. Release readiness

Before publication:
- exact source commit;
- current Canva build/bundle identity;
- local deterministic tests pass;
- representative LIVE acceptance passes;
- OAuth scope/config reviewed;
- Google OAuth brand/scope verification requirement resolved for the production project;
- non-exhaustive data claims accurate;
- privacy/support/legal fields prepared;
- monetization choice recorded;
- fresh Marketplace competitor check complete;
- no launch-blocking P4 issue remains.

## 10. Batched owner/account session

Only after all knowable work is prepared, batch:
- publisher/team identity;
- OAuth production configuration;
- privacy/support/legal URLs;
- Marketplace listing/category/keywords;
- monetization/payout decisions;
- screenshots/media;
- reviewer resources;
- final submission/publish action.

## 11. Post-launch evidence

Track where available and privacy-safe:
- installs;
- successful connections;
- auth/setup failures;
- refresh usage;
- dataset usage mix;
- support/reviews;
- monetization evidence;
- signs of first-party absorption/competitive closure.

If distribution is weak, kill or reuse the connector skeleton rather than inventing adjacent features to justify sunk cost.
