export function transformIfNotUndefined<T, U>(
  value: T | undefined,
  transformer: (value: T) => U,
): U | undefined {
  return value !== undefined ? transformer(value) : undefined;
}
