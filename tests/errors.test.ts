import { classifyHttpError } from "../src/gsc/errors";

test.each([
  [401, "AUTH_REVOKED"],
  [403, "PROPERTY_FORBIDDEN"],
  [404, "PROPERTY_FORBIDDEN"],
  [429, "QUOTA_OR_RATE_LIMIT"],
  [400, "INVALID_QUERY"],
  [503, "UPSTREAM_TRANSIENT"],
])("classifies %s", (status, code) => {
  expect(classifyHttpError(status as number).code).toBe(code);
});

test("all mapped Google errors use user-actionable copy", () => {
  expect(classifyHttpError(401).message).toContain("Reconnect");
  expect(classifyHttpError(403).message).toContain("Choose");
  expect(classifyHttpError(429).message).toContain("Try again");
  expect(classifyHttpError(503).message).toContain("Try again");
});
