import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { Button } from "../form/button";
import { ChevronDownIcon } from "../icons/chevron-down";

type DropdownMenuItemType =
  | { type: "link"; text: string; href: string; disabled?: boolean }
  | { type: "button"; text: string; onClick: () => void; disabled?: boolean }
  | { type: "separator" }
  | { type: "section"; heading: string; items: DropdownMenuItemType[] };

export type DropdownMenuType = {
  buttonText: string;
  items: DropdownMenuItemType[];
};

/** *
 * @function DropdownMenu
 *
 * @see {@link https://rfui-docs.onrender.com/components/other/dropdown-menu}
 *
 * @example
 * <DropdownMenu
    buttonText="Basic example"
    items={[
      {
        type: "button",
        text: "Foo",
        onClick: () => {
          alert("Foo");
        },
      },
      {
        type: "button",
        text: "Bar",
        onClick: () => {
          alert("Bar");
        },
      },
    ]}
  />
 */
export const DropdownMenu = ({ buttonText, items }: DropdownMenuType) => {
  const menuItemsClassName =
    "focus:outline-hidden mt-1 rounded-sm border border-neutral-500 bg-[#fff]";
  const menuItemClassName =
    "group mx-1 my-1 flex min-w-[var(--button-width)] cursor-default items-center gap-3 px-3 py-2 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";

  return (
    <Menu>
      <MenuButton>
        <Button>
          {buttonText}{" "}
          <ChevronDownIcon className="ml-1 inline-block" strokeWidth={2} />
        </Button>
      </MenuButton>
      <MenuItems anchor="bottom" className={menuItemsClassName}>
        {items.map((item) =>
          item.type === "link" ? (
            <MenuItem
              disabled={!!item.disabled}
              className={menuItemClassName}
              style={{ width: "calc(100% - 8px)" }}
            >
              <a
                className="block cursor-pointer data-[focus]:bg-blue-100"
                href={item.href}
              >
                {item.text}
              </a>
            </MenuItem>
          ) : item.type === "button" ? (
            <MenuItem
              disabled={!!item.disabled}
              className={menuItemClassName}
              style={{ width: "calc(100% - 8px)" }}
            >
              <button
                onClick={item.onClick}
                className="block text-left data-[focus]:bg-blue-100"
              >
                {item.text}
              </button>
            </MenuItem>
          ) : item.type === "separator" ? (
            <MenuSeparator className="my-1 h-px bg-neutral-100" />
          ) : null,
        )}
      </MenuItems>
    </Menu>
  );
};
