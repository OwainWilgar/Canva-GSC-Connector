# Canva Google Search Console Connector

A Canva Data Connector for **Google Search Console (GSC)** that brings report-ready search performance data into Canva without CSV exports or spreadsheet handoffs.

## Product thesis

> Let marketing/agency teams connect a Search Console property once, choose a report-ready dataset, and keep the resulting Canva data linked and refreshable.

The first product is deliberately narrow:
- Google OAuth;
- Search Console property selection;
- **Top Queries**;
- **Top Pages**;
- **Trend**;
- refresh through Canva's Data Connector intent.

Country/device slices are follow-on only if they fall out cheaply from the same query model.

This is not an SEO analysis product. Canva already owns charts, layouts, presentations, sheets and downstream design workflows.

## Status

**Canonical stage: P1 — Prove.**

This is a cheap distribution/mechanics proof, not a broad build.

Current gate:
- scaffold from Canva's current Data Connector template;
- authenticate to Google using Canva-managed OAuth;
- list/select a Search Console property;
- produce one refreshable Data Connector table for each required dataset;
- confirm size/error/permission behavior;
- decide whether the direct app -> Google architecture is sufficient.

## Why this shape

Canva's Data Connector intent already owns:
- contextual data-source discovery;
- linked data;
- selection/filter UI contract;
- refresh;
- Canva-side table handling.

GSC already owns:
- property access;
- Search Analytics dimensions and filters;
- clicks, impressions, CTR and average position;
- pagination via `startRow` / `rowLimit`.

Google explicitly does **not** promise exhaustive Search Analytics rows. The product therefore promises report-ready **Top** datasets rather than pretending to be a warehouse/export replacement.

## Start here

- [AGENTS.md](AGENTS.md)
- [CURRENT_STATE.md](CURRENT_STATE.md)
- [THREAD_INBOX.md](THREAD_INBOX.md)
- [REQUIREMENTS.md](REQUIREMENTS.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [docs/FACTORY.md](docs/FACTORY.md)
- [docs/SCENARIO_CONTRACTS.md](docs/SCENARIO_CONTRACTS.md)
- [docs/tasks/001-canva-gsc-proof.md](docs/tasks/001-canva-gsc-proof.md)
- [docs/tasks/002-production-mvp.md](docs/tasks/002-production-mvp.md)
- [docs/launch/RELEASE_PACKET.md](docs/launch/RELEASE_PACKET.md)
