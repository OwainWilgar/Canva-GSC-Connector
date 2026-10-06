import {
  DEFAULT_REPORT_ROW_LIMIT,
  REQUIRED_COLUMN_COUNT,
  resolveReportRowLimit,
} from "../src/gsc/limits";

test("uses Canva row limits without subtracting a header row", () => {
  expect(resolveReportRowLimit({ row: 1, column: 5 })).toBe(1);
});

test("caps report rows at the product default", () => {
  expect(resolveReportRowLimit({ row: 25_000, column: 10 })).toBe(
    DEFAULT_REPORT_ROW_LIMIT,
  );
});

test("rejects a surface with too few columns", () => {
  expect(() =>
    resolveReportRowLimit({
      row: 100,
      column: REQUIRED_COLUMN_COUNT - 1,
    }),
  ).toThrow("needs 5");
});
