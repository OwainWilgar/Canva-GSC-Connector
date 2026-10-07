type DiagnosticFields = Record<
  string,
  string | number | boolean | null | undefined | object
>;

const MAX_LINES = 40;
let lines: string[] = [];
const listeners = new Set<(next: string[]) => void>();

function publish() {
  const snapshot = [...lines];
  for (const listener of listeners) listener(snapshot);
}

export function clearDiagnostics() {
  lines = [];
  publish();
}

export function traceDiagnostic(
  event: string,
  fields: DiagnosticFields = {},
): string {
  const line =
    `[GSC connector] ${event} ` +
    JSON.stringify({
      at: new Date().toISOString(),
      ...fields,
    });

  lines = [...lines.slice(-(MAX_LINES - 1)), line];
  console.debug(line);
  publish();
  return line;
}

export function getDiagnostics(): string[] {
  return [...lines];
}

export function subscribeDiagnostics(
  listener: (next: string[]) => void,
): () => void {
  listeners.add(listener);
  listener(getDiagnostics());

  return () => {
    listeners.delete(listener);
  };
}
