import { useState } from "react";
import { isNumericValue } from "../../utilities/is-numeric-value";
import { Table } from "../table";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
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
  const [internalSortKey, setInternalSortKey] = useState<keyof T | null>(null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(null);
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

  return (
    <Table {...props.tableProps}>
      <TableHeader
        props={props}
        internalSortKey={internalSortKey}
        internalSortDirection={internalSortDirection}
        handleHeaderClick={handleHeaderClick}
      />
      <TableBody
        sortType={props.sortType}
        internalSortKey={internalSortKey}
        internalSortDirection={internalSortDirection}
        rows={rows}
        getRowKey={getRowKey}
        buildRow={buildRow}
      />
    </Table>
  );
};
