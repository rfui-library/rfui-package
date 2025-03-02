import { useState } from "react";
import { Text, type TextType } from "../typography/text";
import { Input, type InputType } from "./input";
import { Textarea, type TextareaType } from "./textarea";

type CommonProps = Omit<
  Pick<
    TextType & InputType & TextareaType,
    Extract<keyof TextType, keyof InputType & keyof TextareaType>
  >,
  "onClick" | "type" | "value" | "onChange" | "onBlur" | "children"
>;

export type EditableTextType = {
  text: string;
  onChange: (newText: string) => void;
  type?: "input" | "textarea";
  textProps?: Omit<TextType, "onClick">;
  inputProps?: Omit<
    InputType,
    "onClick" | "type" | "value" | "onChange" | "onBlur"
  >;
  textareaProps?: Omit<
    TextareaType,
    "onClick" | "value" | "onChange" | "onBlur"
  >;
} & CommonProps;

/** *
 * @function EditableText
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/editable-text}
 *
 * @example
 * <EditableText
 *   text={text}
 *   onChange={(e) => {
 *     setText(e.target.value);
 *   }}
 * >
 */

export const EditableText = ({
  text: initialText,
  type = "input",
  onChange,
  textProps,
  inputProps,
  textareaProps,
  ...rest
}: EditableTextType) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const { className: textPropsClassName, ...textPropsWithoutClassName } =
    textProps ?? {};
  const { className: restClassName, ...restWithoutClassName } = rest;

  let textClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";

  if (textPropsClassName) {
    textClassName += ` ${textPropsClassName}`;
  }

  if (restClassName) {
    textClassName += ` ${restClassName}`;
  }

  if (isEditable) {
    if (type === "input") {
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
          {...rest}
          {...inputProps}
        />
      );
    } else if (type === "textarea") {
      return (
        <Textarea
          autoFocus
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
          onBlur={() => {
            setIsEditable(false);
            onChange(newText);
          }}
          rows={initialText.split("\n").length + 2}
          {...rest}
          {...textareaProps}
        ></Textarea>
      );
    }
  }

  return (
    <Text
      className={textClassName}
      onClick={() => {
        setIsEditable(true);
      }}
      {...restWithoutClassName}
      {...textPropsWithoutClassName}
    >
      {initialText}
    </Text>
  );
};
