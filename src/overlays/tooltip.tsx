import type { ComponentProps, ReactNode } from "react";
import { useId, useRef, useState } from "react";

export type TooltipType = {
  content: string;
  direction?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
} & ComponentProps<"span">;

/** *
 * @function Tooltip
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/tooltip}
 *
 * @example
 * <Tooltip content="Example content">Hover me</Tooltip>
 */
export const Tooltip = ({
  content,
  direction = "right",
  children,
  ...rest
}: TooltipType) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const id = `tooltip-${useId()}`;
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(content.length > 0); // Show tooltip if content is not empty
    }, 400);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "relative inline-block";
  let tooltipClass =
    "absolute z-10 max-w-prose transform overflow-hidden text-ellipsis whitespace-nowrap rounded-sm bg-neutral-900 px-2 py-1 text-neutral-50";

  tooltipClass += (() => {
    switch (direction) {
      case "top":
        return " bottom-full left-1/2 mb-1 -translate-x-1/2";
      case "right":
        return " left-full top-1/2 ml-2 -translate-y-1/2";
      case "bottom":
        return " top-full left-1/2 mt-1 -translate-x-1/2";
      case "left":
        return " right-full top-1/2 mr-2 -translate-y-1/2";
    }
  })();
  containerClass += restClass ? ` ${restClass}` : "";

  return (
    <span
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      aria-describedby={isVisible ? id : undefined}
      {...restWithoutClass}
    >
      {children}
      {isVisible && (
        <div className={tooltipClass} role="tooltip" id={id}>
          {content}
        </div>
      )}
    </span>
  );
};
