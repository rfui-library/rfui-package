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
    <HeadlessUIPopover>
      <PopoverButton>{children}</PopoverButton>
      <PopoverPanel
        anchor={{ to: direction, gap: 6 }}
        className="rounded-sm border border-neutral-100 p-4 shadow-lg"
      >
        {content}
      </PopoverPanel>
    </HeadlessUIPopover>
  );
};
