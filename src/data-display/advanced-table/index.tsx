import { useState } from "react";
import { Table } from "../table";
import { getNewSortState } from "./get-new-sort-state";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
import type {
  AdvancedTableType,
  AutomaticSorting,
  ControlledSorting,
  SortableColumn,
  SortDirection,
} from "./types";

export type { AdvancedTableType, SortDirection };

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
 * // Automatic sorting example
 * <AdvancedTable
 *   sortType="automatic"
 *   columns={[
 *     { label: "Name", sortKey: "name" },
 *     { label: "Age", sortKey: "age" },
 *   ]}
 *   rows={[
 *     { name: "Alice", age: 19 },
 *     { name: "Bob", age: 25 },
 *   ]}
 *   buildRow={(row: RowData) => (
 *     <>
 *       <td>{row.name}</td>
 *       <td>{row.age}</td>
 *     </>
 *   )}
 *   onSort={(sortKey, sortType) => {
 *     console.log(sortKey, sortType);
 *   }}
 * />
 *
 * @example
 * // URL-based sorting example
 * <AdvancedTable
 *   sortType="url"
 *   columns={[
 *     { label: "Name", sortKey: "name" },
 *     { label: "Age", sortKey: "age" },
 *   ]}
 *   rows={[
 *     { name: "Alice", age: 19 },
 *     { name: "Bob", age: 25 },
 *   ]}
 *   buildHref={(key, direction) =>
 *     `/users?sort=${key}&direction=${direction}`
 *   }
 *   buildRow={(row: RowData) => (
 *     <>
 *       <td>{row.name}</td>
 *       <td>{row.age}</td>
 *     </>
 *   )}
 *   sortKey={null}
 *   sortDirection={null}
 * />
 */
export const AdvancedTable = <T,>(props: AdvancedTableType<T>) => {
  const { rows, buildRow, getRowKey } = props;
  const [internalSortKey, setInternalSortKey] = useState<string | null>(null);
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(null);
  const handleColumnClick = (column: SortableColumn) => {
    if (props.sortType === "automatic") {
      handleAutomaticSort(column, props);
    } else if (props.sortType === "controlled") {
      handleControlledSort(column, props);
    }
  };
  const handleAutomaticSort = (
    column: SortableColumn,
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
  const handleControlledSort = (
    column: SortableColumn,
    controlledSortingProps: ControlledSorting<T>,
  ) => {
    const { newSortDirection, newSortKey } = getNewSortState(
      controlledSortingProps.sortDirection,
      controlledSortingProps.sortKey,
      column.sortKey,
      rows,
    );

    controlledSortingProps.onSort(newSortKey, newSortDirection);
  };

  return (
    <Table {...props.tableProps}>
      <TableHeader
        props={props}
        internalSortKey={internalSortKey}
        internalSortDirection={internalSortDirection}
        handleColumnClick={handleColumnClick}
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
