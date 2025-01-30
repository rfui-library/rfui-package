import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessUICombobox,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export type ComboboxType = {
  options: {
    id: string;
    value: string;
    display: string;
    disabled?: boolean;
  }[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  onChange?: (newValue: Option) => void;
  inputClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
};

type Option = ComboboxType["options"][number];

/** *
 * @function Combobox
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/combobox}
 *
 * @example
 * <Combobox />
 */
export const Combobox = ({
  options,
  name,
  disabled = false,
  size = "md",
  rounded,
  invalid = false,
  onChange,
  inputClassName: _inputClassName,
  optionsClassName: _optionsClassName,
  optionClassName: _optionClassName,
}: ComboboxType) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.display.toLowerCase().includes(query.toLowerCase()),
        );

  let inputClassName =
    "min-w-52 flex w-full max-w-full items-center justify-between border border-neutral-500 bg-[#fff] focus:border-neutral-900 focus:shadow-sm focus:outline-none";
  let optionsClassName =
    "min-w-52 mt-1 w-[var(--input-width)] max-w-full border border-neutral-500 bg-[#fff] empty:invisible focus:outline-none";
  let optionClassName =
    "group mx-1 my-1 flex cursor-default items-center gap-3 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";
  let chevronIconClassName = "group pointer-events-none";
  let checkIconClassName =
    "invisible fill-neutral-700 group-data-[selected]:visible";

  if (size === "sm") {
    inputClassName += " px-2 text-sm";
    optionClassName += " px-2 text-sm";
    chevronIconClassName += " size-4";
    checkIconClassName += " size-3";
  } else if (size === "md") {
    inputClassName += " px-3 py-2";
    optionClassName += " px-3 py-2";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
  } else if (size === "lg") {
    inputClassName += " px-3 py-3 text-lg";
    optionClassName += " px-3 py-3 text-lg";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
  }

  if (rounded === "square") {
    inputClassName += " rounded-none";
    optionsClassName += " rounded-none";
    optionClassName += " rounded-none";
  } else if (rounded === "sm") {
    inputClassName += " rounded";
    optionsClassName += " rounded";
    optionClassName += " rounded";
  } else if (rounded === "lg") {
    inputClassName += " rounded-lg";
    optionsClassName += " rounded-lg";
    optionClassName += " rounded-lg";
  } else if (rounded === "full") {
    inputClassName += " rounded-full";
    optionsClassName += " rounded-lg";
    optionClassName += " rounded-lg";
  } else {
    inputClassName += " rfui-rounded-default";
    optionsClassName += " rfui-rounded-default";
    optionClassName += " rfui-rounded-default";
  }

  if (disabled) {
    inputClassName += " cursor-not-allowed bg-neutral-50";
  } else {
    inputClassName += " cursor-pointer";
  }

  if (invalid) {
    inputClassName +=
      " border-supporting-red-700 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-900";
    chevronIconClassName += " fill-supporting-red-700";
  } else {
    chevronIconClassName += " fill-neutral-700";
  }

  if (_inputClassName) {
    inputClassName += ` ${_inputClassName}`;
  }

  if (_optionsClassName) {
    optionsClassName += ` ${_optionsClassName}`;
  }

  if (_optionClassName) {
    optionClassName += ` ${_optionClassName}`;
  }

  return (
    <HeadlessUICombobox
      name={name}
      value={selectedOption}
      onChange={(option: Option) => {
        setSelectedOption(option);

        if (onChange) {
          onChange(option);
        }
      }}
      onClose={() => {
        setQuery("");
      }}
      disabled={disabled}
    >
      <div className="relative">
        <ComboboxInput
          displayValue={(option: Option) => (option ? option.display : "")}
          onChange={(event) => setQuery(event.target.value)}
          className={inputClassName}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className={chevronIconClassName} />
        </ComboboxButton>
      </div>
      <ComboboxOptions anchor="bottom" className={optionsClassName}>
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.id}
            value={option}
            className={optionClassName}
            disabled={!!option.disabled}
          >
            <CheckIcon className={checkIconClassName} />
            <span>{option.display}</span>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessUICombobox>
  );
};
