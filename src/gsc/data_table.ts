import type {
  DataTable,
  DataTableCell,
} from "@canva/intents/data";
import type { SearchAnalyticsRow } from "./client";
import type { DatasetKind } from "./data_ref";

function stringCell(value: string): DataTableCell {
  return { type: "string", value };
}

function numberCell(value: number): DataTableCell {
  return { type: "number", value };
}

function dateCell(value: string): DataTableCell {
  return {
    type: "date",
    value: new Date(`${value}T00:00:00Z`).valueOf() / 1000,
  };
}

export function buildGscDataTable(
  dataset: DatasetKind,
  rows: SearchAnalyticsRow[],
): DataTable {
  const dimensionLabel =
    dataset === "top_queries"
      ? "Query"
      : dataset === "top_pages"
        ? "Page"
        : "Date";

  return {
    columnConfigs: [
      {
        name: dimensionLabel,
        type: dataset === "trend" ? "date" : "string",
      },
      { name: "Clicks", type: "number" },
      { name: "Impressions", type: "number" },
      { name: "CTR", type: "number" },
      { name: "Average position", type: "number" },
    ],
    rows: rows.map((row) => {
      const dimension = row.keys?.[0] ?? "";
      return {
        cells: [
          dataset === "trend"
            ? dateCell(dimension)
            : stringCell(dimension),
          numberCell(row.clicks ?? 0),
          numberCell(row.impressions ?? 0),
          numberCell(row.ctr ?? 0),
          numberCell(row.position ?? 0),
        ],
      };
    }),
  };
}

