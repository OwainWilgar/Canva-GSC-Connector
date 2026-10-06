export const REQUIRED_COLUMN_COUNT = 5;
export const DEFAULT_REPORT_ROW_LIMIT = 1_000;

export function resolveReportRowLimit(limit: {
  row: number;
  column: number;
}): number {
  if (limit.column < REQUIRED_COLUMN_COUNT) {
    throw new Error(
      `This Canva surface allows ${limit.column} columns, but this report needs ${REQUIRED_COLUMN_COUNT}.`,
    );
  }

  if (limit.row < 1) {
    throw new Error(
      "This Canva surface does not have enough rows available for this report.",
    );
  }

  return Math.min(DEFAULT_REPORT_ROW_LIMIT, limit.row);
}
