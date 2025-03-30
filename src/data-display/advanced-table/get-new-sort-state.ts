import { isNumeric } from "../../utilities/is-numeric-value";
import { SortDirection } from "./types";

export const getNewSortState = <T>(
  oldSortDirection: SortDirection,
  oldSortKey: string | null,
  columnSortKey: string,
  rows: T[],
) => {
  let newSortDirection: SortDirection;
  let newSortKey: string | null = oldSortKey;

  const sampleValue = getSampleValue(rows, columnSortKey);
  const isNumericValue = isNumeric(sampleValue);
  const shouldReorderSameColumn = oldSortKey === columnSortKey;

  if (shouldReorderSameColumn) {
    if (isNumericValue) {
      // For numbers: desc -> asc -> null
      if (oldSortDirection === "desc") {
        newSortDirection = "asc";
      } else if (oldSortDirection === "asc") {
        newSortDirection = null;
        newSortKey = null;
      } else {
        newSortDirection = "desc";
      }
    } else {
      // For other types: asc -> desc -> null
      if (oldSortDirection === "asc") {
        newSortDirection = "desc";
      } else if (oldSortDirection === "desc") {
        newSortDirection = null;
        newSortKey = null;
      } else {
        newSortDirection = "asc";
      }
    }
  } else {
    // When clicking a new column, start with the appropriate direction based on type
    newSortDirection = isNumericValue ? "desc" : "asc";
    newSortKey = columnSortKey;
  }

  return { newSortDirection, newSortKey };
};

const getSampleValue = <T>(rows: T[], columnSortKey: string): unknown => {
  const firstValidValue = rows
    .map((row) => (row as Record<string, unknown>)[columnSortKey])
    .filter((value): value is NonNullable<unknown> => value != null)[0];

  return firstValidValue ?? null;
};
