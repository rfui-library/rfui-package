import { Bars3Icon } from "@heroicons/react/24/outline";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { CloseIcon } from "../../icons/close-icon";
import { Flex } from "../../layout/flex";

export { VerticalNavbarBottom } from "./vertical-navbar-bottom";
export { VerticalNavbarItem } from "./vertical-navbar-item";
export { VerticalNavbarSection } from "./vertical-navbar-section";
export { VerticalNavbarTop } from "./vertical-navbar-top";

export type VerticalNavbarType = {
  background?: "neutral" | "none";
  children: ReactNode;
} & Omit<ComponentProps<"nav">, "size">;

/** *
 * @function VerticalNavbar
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/vertical-navbar}
 *
 * @example
 */

export const VerticalNavbar = ({
  background = "neutral",
  children,
  ...rest
}: VerticalNavbarType) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((v) => !v);
  };
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass =
    "px-3 py-2 text-neutral-900 max-sm:w-full max-sm:shrink-0 sm:sticky sm:top-0 sm:h-screen sm:min-w-[250px] sm:overflow-y-auto";

  containerClass += ` ${background === "neutral" ? "bg-neutral-50/75" : ""}`;

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <nav className={containerClass} {...restWithoutClass}>
      {/* Desktop */}
      <div className="flex h-full flex-col justify-between max-sm:hidden">
        {children}
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <HamburgerMenuToggle
          isOpen={isOpen}
          toggleHamburgerMenu={toggleIsOpen}
        />
        {isOpen && children}
      </div>
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
      className="cursor-default items-center gap-2 rounded-sm px-2 py-3 text-neutral-700 hover:bg-neutral-100"
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
