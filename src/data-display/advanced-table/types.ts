import { ReactNode } from "react";
import { TableType } from "../table";

export type SortDirection = "asc" | "desc" | null;

export type BaseColumn = {
  label: ReactNode;
};

export type SortableColumn = BaseColumn & {
  sortKey: string;
};

export type BaseAdvancedTableType<T> = {
  rows: T[];
  buildRow: (row: T) => ReactNode;
  getRowKey?: (row: T) => string | number;
  tableProps?: Omit<TableType, "children">;
};

export type NoSorting<T> = BaseAdvancedTableType<T> & {
  sortType?: "none";
  columns: BaseColumn[];
};

export type AutomaticSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "automatic";
  columns: SortableColumn[];
  onSort?: (key: string | null, direction: SortDirection) => void;
};

export type ControlledSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "controlled";
  columns: SortableColumn[];
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string | null, direction: SortDirection) => void;
};

export type UrlBasedSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "url";
  columns: SortableColumn[];
  sortKey: string | null;
  sortDirection: SortDirection;
  buildHref?: (key: string | null, direction: SortDirection) => string;
};

export type AdvancedTableType<T> =
  | NoSorting<T>
  | AutomaticSorting<T>
  | ControlledSorting<T>
  | UrlBasedSorting<T>;
