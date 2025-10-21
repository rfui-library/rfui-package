import { getNestedValue } from "./get-nested-value";
import { AdvancedTableType, SortDirection } from "./types";

type TableBodyType<T> = {
  sortType: AdvancedTableType<T>["sortType"];
  internalSortKey: string | null;
  internalSortDirection: SortDirection;
  rows: T[];
  getRowKey: AdvancedTableType<T>["getRowKey"];
  buildRow: AdvancedTableType<T>["buildRow"];
  shouldSortLastRow: boolean;
};

export const TableBody = <T,>({
  sortType,
  internalSortKey,
  internalSortDirection,
  rows: _rows,
  getRowKey,
  buildRow,
  shouldSortLastRow,
}: TableBodyType<T>) => {
  const rows =
    sortType === "automatic" && internalSortKey
      ? getSortedRows(
          _rows,
          internalSortKey,
          internalSortDirection,
          shouldSortLastRow,
        )
      : _rows;

  return (
    <tbody>
      {rows.map((row, index) => (
        <tr
          key={
            getRowKey
              ? getRowKey(row)
              : typeof row === "object" && row && "id" in row
                ? `row-${row.id}`
                : `row-${index}`
          }
        >
          {buildRow(row, index)}
        </tr>
      ))}
    </tbody>
  );
};

const getSortedRows = <T,>(
  rows: T[],
  internalSortKey: string,
  internalSortDirection: SortDirection,
  shouldSortLastRow: boolean,
) => {
  const lastRow = rows[rows.length - 1];
  const otherRows = rows.slice(0, -1);
  const rowsToSort = shouldSortLastRow ? rows : otherRows;
  const sortedRows = [...rowsToSort].sort((a, b) => {
    const aValue = getNestedValue(
      a as Record<string, unknown>,
      internalSortKey,
    );
    const bValue = getNestedValue(
      b as Record<string, unknown>,
      internalSortKey,
    );

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    if (aValue === null && bValue === null) return 0;
    if (aValue === undefined && bValue === undefined) return 0;

    // Handle Date objects
    if (aValue instanceof Date && bValue instanceof Date) {
      return internalSortDirection === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Handle numbers
    if (typeof aValue === "number" && typeof bValue === "number") {
      return internalSortDirection === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    // Handle booleans
    if (typeof aValue === "boolean" && typeof bValue === "boolean") {
      return internalSortDirection === "asc"
        ? aValue === bValue
          ? 0
          : aValue
            ? -1
            : 1
        : aValue === bValue
          ? 0
          : aValue
            ? 1
            : -1;
    }

    // Default to string comparison
    const aString = String(aValue);
    const bString = String(bValue);
    const comparison = aString.localeCompare(bString);

    return internalSortDirection === "asc" ? comparison : -comparison;
  });

  return shouldSortLastRow ? sortedRows : [...sortedRows, lastRow];
};
