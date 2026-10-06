import { toGetDataTableError } from "../src/gsc/connector_errors";
import { DataRefError } from "../src/gsc/data_ref";
import { GscError } from "../src/gsc/errors";

test.each([
  ["AUTH_REQUIRED", "outdated_source_ref"],
  ["AUTH_REVOKED", "outdated_source_ref"],
  ["PROPERTY_FORBIDDEN", "outdated_source_ref"],
  ["QUOTA_OR_RATE_LIMIT", "remote_request_failed"],
  ["UPSTREAM_TRANSIENT", "remote_request_failed"],
  ["INVALID_QUERY", "app_error"],
])("maps %s to Canva status %s", (code, status) => {
  const result = toGetDataTableError(
    new GscError(
      code as ConstructorParameters<typeof GscError>[0],
      "example",
    ),
  );
  expect(result.status).toBe(status);
});

test("treats stale or invalid saved refs as reselection", () => {
  expect(
    toGetDataTableError(new DataRefError("Outdated data source reference")),
  ).toEqual({ status: "outdated_source_ref" });
});

test("treats browser/network failures as retryable remote failures", () => {
  expect(toGetDataTableError(new TypeError("Failed to fetch"))).toEqual({
    status: "remote_request_failed",
  });
});

test("keeps actionable application errors visible", () => {
  const result = toGetDataTableError(new Error("Selection is invalid"));
  expect(result).toEqual({
    status: "app_error",
    message: "Selection is invalid",
  });
});
