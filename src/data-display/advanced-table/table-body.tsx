import { getNestedValue } from "./get-nested-value";
import { AdvancedTableType, SortDirection } from "./types";

type TableBodyType<T> = {
  sortType: AdvancedTableType<T>["sortType"];
  internalSortKey: string | null;
  internalSortDirection: SortDirection;
  rows: T[];
  getRowKey: AdvancedTableType<T>["getRowKey"];
  buildRow: AdvancedTableType<T>["buildRow"];
};

export const TableBody = <T,>({
  sortType,
  internalSortKey,
  internalSortDirection,
  rows: _rows,
  getRowKey,
  buildRow,
}: TableBodyType<T>) => {
  const rows =
    sortType === "automatic" && internalSortKey
      ? getSortedRows(_rows, internalSortKey, internalSortDirection)
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
          {buildRow(row)}
        </tr>
      ))}
    </tbody>
  );
};

const getSortedRows = <T,>(
  rows: T[],
  internalSortKey: string,
  internalSortDirection: SortDirection,
) =>
  [...rows].sort((a, b) => {
    const aValue = getNestedValue(
      a as Record<string, unknown>,
      internalSortKey,
    );
    const bValue = getNestedValue(
      b as Record<string, unknown>,
      internalSortKey,
    );

    if (typeof aValue === "number" && typeof bValue === "number") {
      return internalSortDirection === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    const aString = String(aValue);
    const bString = String(bValue);
    const comparison = aString.localeCompare(bString);

    return internalSortDirection === "asc" ? comparison : -comparison;
  });
