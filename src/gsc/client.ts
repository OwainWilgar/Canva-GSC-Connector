import { classifyHttpError, GscError } from "./errors";
import type { SearchAnalyticsRequest } from "./query";

const API_ROOT = "https://www.googleapis.com/webmasters/v3";

export interface GscProperty {
  siteUrl: string;
  permissionLevel?: string;
}

export interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface SearchAnalyticsResponse {
  rows?: SearchAnalyticsRow[];
}

export async function listProperties(
  accessToken: string,
  signal?: AbortSignal,
): Promise<GscProperty[]> {
  if (!accessToken) {
    throw new GscError(
      "AUTH_REQUIRED",
      "Connect Google before choosing a Search Console property.",
    );
  }

  const response = await fetch(`${API_ROOT}/sites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  });

  if (!response.ok) throw classifyHttpError(response.status);

  const body = (await response.json()) as {
    siteEntry?: GscProperty[];
  };
  return normalizeProperties(body.siteEntry ?? []);
}

export async function querySearchAnalytics(
  accessToken: string,
  property: string,
  request: SearchAnalyticsRequest,
  signal?: AbortSignal,
): Promise<SearchAnalyticsResponse> {
  if (!accessToken) {
    throw new GscError(
      "AUTH_REQUIRED",
      "Connect Google before importing Search Console data.",
    );
  }

  const url =
    `${API_ROOT}/sites/${encodeURIComponent(property)}/searchAnalytics/query`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) throw classifyHttpError(response.status);

  return (await response.json()) as SearchAnalyticsResponse;
}


export function normalizeProperties(
  properties: GscProperty[],
): GscProperty[] {
  const unique = new Map<string, GscProperty>();

  for (const property of properties) {
    const siteUrl = property.siteUrl?.trim();
    if (!siteUrl || unique.has(siteUrl)) continue;
    unique.set(siteUrl, { ...property, siteUrl });
  }

  return [...unique.values()].sort((a, b) => {
    const aIsDomain = a.siteUrl.startsWith("sc-domain:");
    const bIsDomain = b.siteUrl.startsWith("sc-domain:");

    if (aIsDomain !== bIsDomain) {
      return aIsDomain ? -1 : 1;
    }

    return a.siteUrl.localeCompare(b.siteUrl);
  });
}
