import type { ComponentProps, ReactNode } from "react";

export type SelectType = {
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  children?: ReactNode;
} & Omit<ComponentProps<"select">, "size">;

/** *
 * @function Select
 *
 * Doesn't really have readOnly: https://stackoverflow.com/q/368813/1927876
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/select}
 *
 * @example
 * <Select>
 *   <option value="foo">foo</option>
 *   <option value="bar">bar</option>
 *   <option value="baz">baz</option>
 * </Select>
 */
export const Select = ({
  size = "md",
  rounded,
  invalid = false,
  children,
  ...rest
}: SelectType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className =
    "cursor-pointer border border-neutral-500 bg-[#fff] px-2 py-1 focus:border-neutral-900 focus:shadow-sm focus:outline-none";

  className += (() => {
    switch (size) {
      case "sm":
        return " px-2 text-sm";
      case "md":
        return " px-2 py-2";
      case "lg":
        return " px-3 py-3 text-lg";
    }
  })();
  className += (() => {
    switch (rounded) {
      case "square":
        return " rounded-none";
      case "sm":
        return " rounded";
      case "lg":
        return " rounded-lg";
      case "full":
        return " rounded-full";
      default:
        return " rfui-rounded-default";
    }
  })();

  if (rest.disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <select className={className} {...restWithoutClass}>
      {children}
    </select>
  );
};
