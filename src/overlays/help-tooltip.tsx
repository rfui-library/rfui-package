import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, TooltipType } from "./tooltip";

export type HelpTooltipType = Omit<TooltipType, "children" | "size"> & {
  size?: "sm" | "md" | "lg";
};

/** *
 * @function HelpTooltip
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/help-tooltip}
 *
 * @example
 * <HelpTooltip content="Example content" />
 */
export const HelpTooltip = ({
  content,
  direction,
  size = "md",
  ...rest
}: HelpTooltipType) => {
  const iconClass =
    "text-neutral-900" +
    (() => {
      switch (size) {
        case "sm":
          return " h-4 w-4";
        case "md":
          return " h-5 w-5";
        case "lg":
          return " h-6 w-6";
      }
    })();

  return (
    <Tooltip content={content} direction={direction} {...rest}>
      <QuestionMarkCircleIcon className={iconClass} />
    </Tooltip>
  );
};
