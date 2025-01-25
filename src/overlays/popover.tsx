import {
  Popover as HeadlessUIPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import type { ReactNode } from "react";

export type PopoverType = {
  content: string;
  direction?: "top" | "right" | "bottom" | "left";
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
export const Popover = ({
  content,
  direction = "right",
  children,
}: PopoverType) => {
  return (
    <HeadlessUIPopover className="relative">
      <PopoverButton>{children}</PopoverButton>
      <PopoverPanel anchor={direction}>{content}</PopoverPanel>
    </HeadlessUIPopover>
  );
};
