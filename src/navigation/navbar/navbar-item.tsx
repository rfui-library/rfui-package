import type { ComponentProps, ReactNode } from "react";
import { Container } from "../../layout/container";
import { Link } from "../../navigation/link";

type NavbarItemType = {
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  formProps?: ComponentProps<"form">;
  children: ReactNode;
} & ComponentProps<"li">;

export const NavbarItem = ({
  href,
  isActive = false,
  onClick,
  formProps,
  children,
  ...rest
}: NavbarItemType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass =
    "flex flex-row items-center border-b border-b-neutral-200 max-sm:hover:bg-neutral-100/50 sm:border-b-neutral-50";

  if (isActive) {
    containerClass +=
      " font-bold pointer-events-none sm:font-normal sm:border-b-primary-500 max-sm:bg-neutral-100";
  } else if (href || onClick || formProps) {
    containerClass += " sm:hover:border-b-neutral-500 text-neutral-700";
  }

  const { className: formPropsClass, ...formPropsWithoutClassName } =
    formProps ?? {};
  const desktopFormClass = formPropsClass
    ? `hidden cursor-pointer h-full sm:inline-block ${formPropsClass}`
    : "hidden cursor-pointer h-full sm:inline-block";
  const mobileFormClass = formPropsClass
    ? `block cursor-pointer break-all h-full ${formPropsClass}`
    : "block cursor-pointer break-all h-full";

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  // For `size="xl"` below it doesn't matter that `"xl"` might not be accurate
  return (
    <li className={containerClass} {...restWithoutClass}>
      {/* Desktop */}
      {href ? (
        <Link
          href={href}
          underline="none"
          className="hidden py-6 sm:inline-block"
          aria-current={isActive ? "page" : undefined}
        >
          {children}
        </Link>
      ) : onClick ? (
        <div
          className="hidden cursor-pointer py-6 sm:inline-block"
          onClick={onClick}
        >
          {children}
        </div>
      ) : formProps ? (
        <form className={desktopFormClass} {...formPropsWithoutClassName}>
          <button type="submit" className="h-full cursor-pointer">
            {children}
          </button>
        </form>
      ) : (
        <div className="hidden sm:inline-block">{children}</div>
      )}

      {/* Mobile */}
      <Container size="xl" className="mx-0! block grow sm:hidden">
        {href ? (
          <Link
            href={href}
            underline="none"
            aria-current={isActive ? "page" : undefined}
            className="block break-all p-6"
          >
            {children}
          </Link>
        ) : onClick ? (
          <div className="block cursor-pointer break-all p-6" onClick={onClick}>
            {children}
          </div>
        ) : formProps ? (
          <form className={mobileFormClass} {...formPropsWithoutClassName}>
            <button className="w-full cursor-pointer p-6 text-left">
              {children}
            </button>
          </form>
        ) : (
          <div className="block break-all p-6">{children}</div>
        )}
      </Container>
    </li>
  );
};
