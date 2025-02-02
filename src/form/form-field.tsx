import { XCircleIcon } from "@heroicons/react/24/outline";
import type { ComponentProps } from "react";
import { useId } from "react";
import { Checkbox } from "../form/checkbox";
import { Input } from "../form/input";
import { PasswordInput } from "../form/password-input";
import type { RadioButtonGroupType } from "../form/radio-button-group";
import {
  RadioButtonGroup,
  RadioButtonGroupItem,
} from "../form/radio-button-group";
import { Switch } from "../form/switch";
import type { TextareaType } from "../form/textarea";
import { Textarea } from "../form/textarea";
import { Flex } from "../layout/flex";

type ExcludedInputProps =
  | "name"
  | "value"
  | "type"
  | "required"
  | "size"
  | "rounded"
  | "invalid"
  | "onChange"
  | "onInput";

export type FormFieldType = {
  label: string;
  name?: ComponentProps<"input">["name"];
  value?: ComponentProps<"input">["value"];
  defaultValue?: ComponentProps<"input">["defaultValue"];
  checked?: boolean;
  defaultChecked?: boolean;
  type?:
    | ComponentProps<"input">["type"]
    | "switch"
    | "rfui-password-input"
    | "textarea"
    | "radio-button-group";
  required?: boolean;
  requiredIndicator?: "text" | "asterisk" | "none";
  optionalIndicator?: "text" | "asterisk" | "none";
  helperText?: string;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  errorText?: string;
  radioButtonGroupOptions?: {
    value: string;
    display: string;
  }[];
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  inputRest?: Omit<ComponentProps<"input">, ExcludedInputProps>;
  textareaRest?: Omit<TextareaType, ExcludedInputProps>;
  radioButtonGroupRest?: Omit<
    RadioButtonGroupType,
    ExcludedInputProps | "children"
  >;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function FormField
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/form-field}
 *
 * @param requiredIndicator See https://ux.stackexchange.com/q/840/39046 for a discussion.
 *
 * @example
 * <FormField label="Name" />
 */
export const FormField = ({
  label,
  name,
  value,
  defaultValue,
  checked,
  defaultChecked,
  type,
  required = false,
  requiredIndicator = "none",
  optionalIndicator = "none",
  helperText,
  size = "md",
  rounded,
  invalid = false,
  errorText,
  radioButtonGroupOptions,
  onChange,
  onInput,
  inputRest,
  textareaRest,
  radioButtonGroupRest,
  ...rest
}: FormFieldType) => {
  const id = useId();
  const [smallFontClass, normalFontClass] = (() => {
    switch (size) {
      case "sm":
        return ["text-xs", "text-sm"];
      case "md":
        return ["text-sm", "text-base"];
      case "lg":
        return ["text-base", "text-lg"];
    }
  })();
  const { className: inputRestClassName, ...inputRestWithoutClassName } =
    inputRest || {};
  const { className: textareaRestClassName, ...textareaRestWithoutClassName } =
    textareaRest || {};
  const {
    className: radioButtonGroupRestClassName,
    ...radioButtonGroupRestWithoutClassName
  } = radioButtonGroupRest || {};

  return (
    <div {...rest}>
      <label htmlFor={id} className={`mb-1 block ${normalFontClass}`}>
        {label}{" "}
        {required && requiredIndicator === "text" && (
          <span className={`text-neutral-700 ${smallFontClass}`}>
            (required)
          </span>
        )}
        {required && requiredIndicator === "asterisk" && <sup>*</sup>}
        {!required && optionalIndicator === "text" && (
          <span className={`text-neutral-700 ${smallFontClass}`}>
            (optional)
          </span>
        )}
        {!required && optionalIndicator === "asterisk" && <sup>*</sup>}
      </label>
      <div className={`${smallFontClass} text-neutral-700 mb-1`}>
        {helperText}
      </div>
      {invalid && errorText && (
        <Flex
          className={`${smallFontClass} text-supporting-red-700 mb-1 gap-1 items-center`}
        >
          <XCircleIcon
            className={size === "sm" ? "w-4 h-4 inline" : "w-5 h-5 inline"}
          />{" "}
          {errorText}
        </Flex>
      )}
      {type === "checkbox" ? (
        <Checkbox
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          size={size}
          invalid={invalid}
          className={inputRestClassName ? `mt-1 ${inputRestClassName}` : "mt-1"}
          onChange={onChange}
          onInput={onInput}
          {...inputRestWithoutClassName}
        />
      ) : type === "switch" ? (
        <Switch
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          className={inputRestClassName ? `mt-1 ${inputRestClassName}` : "mt-1"}
          onChange={onChange}
          onInput={onInput}
          {...inputRestWithoutClassName}
        />
      ) : type === "rfui-password-input" ? (
        <PasswordInput
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          required={required}
          size={size}
          rounded={rounded}
          invalid={invalid}
          className={
            inputRestClassName
              ? `block w-full ${inputRestClassName}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRestWithoutClassName}
        />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          required={required}
          invalid={invalid}
          className={
            textareaRestClassName
              ? `block w-full ${textareaRestClassName}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...textareaRestWithoutClassName}
        />
      ) : type === "radio-button-group" && radioButtonGroupOptions ? (
        <RadioButtonGroup
          id={id}
          name={name as string}
          className={
            radioButtonGroupRestClassName
              ? `block w-full mt-3 ${radioButtonGroupRestClassName}`
              : "block w-full mt-3"
          }
          onChange={
            onChange
              ? (newVal) => {
                  onChange({
                    target: {
                      value: newVal,
                    },
                  });
                }
              : undefined
          }
          {...radioButtonGroupRestWithoutClassName}
        >
          {radioButtonGroupOptions.map(({ value, display }) => (
            <RadioButtonGroupItem value={value} key={value}>
              {display}
            </RadioButtonGroupItem>
          ))}
        </RadioButtonGroup>
      ) : (
        <Input
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          type={type}
          required={required}
          size={size}
          rounded={rounded}
          invalid={invalid}
          className={
            inputRestClassName
              ? `block w-full ${inputRestClassName}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRestWithoutClassName}
        />
      )}
    </div>
  );
};
