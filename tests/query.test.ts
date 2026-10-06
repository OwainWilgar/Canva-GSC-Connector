import {
  buildSearchAnalyticsRequest,
  dimensionsFor,
  resolveDateRange,
} from "../src/gsc/query";
import type { GscDataRef } from "../src/gsc/data_ref";

test("maps datasets to exactly one reporting dimension", () => {
  expect(dimensionsFor("top_queries")).toEqual(["query"]);
  expect(dimensionsFor("top_pages")).toEqual(["page"]);
  expect(dimensionsFor("trend")).toEqual(["date"]);
});

test("resolves rolling periods through yesterday in Search Console Pacific time", () => {
  expect(
    resolveDateRange(
      "last_7_days",
      new Date("2026-10-06T12:00:00Z"),
    ),
  ).toEqual({
    startDate: "2026-09-29",
    endDate: "2026-10-05",
  });
});

test("does not advance the reporting day before Pacific midnight", () => {
  expect(
    resolveDateRange(
      "last_7_days",
      new Date("2026-10-06T01:00:00Z"),
    ),
  ).toEqual({
    startDate: "2026-09-28",
    endDate: "2026-10-04",
  });
});

test("caps GSC row limit at 25000", () => {
  const ref: GscDataRef = {
    v: 1,
    property: "sc-domain:example.com",
    dataset: "top_queries",
    dateRange: "last_28_days",
    searchType: "web",
  };

  expect(
    buildSearchAnalyticsRequest(
      ref,
      50_000,
      new Date("2026-10-06T12:00:00Z"),
    ).rowLimit,
  ).toBe(25_000);
});
