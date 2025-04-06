import { useState } from "react";
import { Input, type InputType } from "../form/input";
import { H1, H1Type } from "../typography/h1";

type CommonProps = Omit<
  Pick<H1Type & InputType, Extract<keyof H1Type, keyof InputType>>,
  "onClick" | "type" | "value" | "onChange" | "onBlur" | "children"
>;

export type EditableH1Type = {
  text: string;
  onChange: (newText: string) => void;
  emptyStateText?: string;
  h1Props?: Omit<H1Type, "onClick">;
  inputProps?: Omit<
    InputType,
    "onClick" | "type" | "value" | "onChange" | "onBlur"
  >;
} & CommonProps;

/** *
 * @function EditableH1
 *
 * @see {@link https://rfui-docs.onrender.com/components/editable-text/editable-h1}
 *
 * @example
 * <EditableH1
 *   text={text}
 *   onChange={(e) => {
 *     setText(e.target.value);
 *   }}
 * >
 */

export const EditableH1 = ({
  text: initialText,
  onChange,
  emptyStateText,
  h1Props,
  inputProps,
  ...rest
}: EditableH1Type) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const { className: h1PropsClassName, ...h1PropsWithoutClassName } =
    h1Props ?? {};
  const { className: inputPropsClassName, ...inputPropsWithoutClassName } =
    inputProps ?? {};
  const { className: restClassName, ...restWithoutClassName } = rest;

  let h1ClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";
  let inputClassName = "mb-7 mt-9 py-2 text-3xl";

  if (h1PropsClassName) {
    h1ClassName += ` ${h1PropsClassName}`;
  }

  if (inputPropsClassName) {
    inputClassName += ` ${inputPropsClassName}`;
  }

  if (restClassName) {
    h1ClassName += ` ${restClassName}`;
    inputClassName += ` ${restClassName}`;
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEditable(false);
            onChange(newText);
          }
        }}
        className={inputClassName}
        {...restWithoutClassName}
        {...inputPropsWithoutClassName}
      />
    );
  }

  return (
    <H1
      className={h1ClassName}
      onClick={() => {
        setIsEditable(true);
      }}
      {...restWithoutClassName}
      {...h1PropsWithoutClassName}
    >
      {emptyStateText && initialText.length === 0
        ? emptyStateText
        : initialText}
    </H1>
  );
};
