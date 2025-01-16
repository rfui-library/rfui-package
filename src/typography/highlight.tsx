import type { ComponentProps, ReactNode } from "react";

export type HighlightType = {
  children: ReactNode;
} & ComponentProps<"mark">;

/** *
 * @function Highlight
 *
 * @see {@link https://rfui-docs.onrender.com/components/typography/highlight}
 *
 * @example
 * <div>Lorem ipsum <Highlight>dolor</Highlight> sit amet, consectetur.</div>
 */
export const Highlight = ({ children, ...rest }: HighlightType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "bg-primary-100";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <mark className={className} {...restWithoutClass}>
      {children}
    </mark>
  );
};
