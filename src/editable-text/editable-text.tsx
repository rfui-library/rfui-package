import { useState } from "react";
import { Input, type InputType } from "../form/input";
import { Textarea, type TextareaType } from "../form/textarea";
import { Text, type TextType } from "../typography/text";

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
  emptyStateText?: string;
  textProps?: Omit<TextType, "onClick">;
} & CommonProps &
  (
    | {
        type?: "input";
        inputProps?: Omit<
          InputType,
          "onClick" | "type" | "value" | "onChange" | "onBlur"
        >;
      }
    | {
        type: "textarea";
        textareaProps?: Omit<
          TextareaType,
          "onClick" | "value" | "onChange" | "onBlur"
        >;
      }
  );

/** *
 * @function EditableText
 *
 * @see {@link https://rfui-docs.onrender.com/components/editable-text/editable-text}
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
  onChange,
  type = "input",
  emptyStateText,
  textProps,
  ...rest
}: EditableTextType) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const { className: textPropsClassName, ...textPropsWithoutClassName } =
    textProps ?? {};
  const { className: restClassName, ...restWithoutClassName } = rest;

  const cleanedRest = { ...restWithoutClassName };
  delete (cleanedRest as any).type;
  delete (cleanedRest as any).inputProps;
  delete (cleanedRest as any).textareaProps;

  let inputPropsWithoutClassName = {};
  let textareaPropsWithoutClassName = {};
  let inputPropsClassName = "";
  let textareaPropsClassName = "";

  if (type === "input" && "inputProps" in rest) {
    const { className, ...props } = rest.inputProps ?? {};
    inputPropsClassName = className ?? "";
    inputPropsWithoutClassName = props;
  } else if (type === "textarea" && "textareaProps" in rest) {
    const { className, ...props } = rest.textareaProps ?? {};
    textareaPropsClassName = className ?? "";
    textareaPropsWithoutClassName = props;
  }

  let textClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";
  let inputClassName = "text-lg";
  let textareaClassName = "text-lg";

  if (textPropsClassName) {
    textClassName += ` ${textPropsClassName}`;
  }

  if (inputPropsClassName) {
    inputClassName += ` ${inputPropsClassName}`;
  }

  if (textareaPropsClassName) {
    textareaClassName += ` ${textareaPropsClassName}`;
  }

  if (restClassName) {
    textClassName += ` ${restClassName}`;
    inputClassName += ` ${restClassName}`;
    textareaClassName += ` ${restClassName}`;
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
          className={inputClassName}
          {...cleanedRest}
          {...inputPropsWithoutClassName}
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
          className={textareaClassName}
          {...cleanedRest}
          {...textareaPropsWithoutClassName}
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
      {...cleanedRest}
      {...textPropsWithoutClassName}
    >
      {emptyStateText && initialText.length === 0
        ? emptyStateText
        : initialText}
    </Text>
  );
};
