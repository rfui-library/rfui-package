import type { ReactNode } from "react";
import { Children, cloneElement, useId, useState } from "react";
import { RadioButton, RadioButtonType } from "../form/radio-button";
import { Flex } from "../layout/flex";
import { Stack } from "../layout/stack";

export type RadioButtonCardGroupType = {
  name: RadioButtonType["name"];
  padding?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg";
  onChange?: (newValue: RadioButtonType["value"]) => void;
  children: ReactNode;
};

export type RadioButtonCardGroupItemType = {
  name?: RadioButtonType["name"];
  value?: RadioButtonType["value"];
  isSelected?: boolean;
  handleNewSelection?: (newValue: RadioButtonType["value"]) => void;
  children: ReactNode;
};

/** *
 * @function RadioButtonCardGroup
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/radio-button-card-group}
 *
 * @example
 * <RadioButtonCardGroup>
 *   <RadioButtonCardGroupItem name="one" selectedItemName={selectedItemName}>
 *     One
 *   </RadioButtonCardGroupItem>
 *    <RadioButtonCardGroupItem name="two" selectedItemName={selectedItemName}>
 *     Two
 *   </RadioButtonCardGroupItem>
 *    <RadioButtonCardGroupItem name="three" selectedItemName={selectedItemName}>
 *     Three
 *   </RadioButtonCardGroupItem>
 * </RadioButtonCardGroup>
 */
export const RadioButtonCardGroup = ({
  name,
  padding = "md",
  rounded,
  onChange,
  children,
}: RadioButtonCardGroupType) => {
  const id = useId().replace(/:/g, ""); // There is a ":" at the beginning and end of the generated id which leads to CSS issues.
  const [selectedItemName, setSelectedItemName] = useState("");
  const childrenArray = Children.toArray(children);
  let containerClass = `radio-button-card-group-${id}`;

  containerClass += ` gap-${padding === "sm" ? 2 : padding === "md" ? 3 : 4}`;

  return (
    <>
      <style>
        {`
        .radio-button-card-group-${id} .radio-button-card-group-item {
          padding: var(--spacing-${
            padding === "sm" ? 3 : padding === "md" ? 5 : 7
          });
          border-radius: var(${
            rounded === "square"
              ? "--spacing-0"
              : rounded === "sm"
                ? "--spacing-1"
                : rounded === "lg"
                  ? "--spacing-2"
                  : "--default-roundedness"
          });
        }

        .radio-button-card-group-${id} .rfui-radio-button {
          width: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
          height: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
        }

        .radio-button-card-group-${id} .radio-button-card-group-item {
          gap: var(--spacing-${
            padding === "sm" ? 3 : padding === "md" ? 4 : 5
          });
        }
      `}
      </style>
      <Stack className={containerClass}>
        {childrenArray.map((child: any) =>
          cloneElement(child, {
            name,
            value: child.props.value,
            key: child.props.value,
            isSelected: selectedItemName === child.props.value,
            handleNewSelection: (newValue: string) => {
              setSelectedItemName(newValue);

              if (onChange) {
                onChange(newValue);
              }
            },
          }),
        )}
      </Stack>
    </>
  );
};

export const RadioButtonCardGroupItem = ({
  name,
  value,
  isSelected,
  handleNewSelection,
  children,
}: RadioButtonCardGroupItemType) => {
  let containerClass =
    "radio-button-card-group-item cursor-pointer items-center border";

  containerClass += isSelected
    ? " border-2 border-neutral-500"
    : " border-2 border-neutral-100";

  return (
    <Flex
      className={containerClass}
      onClick={() => {
        // @ts-expect-error It will be present. I had to mark the type as optional so that it works for library users but it will be added in the `cloneElement` call in `RadioButtonCardGroup`.
        handleNewSelection(value);
      }}
    >
      <RadioButton readOnly name={name} checked={isSelected} value={value} />
      <div>{children}</div>
    </Flex>
  );
};
