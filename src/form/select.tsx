import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

type Option = {
  label: string;
  value: string | number | boolean | null | undefined;
  disabled?: boolean;
};

export type SelectType = {
  options: Option[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  defaultValue?: Option;
  value?: Option;
  onChange?: (newValue: Option) => void;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
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
  defaultValue,
  value,
  onChange,
  buttonClassName: _buttonClassName,
  optionsClassName: _optionsClassName,
  optionClassName: _optionClassName,
}: SelectType) => {
  if (options.length === 0) {
    return null;
  }

  let buttonClassName =
    "min-w-52 flex w-full max-w-full items-center justify-between border hover:shadow-sm focus:shadow-md";
  let optionsClassName =
    "min-w-52 mt-1 w-[var(--button-width)] max-w-full border border-neutral-500 bg-[#fff]";
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
    buttonClassName += " rounded-sm";
    optionsClassName += " rounded-sm";
    optionClassName += " rounded-sm";
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
  }

  if (invalid) {
    buttonClassName +=
      " border-supporting-red-700 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-900 hover:shadow-sm focus:shadow-md";
    chevronIconClassName += " fill-supporting-red-700";
  } else {
    buttonClassName +=
      " border-neutral-500 bg-[#fff] hover:border-neutral-900 focus:border-primary-900";
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
      defaultValue={
        defaultValue !== undefined
          ? defaultValue
          : !onChange
            ? options[0]
            : undefined
      }
      value={value}
      onChange={onChange}
      disabled={disabled}
      invalid={invalid}
    >
      <ListboxButton className={buttonClassName}>
        {({ value }) => (
          <>
            <span>{value?.label}</span>
            <ChevronDownIcon
              className={chevronIconClassName}
              aria-hidden="true"
            />
          </>
        )}
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={optionsClassName}>
        {options.map((option) => (
          <ListboxOption
            key={option.label}
            value={option}
            className={optionClassName}
            disabled={!!option.disabled}
          >
            <CheckIcon className={checkIconClassName} />
            <span>{option.label}</span>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
