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
  const seconds = new Date(`${value}T00:00:00Z`).valueOf() / 1000;
  if (!Number.isFinite(seconds)) {
    throw new Error(
      "Search Console returned an invalid report date. Try the report again.",
    );
  }

  return { type: "date", value: seconds };
}

function requiredMetric(
  row: SearchAnalyticsRow,
  metric: "clicks" | "impressions" | "ctr" | "position",
): number {
  const value = row[metric];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(
      "Search Console returned an incomplete report row. Try the report again.",
    );
  }
  return value;
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
      const dimension = row.keys?.[0];
      if (typeof dimension !== "string" || !dimension) {
        throw new Error(
          "Search Console returned an incomplete report row. Try the report again.",
        );
      }

      return {
        cells: [
          dataset === "trend"
            ? dateCell(dimension)
            : stringCell(dimension),
          numberCell(requiredMetric(row, "clicks")),
          numberCell(requiredMetric(row, "impressions")),
          numberCell(requiredMetric(row, "ctr")),
          numberCell(requiredMetric(row, "position")),
        ],
      };
    }),
  };
}
