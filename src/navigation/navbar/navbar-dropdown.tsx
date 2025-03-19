import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";
import { Container } from "../../layout/container";
import { Flex } from "../../layout/flex";
import { Link } from "../link";

type DropdownItemType = {
  label: string;
  href?: string;
  shouldOpenInNewTab?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
};

type VerticalNavbarDropdownType = {
  title: string;
  items: DropdownItemType[];
};

export const NavbarDropdown = ({
  title,
  items,
}: VerticalNavbarDropdownType) => {
  const menuItemClassName =
    "mx-1 my-1 block rounded-sm px-3 hover:bg-neutral-50 max-sm:py-3 sm:py-2";

  return (
    <Menu as="li">
      <MenuButton className="w-full">
        {({ open }) => (
          <>
            {/* Desktop */}
            <div className="cursor-pointer items-center gap-2 border-b border-b-neutral-50 py-6 text-neutral-700 max-sm:hidden sm:flex">
              <span>{title}</span>
              {open ? (
                <ChevronUpIcon strokeWidth={2} />
              ) : (
                <ChevronDownIcon strokeWidth={2} />
              )}
            </div>

            {/* Mobile */}
            <Container className="mx-0! cursor-pointer border-b border-b-neutral-200 px-6 py-6 text-left text-neutral-700 hover:bg-neutral-100/50 max-sm:block sm:hidden">
              <span className="mr-2">{title}</span>
              {open ? (
                <ChevronUpIcon strokeWidth={2} />
              ) : (
                <ChevronDownIcon strokeWidth={2} />
              )}
            </Container>
          </>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="sm:max-w-[500px]! max-sm:mx-2 max-sm:w-[95%] sm:w-fit sm:min-w-[300px]"
      >
        <div className="rounded-sm border border-neutral-200 bg-[#fff] max-sm:mt-2 sm:mt-1">
          {items.map((item) =>
            item.href ? (
              <MenuItem className={menuItemClassName} key={item.label}>
                <Link
                  href={item.href}
                  underline="none"
                  _newTab={item.shouldOpenInNewTab}
                  className="flex items-start gap-2"
                >
                  {item.icon && <span className="opacity-50">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              </MenuItem>
            ) : item.onClick ? (
              <MenuItem className={menuItemClassName} key={item.label}>
                <Flex
                  className="cursor-default items-start gap-2"
                  onClick={item.onClick}
                >
                  {item.icon && <span className="opacity-50">{item.icon}</span>}
                  <span>{item.label}</span>
                </Flex>
              </MenuItem>
            ) : null,
          )}
        </div>
      </MenuItems>
    </Menu>
  );
};
