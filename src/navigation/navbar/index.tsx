import { Bars3Icon } from "@heroicons/react/24/outline";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { CloseIcon } from "../../icons/close-icon";
import { Container, type ContainerType } from "../../layout/container";
import { Flex } from "../../layout/flex";
import { Stack } from "../../layout/stack";
import { getComponents } from "../../navigation/navbar/get-components";

export { NavbarDropdownItem } from "../../navigation/navbar/navbar-dropdown-item";
export { NavbarItem } from "../../navigation/navbar/navbar-item";
export { NavbarLeft } from "../../navigation/navbar/navbar-left";
export { NavbarRight } from "../../navigation/navbar/navbar-right";
export { NavbarDropdown } from "./navbar-dropdown";
export { NavbarMegamenu } from "./navbar-megamenu";

export type NavbarType = {
  size?: ContainerType["size"];
  background?: "neutral" | "none";
  sticky?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"nav">, "size">;

/** *
 * @function Navbar
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/navbar}
 *
 * @example
 * <Navbar size="xl">
 *  <NavbarLeft>
 *    <NavbarItem href="https://one.com">One</NavbarItem>
 *    <NavbarItem href="https://two.com">Two</NavbarItem>
 *   </NavbarLeft>
 * </Navbar>
 */
export const Navbar = ({
  size,
  background = "neutral",
  sticky = false,
  children,
  ...rest
}: NavbarType) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen((v) => !v);
  };
  const { navbarLeft, navbarRight, numItems } = getComponents(children);
  const hasHamburgerMenu = numItems > 4;
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "px-auto w-full";

  if (sticky) {
    containerClass += " sm:sticky sm:top-0 sm:left-0 sm:z-10";
  }

  containerClass += (() => {
    switch (background) {
      case "neutral":
        return " bg-neutral-50";
      case "none":
        return " border-b border-b-neutral-100";
    }
  })();

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <nav className={containerClass} {...restWithoutClass}>
      {/* Desktop */}
      <Container size={size} className="hidden sm:block">
        <Flex className="justify-between">
          {navbarLeft && navbarLeft}
          {navbarRight && navbarRight}
        </Flex>
      </Container>

      {/* Mobile */}
      <Stack className="sm:hidden">
        {hasHamburgerMenu && (
          <HamburgerMenuToggle
            isOpen={isHamburgerMenuOpen}
            toggleHamburgerMenu={toggleHamburgerMenu}
          />
        )}
        {(!hasHamburgerMenu || (hasHamburgerMenu && isHamburgerMenuOpen)) &&
          navbarLeft &&
          navbarLeft}
        {(!hasHamburgerMenu || (hasHamburgerMenu && isHamburgerMenuOpen)) &&
          navbarRight &&
          navbarRight}
      </Stack>
    </nav>
  );
};

const HamburgerMenuToggle = ({
  isOpen,
  toggleHamburgerMenu,
}: {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}) => {
  return (
    <Flex
      className="items-center gap-2 border-b border-b-neutral-200 px-6 py-6 text-neutral-700 hover:bg-neutral-100/50"
      onClick={toggleHamburgerMenu}
    >
      {isOpen ? (
        <CloseIcon className="hover:outline-none" />
      ) : (
        <>
          <Bars3Icon className="inline-block! size-6 w-6" /> Menu
        </>
      )}
    </Flex>
  );
};
