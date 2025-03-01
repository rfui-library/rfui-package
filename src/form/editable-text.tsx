import { Text, type TextType } from "../typography/text";

export type EditableTextType = {
  text: string;
  textProps?: TextType;
};

/** *
 * @function EditableText
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/textarea}
 *
 * @example
 * <EditableText text="Lorem ipsum dolor...">
 */
export const EditableText = ({ text, textProps }: EditableTextType) => {
  const { className: textPropsClassName, ...textPropsWithoutClassName } =
    textProps ?? {};
  let textClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";

  if (textPropsClassName) {
    textClassName += ` ${textPropsClassName}`;
  }

  return (
    <Text className={textClassName} {...textPropsWithoutClassName}>
      {text}
    </Text>
  );
};
