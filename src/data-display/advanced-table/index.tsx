import { useState } from "react";
import { Table } from "../table";
import { getNewSortState } from "./get-new-sort-state";
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
    const { newSortDirection, newSortKey } = getNewSortState(
      internalSortDirection,
      internalSortKey,
      column.sortKey,
      rows,
    );

    if (automaticSortingProps.onSort) {
      automaticSortingProps.onSort(newSortKey, newSortDirection);
    }

    setInternalSortDirection(newSortDirection);
    setInternalSortKey(newSortKey);
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
