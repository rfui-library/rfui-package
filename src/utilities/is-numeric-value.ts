export const isNumericValue = (value: unknown): boolean => {
  return typeof value === "number" && !isNaN(value);
};
