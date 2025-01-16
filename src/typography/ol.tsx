import type { ComponentProps, ReactNode } from "react";

export type OLType = {
  bulletLocation?: "inside" | "outside";
  children: ReactNode;
} & ComponentProps<"ol">;

/** *
 * @function OL
 *
 * @see {@link https://rfui.deno.dev/atoms/ol}
 *
 * @example
 * <OL>
 *   <li>First</li>
 *   <li>Second</li>
 *   <li>Third</li>
 * </OL>
 */
export const OL = ({
  bulletLocation = "inside",
  children,
  ...rest
}: OLType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex list-decimal flex-col gap-2";

  className += bulletLocation === "inside" ? " list-inside" : " list-outside";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <ol className={className} {...restWithoutClass}>
      {children}
    </ol>
  );
};
