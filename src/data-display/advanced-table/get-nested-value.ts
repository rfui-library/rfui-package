export const getNestedValue = (
  obj: Record<string, unknown>,
  path: string,
): unknown => {
  return path.split(".").reduce((acc, part) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[part];
  }, obj);
};
