import { useState } from "react";
import { Table } from "../table";
import { getPotentiallySortedRows } from "./get-potentially-sorted-rows";
import type {
  AdvancedTableType,
  AutomaticSorting,
  SortableColumn,
  SortDirection,
} from "./types";

export type { AdvancedTableType };

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
  const { rows, buildRow, getRowKey } = props;
  const isSortable = props.sortType && props.sortType !== "none";
  const [internalSortKey, setInternalSortKey] = useState<keyof T | null>(null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(null);
  const isNumericValue = (value: unknown): boolean => {
    return typeof value === "number" && !isNaN(value);
  };
  const handleHeaderClick = (column: SortableColumn<T>) => {
    if (props.sortType === "automatic") {
      handleAutomaticSort(column, props);
    }
  };
  const handleAutomaticSort = (
    column: SortableColumn<T>,
    automaticSortingProps: AutomaticSorting<T>,
  ) => {
    let newSortDirection: SortDirection;
    let newSortKey: keyof T | null | undefined = undefined;

    if (internalSortKey === column.sortKey) {
      const sampleValue = rows[0]?.[column.sortKey];
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
      const sampleValue = rows[0]?.[column.sortKey];
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
  const potentiallySortedRows = getPotentiallySortedRows<T>(
    props.sortType,
    rows,
    internalSortKey,
    internalSortDirection,
  );

  return (
    <Table {...props.tableProps}>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th
              key={`header-${index}`}
              className={isSortable ? "cursor-pointer select-none" : ""}
              onClick={() => {
                if (
                  props.sortType === "automatic" ||
                  props.sortType === "controlled"
                ) {
                  handleHeaderClick(column as SortableColumn<T>);
                }
              }}
            >
              <div className="flex items-center gap-1">
                {props.sortType === "url" ? (
                  <a
                    href={props.buildHref(
                      (column as SortableColumn<T>).sortKey,
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
                      props.sortKey === (column as SortableColumn<T>).sortKey
                    }
                    sortDirection={props.sortDirection}
                  />
                )}
                {props.sortType === "automatic" && (
                  <SortArrows
                    isVisible={
                      internalSortKey === (column as SortableColumn<T>).sortKey
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
        {potentiallySortedRows.map((row, index) => (
          <tr key={getRowKey ? getRowKey(row) : `row-${index}`}>
            {buildRow(row)}
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
