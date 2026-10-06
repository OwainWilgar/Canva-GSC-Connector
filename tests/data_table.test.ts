import { buildGscDataTable } from "../src/gsc/data_table";

test("returns a valid empty Top Queries table", () => {
  const table = buildGscDataTable("top_queries", []);

  expect(table.rows).toEqual([]);
  expect(table.columnConfigs?.map((column) => column.name)).toEqual([
    "Query",
    "Clicks",
    "Impressions",
    "CTR",
    "Average position",
  ]);
});

test("returns a valid empty Trend table", () => {
  const table = buildGscDataTable("trend", []);

  expect(table.rows).toEqual([]);
  expect(table.columnConfigs?.[0]).toEqual({
    name: "Date",
    type: "date",
  });
});

test("shapes Top Queries metrics without changing Search Console meaning", () => {
  const table = buildGscDataTable("top_queries", [
    {
      keys: ["canva search console"],
      clicks: 12,
      impressions: 120,
      ctr: 0.1,
      position: 3.5,
    },
  ]);

  expect(table.rows[0]?.cells).toEqual([
    { type: "string", value: "canva search console" },
    { type: "number", value: 12 },
    { type: "number", value: 120 },
    { type: "number", value: 0.1 },
    { type: "number", value: 3.5 },
  ]);
});

test("preserves full page identity for Top Pages", () => {
  const page = "https://example.com/a/long/reporting-page/";
  const table = buildGscDataTable("top_pages", [
    {
      keys: [page],
      clicks: 5,
      impressions: 80,
      ctr: 0.0625,
      position: 8,
    },
  ]);

  expect(table.columnConfigs?.[0]?.name).toBe("Page");
  expect(table.rows[0]?.cells[0]).toEqual({
    type: "string",
    value: page,
  });
});

test("converts Trend dates to Canva date cells without fabricating dates", () => {
  const table = buildGscDataTable("trend", [
    {
      keys: ["2026-10-01"],
      clicks: 3,
      impressions: 30,
      ctr: 0.1,
      position: 4,
    },
  ]);

  expect(table.rows).toHaveLength(1);
  expect(table.rows[0]?.cells[0]).toEqual({
    type: "date",
    value: new Date("2026-10-01T00:00:00Z").valueOf() / 1000,
  });
});
