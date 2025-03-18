import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";

type DropdownItemType = {
  label: string;
};

type VerticalNavbarDropdownType = {
  title: string;
  items: DropdownItemType[];
};

export const VerticalNavbarDropdown = ({
  title,
  items,
}: VerticalNavbarDropdownType) => {
  return (
    <Menu>
      <MenuButton className="my-3 flex w-full items-center justify-between rounded-sm px-3 py-3 hover:bg-neutral-100 max-sm:text-lg sm:my-2 sm:py-2">
        {({ open }) => (
          <>
            <span>{title}</span>
            {open ? (
              <ChevronUpIcon strokeWidth={2} />
            ) : (
              <ChevronDownIcon strokeWidth={2} />
            )}
          </>
        )}
      </MenuButton>
      <MenuItems>
        {items.map((item) => (
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/settings">
              {item.label}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
