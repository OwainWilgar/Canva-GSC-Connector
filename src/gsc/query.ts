import type {
  DateRangePreset,
  DatasetKind,
  GscDataRef,
} from "./data_ref";

export interface SearchAnalyticsRequest {
  startDate: string;
  endDate: string;
  dimensions: string[];
  type: "web";
  rowLimit: number;
  startRow: number;
}

export function dimensionsFor(dataset: DatasetKind): string[] {
  if (dataset === "top_queries") return ["query"];
  if (dataset === "top_pages") return ["page"];
  if (dataset === "trend") return ["date"];
  return ["query"];
}

export function resolveDateRange(
  preset: DateRangePreset,
  now = new Date(),
): { startDate: string; endDate: string } {
  const days =
    preset === "last_7_days"
      ? 7
      : preset === "last_28_days"
        ? 28
        : 90;

  const pacificToday = pacificCalendarDate(now);
  const end = new Date(
    Date.UTC(
      pacificToday.year,
      pacificToday.month - 1,
      pacificToday.day,
    ),
  );
  end.setUTCDate(end.getUTCDate() - 1);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
}

export function buildSearchAnalyticsRequest(
  ref: GscDataRef,
  rowLimit: number,
  now = new Date(),
): SearchAnalyticsRequest {
  const { startDate, endDate } = resolveDateRange(ref.dateRange, now);

  return {
    startDate,
    endDate,
    dimensions: dimensionsFor(ref.dataset),
    type: ref.searchType,
    rowLimit: Math.max(1, Math.min(25_000, rowLimit)),
    startRow: 0,
  };
}

function pacificCalendarDate(
  value: Date,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
  };
}

function formatDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}
