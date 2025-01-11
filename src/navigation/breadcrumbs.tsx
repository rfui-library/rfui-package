import type { ComponentProps } from "react";
import { ChevronRightIcon } from "../icons/chevron-right";
import { Link } from "./link";
import { Fragment } from "react";

export type BreadcrumbsType = {
  links: BreadcrumbLink[];
  size?: "sm" | "md" | "lg" | "xl";
} & Omit<ComponentProps<"nav">, "size">;

type BreadcrumbLink = {
  title: string;
  href: string;
};

/** *
 * @function Breadcrumbs
 *
 * @see {@link https://rfui.deno.dev/atoms/breadcrumbs}
 *
 * @example
 * <Breadcrumbs
     links={[
       { title: "One", href: "/one" },
       { title: "Two", href: "/two" },
       { title: "Three", href: "/three" },
     ]}
   />
 */
export const Breadcrumbs = ({
  links,
  size = "sm",
  ...rest
}: BreadcrumbsType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  const chevronClassName =
    size === "xl"
      ? "!h-5 !w-5"
      : size === "lg"
        ? "!h-[18px] !w-[18px]"
        : size === "md"
          ? "!h-4 !w-4"
          : "!h-3.5 !w-3.5";
  let className =
    "flex items-center gap-2 text-neutral-700" +
    (size === "xl"
      ? " text-xl"
      : size === "lg"
        ? " text-lg"
        : size === "sm"
          ? " text-sm"
          : "");

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <nav className={className} {...restWithoutClass}>
      {links.map((link, i) => {
        const isLastLink = i === links.length - 1;

        return (
          <Fragment key={link.title}>
            {!isLastLink ? (
              <Link href={link.href} underline="hover">
                {link.title}
              </Link>
            ) : (
              <span>{link.title}</span>
            )}
            {!isLastLink && <ChevronRightIcon className={chevronClassName} />}
          </Fragment>
        );
      })}
    </nav>
  );
};
