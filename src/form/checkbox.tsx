import type { ComponentProps } from "react";

export type CheckboxType = {
  size?: "xs" | "sm" | "md" | "lg";
  invalid?: boolean;
} & Omit<ComponentProps<"input">, "size">;

/** *
 * @function Checkbox
 *
 * Inspiration: https://css-tricks.com/zero-trickery-custom-radios-and-checkboxes/
 *
 * Readonly isn't really an option: https://stackoverflow.com/q/155291/1927876
 *
 * Discussion of the cursor property https://ux.stackexchange.com/q/23266/39046
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/checkbox}
 *
 * @example
 * <Checkbox />
 */
export const Checkbox = ({
  size = "md",
  invalid = false,
  ...rest
}: CheckboxType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-checkbox accent-primary-500 hover:shadow-sm";

  className += (() => {
    switch (size) {
      case "xs":
        return " w-4 h-4";
      case "sm":
        return " w-5 h-5";
      case "md":
        return " w-6 h-6";
      case "lg":
        return " w-7 h-7";
    }
  })();

  if (rest.disabled) {
    className += " cursor-not-allowed";
  }

  if (invalid) {
    className += " outline outline-offset-2 outline-supporting-red-500";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return <input type="checkbox" className={className} {...restWithoutClass} />;
};
