import { isNumericValue } from "../../utilities/is-numeric-value";
import { SortDirection } from "./types";

export const getNewSortState = <T>(
  oldSortDirection: SortDirection,
  oldSortKey: keyof T | null,
  columnSortKey: keyof T,
  rows: T[],
) => {
  let newSortDirection: SortDirection;
  let newSortKey: keyof T | null = oldSortKey;
  const sampleValue = rows[0]?.[columnSortKey];
  const isNumeric = isNumericValue(sampleValue);
  const shouldReorderSameColumn = oldSortKey === columnSortKey;

  if (shouldReorderSameColumn) {
    if (isNumeric) {
      // For numbers: desc -> asc -> null
      if (oldSortDirection === "desc") {
        newSortDirection = "asc";
      } else if (oldSortDirection === "asc") {
        newSortDirection = null;
        newSortKey = null;
      } else {
        newSortDirection = "desc";
        newSortKey = columnSortKey;
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
        newSortKey = columnSortKey;
      }
    }
  } else {
    // When clicking a new column, start with the appropriate direction based on type
    newSortDirection = isNumeric ? "desc" : "asc";
    newSortKey = columnSortKey;
  }

  return { newSortDirection, newSortKey };
};
