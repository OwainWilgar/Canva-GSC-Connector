import { auth } from "@canva/user";

export const GOOGLE_SEARCH_CONSOLE_SCOPE = new Set([
  "https://www.googleapis.com/auth/webmasters.readonly",
]);

const GOOGLE_REFRESH_QUERY = new Map([
  ["access_type", "offline"],
  ["prompt", "select_account"],
]);

export async function getGoogleAccessToken(forceRefresh = false) {
  const oauth = auth.initOauth();
  return oauth.getAccessToken({
    scope: GOOGLE_SEARCH_CONSOLE_SCOPE,
    forceRefresh,
  });
}

export async function authorizeGoogle() {
  const oauth = auth.initOauth();
  return oauth.requestAuthorization({
    scope: GOOGLE_SEARCH_CONSOLE_SCOPE,
    queryParams: GOOGLE_REFRESH_QUERY,
  });
}
