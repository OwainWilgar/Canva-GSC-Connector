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

