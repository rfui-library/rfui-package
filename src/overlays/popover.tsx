import {
  Popover as HeadlessUIPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import type { ReactNode } from "react";

export type PopoverType = {
  content: string;
  children: ReactNode;
};

/** *
 * @function Popover
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/popover}
 *
 * @example
 * <Popover content="Example content">Click me</Popover>
 */
export const Popover = ({ content, children }: PopoverType) => {
  return (
    <HeadlessUIPopover className="relative">
      <PopoverButton>{children}</PopoverButton>
      <PopoverPanel anchor="bottom">{content}</PopoverPanel>
    </HeadlessUIPopover>
  );
};
