import {
  DataRefError,
  decodeDataRef,
  encodeDataRef,
  type GscDataRef,
} from "../src/gsc/data_ref";

test("round trips a refreshable non-secret data ref", () => {
  const ref: GscDataRef = {
    v: 1,
    property: "https://example.com/",
    dataset: "trend",
    dateRange: "last_90_days",
    searchType: "web",
  };

  expect(decodeDataRef(encodeDataRef(ref))).toEqual(ref);
});

test("rejects unknown ref versions", () => {
  expect(() =>
    decodeDataRef(
      JSON.stringify({
        v: 99,
        property: "x",
        dataset: "trend",
        dateRange: "last_7_days",
        searchType: "web",
      }),
    ),
  ).toThrow("Outdated");
});

test("rejects malformed JSON with a typed data-ref error", () => {
  expect(() => decodeDataRef("{")).toThrow(DataRefError);
});

test("drops unknown fields instead of propagating them", () => {
  const decoded = decodeDataRef(
    JSON.stringify({
      v: 1,
      property: "sc-domain:example.com",
      dataset: "top_queries",
      dateRange: "last_28_days",
      searchType: "web",
      accessToken: "must-not-survive",
    }),
  );

  expect(decoded).toEqual({
    v: 1,
    property: "sc-domain:example.com",
    dataset: "top_queries",
    dateRange: "last_28_days",
    searchType: "web",
  });
  expect("accessToken" in decoded).toBe(false);
});

test.each([
  ["bad_dataset", "last_28_days", "web"],
  ["trend", "all_time", "web"],
  ["trend", "last_28_days", "image"],
])("rejects unsupported selection values", (dataset, dateRange, searchType) => {
  expect(() =>
    decodeDataRef(
      JSON.stringify({
        v: 1,
        property: "https://example.com/",
        dataset,
        dateRange,
        searchType,
      }),
    ),
  ).toThrow(DataRefError);
});
