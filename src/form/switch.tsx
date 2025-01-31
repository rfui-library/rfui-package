import type { ComponentProps } from "react";

export type SwitchType = ComponentProps<"input">;

/** *
 * @function Switch
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/switch}
 *
 * @example
 * <Switch />
 */
export const Switch = ({ ...rest }: SwitchType) => {
  // See `app.css`. Source: https://www.htmhell.dev/adventcalendar/2023/2/
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-switch";

  if (rest.disabled) {
    className += " cursor-not-allowed";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return <input type="checkbox" className={className} {...restWithoutClass} />;
};
