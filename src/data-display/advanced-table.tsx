import type { ReactNode } from "react";
import { Table, type TableType } from "./table";

export type AdvancedTableType<T> = {
  headerColumns: ReactNode[];
  bodyRowsData: T[];
  buildBodyRow: (rowData: T) => ReactNode;
} & Omit<TableType, "children">;

/**
 * @function AdvancedTable
 *
 * An advanced version of the Table component that handles header columns and body rows data.
 * It automatically builds the table structure based on the provided data and render functions.
 *
 * @example
 * <AdvancedTable
 *   headerColumns={['Name', 'Age']}
 *   bodyRowsData={[
 *     { name: 'Alice', age: 19 },
 *     { name: 'Bob', age: 25 }
 *   ]}
 *   buildBodyRow={(row) => (
 *     <>
 *       <td>{row.name}</td>
 *       <td>{row.age}</td>
 *     </>
 *   )}
 * />
 */
export const AdvancedTable = <T,>({
  headerColumns,
  bodyRowsData,
  buildBodyRow,
  ...tableProps
}: AdvancedTableType<T>) => {
  return (
    <Table {...tableProps}>
      <thead>
        <tr>
          {headerColumns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyRowsData.map((rowData, index) => (
          <tr key={index}>{buildBodyRow(rowData)}</tr>
        ))}
      </tbody>
    </Table>
  );
};
