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
    disabled?: boolean;
  }[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  onChange?: (newValue: Option) => void;
};

type Option = SelectType["options"][number];

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
  buttonClassName: _buttonClassName,
  optionsClassName: _optionsClassName,
  optionClassName: _optionClassName,
  onChange,
}: SelectType) => {
  if (options.length === 0) {
    return null;
  }

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  let buttonClassName =
    "min-w-52 flex w-full max-w-full items-center justify-between border border-neutral-500 bg-[#fff] focus:border-neutral-900 focus:shadow-sm focus:outline-none";
  let optionsClassName =
    "min-w-52 mt-1 w-[var(--button-width)] max-w-full border border-neutral-500 bg-[#fff] focus:outline-none";
  let optionClassName =
    "group mx-1 my-1 flex cursor-default items-center gap-3 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";
  let chevronIconClassName = "group pointer-events-none";
  let checkIconClassName =
    "invisible fill-neutral-700 group-data-[selected]:visible";

  if (size === "sm") {
    buttonClassName += " px-2 text-sm";
    optionClassName += " px-2 text-sm";
    chevronIconClassName += " size-4";
    checkIconClassName += " size-3";
  } else if (size === "md") {
    buttonClassName += " px-3 py-2";
    optionClassName += " px-3 py-2";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
  } else if (size === "lg") {
    buttonClassName += " px-3 py-3 text-lg";
    optionClassName += " px-3 py-3 text-lg";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
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

  if (_buttonClassName) {
    buttonClassName += ` ${_buttonClassName}`;
  }

  if (_optionsClassName) {
    optionsClassName += ` ${_optionsClassName}`;
  }

  if (_optionClassName) {
    optionClassName += ` ${_optionClassName}`;
  }

  return (
    <Listbox
      name={name}
      value={selectedOption}
      onChange={(newVal) => {
        setSelectedOption(newVal);

        if (onChange) {
          onChange(newVal);
        }
      }}
      disabled={disabled}
      invalid={invalid}
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
            disabled={!!option.disabled}
          >
            <CheckIcon className={checkIconClassName} />
            <span>{option.display}</span>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
