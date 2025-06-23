import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ComponentProps, ReactNode, useEffect, useState } from "react";

export type PaginationType = {
  currPage: number;
  itemsPerPage: number;
  totalItems: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
} & Omit<ComponentProps<"nav">, "size" | "onChange"> &
  (
    | {
        type?: "link";
        buildHref?: (page: number) => string;
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
  disabled = false,
  ...rest
}: PaginationType) => {
  const buildHref =
    type === "link" && "buildHref" in rest ? rest.buildHref : undefined;
  const onChange =
    type === "button" && "onChange" in rest ? rest.onChange : undefined;
  const { className: restClass, ...restWithoutClass } = {
    ...rest,
    buildHref: undefined,
    onChange: undefined,
  };

  if ("buildHref" in restWithoutClass) {
    delete restWithoutClass.buildHref;
  }

  if ("onChange" in restWithoutClass) {
    delete restWithoutClass.onChange;
  }

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

  if (
    !isValid(currPage, itemsPerPage, totalItems, lastPage) ||
    lastPage === 1
  ) {
    return null;
  }

  return (
    <nav className={className} {...restWithoutClass}>
      {currPage > 1 && (
        <PaginationItem
          type={type}
          page={currPage - 1}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          <ChevronLeftIcon className={chevronClassName} />
        </PaginationItem>
      )}
      {currPage !== 1 && (
        <PaginationItem
          type={type}
          page={1}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          1
        </PaginationItem>
      )}
      {currPage > 4 && <Elipsis />}
      {currPage - 2 > 1 && (
        <PaginationItem
          type={type}
          page={currPage - 2}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          {currPage - 2}
        </PaginationItem>
      )}
      {currPage - 1 > 1 && (
        <PaginationItem
          type={type}
          page={currPage - 1}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          {currPage - 1}
        </PaginationItem>
      )}
      {<ActivePaginationItem>{currPage}</ActivePaginationItem>}
      {currPage + 1 < lastPage && (
        <PaginationItem
          type={type}
          page={currPage + 1}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          {currPage + 1}
        </PaginationItem>
      )}
      {currPage + 2 < lastPage && (
        <PaginationItem
          type={type}
          page={currPage + 2}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          {currPage + 2}
        </PaginationItem>
      )}
      {currPage < lastPage - 3 && <Elipsis />}
      {currPage !== lastPage && (
        <PaginationItem
          type={type}
          page={lastPage}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          {lastPage}
        </PaginationItem>
      )}
      {currPage < lastPage && (
        <PaginationItem
          type={type}
          page={currPage + 1}
          buildHref={buildHref}
          onChange={onChange}
          disabled={disabled}
        >
          <ChevronRightIcon className={chevronClassName} />
        </PaginationItem>
      )}
    </nav>
  );
};

const PaginationItem = ({
  type,
  page,
  buildHref,
  onChange,
  disabled,
  children,
}: {
  type: "link" | "button";
  page: number;
  buildHref?: (page: number) => string;
  onChange?: (newPage: number) => void;
  disabled?: boolean;
  children: ReactNode;
}) => {
  const [currHref, setCurrHref] = useState<string | null>(null);
  const sharedClassName =
    "rfui-rounded-default flex h-[2.5rem] items-center px-3 py-2 hover:bg-neutral-50";
  const linkClassName = `${sharedClassName} ${disabled ? "pointer-events-none" : ""}`;
  const buttonClassName = `${sharedClassName} ${disabled ? "pointer-events-none" : "cursor-pointer"}`;
  const href = buildHref ? buildHref(page) : getDefaultHref(currHref, page);

  useEffect(() => {
    setCurrHref(window.location.href);
  }, []);

  return type === "link" ? (
    <a href={href} className={linkClassName}>
      {children}
    </a>
  ) : (
    <button
      onClick={() => {
        if (onChange && !disabled) {
          onChange(page);
        }
      }}
      className={buttonClassName}
      disabled={disabled}
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

const getDefaultHref = (currHref: string | null, page: number) => {
  if (!currHref) {
    return "";
  }

  const url = new URL(currHref);

  if (page && page > 1) {
    url.searchParams.set("page", page.toString());
  } else {
    url.searchParams.delete("page");
  }

  return url.toString();
};
