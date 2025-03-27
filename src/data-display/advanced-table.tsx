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
  bodyRowsData: T[];
  buildBodyRow: (rowData: T) => ReactNode;
  getRowKey?: (rowData: T) => string | number;
  tableProps?: Omit<TableType, "children">;
};

type NoSorting<T> = BaseAdvancedTableType<T> & {
  sortType?: "none";
  headerColumns: HeaderColumn[];
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
 */
export const AdvancedTable = <T,>(props: AdvancedTableType<T>) => {
  const { bodyRowsData, buildBodyRow, getRowKey } = props;
  const isSortable = props.sortType && props.sortType !== "none";
  const [internalSortKey, setInternalSortKey] = useState<keyof T | null>(null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(null);
  const isNumericValue = (value: unknown): boolean => {
    return typeof value === "number" && !isNaN(value);
  };
  const handleHeaderClick = (column: SortableHeaderColumn<T>) => {
    if (props.sortType === "automatic") {
      handleAutomaticSort(column, props);
    }
  };
  const handleAutomaticSort = (
    column: SortableHeaderColumn<T>,
    automaticSortingProps: AutomaticSorting<T>,
  ) => {
    let newSortDirection: SortDirection;
    let newSortKey: keyof T | null | undefined = undefined;

    if (internalSortKey === column.sortKey) {
      const sampleValue = bodyRowsData[0]?.[column.sortKey];
      const isNumeric = isNumericValue(sampleValue);

      if (isNumeric) {
        // For numbers: desc -> asc -> null
        if (internalSortDirection === "desc") {
          newSortDirection = "asc";
        } else if (internalSortDirection === "asc") {
          newSortDirection = null;
          newSortKey = null;
        } else {
          newSortDirection = "desc";
          newSortKey = column.sortKey;
        }
      } else {
        // For other types: asc -> desc -> null
        if (internalSortDirection === "asc") {
          newSortDirection = "desc";
        } else if (internalSortDirection === "desc") {
          newSortDirection = null;
          newSortKey = null;
        } else {
          newSortDirection = "asc";
          newSortKey = column.sortKey;
        }
      }
    } else {
      // When clicking a new column, start with the appropriate direction based on type
      const sampleValue = bodyRowsData[0]?.[column.sortKey];
      const isNumeric = isNumericValue(sampleValue);
      newSortDirection = isNumeric ? "desc" : "asc";
      newSortKey = column.sortKey;
    }

    if (automaticSortingProps.onSort) {
      automaticSortingProps.onSort(column.sortKey, newSortDirection);
    }

    setInternalSortDirection(newSortDirection);

    if (newSortKey !== undefined) {
      setInternalSortKey(newSortKey);
    }
  };
  const potentiallySortedBodyRowsData =
    props.sortType === "automatic" && internalSortKey
      ? [...bodyRowsData].sort((a, b) =>
          internalSortDirection === "asc"
            ? a[internalSortKey] > b[internalSortKey]
              ? 1
              : -1
            : a[internalSortKey] > b[internalSortKey]
              ? -1
              : 1,
        )
      : bodyRowsData;

  return (
    <Table {...props.tableProps}>
      <thead>
        <tr>
          {props.headerColumns.map((column, index) => (
            <th
              key={`header-${index}`}
              className={isSortable ? "cursor-pointer select-none" : ""}
              onClick={() => {
                if (
                  props.sortType === "automatic" ||
                  props.sortType === "controlled"
                ) {
                  handleHeaderClick(column as SortableHeaderColumn<T>);
                }
              }}
            >
              <div className="flex items-center gap-1">
                {props.sortType === "url" ? (
                  <a
                    href={props.buildHref(
                      (column as SortableHeaderColumn<T>).sortKey,
                      props.sortDirection === "desc" ? "asc" : "desc",
                    )}
                    className="no-underline"
                  >
                    {column.label}
                  </a>
                ) : (
                  column.label
                )}
                {props.sortType === "url" && (
                  <SortArrows
                    isVisible={
                      props.sortKey ===
                      (column as SortableHeaderColumn<T>).sortKey
                    }
                    sortDirection={props.sortDirection}
                  />
                )}
                {props.sortType === "automatic" && (
                  <SortArrows
                    isVisible={
                      internalSortKey ===
                      (column as SortableHeaderColumn<T>).sortKey
                    }
                    sortDirection={internalSortDirection}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {potentiallySortedBodyRowsData.map((rowData, index) => (
          <tr key={getRowKey ? getRowKey(rowData) : `row-${index}`}>
            {buildBodyRow(rowData)}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const SortArrows = ({
  isVisible,
  sortDirection,
}: {
  isVisible: boolean;
  sortDirection: SortDirection;
}) => {
  return (
    <span
      className={`ml-0.5 inline-block text-xs ${isVisible ? "" : "invisible"}`}
    >
      {sortDirection === "asc" ? "⏶" : "⏷"}
    </span>
  );
};
