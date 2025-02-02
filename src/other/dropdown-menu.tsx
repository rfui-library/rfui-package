import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "../form/button";
import { ChevronDownIcon } from "../icons/chevron-down";

export type DropdownMenuType = {
  buttonText: string;
};

/** *
 * @function DropdownMenu
 *
 * @see {@link https://rfui-docs.onrender.com/components/other/dropdown-menu}
 *
 * @example
 * TODO
 */
export const DropdownMenu = ({ buttonText }: DropdownMenuType) => {
  return (
    <Menu>
      <MenuButton>
        <Button>
          {buttonText}{" "}
          <ChevronDownIcon className="ml-1 inline-block" strokeWidth={2} />
        </Button>
      </MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
