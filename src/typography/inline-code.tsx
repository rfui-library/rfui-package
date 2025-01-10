import type { ReactNode, ComponentProps } from "react";

export type InlineCodeType = {
  children: ReactNode;
} & ComponentProps<"code">;

/** *
 * @function InlineCode
 *
 * @see {@link https://rfui.deno.dev/atoms/inline-code}
 *
 * @example
 * <div>
 *   When I wrote <InlineCode>sayHello("John")</InlineCode> it didn't work.
 * </div>
 */
export const InlineCode = ({ children, ...rest }: InlineCodeType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "bg-neutral-50 p-0.5";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <code className={className} {...restWithoutClass}>
      {children}
    </code>
  );
};
