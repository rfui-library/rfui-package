import type { ComponentProps, ReactNode } from "react";
import { Link } from "../navigation/link";

export type H3Type = {
  inPageLink?: string;
  children: ReactNode;
} & ComponentProps<"h3">;

/** *
 * @function H3
 *
 * @see {@link https://rfui-docs.onrender.com/components/typography/h3}
 *
 * @example
 * <H3>Subheading</H3>
 */
export const H3 = ({ inPageLink, children, ...rest }: H3Type) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "mb-2 mt-6 max-w-prose text-lg text-neutral-700";

  if (restClass) {
    className += ` ${restClass}`;
  }

  if (inPageLink) {
    return (
      <h3 id={inPageLink} className={className} {...restWithoutClass}>
        <Link inPageLink href={`#${inPageLink}`} underline="hover">
          {children}
        </Link>
      </h3>
    );
  }

  return (
    <h3 className={className} {...restWithoutClass}>
      {children}
    </h3>
  );
};
