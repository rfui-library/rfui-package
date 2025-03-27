import type { AdvancedTableType, SortDirection } from "./types";

export const getPotentiallySortedRows = <T>(
  sortType: AdvancedTableType<T>["sortType"],
  rows: T[],
  internalSortKey: keyof T | null,
  internalSortDirection: SortDirection,
) =>
  sortType === "automatic" && internalSortKey
    ? [...rows].sort((a, b) =>
        internalSortDirection === "asc"
          ? a[internalSortKey] > b[internalSortKey]
            ? 1
            : -1
          : a[internalSortKey] > b[internalSortKey]
            ? -1
            : 1,
      )
    : rows;
