import type { ReactNode } from "react";
import { useId, useState } from "react";
import { Checkbox, CheckboxType } from "../form/checkbox";
import { Flex } from "../layout/flex";
import { Stack } from "../layout/stack";

export type CheckboxCardGroupType = {
  padding?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg";
  children: ReactNode;
};

export type CheckboxCardGroupItemType = {
  defaultIsChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  name?: CheckboxType["name"];
  checkboxRest?: Omit<CheckboxType, "size" | "name">;
  children: ReactNode;
};

/** *
 * @function CheckboxCardGroup
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/checkbox-card-group}
 *
 * @example
 * <CheckboxCardGroup>
 *   <CheckboxCardGroupItem>One</CheckboxCardGroupItem>
 *   <CheckboxCardGroupItem>Two</CheckboxCardGroupItem>
 *   <CheckboxCardGroupItem>Three</CheckboxCardGroupItem>
 * </CheckboxCardGroup>
 */
export const CheckboxCardGroup = ({
  padding = "md",
  rounded,
  children,
}: CheckboxCardGroupType) => {
  const id = useId().replace(/:/g, ""); // There is a ":" at the beginning and end of the generated id which leads to CSS issues.
  let containerClass = `checkbox-card-group-${id}`;

  containerClass += ` gap-${padding === "sm" ? 2 : padding === "md" ? 3 : 4}`;

  return (
    <>
      <style>
        {`
        .checkbox-card-group-${id} .checkbox-card-group-item {
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

        .checkbox-card-group-${id} .rfui-checkbox {
          width: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
          height: var(--spacing-${
            padding === "sm" ? 4 : padding === "md" ? 5 : 6
          });
        }

        .checkbox-card-group-${id} .checkbox-card-group-item {
          gap: var(--spacing-${
            padding === "sm" ? 3 : padding === "md" ? 4 : 5
          });
        }
      `}
      </style>
      <Stack className={containerClass}>{children}</Stack>
    </>
  );
};

export const CheckboxCardGroupItem = ({
  defaultIsChecked = false,
  onChange,
  name,
  checkboxRest,
  children,
}: CheckboxCardGroupItemType) => {
  const [isChecked, setIsChecked] = useState(defaultIsChecked);
  const handleClick = () => {
    if (onChange) {
      onChange(!isChecked);
    }

    setIsChecked((v) => !v);
  };
  let containerClass =
    "checkbox-card-group-item items-center rounded-sm border p-5";

  containerClass += isChecked
    ? " border-2 border-neutral-500"
    : " border-2 border-neutral-100 hover:border-neutral-200";

  return (
    <Flex className={containerClass} onClick={handleClick}>
      <Checkbox readOnly checked={isChecked} name={name} {...checkboxRest} />
      <div>{children}</div>
    </Flex>
  );
};
