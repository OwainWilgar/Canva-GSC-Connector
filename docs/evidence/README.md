# Evidence ledger

Store compact decision-relevant proof here.

## Evidence labels

- **DOC** — current Canva/Google documentation.
- **LOCAL** — deterministic code/fixture/harness evidence.
- **LIVE** — real Canva/Google behavior.
- **SCALE** — measured larger-volume/output behavior.
- **RELEASED** — published/installed Marketplace behavior.

Never upgrade one evidence class into another.

## Evidence memo shape

Include:
- date;
- task/stage;
- exact claim tested;
- environment boundary;
- passed;
- failed;
- open/unknown;
- measurements that matter;
- accepted scope change;
- rejected/deferred scope;
- next stage/gate.

Do not turn evidence memos into raw logs.

## Security

Never commit:
- OAuth client secrets;
- access/refresh tokens;
- authorization headers;
- private Search Console data that is not necessary for a sanitized fixture.

## Planned artifacts

- `seed-doc-evidence-2026-10-06.md`
- `task-001-canva-gsc-live-proof-YYYY-MM-DD.md`
- `task-002-mvp-validation-YYYY-MM-DD.md`
- `p3-product-quality-YYYY-MM-DD.md`
- `release-acceptance-YYYY-MM-DD.md`
