import type { ComponentProps, ReactNode } from "react";
import { NewTabIcon } from "../icons/new-tab-icon";

export type LinkType = {
  href: string;
  underline?: "always" | "hover" | "none";
  inPageLink?: boolean;
  _newTab?: boolean;
  _includeNewTabIcon?: boolean;
  children: ReactNode;
} & ComponentProps<"a">;

/** *
 * @function Link
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/link}
 *
 * @example
 * <Link href="https://example.com">Example</Link>
 */
export const Link = ({
  href,
  underline = "always",
  inPageLink = false,
  _newTab = false,
  _includeNewTabIcon = false,
  children,
  ...rest
}: LinkType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "relative cursor-pointer";

  className += (() => {
    switch (underline) {
      case "always":
        return " underline underline-offset-2 text-primary-800 visited:text-[#19216C] [aria-current]:text-[#19216C]";
      case "hover":
        return " hover:underline hover:underline-offset-2";
      default:
        return "";
    }
  })();

  if (inPageLink) {
    className += " rfui-in-page-link";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <a
      href={href}
      className={className}
      target={_newTab ? "_blank" : undefined}
      rel={_newTab ? "noopener noreferrer" : undefined}
      {...restWithoutClass}
    >
      {inPageLink && (
        <span className="rfui-in-page-link-icon absolute -left-[1em] top-0">
          #
        </span>
      )}
      {children}
      {_newTab && _includeNewTabIcon && <NewTabIcon />}
    </a>
  );
};
