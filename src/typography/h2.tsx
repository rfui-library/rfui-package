import type { ReactNode, ComponentProps } from "react";
import { Link } from "../navigation/link";

export type H2Type = {
  inPageLink?: string;
  children: ReactNode;
} & ComponentProps<"h2">;

/** *
 * @function H1
 *
 * @see {@link https://rfui.deno.dev/atoms/h2}
 *
 * @example
 * <H2>Subheading</H2>
 */
export const H2 = ({ inPageLink, children, ...rest }: H2Type) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "mb-5 mt-8 max-w-prose text-2xl text-neutral-700";

  if (restClass) {
    className += ` ${restClass}`;
  }

  if (inPageLink) {
    return (
      <h2 id={inPageLink} className={className} {...restWithoutClass}>
        <Link inPageLink href={`#${inPageLink}`} underline="hover">
          {children}
        </Link>
      </h2>
    );
  }

  return (
    <h2 className={className} {...restWithoutClass}>
      {children}
    </h2>
  );
};
