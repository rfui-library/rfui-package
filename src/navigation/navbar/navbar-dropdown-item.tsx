import type { ReactNode } from "react";
import { Container } from "../../layout/container";
import { Link } from "../../navigation/link";

export const NavbarDropdownItem = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <>
      {/* Desktop */}
      <li className="hidden sm:block">
        <Link
          href={href}
          underline="none"
          className="block break-all px-4 py-2 hover:bg-neutral-100/30"
        >
          {children}
        </Link>
      </li>

      {/* Mobile */}
      <li className="block border-b border-b-neutral-200 text-neutral-700 max-sm:hover:bg-neutral-100/50 sm:hidden sm:border-b-neutral-50 sm:hover:border-b-neutral-500">
        <Container size="xl" className="block sm:hidden">
          <Link href={href} underline="none" className="block break-all py-6">
            {children}
          </Link>
        </Container>
      </li>
    </>
  );
};
