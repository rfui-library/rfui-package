import type { ComponentProps } from "react";
import { useId } from "react";
import { PasswordInput } from "../form/password-input";
// import type { RadioButtonGroupType } from "../form/radio-button-group";
// import {
//   RadioButtonGroup,
//   RadioButtonGroupItem,
// } from "../form/radio-button-group";
import { Checkbox } from "../form/checkbox";
import { Input } from "../form/input";
import type { SelectType } from "../form/select";
import { Select } from "../form/select";
import { Switch } from "../form/switch";
import type { TextareaType } from "../form/textarea";
import { Textarea } from "../form/textarea";
import { XCircleIcon } from "../icons/x-circle-icon";
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
  type?:
    | ComponentProps<"input">["type"]
    | "switch"
    | "rfui-password-input"
    | "textarea"
    | "radio-button-group"
    | "select";
  required?: boolean;
  requiredIndicator?: "text" | "asterisk" | "none";
  optionalIndicator?: "text" | "asterisk" | "none";
  helperText?: string;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  errorText?: string;
  // radioButtonGroupOptions?: {
  //   value: string;
  //   display: string;
  // }[];
  selectOptions?: {
    value: string;
    display: string;
  }[];
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  inputRest?: Omit<ComponentProps<"input">, ExcludedInputProps>;
  textareaRest?: Omit<TextareaType, ExcludedInputProps>;
  // radioButtonGroupRest?: Omit<RadioButtonGroupType, ExcludedInputProps>;
  selectRest?: Omit<SelectType, ExcludedInputProps>;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function FormField
 *
 * @see {@link https://rfui.deno.dev/molecules/form-field}
 *
 * @param requiredIndicator See https://ux.stackexchange.com/q/840/39046 for a discussion.
 * @param value When `type` is `textarea` the `value` prop is passed like this `<Textarea>{value}</Textarea>` and isn't passed as a prop.
 *
 * @example
 * <FormField label="Name" />
 */
export const FormField = ({
  label,
  name,
  value,
  defaultValue,
  type,
  required = false,
  requiredIndicator = "none",
  optionalIndicator = "none",
  helperText,
  size = "md",
  rounded,
  invalid = false,
  errorText,
  // radioButtonGroupOptions,
  selectOptions,
  onChange,
  onInput,
  inputRest,
  textareaRest,
  // radioButtonGroupRest,
  selectRest,
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
          <XCircleIcon className={size === "sm" ? "w-4 h-4" : undefined} />{" "}
          {errorText}
        </Flex>
      )}
      {type === "checkbox" ? (
        <Checkbox
          id={id}
          name={name}
          value={value}
          required={required}
          size={size}
          invalid={invalid}
          className={
            inputRest?.className ? `mt-1 ${inputRest?.className}` : "mt-1"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      ) : type === "switch" ? (
        <Switch
          id={id}
          name={name}
          value={value}
          required={required}
          className={
            inputRest?.className ? `mt-1 ${inputRest?.className}` : "mt-1"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
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
            inputRest?.className
              ? `block w-full ${inputRest?.className}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          invalid={invalid}
          className={
            textareaRest?.className
              ? `block w-full ${textareaRest?.className}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...textareaRest}
        >
          {value || defaultValue}
        </Textarea>
      ) : type === "radio-button-group" ? ( // && radioButtonGroupOptions ? (
        <div>RadioButtonGroup</div>
      ) : // <RadioButtonGroup
      //   id={id}
      //   name={name as string}
      //   className={`block w-full mt-3 ${radioButtonGroupRest?.className}`}
      //   onChange={(newVal) => {
      //     if (onChange) {
      //       onChange({
      //         target: {
      //           value: newVal,
      //         },
      //       });
      //     }
      //   }}
      //   {...radioButtonGroupRest}
      // >
      //   {radioButtonGroupOptions.map(({ value, display }) => (
      //     <RadioButtonGroupItem value={value} key={value}>
      //       {display}
      //     </RadioButtonGroupItem>
      //   ))}
      // </RadioButtonGroup>
      type === "select" && selectOptions ? (
        <Select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          required={required}
          invalid={invalid}
          className={
            selectRest?.className
              ? `block w-full ${selectRest?.className}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...selectRest}
        >
          {selectOptions.map(({ value, display }) => (
            <option value={value} key={value}>
              {display}
            </option>
          ))}
        </Select>
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
            inputRest?.className
              ? `block w-full ${inputRest?.className}`
              : "block w-full"
          }
          onChange={onChange}
          onInput={onInput}
          {...inputRest}
        />
      )}
    </div>
  );
};
