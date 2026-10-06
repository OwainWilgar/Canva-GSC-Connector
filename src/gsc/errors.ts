export type GscErrorCode =
  | "AUTH_REQUIRED"
  | "AUTH_REVOKED"
  | "PROPERTY_FORBIDDEN"
  | "QUOTA_OR_RATE_LIMIT"
  | "INVALID_QUERY"
  | "UPSTREAM_TRANSIENT"
  | "UNKNOWN";

export class GscError extends Error {
  constructor(
    public readonly code: GscErrorCode,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "GscError";
  }
}

export function classifyHttpError(status: number): GscError {
  if (status === 401) {
    return new GscError(
      "AUTH_REVOKED",
      "Google authorization expired or was revoked. Reconnect Google and try again.",
      status,
    );
  }
  if (status === 403 || status === 404) {
    return new GscError(
      "PROPERTY_FORBIDDEN",
      "This Google account cannot access the selected Search Console property. Choose an available property or reconnect Google.",
      status,
    );
  }
  if (status === 429) {
    return new GscError(
      "QUOTA_OR_RATE_LIMIT",
      "Google Search Console is temporarily rate limiting requests. Try again shortly.",
      status,
    );
  }
  if (status === 400) {
    return new GscError(
      "INVALID_QUERY",
      "Search Console could not run this report selection. Review the property and date range.",
      status,
    );
  }
  if (status >= 500) {
    return new GscError(
      "UPSTREAM_TRANSIENT",
      "Google Search Console is temporarily unavailable. Try again.",
      status,
    );
  }
  return new GscError("UNKNOWN", "Search Console request failed.", status);
}
