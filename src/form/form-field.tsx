import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { Flex } from "../layout/flex";

export type FormFieldType = {
  label: string;
  required?: boolean;
  requiredIndicator?: "text" | "asterisk" | "none";
  optionalIndicator?: "text" | "asterisk" | "none";
  helperText?: string;
  size?: "sm" | "md" | "lg";
  errorText?: string;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function FormField
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/form-field}
 *
 * @param requiredIndicator See https://ux.stackexchange.com/q/840/39046 for a discussion.
 *
 * @example
 * <FormField label="Name">
 *   <Input name="name" />
 * </FormField>
 */
export const FormField = ({
  label,
  required = false,
  requiredIndicator = "none",
  optionalIndicator = "none",
  helperText,
  size = "md",
  errorText,
  children,
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
      {errorText && (
        <Flex
          className={`${smallFontClass} text-supporting-red-700 mb-1 gap-1 items-center`}
        >
          <ExclamationTriangleIcon
            className={size === "sm" ? "w-3 h-3 inline" : "w-4 h-4 inline"}
          />{" "}
          {errorText}
        </Flex>
      )}
      {children}
    </div>
  );
};
