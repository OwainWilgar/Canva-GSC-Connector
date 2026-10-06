import {
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
