import type { ReactNode, ComponentProps } from "react";

export type BlockquoteType = {
  children: ReactNode;
} & ComponentProps<"blockquote">;

/** *
 * @function Blockquote
 *
 * @see {@link https://rfui.deno.dev/atoms/blockquote}
 *
 * @example
 * <Blockquote>All models are wrong. Some models are useful.</Blockquote>
 */
export const Blockquote = ({ children, ...rest }: BlockquoteType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className =
    "flex flex-col gap-3 border-l border-neutral-300 pl-5 text-neutral-700";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <blockquote {...restWithoutClass} className={className}>
      {children}
    </blockquote>
  );
};
