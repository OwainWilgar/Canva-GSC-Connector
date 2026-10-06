export const DATA_REF_VERSION = 1 as const;

export type DatasetKind = "top_queries" | "top_pages" | "trend";
export type DateRangePreset =
  | "last_7_days"
  | "last_28_days"
  | "last_90_days";

export interface GscDataRef {
  v: typeof DATA_REF_VERSION;
  property: string;
  dataset: DatasetKind;
  dateRange: DateRangePreset;
  searchType: "web";
}

export class DataRefError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataRefError";
  }
}

export function encodeDataRef(ref: GscDataRef): string {
  return JSON.stringify(ref);
}

export function decodeDataRef(source: string): GscDataRef {
  let value: unknown;

  try {
    value = JSON.parse(source);
  } catch {
    throw new DataRefError("Invalid data source reference");
  }

  if (!value || typeof value !== "object") {
    throw new DataRefError("Invalid data source reference");
  }

  const ref = value as Partial<GscDataRef>;
  if (ref.v !== DATA_REF_VERSION) {
    throw new DataRefError("Outdated data source reference");
  }
  if (typeof ref.property !== "string" || !ref.property.trim()) {
    throw new DataRefError("Missing Search Console property");
  }
  if (!isDatasetKind(ref.dataset)) {
    throw new DataRefError("Invalid dataset");
  }
  if (!isDateRangePreset(ref.dateRange)) {
    throw new DataRefError("Invalid date range");
  }
  if (ref.searchType !== "web") {
    throw new DataRefError("Unsupported search type");
  }

  // Rebuild the object instead of returning the parsed value so unknown
  // properties (including accidental credential material) never propagate.
  return {
    v: DATA_REF_VERSION,
    property: ref.property,
    dataset: ref.dataset,
    dateRange: ref.dateRange,
    searchType: "web",
  };
}

export function isDatasetKind(value: unknown): value is DatasetKind {
  return value === "top_queries" || value === "top_pages" || value === "trend";
}

export function isDateRangePreset(value: unknown): value is DateRangePreset {
  return (
    value === "last_7_days" ||
    value === "last_28_days" ||
    value === "last_90_days"
  );
}
