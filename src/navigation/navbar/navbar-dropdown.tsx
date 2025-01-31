import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";
import { Container } from "../../layout/container";
import { Flex } from "../../layout/flex";

export const NavbarDropdown = ({
  title,
  children,
  ...rest
}: { title: string; children: ReactNode } & ComponentProps<"li">) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const subMenuRef = useRef<HTMLLIElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const clickedInside =
      (menuRef.current && menuRef.current.contains(target)) ||
      (subMenuRef.current && subMenuRef.current.contains(target));

    if (!clickedInside) {
      setIsMenuOpen(false);
    }
  };
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass =
    "relative inline-block cursor-pointer border-b border-b-neutral-200 text-neutral-700 max-sm:hover:bg-neutral-100/50 sm:border-b-neutral-50";

  if (restClass) {
    containerClass += ` ${restClass}`;
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
          <ul className="absolute left-0 top-[89px] z-10 hidden w-72 rounded-sm border border-neutral-100 bg-[#fff] py-2 sm:block">
            {children}
          </ul>
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
        <li ref={subMenuRef} className="block sm:hidden">
          <ul className="ml-8">{children}</ul>
        </li>
      )}
    </>
  );
};
