import type { ComponentProps } from "react";

export type InputType = {
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
} & Omit<ComponentProps<"input">, "size">;

/** *
 * @function Input
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/input}
 *
 * @example
 * <Input type="text" />
 */
export const Input = ({
  size = "md",
  rounded,
  invalid = false,
  ...rest
}: InputType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "w-full border px-2 py-1 hover:shadow-sm focus:shadow-md";

  className += (() => {
    switch (size) {
      case "sm":
        return " px-2 text-sm";
      case "md":
        return " px-3 py-2";
      case "lg":
        return " px-4 py-3 text-lg";
    }
  })();
  className += (() => {
    switch (rounded) {
      case "square":
        return " rounded-none";
      case "sm":
        return " rounded-sm";
      case "lg":
        return " rounded-lg";
      case "full":
        return " rounded-full px-3";
      default:
        return " rfui-rounded-default";
    }
  })();

  if (rest.disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (rest.readOnly) {
    className += " cursor-not-allowed";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700";
  } else {
    className +=
      " border-neutral-500 hover:border-neutral-900 focus:border-primary-900";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return <input className={className} {...restWithoutClass} />;
};
