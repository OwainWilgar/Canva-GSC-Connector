import {
  clearDiagnostics,
  getDiagnostics,
  subscribeDiagnostics,
  traceDiagnostic,
} from "../src/gsc/diagnostics";

afterEach(() => {
  clearDiagnostics();
});

test("records primitive JSON diagnostic lines", () => {
  traceDiagnostic("example", {
    rows: 0,
    columns: 5,
    aborted: false,
  });

  expect(getDiagnostics()).toEqual([
    expect.stringContaining(
      '[GSC connector] example {"at":"',
    ),
  ]);
  expect(getDiagnostics()[0]).toContain('"rows":0');
  expect(getDiagnostics()[0]).toContain('"columns":5');
  expect(getDiagnostics()[0]).toContain('"aborted":false');
});

test("publishes later lifecycle entries to subscribers", () => {
  const snapshots: string[][] = [];
  const unsubscribe = subscribeDiagnostics((next) => {
    snapshots.push(next);
  });

  traceDiagnostic("getDataTable start", { rowLimit: 100 });
  traceDiagnostic("data table summary", { rows: 0, columns: 5 });
  unsubscribe();

  expect(snapshots.at(-1)).toHaveLength(2);
  expect(snapshots.at(-1)?.[1]).toContain("data table summary");
});
