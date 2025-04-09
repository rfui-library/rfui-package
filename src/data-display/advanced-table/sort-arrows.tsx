import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import type { AdvancedTableType, SortDirection } from "./types";

type SortArrowsType<T> = {
  advancedTableProps: AdvancedTableType<T>;
  internalSortKey: string | null;
  columnSortKey?: string;
  internalSortDirection: SortDirection;
};

export const SortArrows = <T,>({
  advancedTableProps,
  internalSortKey,
  columnSortKey,
  internalSortDirection,
}: SortArrowsType<T>) => {
  if (columnSortKey === undefined) {
    return null;
  }

  if (advancedTableProps.sortType === "automatic") {
    return (
      <SortArrowsHelper
        isVisible={internalSortKey === columnSortKey}
        sortDirection={internalSortDirection}
      />
    );
  }

  if (
    advancedTableProps.sortType === "url" ||
    advancedTableProps.sortType === "controlled"
  ) {
    return (
      <SortArrowsHelper
        isVisible={advancedTableProps.sortKey === columnSortKey}
        sortDirection={advancedTableProps.sortDirection}
      />
    );
  }

  return null;
};

const SortArrowsHelper = ({
  isVisible,
  sortDirection,
}: {
  isVisible: boolean;
  sortDirection: SortDirection;
}) => {
  return (
    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs">
      {!isVisible ? (
        <ChevronUpDownIcon className="relative left-[5px] h-4 w-4 text-neutral-400" />
      ) : sortDirection === "asc" ? (
        "⏶"
      ) : (
        "⏷"
      )}
    </span>
  );
};
