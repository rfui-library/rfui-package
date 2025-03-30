import { useEffect, useState } from "react";
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
  const [currHref, setCurrHref] = useState<string | null>(null);
  const isSortable = props.sortType && props.sortType !== "none";
  const getThClassName = (column: SortableColumn) => {
    let className = "flex items-center gap-1";

    if (isSortable) {
      className += " cursor-pointer select-none";
    }

    if (column.thProps?.className) {
      className += ` ${column.thProps.className}`;
    }

    return className;
  };
  const getThPropsWithoutClassName = (column: SortableColumn) => {
    const { className, ...rest } = column.thProps ?? {};

    return rest;
  };

  useEffect(() => {
    setCurrHref(window.location.href);
  }, []);

  return (
    <thead>
      <tr>
        {props.columns.map((column, index) => (
          <th
            key={`${column.label}-${index}`}
            className={getThClassName(column as SortableColumn)}
            onClick={() => {
              if (
                props.sortType === "automatic" ||
                props.sortType === "controlled"
              ) {
                handleColumnClick(column as SortableColumn);
              }
            }}
            {...getThPropsWithoutClassName(column as SortableColumn)}
          >
            {props.sortType === "url" ? (
              <a
                className="no-underline"
                href={(() => {
                  const newSortState = getNewSortState(
                    props.sortDirection,
                    props.sortKey,
                    (column as SortableColumn).sortKey,
                    props.rows,
                  );

                  return props.buildHref
                    ? props.buildHref(
                        newSortState.newSortKey,
                        newSortState.newSortDirection,
                      )
                    : getDefaultHref(
                        currHref,
                        newSortState.newSortKey,
                        newSortState.newSortDirection,
                      );
                })()}
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
          </th>
        ))}
      </tr>
    </thead>
  );
};
const getDefaultHref = (
  currHref: string | null,
  key: string | null,
  direction: SortDirection,
) => {
  if (!currHref) {
    return "";
  }

  const url = new URL(currHref);

  if (key) {
    url.searchParams.set("sort", key);
  } else {
    url.searchParams.delete("sort");
  }

  if (direction) {
    url.searchParams.set("direction", direction);
  } else {
    url.searchParams.delete("direction");
  }

  url.searchParams.delete("page");

  return url.toString();
};
