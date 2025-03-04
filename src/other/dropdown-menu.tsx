import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import { Button, type ButtonType } from "../form/button";
import { ChevronDownIcon } from "../icons/chevron-down";

type DropdownMenuItemType =
  | { type: "link"; text: string; href: string; disabled?: boolean }
  | { type: "button"; text: string; onClick: () => void; disabled?: boolean }
  | { type: "separator" }
  | { type: "section"; heading: string; items: DropdownMenuItemType[] };

export type DropdownMenuType = {
  buttonText: string;
  buttonProps?: Partial<ButtonType>;
  items: DropdownMenuItemType[];
};

const menuItemsClassName =
  "focus:outline-hidden mt-1 rounded-sm border border-neutral-500 bg-[#fff]";
const menuItemClassName =
  "group mx-1 my-1 flex min-w-[var(--button-width)] cursor-default items-center gap-3 px-3 py-2 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";
const menuHeadingClassName =
  "text-primary-900 mx-1 my-1 flex min-w-[var(--button-width)] items-center gap-3 px-3 py-2 text-sm font-bold data-[focus]:bg-neutral-50";

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
export const DropdownMenu = ({
  buttonText,
  buttonProps,
  items,
}: DropdownMenuType) => {
  return (
    <Menu>
      <MenuButton>
        <Button {...buttonProps}>
          {buttonText}{" "}
          <ChevronDownIcon className="ml-1 inline-block" strokeWidth={2} />
        </Button>
      </MenuButton>
      <MenuItems anchor="bottom" className={menuItemsClassName}>
        <Items items={items} />
      </MenuItems>
    </Menu>
  );
};

const Items = ({ items }: { items: DropdownMenuItemType[] }) =>
  items.map((item, i) =>
    item.type === "link" ? (
      <MenuItem
        key={i}
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
        key={i}
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
      <MenuSeparator key={i} className="my-1 h-px bg-neutral-100" />
    ) : item.type === "section" ? (
      <MenuSection key={i}>
        <MenuHeading className={menuHeadingClassName}>
          {item.heading}
        </MenuHeading>
        <Items items={item.items} />
      </MenuSection>
    ) : null,
  );
