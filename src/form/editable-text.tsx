import { useState } from "react";
import { Text, type TextType } from "../typography/text";
import { Input } from "./input";

export type EditableTextType = {
  text: string;
  onChange: (newText: string) => void;
  textProps?: Omit<TextType, "onClick">;
};

/** *
 * @function EditableText
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/textarea}
 *
 * @example
 * <EditableText text="Lorem ipsum dolor...">
 */
export const EditableText = ({
  text: initialText,
  onChange,
  textProps,
}: EditableTextType) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const { className: textPropsClassName, ...textPropsWithoutClassName } =
    textProps ?? {};
  let textClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";

  if (textPropsClassName) {
    textClassName += ` ${textPropsClassName}`;
  }

  if (isEditable) {
    return (
      <Input
        autoFocus
        type="text"
        value={newText}
        onChange={(e) => {
          setNewText(e.target.value);
        }}
        onBlur={() => {
          setIsEditable(false);
          onChange(newText);
        }}
      />
    );
  }

  return (
    <Text
      className={textClassName}
      onClick={() => {
        setIsEditable(true);
      }}
      {...textPropsWithoutClassName}
    >
      {initialText}
    </Text>
  );
};
