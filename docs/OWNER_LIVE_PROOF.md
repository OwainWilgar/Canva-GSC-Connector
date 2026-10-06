# Owner LIVE proof bridge — P1

Status: **READY WHEN REQUESTED BY ORCHESTRATOR**

Purpose: complete the only current owner-authenticated seam in one session, then return control to the implementation thread.

Do not paste OAuth client secrets, access tokens, refresh tokens, or Canva CLI auth tokens into chat or the repository.

## What this session proves

- the existing repository can be linked to the intended Canva app;
- Data Connector intent/config can be pushed;
- Canva-managed Google OAuth works;
- Google returns accessible Search Console properties;
- direct browser/API calls to `googleapis.com` work in the real Canva iframe;
- Top Queries / Top Pages / Trend preview/import;
- saved data reference refresh;
- one real auth/access recovery path.

## A. Create the Canva app

Use the Canva Developer Portal to create a **public** app named:

> Google Search Console

Distribution cannot be changed after creation, so choose **public**.

Do not create another source repository from the generated template. This repository already carries the current Data Connector scaffold and product code.

## B. Link this repository to the app

From a local clone of this repository:

```bash
nvm install 24
nvm use 24
npm install -g @canva/cli@latest
canva login
canva apps link
npm install
canva apps doctor
canva apps config status
```

When `canva apps link` prompts, select the newly created **Google Search Console** app.

Then inspect the configuration diff and push the repo's Data Connector intent/permissions:

```bash
canva apps config push
```

The local `canva-app.json` is a full-replacement configuration source. Review the diff before accepting the push.

## C. Google Cloud development OAuth project

Create/use a **development/testing** Google Cloud project for this proof.

1. Enable **Google Search Console API**.
2. Configure Google Auth Platform / OAuth consent.
3. Add only:
   - `https://www.googleapis.com/auth/webmasters.readonly`
4. Use an external/testing audience unless an internal Workspace-only proof is intentional.
5. Add the Google account used for LIVE proof as a test user when Google requires it.
6. Create an OAuth client of type **Web application**.

Use a non-sensitive Search Console property for the proof.

## D. Canva OAuth configuration

In the Canva Developer Portal, configure third-party OAuth for the app.

Use:

- Authorization server URL: `https://accounts.google.com/o/oauth2/v2/auth`
- Token exchange URL: `https://oauth2.googleapis.com/token`
- Revocation exchange URL: `https://oauth2.googleapis.com/revoke`
- Credential transfer mode: **Body**
- PKCE: keep enabled unless Google/Canva produces concrete incompatibility
- Multi-account: not required for P1

Copy Canva's generated **Redirect URL** exactly into the Google OAuth client's authorized redirect URIs.

Enter the Google OAuth client ID/secret only in the Canva Developer Portal. Never commit them.

The app code requests:
- `access_type=offline`
- `prompt=select_account`

so Canva can retain Google's refresh token when Google returns one.

## E. Run local/current-source proof

From the repository:

```bash
npm test
npm run lint:types
canva apps start --preview
```

In Canva:

1. Open the Data Connector preview.
2. Click **Connect Google**.
3. Complete Google consent.
4. Confirm the property selector lists the intended Search Console property.
5. Import **Top Queries — Last 28 days**.
6. Import **Top Pages — Last 28 days**.
7. Import **Trend — Last 28 days**.
8. Refresh at least one linked dataset.
9. If practical, revoke/remove access or select an inaccessible property/account to capture one recovery path.

Do not judge final visual polish in this pass. P1 is a mechanics gate.

## F. Return only bounded evidence

If everything works, report:
- Canva App ID;
- whether OAuth completed;
- whether property listing worked;
- whether all 3 datasets imported;
- whether refresh worked;
- any visible error/recovery issue;
- rough row count / latency for Top Queries.

Do **not** send secrets.

On failure, return the exact failing step plus the visible error text. The orchestrator owns the next diagnostic loop.

## Production note

Google public OAuth launch may require brand and/or sensitive-scope verification depending on how Google classifies the configured scope in the production project. P5 must confirm the actual classification and verification requirement in Google Cloud before public release.
