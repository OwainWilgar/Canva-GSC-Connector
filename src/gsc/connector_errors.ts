import type { GetDataTableResponse } from "@canva/intents/data";
import { DataRefError } from "./data_ref";
import { GscError } from "./errors";

export function toGetDataTableError(
  error: unknown,
): GetDataTableResponse {
  if (error instanceof DataRefError) {
    return { status: "outdated_source_ref" };
  }

  if (error instanceof GscError) {
    if (
      error.code === "AUTH_REQUIRED" ||
      error.code === "AUTH_REVOKED" ||
      error.code === "PROPERTY_FORBIDDEN"
    ) {
      return { status: "outdated_source_ref" };
    }

    if (
      error.code === "QUOTA_OR_RATE_LIMIT" ||
      error.code === "UPSTREAM_TRANSIENT"
    ) {
      return { status: "remote_request_failed" };
    }

    return { status: "app_error", message: error.message };
  }

  if (
    error instanceof TypeError ||
    (error instanceof DOMException && error.name === "AbortError")
  ) {
    return { status: "remote_request_failed" };
  }

  return {
    status: "app_error",
    message:
      error instanceof Error
        ? error.message
        : "Search Console request failed.",
  };
}
