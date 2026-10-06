import type { DatasetKind, DateRangePreset } from "./data_ref";

export const DATASET_OPTIONS: ReadonlyArray<{
  value: DatasetKind;
  label: string;
}> = [
  { value: "top_queries", label: "Top Queries" },
  { value: "top_pages", label: "Top Pages" },
  { value: "trend", label: "Trend" },
];

export const DATE_RANGE_OPTIONS: ReadonlyArray<{
  value: DateRangePreset;
  label: string;
}> = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

export function datasetLabel(dataset: DatasetKind): string {
  if (dataset === "top_queries") return "Top Queries";
  if (dataset === "top_pages") return "Top Pages";
  return "Trend";
}

export function datasetDescription(dataset: DatasetKind): string {
  if (dataset === "top_queries") {
    return "Search terms with clicks, impressions, CTR and average position.";
  }
  if (dataset === "top_pages") {
    return "Landing pages with clicks, impressions, CTR and average position.";
  }
  return "Daily clicks, impressions, CTR and average position over time.";
}

export function propertyLabel(property: string): string {
  if (property.startsWith("sc-domain:")) {
    return `Domain · ${property.slice("sc-domain:".length)}`;
  }

  return property;
}

export function dataSourceTitle(
  dataset: DatasetKind,
  property: string,
): string {
  const title = `${datasetLabel(dataset)} · ${propertyLabel(property)}`;
  return title.length <= 255 ? title : `${title.slice(0, 252)}...`;
}

export function dateRangeDescription(dateRange: DateRangePreset): string {
  const days =
    dateRange === "last_7_days"
      ? 7
      : dateRange === "last_28_days"
        ? 28
        : 90;

  return `Rolling ${days}-day period ending yesterday. It advances when Canva refreshes the data.`;
}
