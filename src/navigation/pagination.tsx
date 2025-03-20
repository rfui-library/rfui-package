import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ComponentProps, ReactNode } from "react";

export type PaginationType = {
  currPage: number;
  itemsPerPage: number;
  totalItems: number;
  size?: "sm" | "md" | "lg";
} & Omit<ComponentProps<"nav">, "size" | "onChange"> &
  (
    | {
        type?: "link";
        buildHref: (page: number) => string;
      }
    | {
        type: "button";
        onChange: (newPage: number) => void;
      }
  );

/** *
 * @function Pagination
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/pagination}
 *
 * @example
 * <Pagination
    currPage={5}
    itemsPerPage={10}
    totalItems={100}
    buildHref={(page) => `/items?page=${page}`}
  />
 */
export const Pagination = ({
  currPage,
  itemsPerPage,
  totalItems,
  type = "link",
  size = "md",
  ...rest
}: PaginationType) => {
  const buildHref =
    type === "link" && "buildHref" in rest ? rest.buildHref : undefined;
  const onChange =
    type === "button" && "onChange" in rest ? rest.onChange : undefined;
  const { className: restClass, ...restWithoutClass } = {
    ...rest,
    onChange: undefined,
  };
  let className = "flex items-center";
  let chevronClassName;

  switch (size) {
    case "sm":
      className += " text-sm gap-1";
      chevronClassName = "size-3";
      break;
    case "md":
      className += " gap-2";
      chevronClassName = "size-4";
      break;
    case "lg":
      className += " text-lg gap-3";
      chevronClassName = "size-4.5";
      break;
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  const lastPage = Math.ceil(totalItems / itemsPerPage);

  if (!isValid(currPage, itemsPerPage, totalItems, lastPage)) {
    return null;
  }

  return (
    <nav className={className} {...restWithoutClass}>
      {currPage > 1 && (
        <PaginationItem
          page={currPage - 1}
          buildHref={buildHref}
          onChange={onChange}
        >
          <ChevronLeftIcon className={chevronClassName} />
        </PaginationItem>
      )}
      {currPage !== 1 && (
        <PaginationItem page={1} buildHref={buildHref} onChange={onChange}>
          1
        </PaginationItem>
      )}
      {lastPage > 7 && currPage > 4 && <Elipsis />}
      {currPage - 2 > 1 && (
        <PaginationItem
          page={currPage - 2}
          buildHref={buildHref}
          onChange={onChange}
        >
          {currPage - 2}
        </PaginationItem>
      )}
      {currPage - 1 > 1 && (
        <PaginationItem
          page={currPage - 1}
          buildHref={buildHref}
          onChange={onChange}
        >
          {currPage - 1}
        </PaginationItem>
      )}
      {<ActivePaginationItem>{currPage}</ActivePaginationItem>}
      {currPage + 1 < lastPage && (
        <PaginationItem
          page={currPage + 1}
          buildHref={buildHref}
          onChange={onChange}
        >
          {currPage + 1}
        </PaginationItem>
      )}
      {currPage + 2 < lastPage && (
        <PaginationItem
          page={currPage + 2}
          buildHref={buildHref}
          onChange={onChange}
        >
          {currPage + 2}
        </PaginationItem>
      )}
      {lastPage > 7 && currPage < lastPage - 3 && <Elipsis />}
      {currPage !== lastPage && (
        <PaginationItem
          page={lastPage}
          buildHref={buildHref}
          onChange={onChange}
        >
          {lastPage}
        </PaginationItem>
      )}
      {currPage < lastPage && (
        <PaginationItem
          page={currPage + 1}
          buildHref={buildHref}
          onChange={onChange}
        >
          <ChevronRightIcon className={chevronClassName} />
        </PaginationItem>
      )}
    </nav>
  );
};

const PaginationItem = ({
  page,
  buildHref,
  onChange,
  children,
}: {
  page: number;
  buildHref?: (page: number) => string;
  onChange?: (newPage: number) => void;
  children: ReactNode;
}) => {
  const sharedClassName =
    "rfui-rounded-default flex h-[2.5rem] items-center px-3 py-2 hover:bg-neutral-50";
  const linkClassName = `${sharedClassName}`;
  const buttonClassName = `${sharedClassName} cursor-pointer`;

  return buildHref ? (
    <a href={buildHref(page)} className={linkClassName}>
      {children}
    </a>
  ) : (
    <button
      onClick={() => {
        if (onChange) {
          onChange(page);
        }
      }}
      className={buttonClassName}
    >
      {children}
    </button>
  );
};

const ActivePaginationItem = ({ children }: { children: ReactNode }) => {
  return <div className="px-3 py-2 font-bold">{children}</div>;
};

const Elipsis = () => {
  return <div className="px-3 py-2">…</div>;
};

const isValid = (
  currPage: number,
  itemsPerPage: number,
  totalItems: number,
  lastPage: number,
) =>
  Number.isInteger(currPage) &&
  Number.isInteger(itemsPerPage) &&
  Number.isInteger(totalItems) &&
  Number.isInteger(lastPage) &&
  currPage >= 1 &&
  currPage <= lastPage &&
  itemsPerPage >= 1 &&
  totalItems >= 1 &&
  lastPage >= 1 &&
  currPage <= lastPage;
