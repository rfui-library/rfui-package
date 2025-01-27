import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
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
  let buttonClassName =
    "min-w-52 flex items-center justify-between border border-neutral-500 bg-[#fff] focus:border-neutral-900 focus:shadow-sm focus:outline-none";
  let optionsClassName =
    "min-w-52 mt-1 border border-neutral-500 bg-[#fff] focus:outline-none";
  let optionClassName =
    "group mx-1 my-1 flex cursor-default items-center gap-3 data-[focus]:bg-neutral-50";
  let chevronIconClassName = "size-5 group pointer-events-none";
  let checkIconClassName =
    "size-4 invisible fill-neutral-700 group-data-[selected]:visible";

  if (size === "sm") {
    buttonClassName += " px-2 text-sm";
    optionClassName += " px-2 text-sm";
  } else if (size === "md") {
    buttonClassName += " px-3 py-2";
    optionClassName += " px-3 py-2";
  } else if (size === "lg") {
    buttonClassName += " px-3 py-3 text-lg";
    optionClassName += " px-3 py-3 text-lg";
  }

  if (rounded === "square") {
    buttonClassName += " rounded-none";
    optionsClassName += " rounded-none";
    optionClassName += " rounded-none";
  } else if (rounded === "sm") {
    buttonClassName += " rounded";
    optionsClassName += " rounded";
    optionClassName += " rounded";
  } else if (rounded === "lg") {
    buttonClassName += " rounded-lg";
    optionsClassName += " rounded-lg";
    optionClassName += " rounded-lg";
  } else if (rounded === "full") {
    buttonClassName += " rounded-full";
    optionsClassName += " rounded-lg";
    optionClassName += " rounded-lg";
  } else {
    buttonClassName += " rfui-rounded-default";
    optionsClassName += " rfui-rounded-default";
    optionClassName += " rfui-rounded-default";
  }

  if (disabled) {
    buttonClassName += " cursor-not-allowed bg-neutral-50";
  } else {
    buttonClassName += " cursor-pointer";
  }

  if (invalid) {
    buttonClassName +=
      " border-supporting-red-700 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-900";
    chevronIconClassName += " fill-supporting-red-700";
  } else {
    chevronIconClassName += " fill-neutral-700";
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
      <ListboxButton className={buttonClassName}>
        <span>{selectedOption.display}</span>
        <ChevronDownIcon className={chevronIconClassName} aria-hidden="true" />
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={optionsClassName}>
        {options.map((option) => (
          <ListboxOption
            key={option.id}
            value={option}
            className={optionClassName}
          >
            <CheckIcon className={checkIconClassName} />
            <span>{option.display}</span>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
