export const isNumeric = (value: unknown): boolean => {
  return typeof value === "number" && !isNaN(value);
};
