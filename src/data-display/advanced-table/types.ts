import { ReactNode } from "react";
import { TableType } from "../table";

export type SortDirection = "asc" | "desc" | null;

export type BaseColumn = {
  label: ReactNode;
};

export type SortableColumn<T> = BaseColumn & {
  sortKey: keyof T;
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
  columns: SortableColumn<T>[];
  onSort?: (key: keyof T | null, direction: SortDirection) => void;
};

export type ControlledSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "controlled";
  columns: SortableColumn<T>[];
  sortKey: keyof T | null;
  sortDirection: SortDirection;
  onSort: (key: keyof T | null, direction: SortDirection) => void;
};

export type UrlBasedSorting<T> = BaseAdvancedTableType<T> & {
  sortType: "url";
  columns: SortableColumn<T>[];
  sortKey: keyof T | null;
  sortDirection: SortDirection;
  buildHref: (key: keyof T | null, direction: SortDirection) => string;
};

export type AdvancedTableType<T> =
  | NoSorting<T>
  | AutomaticSorting<T>
  | ControlledSorting<T>
  | UrlBasedSorting<T>;
