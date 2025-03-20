import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { ComponentProps, ReactNode } from "react";

export type LinkType = {
  href: string;
  underline?: "always" | "hover" | "none";
  inPageLink?: boolean;
  children: ReactNode;
} & ComponentProps<"a"> &
  (
    | {
        _newTab?: false;
      }
    | {
        _newTab: true;
        _includeNewTabIcon?: boolean;
      }
  );

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
  children,
  ...rest
}: LinkType) => {
  const { className: restClass, ...restWithoutClass } = rest;

  if ("_includeNewTabIcon" in restWithoutClass) {
    delete restWithoutClass._includeNewTabIcon;
  }

  let className = "relative";

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
      {_newTab && "_includeNewTabIcon" in rest && rest._includeNewTabIcon && (
        <ArrowTopRightOnSquareIcon className="relative bottom-[1px] left-2 inline w-4" />
      )}
    </a>
  );
};
