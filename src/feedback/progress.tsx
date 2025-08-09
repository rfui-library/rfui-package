import type { ComponentProps } from "react";

export type ProgressType = {
  value: number;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "info" | "warning" | "danger" | "neutral";
} & Omit<ComponentProps<"div">, "size">;

/**
 * @function Progress
 *
 * @see {@link https://rfui-docs.onrender.com/components/feedback/progress}
 *
 * @example
 * <Progress value={40} />
 */
export const Progress = ({
  value,
  size = "md",
  variant = "neutral",
  ...rest
}: ProgressType) => {
  const adjustedValue = value > 100 ? 100 : value;
  const { className: restClass, ...restWithoutClass } = rest;
  let outerClassName = `rounded-xs box-content border`;
  let innerClassName = `h-full`;

  outerClassName += (() => {
    switch (size) {
      case "lg":
        return " h-5";
      case "md":
        return " h-4";
      default:
        return " h-3";
    }
  })();
  outerClassName += (() => {
    switch (variant) {
      case "neutral":
        return " bg-neutral-50 border-neutral-200";
      case "info":
        return " bg-primary-50 border-primary-200";
      case "success":
        return " bg-supporting-green-50 border-supporting-green-200";
      case "warning":
        return " bg-supporting-yellow-50 border-supporting-yellow-200";
      case "danger":
        return " bg-supporting-red-50 border-supporting-red-200";
    }
  })();
  innerClassName += (() => {
    switch (variant) {
      case "neutral":
        return " bg-neutral-200";
      case "info":
        return " bg-primary-200";
      case "success":
        return " bg-supporting-green-200";
      case "warning":
        return " bg-supporting-yellow-200";
      case "danger":
        return " bg-supporting-red-200";
    }
  })();

  if (restClass) {
    outerClassName += ` ${restClass}`;
  }

  return (
    <div className={outerClassName} {...restWithoutClass}>
      <div
        className={innerClassName}
        style={{ width: `${adjustedValue}%` }}
      ></div>
    </div>
  );
};
