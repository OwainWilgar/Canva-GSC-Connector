export const DATA_REF_VERSION = 1 as const;

export type DatasetKind =
  | "top_queries"
  | "top_pages"
  | "trend"
  | "proof_fixture";
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

export function encodeDataRef(ref: GscDataRef): string {
  return JSON.stringify(ref);
}

export function decodeDataRef(source: string): GscDataRef {
  const value: unknown = JSON.parse(source);
  if (!value || typeof value !== "object") {
    throw new Error("Invalid data source reference");
  }

  const ref = value as Partial<GscDataRef>;
  if (ref.v !== DATA_REF_VERSION) {
    throw new Error("Outdated data source reference");
  }
  if (typeof ref.property !== "string" || !ref.property) {
    throw new Error("Missing Search Console property");
  }
  if (!isDatasetKind(ref.dataset)) {
    throw new Error("Invalid dataset");
  }
  if (!isDateRangePreset(ref.dateRange)) {
    throw new Error("Invalid date range");
  }
  if (ref.searchType !== "web") {
    throw new Error("Unsupported search type");
  }

  return ref as GscDataRef;
}

export function isDatasetKind(value: unknown): value is DatasetKind {
  return (
    value === "top_queries" ||
    value === "top_pages" ||
    value === "trend" ||
    value === "proof_fixture"
  );
}

export function isDateRangePreset(value: unknown): value is DateRangePreset {
  return (
    value === "last_7_days" ||
    value === "last_28_days" ||
    value === "last_90_days"
  );
}
