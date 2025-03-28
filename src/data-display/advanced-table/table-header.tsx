import { Flex } from "../../layout/flex";
import { getNewSortState } from "./get-new-sort-state";
import { SortArrows } from "./sort-arrows";
import { AdvancedTableType, SortableColumn, SortDirection } from "./types";

export const TableHeader = <T,>({
  props,
  internalSortKey,
  internalSortDirection,
  handleColumnClick,
}: {
  props: AdvancedTableType<T>;
  internalSortKey: string | null;
  internalSortDirection: SortDirection;
  handleColumnClick: (column: SortableColumn) => void;
}) => {
  const isSortable = props.sortType && props.sortType !== "none";

  return (
    <thead>
      <tr>
        {props.columns.map((column, index) => (
          <th
            key={`${column.label}-${index}`}
            className={isSortable ? "cursor-pointer select-none" : ""}
            onClick={() => {
              if (
                props.sortType === "automatic" ||
                props.sortType === "controlled"
              ) {
                handleColumnClick(column as SortableColumn);
              }
            }}
          >
            <Flex className="items-center gap-1">
              {props.sortType === "url" ? (
                <a
                  href={props.buildHref(
                    (column as SortableColumn).sortKey,
                    getNewSortState(
                      props.sortDirection,
                      (column as SortableColumn).sortKey,
                      (column as SortableColumn).sortKey,
                      props.rows,
                    ).newSortDirection,
                  )}
                  className="no-underline"
                >
                  {column.label}
                </a>
              ) : (
                column.label
              )}
              <SortArrows
                advancedTableProps={props}
                internalSortKey={internalSortKey}
                columnSortKey={(column as SortableColumn).sortKey}
                internalSortDirection={internalSortDirection}
              />
            </Flex>
          </th>
        ))}
      </tr>
    </thead>
  );
};
