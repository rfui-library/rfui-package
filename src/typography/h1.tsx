import type { ReactNode, ComponentProps } from "react";

export type H1Type = {
  children: ReactNode;
} & ComponentProps<"h1">;

/** *
 * @function H1
 *
 * @see {@link https://rfui.deno.dev/atoms/h1}
 *
 * @example
 * <H1>Heading</H1>
 */
export const H1 = ({ children, ...rest }: H1Type) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "mb-7 mt-9 max-w-prose text-4xl text-neutral-700";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <h1 className={className} {...restWithoutClass}>
      {children}
    </h1>
  );
};
