import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, TooltipType } from "./tooltip";

export type InfoTooltipType = Omit<TooltipType, "children" | "size"> & {
  size?: "sm" | "md" | "lg";
};

/** *
 * @function InfoTooltip
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/info-tooltip}
 *
 * @example
 * <InfoTooltip content="Example content" />
 */
export const InfoTooltip = ({
  content,
  direction,
  size = "md",
  ...rest
}: InfoTooltipType) => {
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
      <InformationCircleIcon className={iconClass} />
    </Tooltip>
  );
};
