# Seed DOC evidence — 2026-10-06

Stage: **P1 — Prove**  
Evidence class: **DOC**

## Canva Data Connector

Current official documentation confirms:
- the Canva CLI provides a `data_connector` template;
- Data Connector uses `prepareDataConnector`;
- implementations provide `getDataTable` and `renderSelectionUi`;
- Canva handles linked data / refresh workflows and contextual discovery;
- Data Connector apps are available to Business, Enterprise, Education and Nonprofit users;
- App UI Kit is required.

Sources:
- https://www.canva.dev/docs/apps/intents/data-connector/
- https://www.canva.dev/docs/apps/intents/data-connector/implementation-guide/
- https://www.canva.dev/docs/apps/api/latest/intents-data-prepare-data-connector/

## Canva OAuth

Current official documentation confirms:
- Canva supports third-party OAuth for apps inside Canva;
- Canva handles authorization-code exchange plus access/refresh token storage;
- apps can request the latest access token and use it in Fetch requests;
- a separate backend is not required merely to store Google OAuth secrets/tokens.

Source:
- https://www.canva.dev/docs/apps/authenticating-users/oauth/

## Google Search Console

Current official documentation confirms:
- `searchAnalytics.query` supports date ranges, dimensions and dimension filters;
- read-only scope is `https://www.googleapis.com/auth/webmasters.readonly`;
- `rowLimit` supports 1–25,000 and `startRow` supports paging;
- the API does **not** guarantee all rows and returns top rows.

Sources:
- https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- https://developers.google.com/identity/protocols/oauth2/scopes

## Marketplace/distribution freshness check

A fresh web/Marketplace search on 2026-10-06 did not surface an obvious direct Google Search Console Canva app/connector.

This is an absence observation, not proof of permanent whitespace. Recheck immediately before P2 broad implementation and again before publication.

Related current Canva surface:
- Canva publicly promotes Data Connectors including Google Analytics and HubSpot as connected data sources.
- https://www.canva.com/sheets/
- https://www.canva.com/newsroom/news/new-apis-data-connectors/

## Monetization

Current Canva documentation says:
- Premium Apps Program can pay recurring usage-based compensation for accepted apps;
- external payment links are also supported;
- Premium Apps integration is approval-dependent.

Sources:
- https://www.canva.dev/docs/apps/monetization/
- https://www.canva.dev/docs/apps/premium-apps/

## Current decision

DOC evidence supports proceeding to the bounded LIVE proof.

Do not infer:
- that OAuth setup is frictionless until LIVE;
- that no backend will ever be required until LIVE;
- that Marketplace whitespace will remain open;
- that 25,000 rows is an appropriate Canva product default.
