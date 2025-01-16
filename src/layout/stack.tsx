import type { ComponentProps, ReactNode } from "react";

export type StackType = { children: ReactNode } & ComponentProps<"div">;

/** *
 * @function Stack
 *
 * @see {@link https://rfui.deno.dev/helpers/stack}
 *
 * @example
 * <Stack>
 *   <div>top</div>
 *   <div>middle</div>
 *   <div>bottom</div>
 * </Stack>
 */
export const Stack = ({ children, ...rest }: StackType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex flex-col";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};
