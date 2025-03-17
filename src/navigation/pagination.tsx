import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "react";

export type PaginationType = {
  currPage: number;
  itemsPerPage: number;
  totalItems: number;
} & Omit<ComponentProps<"nav">, "size">;

/** *
 * @function Pagination
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/pagination}
 *
 * @example
 * <Pagination />
 */
export const Pagination = ({
  currPage,
  itemsPerPage,
  totalItems,
  ...rest
}: PaginationType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex items-center gap-2";

  if (restClass) {
    className += ` ${restClass}`;
  }

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav className={className} {...restWithoutClass}>
      {currPage > 1 && (
        <div>
          <ChevronLeftIcon className="size-4" />
        </div>
      )}
      {currPage !== 1 && <div>1</div>}
      {lastPage > 7 && currPage > 4 && <div>...</div>}
      {currPage - 2 > 1 && <div>{currPage - 2}</div>}
      {currPage - 1 > 1 && <div>{currPage - 1}</div>}
      {<strong>{currPage}</strong>}
      {currPage + 1 < lastPage && <div>{currPage + 1}</div>}
      {currPage + 2 < lastPage && <div>{currPage + 2}</div>}
      {lastPage > 7 && currPage < lastPage - 3 && <div>...</div>}
      {currPage !== lastPage && <div>{lastPage}</div>}
      {currPage < lastPage && (
        <div>
          <ChevronRightIcon className="size-4" />
        </div>
      )}
    </nav>
  );
};
