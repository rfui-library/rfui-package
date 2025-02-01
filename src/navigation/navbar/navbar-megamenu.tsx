import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";
import { Container } from "../../layout/container";
import { Flex } from "../../layout/flex";

export const NavbarMegamenu = ({
  title,
  children,
  desktopSubmenu,
  mobileSubmenu,
  ...rest
}: {
  title: string;
  children: ReactNode;
  desktopSubmenu?: ComponentProps<"div">;
  mobileSubmenu?: ComponentProps<"div">;
} & ComponentProps<"li">) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const desktopSubmenuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const clickedInside = menuRef.current && menuRef.current.contains(target);

    if (!clickedInside) {
      setIsMenuOpen(false);
    }
  };
  const { className: restClass, ...restWithoutClass } = rest;
  const { className: desktopSubmenuClassArg, ...desktopSubmenuWithoutClass } =
    desktopSubmenu || {};
  const { className: mobileSubmenuClassArg, ...mobileSubmenuWithoutClass } =
    mobileSubmenu || {};

  let containerClass =
    "inline-block border-b border-b-neutral-200 text-neutral-700 max-sm:hover:bg-neutral-100/50 sm:border-b-neutral-50";
  let desktopSubmenuClass = "absolute top-[89px] z-10 hidden sm:block";
  let mobileSubmenuClass = "block sm:hidden";

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  if (desktopSubmenuClassArg) {
    desktopSubmenuClass += ` ${desktopSubmenuClassArg}`;
  }

  if (mobileSubmenuClassArg) {
    mobileSubmenuClass += ` ${mobileSubmenuClassArg}`;
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <li className={containerClass} ref={menuRef} {...restWithoutClass}>
        {/* Desktop */}
        <div className="hidden py-6 sm:block" onClick={toggleMenu}>
          <span className="mr-1">{title}</span>{" "}
          {isMenuOpen ? (
            <ChevronUpIcon className="relative bottom-[2px]" strokeWidth={2} />
          ) : (
            <ChevronDownIcon strokeWidth={2} />
          )}
        </div>
        {isMenuOpen && (
          <div
            ref={desktopSubmenuRef}
            className={desktopSubmenuClass}
            {...desktopSubmenuWithoutClass}
          >
            {children}
          </div>
        )}

        {/* Mobile */}
        <Container size="xl" className="block sm:hidden">
          <Flex
            className="block items-center justify-between py-6 sm:hidden"
            onClick={toggleMenu}
          >
            <span>{title}</span>
            {isMenuOpen ? (
              <ChevronUpIcon className="mr-[2px] h-6 w-6" strokeWidth={1} />
            ) : (
              <ChevronDownIcon className="mr-[2px] h-6 w-6" strokeWidth={1} />
            )}
          </Flex>
        </Container>
      </li>
      {isMenuOpen && (
        <div className={mobileSubmenuClass} {...mobileSubmenuWithoutClass}>
          {children}
        </div>
      )}
    </>
  );
};
