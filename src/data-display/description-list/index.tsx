import type { ComponentProps, ReactNode } from "react";

export type DescriptionListType = {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
} & ComponentProps<"dl">;

/**
 * @function DescriptionList
 *
 * @see {@link https://rfui-docs.onrender.com/components/data-display/description-list}
 *
 * @example
 * <DescriptionList>Example</DescriptionList>
 */
export const DescriptionList = ({
  size = "md",
  children,
  ...rest
}: DescriptionListType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex flex-col gap-4";

  className += (() => {
    switch (size) {
      case "sm":
        return " px-1 text-xs";
      case "md":
        return " px-2 text-sm";
      case "lg":
        return " px-3 py-1 text-md";
    }
  })();

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <dl className={className} {...restWithoutClass}>
      {children}
    </dl>
  );
};
