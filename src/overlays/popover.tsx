// import {
//   Popover as HeadlessUIPopover,
//   PopoverButton,
//   PopoverPanel,
// } from "@headlessui/react";
// import type { ReactNode, ComponentProps } from "react";

// export type PopoverType = {
//   content: string;
//   children: ReactNode;
// } & ComponentProps<"span">;

// /** *
//  * @function Popover
//  *
//  * @see {@link https://rfui-docs.onrender.com/components/overlays/popover}
//  *
//  * @example
//  * <Popover content="Example content">Click me</Popover>
//  */
// export const Popover = ({ content, children, ...rest }: PopoverType) => {
//   return (
//     <HeadlessUIPopover className="relative">
//       <PopoverButton>Solutions</PopoverButton>
//       <PopoverPanel anchor="bottom" className="flex flex-col">
//         <a href="/analytics">Analytics</a>
//         <a href="/engagement">Engagement</a>
//         <a href="/security">Security</a>
//         <a href="/integrations">Integrations</a>
//       </PopoverPanel>
//     </HeadlessUIPopover>
//   );
// };
