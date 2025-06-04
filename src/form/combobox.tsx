import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessUICombobox,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Badge } from "../data-display/badge";
import { Flex } from "../layout/flex";
import { Checkbox } from "./checkbox";

type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type ComboboxBaseType<T> = {
  options: Option<T>[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  inputClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
};

type ComboboxSingleType<T> = ComboboxBaseType<T> & {
  multiple?: false;
  value?: Option<T>;
  defaultValue?: Option<T>;
  onChange?: (newValue: Option<T>) => void;
};

type ComboboxMultiType<T> = ComboboxBaseType<T> & {
  multiple: true;
  value?: Option<T>[];
  defaultValue?: Option<T>[];
  onChange?: (newValue: Option<T>[]) => void;
};

export type ComboboxType<T> = ComboboxSingleType<T> | ComboboxMultiType<T>;

/** *
 * @function Combobox
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/combobox}
 *
 * @example
 * <Combobox
    options={[
      {
        label: "foo",
        value: "foo",
      },
      {
        label: "bar",
        value: "bar",
      },
      {
        label: "baz",
        value: "baz",
      },
    ]}
  />
 */
export const Combobox = <T,>({
  options,
  name,
  disabled = false,
  size = "md",
  rounded,
  invalid = false,
  defaultValue,
  value,
  onChange,
  multiple = false,
  inputClassName: _inputClassName,
  optionsClassName: _optionsClassName,
  optionClassName: _optionClassName,
}: ComboboxType<T>): React.ReactElement => {
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  let inputClassName =
    "flex w-full max-w-full items-center justify-between truncate border hover:shadow-sm focus:shadow-md";
  let optionsClassName =
    "mt-1 w-[var(--input-width)] max-w-full border border-neutral-500 bg-[#fff] empty:invisible";
  let optionClassName =
    "mx-1 my-1 flex cursor-default items-center gap-3 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";
  let chevronIconClassName = "pointer-events-none";
  let checkIconClassName = "invisible fill-neutral-700";

  if (size === "sm") {
    inputClassName += " pl-2 pr-[36px] text-sm";
    optionClassName += " px-2 text-sm";
    chevronIconClassName += " size-4";
    checkIconClassName += " size-3";
  } else if (size === "md") {
    inputClassName += " pl-3 pr-[44px] py-2";
    optionClassName += " px-3 py-2";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
  } else if (size === "lg") {
    inputClassName += " pl-3 pr-[44px] py-3 text-lg";
    optionClassName += " px-3 py-3 text-lg";
    chevronIconClassName += " size-5";
    checkIconClassName += " size-4";
  }

  if (rounded === "square") {
    inputClassName += " rounded-none";
    optionsClassName += " rounded-none";
    optionClassName += " rounded-none";
  } else if (rounded === "sm") {
    inputClassName += " rounded-sm";
    optionsClassName += " rounded-sm";
    optionClassName += " rounded-sm";
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
  }

  if (invalid) {
    inputClassName +=
      " border-supporting-red-700 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-900";
    chevronIconClassName += " fill-supporting-red-700";
  } else {
    inputClassName +=
      " border-neutral-500 bg-[#fff] focus:border-primary-900 focus:border-neutral-900";
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
      defaultValue={
        defaultValue !== undefined
          ? defaultValue
          : !onChange
            ? multiple
              ? [options[0]]
              : options[0]
            : undefined
      }
      value={value}
      onChange={onChange}
      onClose={() => {
        setQuery("");
      }}
      disabled={disabled}
      multiple={multiple}
      // @ts-expect-error
      by="value"
    >
      {({ value }) => (
        // A `<div>` is needed instead of `<>` to prevent console errors. See https://github.com/tailwindlabs/headlessui/issues/3351.
        <div>
          {Array.isArray(value) && (
            <Flex className="mb-2 flex-wrap gap-2">
              {value.map((option) => (
                <Badge key={option.value?.toString()}>{option.label}</Badge>
              ))}
            </Flex>
          )}
          <div className="relative">
            <ComboboxInput
              displayValue={(option: Option<T> | Option<T>[]) =>
                Array.isArray(option) ? "" : option?.label || ""
              }
              onChange={(event) => setQuery(event.target.value)}
              className={inputClassName}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className={chevronIconClassName} />
            </ComboboxButton>
          </div>
          <ComboboxOptions anchor="bottom" className={optionsClassName}>
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option.label}
                value={option}
                className={optionClassName}
                disabled={!!option.disabled}
              >
                {({ selected }) => (
                  <>
                    {multiple ? (
                      <Checkbox
                        readOnly
                        checked={selected}
                        size={size === "sm" ? "xs" : "sm"}
                      />
                    ) : (
                      <CheckIcon
                        className={`${checkIconClassName} ${selected ? "visible" : "invisible"}`}
                      />
                    )}
                    <span>{option.label}</span>
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      )}
    </HeadlessUICombobox>
  );
};
