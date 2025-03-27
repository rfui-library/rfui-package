import { AdvancedTableType, SortDirection } from "./types";

type TableBodyType<T> = {
  sortType: AdvancedTableType<T>["sortType"];
  internalSortKey: keyof T | null;
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
        <tr key={getRowKey ? getRowKey(row) : `row-${index}`}>
          {buildRow(row)}
        </tr>
      ))}
    </tbody>
  );
};

const getSortedRows = <T,>(
  rows: T[],
  internalSortKey: keyof T,
  internalSortDirection: SortDirection,
) =>
  [...rows].sort((a, b) => {
    const comparison = a[internalSortKey] > b[internalSortKey] ? 1 : -1;

    return internalSortDirection === "asc" ? comparison : -comparison;
  });
