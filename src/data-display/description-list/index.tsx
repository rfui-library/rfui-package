import type { ComponentProps, ReactNode } from "react";

export type DescriptionListType = {
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
export const DescriptionList = ({ children, ...rest }: DescriptionListType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex flex-col gap-4";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <dl className={className} {...restWithoutClass}>
      {children}
    </dl>
  );
};
