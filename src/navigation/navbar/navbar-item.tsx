import type { ReactNode, ComponentProps } from "react";
import { Container } from "../../layout/container";
import { Link } from "../../navigation/link";

export const NavbarItem = ({
  href,
  isActive = false,
  children,
  ...rest
}: {
  href: string;
  isActive?: boolean;
  children: ReactNode;
} & ComponentProps<"li">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass =
    "inline-block border-b border-b-neutral-200 max-sm:hover:bg-neutral-100/50 sm:border-b-neutral-50";

  if (isActive) {
    containerClass +=
      " font-bold pointer-events-none sm:font-normal sm:border-b-primary-500 max-sm:bg-neutral-100";
  } else {
    containerClass += " sm:hover:border-b-neutral-500 text-neutral-700";
  }

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  // For `size="xl"` below it doesn't matter that `"xl"` might not be accurate
  return (
    <li className={containerClass} {...restWithoutClass}>
      {/* Desktop */}
      <Link
        href={href}
        underline="none"
        className="hidden py-6 sm:inline-block"
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>

      {/* Mobile */}
      <Container size="xl" className="block sm:hidden">
        <Link
          href={href}
          underline="none"
          aria-current={isActive ? "page" : undefined}
          className="block break-all py-6"
        >
          {children}
        </Link>
      </Container>
    </li>
  );
};
