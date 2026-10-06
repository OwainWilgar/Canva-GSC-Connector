import {
  buildGscDataTable,
  buildRefreshProofRows,
} from "../src/gsc/data_table";

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


test("refresh proof row visibly changes with invocation time", () => {
  const first = buildRefreshProofRows(
    new Date("2026-10-06T18:00:00Z"),
  );
  const second = buildRefreshProofRows(
    new Date("2026-10-06T18:01:00Z"),
  );

  expect(first[0]?.keys?.[0]).not.toBe(second[0]?.keys?.[0]);
  expect(first[0]?.clicks).toBe(1);
});
