import { Children, cloneElement, ComponentProps, ReactNode } from "react";
import { RadioButton, RadioButtonType } from "../form/radio-button";
import { Stack } from "../layout/stack";

export type RadioButtonGroupType = {
  name?: string;
  defaultSelectedValue?: RadioButtonType["value"];
  selectedValue?: RadioButtonType["value"];
  onChange?: (newSelectedVal: RadioButtonType["value"]) => void;
  children: ReactNode;
} & ComponentProps<"div">;

export type RadioButtonGroupItemType = {
  name?: string;
  value?: RadioButtonType["value"];
  radioButtonRest?: Omit<RadioButtonType, "size" | "name" | "value">;
  children: ReactNode;
} & ComponentProps<"label">;

/** *
 * @function RadioButtonGroup
 *
 * @see {@link https://rfui.deno.dev/molecules/radio-button-group}
 *
 * @example
 * <RadioButtonGroup name="plan">
 *   <RadioButtonGroupItem value="free">
 *     Free
 *   </RadioButtonGroupItem>
 *   <RadioButtonGroupItem value="basic">
 *     Basic
 *   </RadioButtonGroupItem>
 *   <RadioButtonGroupItem value="premium">
 *     Premium
 *   </RadioButtonGroupItem>
 * </RadioButtonGroup>
 */

export const RadioButtonGroup = ({
  name,
  defaultSelectedValue,
  selectedValue,
  onChange,
  children,
  ...rest
}: RadioButtonGroupType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  const childrenArray = Children.toArray(children);
  let className = "gap-3";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <Stack className={className} {...restWithoutClass}>
      {childrenArray.map((child: any) =>
        cloneElement(child, {
          name,
          key: child.props.value,
          radioButtonRest: {
            checked:
              onChange && selectedValue
                ? selectedValue === child.props.value
                : undefined,
            defaultChecked:
              !onChange && defaultSelectedValue !== undefined
                ? defaultSelectedValue === child.props.value
                : undefined,
          },
          onClick: () => {
            if (onChange) {
              onChange(child.props.value);
            }
          },
        }),
      )}
    </Stack>
  );
};

export const RadioButtonGroupItem = ({
  name,
  value,
  radioButtonRest,
  children,
  ...rest
}: RadioButtonGroupItemType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "flex gap-3 items-center cursor-pointer";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <label className={className} {...restWithoutClass}>
      <RadioButton readOnly name={name} value={value} {...radioButtonRest} />
      <div>{children}</div>
    </label>
  );
};
