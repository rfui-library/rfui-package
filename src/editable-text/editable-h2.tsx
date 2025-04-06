import { useState } from "react";
import { Input, type InputType } from "../form/input";
import { H2, H2Type } from "../typography/h2";

type CommonProps = Omit<
  Pick<H2Type & InputType, Extract<keyof H2Type, keyof InputType>>,
  "onClick" | "type" | "value" | "onChange" | "onBlur" | "children"
>;

export type EditableH2Type = {
  text: string;
  onChange: (newText: string) => void;
  emptyStateText?: string;
  h2Props?: Omit<H2Type, "onClick">;
  inputProps?: Omit<
    InputType,
    "onClick" | "type" | "value" | "onChange" | "onBlur"
  >;
} & CommonProps;

/** *
 * @function EditableH2
 *
 * @see {@link https://rfui-docs.onrender.com/components/editable-text/editable-h2}
 *
 * @example
 * <EditableH2
 *   text={text}
 *   onChange={(e) => {
 *     setText(e.target.value);
 *   }}
 * >
 */

export const EditableH2 = ({
  text: initialText,
  onChange,
  emptyStateText,
  h2Props,
  inputProps,
  ...rest
}: EditableH2Type) => {
  const [isEditable, setIsEditable] = useState(false);
  const [newText, setNewText] = useState(initialText);
  const { className: h2PropsClassName, ...h2PropsWithoutClassName } =
    h2Props ?? {};
  const { className: inputPropsClassName, ...inputPropsWithoutClassName } =
    inputProps ?? {};
  const { className: restClassName, ...restWithoutClassName } = rest;

  let h2ClassName =
    "border border-transparent hover:cursor-text hover:border-dashed hover:border-neutral-300";
  let inputClassName = "mb-5 mt-8 text-xl";

  if (h2PropsClassName) {
    h2ClassName += ` ${h2PropsClassName}`;
  }

  if (inputPropsClassName) {
    inputClassName += ` ${inputPropsClassName}`;
  }

  if (restClassName) {
    h2ClassName += ` ${restClassName}`;
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
    <H2
      className={h2ClassName}
      onClick={() => {
        setIsEditable(true);
      }}
      {...restWithoutClassName}
      {...h2PropsWithoutClassName}
    >
      {emptyStateText && initialText.length === 0
        ? emptyStateText
        : initialText}
    </H2>
  );
};
