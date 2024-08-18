export function parseIntOrThrow(value: string): number {
  const result = Number.parseInt(value, 10);
  if (Number.isNaN(result)) {
    throw new Error(`Failed to parse integer from input: '${value}'.`);
  }
  return result;
}
