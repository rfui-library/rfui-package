import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, type ComponentProps } from "react";

export type SelectType = {
  options: {
    id: string;
    display: string;
    value: ComponentProps<"option">["value"];
  }[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  multiple?: boolean;
};

/** *
 * @function Select
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/select}
 *
 * @example
 * <Select options={options} />
 */
export const Select = ({
  options,
  name,
  disabled = false,
  size = "md",
  rounded,
  invalid = false,
  multiple = false,
}: SelectType) => {
  if (options.length === 0) {
    throw new Error("The `options` array can't be empty.");
  }

  const [selectedOption, setSelectedOption] = useState<
    SelectType["options"][number]
  >(options[0]);
  let className =
    "min-w-52 flex cursor-pointer items-center justify-between border border-neutral-500 bg-[#fff] text-left focus:border-neutral-900 focus:shadow-sm focus:outline-none";

  className += (() => {
    switch (size) {
      case "sm":
        return " px-2 text-sm";
      case "md":
        return " px-3 py-2";
      case "lg":
        return " px-3 py-3 text-lg";
    }
  })();
  className += (() => {
    switch (rounded) {
      case "square":
        return " rounded-none";
      case "sm":
        return " rounded";
      case "lg":
        return " rounded-lg";
      case "full":
        return " rounded-full";
      default:
        return " rfui-rounded-default";
    }
  })();

  if (disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700";
  }

  return (
    <Listbox
      name={name}
      value={selectedOption}
      onChange={setSelectedOption}
      disabled={disabled}
      invalid={invalid}
      multiple={multiple}
    >
      <ListboxButton className={className}>
        <span>{selectedOption.display}</span>
        <ChevronDownIcon
          className="size-4 group pointer-events-none"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions anchor="bottom">
        {options.map((option) => (
          <ListboxOption key={option.id} value={option} className="text-left">
            {option.display}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
