import type { ComponentProps, ReactNode } from "react";
import { Container } from "../../layout/container";
import { Link } from "../../navigation/link";

type NavbarDropdownItemType = {
  href?: string;
  onClick?: () => void;
  formProps?: ComponentProps<"form">;
  children: ReactNode;
};

export const VerticalNavbarDropdownItem = ({
  href,
  onClick,
  formProps,
  children,
}: NavbarDropdownItemType) => {
  return (
    <>
      {/* Desktop */}
      <li className="hidden sm:block">
        {href ? (
          <Link
            href={href}
            underline="none"
            className="block break-all px-4 py-2 hover:bg-neutral-100/30"
          >
            {children}
          </Link>
        ) : onClick ? (
          <div
            className="block cursor-pointer break-all px-4 py-2 hover:bg-neutral-100/30"
            onClick={onClick}
          >
            {children}
          </div>
        ) : formProps ? (
          <form
            className="block break-all hover:bg-neutral-100/30"
            {...formProps}
          >
            <button className="h-full w-full cursor-pointer px-4 py-2 text-left">
              {children}
            </button>
          </form>
        ) : null}
      </li>

      {/* Mobile */}
      <li className="block border-b border-b-neutral-200 text-neutral-700 max-sm:hover:bg-neutral-100/50 sm:hidden sm:border-b-neutral-50 sm:hover:border-b-neutral-500">
        <Container size="xl" className="mx-0! block sm:hidden">
          {href ? (
            <Link href={href} underline="none" className="block break-all p-6">
              {children}
            </Link>
          ) : onClick ? (
            <div
              className="block cursor-pointer break-all p-6"
              onClick={onClick}
            >
              {children}
            </div>
          ) : formProps ? (
            <form {...formProps}>
              <button
                type="submit"
                className="h-full w-full cursor-pointer p-6 text-left"
              >
                {children}
              </button>
            </form>
          ) : null}
        </Container>
      </li>
    </>
  );
};
