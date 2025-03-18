import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ComponentProps, ReactNode } from "react";
import { ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUpIcon } from "../../icons/chevron-up";
import { Link } from "../link";

type DropdownItemType = {
  label: string;
  href?: string;
  onClick?: () => void;
  formProps?: ComponentProps<"form">;
  isActive?: boolean;
  shouldOpenInNewTab?: boolean;
  shouldIncludeNewTabIcon?: boolean;
  icon?: ReactNode;
};

type VerticalNavbarDropdownType = {
  title: string;
  items: DropdownItemType[];
};

export const VerticalNavbarDropdown = ({
  title,
  items,
}: VerticalNavbarDropdownType) => {
  const menuItemClassName =
    "mx-1 my-1 block rounded-sm px-3 hover:bg-neutral-50 max-sm:py-3 sm:py-2";
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
      <MenuItems
        anchor="bottom"
        className="sm:max-w-[500px]! max-sm:w-full sm:w-fit sm:min-w-[300px]"
      >
        <div className="mx-3 rounded-sm border border-neutral-200 bg-[#fff] max-sm:mt-2 sm:mt-1">
          {items.map((item) =>
            item.href ? (
              <MenuItem className={menuItemClassName} key={item.label}>
                <Link
                  href={item.href}
                  underline="none"
                  _newTab={item.shouldOpenInNewTab}
                  _includeNewTabIcon={item.shouldIncludeNewTabIcon}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </Link>
              </MenuItem>
            ) : item.onClick ? (
              <MenuItem className={menuItemClassName} key={item.label}>
                <div onClick={item.onClick}>
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </div>
              </MenuItem>
            ) : item.formProps ? (
              <MenuItem className={menuItemClassName} key={item.label}>
                <form {...item.formProps}>
                  <button type="submit" className="w-full text-left">
                    {item.icon && <span>{item.icon}</span>}
                    {item.label}
                  </button>
                </form>
              </MenuItem>
            ) : null,
          )}
        </div>
      </MenuItems>
    </Menu>
  );
};
