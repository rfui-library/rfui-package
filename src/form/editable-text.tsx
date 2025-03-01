import type { ComponentProps, ReactNode } from "react";

export type EditableTextType = {
  children?: ReactNode;
} & ComponentProps<"textarea">;

/** *
 * @function EditableText
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/textarea}
 *
 * @example
 * <Textarea></Textarea>
 */
export const EditableText = ({ ...rest }: EditableTextType) => {
  const { className: restClass, ...resstWithoutClass } = rest;
  let className =
    "block w-full border px-2 py-1 hover:shadow-sm focus:shadow-md";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return <textarea className={className} {...resstWithoutClass} />;
};
