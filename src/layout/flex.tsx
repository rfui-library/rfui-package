import type { ComponentProps, ReactNode } from "react";

export type FlexType = { children: ReactNode } & ComponentProps<"div">;

/** *
 * @function Flex
 *
 * @see {@link https://rfui.deno.dev/helpers/flex}
 *
 * @example
 * <Flex>
 *   <div>left</div>
 *   <div>middle</div>
 *   <div>right</div>
 * </Flex>
 */
export const Flex = ({ children, ...rest }: FlexType) => {
  const { className: classFromRest, ...restWithoutClass } = rest;
  let classValue = "flex";

  if (classFromRest) {
    classValue += ` ${classFromRest}`;
  }

  return (
    <div className={classValue} {...restWithoutClass}>
      {children}
    </div>
  );
};
