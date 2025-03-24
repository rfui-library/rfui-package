import type { ReactNode } from "react";
import { useState } from "react";
import { Table, type TableType } from "./table";

export type SortDirection = "asc" | "desc" | null;

export type HeaderColumn = {
  label: ReactNode;
};

export type SortableHeaderColumn<T> = {
  sortKey: keyof T;
  label: ReactNode;
};

type BaseAdvancedTableType<T> = {
  headerColumns: HeaderColumn[];
  bodyRowsData: T[];
  buildBodyRow: (rowData: T) => ReactNode;
  getRowKey?: (rowData: T) => string | number;
} & Omit<TableType, "children">;

type NoSorting<T> = BaseAdvancedTableType<T> & {
  sortType?: "none";
};

type AutomaticSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "automatic";
  headerColumns: SortableHeaderColumn<T>[];
  onSort?: (key: keyof T | null, direction: SortDirection) => void;
};

type ControlledSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "controlled";
  headerColumns: SortableHeaderColumn<T>[];
  onSort: (key: keyof T | null, direction: SortDirection) => void;
};

type UrlBasedSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "url";
  headerColumns: SortableHeaderColumn<T>[];
  sortKey: keyof T | null;
  sortDirection: SortDirection;
  buildHref: (key: keyof T | null, direction: SortDirection) => string;
};

export type AdvancedTableType<T> =
  | NoSorting<T>
  | AutomaticSorting<T>
  | ControlledSorting<T>
  | UrlBasedSorting<T>;

/**
 * @function AdvancedTable
 *
 * An advanced version of the Table component that handles header columns and body rows data.
 * It supports three different approaches to sorting:
 *
 * 1. Automatic sorting (with internal state)
 * 2. Controlled sorting (via onSort callback)
 * 3. URL-based sorting (via buildHref)
 *
 * @example
 * // Automatic sorting with internal state
 * <AdvancedTable
 *   sortType="automatic"
 *   headerColumns={[
 *     { sortKey: 'name', label: 'Name' },
 *     { sortKey: 'age', label: 'Age' }
 *   ]}
 *   bodyRowsData={data}
 * />
 *
 * // Automatic sorting with external control
 * <AdvancedTable
 *   sortType="automatic"
 *   headerColumns={[
 *     { sortKey: 'name', label: 'Name' },
 *     { sortKey: 'age', label: 'Age' }
 *   ]}
 *   bodyRowsData={data}
 *   onSort={(key, direction) => {
 *     // Handle sorting logic here
 *   }}
 * />
 *
 * // Controlled sorting
 * <AdvancedTable
 *   sortType="controlled"
 *   headerColumns={[
 *     { sortKey: 'name', label: 'Name' },
 *     { sortKey: 'age', label: 'Age' }
 *   ]}
 *   bodyRowsData={data}
 *   onSort={(key, direction) => {
 *     // Handle sorting logic here
 *   }}
 * />
 *
 * // URL-based sorting
 * <AdvancedTable
 *   sortType="url"
 *   headerColumns={[
 *     { sortKey: 'name', label: 'Name' },
 *     { sortKey: 'age', label: 'Age' }
 *   ]}
 *   bodyRowsData={data}
 *   buildHref={(key, direction) =>
 *     `/users?sort=${key}&direction=${direction}`
 *   }
 * />
 */
export const AdvancedTable = <T,>({
  sortType = "none",
  headerColumns,
  bodyRowsData,
  buildBodyRow,
  getRowKey,
  ...props
}: AdvancedTableType<T>) => {
  const isSortable = sortType !== "none";
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleHeaderClick = (column: SortableHeaderColumn<T>) => {
    if (sortType === "automatic") {
      const autoProps = props as AutomaticSorting<T>;
      if (autoProps.onSort) {
        // External sorting control
        if (sortKey === column.sortKey) {
          // Cycle through: asc -> desc -> null
          if (sortDirection === "asc") {
            autoProps.onSort(column.sortKey, "desc");
            setSortDirection("desc");
          } else if (sortDirection === "desc") {
            autoProps.onSort(null, null);
            setSortKey(null);
            setSortDirection(null);
          } else {
            autoProps.onSort(column.sortKey, "asc");
            setSortKey(column.sortKey);
            setSortDirection("asc");
          }
        } else {
          // Start with ascending sort
          autoProps.onSort(column.sortKey, "asc");
          setSortKey(column.sortKey);
          setSortDirection("asc");
        }
      } else {
        // Internal sorting control
        if (sortKey === column.sortKey) {
          // Cycle through: asc -> desc -> null
          if (sortDirection === "asc") {
            setSortDirection("desc");
          } else if (sortDirection === "desc") {
            setSortKey(null);
            setSortDirection(null);
          } else {
            setSortKey(column.sortKey);
            setSortDirection("asc");
          }
        } else {
          // Start with ascending sort
          setSortKey(column.sortKey);
          setSortDirection("asc");
        }
      }
      return;
    } else if (sortType === "controlled") {
      const controlledProps = props as ControlledSorting<T>;
      if (!controlledProps.onSort) return;

      // For controlled sorting, we don't track the current sort state
      // Just toggle between ascending and descending
      controlledProps.onSort(column.sortKey, "asc");
    }
  };

  return (
    <Table {...props}>
      <thead>
        <tr>
          {headerColumns.map((column, index) => (
            <th
              key={`header-${index}`}
              className={isSortable ? "cursor-pointer select-none" : ""}
              onClick={() => {
                if (sortType === "automatic" || sortType === "controlled") {
                  handleHeaderClick(column as SortableHeaderColumn<T>);
                }
              }}
            >
              <div className="flex items-center gap-1">
                {sortType === "url" ? (
                  <a
                    href={(props as UrlBasedSorting<T>).buildHref(
                      (column as SortableHeaderColumn<T>).sortKey,
                      (props as UrlBasedSorting<T>).sortDirection === "desc"
                        ? "asc"
                        : "desc",
                    )}
                    className="no-underline"
                  >
                    {column.label}
                  </a>
                ) : (
                  column.label
                )}
                {sortType === "url" &&
                  (props as UrlBasedSorting<T>).sortKey ===
                    (column as SortableHeaderColumn<T>).sortKey && (
                    <span className="text-xs">
                      {(props as UrlBasedSorting<T>).sortDirection === "asc"
                        ? "↑"
                        : "↓"}
                    </span>
                  )}
                {sortType === "automatic" &&
                  sortKey === (column as SortableHeaderColumn<T>).sortKey && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRowsData.map((rowData, index) => (
          <tr key={getRowKey ? getRowKey(rowData) : `row-${index}`}>
            {buildBodyRow(rowData)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
