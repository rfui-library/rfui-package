import type { AdvancedTableType, SortDirection } from "./types";

type SortArrowsType<T> = {
  advancedTableProps: AdvancedTableType<T>;
  internalSortKey: string | null;
  columnSortKey: string;
  internalSortDirection: SortDirection;
};

export const SortArrows = <T,>({
  advancedTableProps,
  internalSortKey,
  columnSortKey,
  internalSortDirection,
}: SortArrowsType<T>) => {
  if (advancedTableProps.sortType === "automatic") {
    return (
      <SortArrowsHelper
        isVisible={internalSortKey === columnSortKey}
        sortDirection={internalSortDirection}
      />
    );
  } else if (
    advancedTableProps.sortType === "url" ||
    advancedTableProps.sortType === "controlled"
  ) {
    return (
      <SortArrowsHelper
        isVisible={advancedTableProps.sortKey === columnSortKey}
        sortDirection={advancedTableProps.sortDirection}
      />
    );
  } else {
    return null;
  }
};

const SortArrowsHelper = ({
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
