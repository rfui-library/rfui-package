import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";
import { Container } from "../../layout/container";
import { Flex } from "../../layout/flex";

export const VerticalNavbarDropdown = ({
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
    "my-3 block flex cursor-default items-center rounded-sm px-3 py-3 hover:bg-neutral-100 max-sm:text-lg sm:my-2 sm:py-2";

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
        <Flex
          className="hidden w-full items-center justify-between sm:flex"
          onClick={toggleMenu}
        >
          <span>{title}</span>
          {isMenuOpen ? (
            <ChevronUpIcon strokeWidth={2} />
          ) : (
            <ChevronDownIcon strokeWidth={2} />
          )}
        </Flex>
        {isMenuOpen && (
          <ul className="absolute left-0 top-[89px] z-10 hidden w-72 rounded-sm border border-neutral-100 bg-[#fff] py-2 sm:block">
            {children}
          </ul>
        )}

        {/* Mobile */}
        <Container size="xl" className="mx-0! block sm:hidden">
          <Flex
            className="block items-center justify-between p-6 sm:hidden"
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
