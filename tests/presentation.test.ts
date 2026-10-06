import {
  dataSourceTitle,
  datasetDescription,
  datasetLabel,
  dateRangeDescription,
  propertyLabel,
} from "../src/gsc/presentation";

test("uses marketer-facing dataset labels", () => {
  expect(datasetLabel("top_queries")).toBe("Top Queries");
  expect(datasetLabel("top_pages")).toBe("Top Pages");
  expect(datasetLabel("trend")).toBe("Trend");
  expect(datasetDescription("top_queries")).toContain("Search terms");
});

test("makes domain properties readable without changing their stored identity", () => {
  expect(propertyLabel("sc-domain:example.com")).toBe(
    "Domain · example.com",
  );
  expect(propertyLabel("https://example.com/")).toBe(
    "https://example.com/",
  );
});

test("keeps Canva data source titles within the 255-character contract", () => {
  const title = dataSourceTitle(
    "top_pages",
    `https://example.com/${"x".repeat(400)}`,
  );
  expect(title.length).toBeLessThanOrEqual(255);
  expect(title.endsWith("...")).toBe(true);
});

test("explains that date ranges roll forward on refresh", () => {
  expect(dateRangeDescription("last_28_days")).toContain("Rolling 28-day");
  expect(dateRangeDescription("last_28_days")).toContain("refreshes");
});
