import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "./checkbox";

export type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type SelectBaseType<T> = {
  options: Option<T>[];
  name?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
};

type SelectSingleType<T> = SelectBaseType<T> & {
  multiple?: false;
  value?: T;
  defaultValue?: T;
  onChange?: (newValue: T) => void;
};

type SelectMultiType<T> = SelectBaseType<T> & {
  multiple: true;
  value?: T[];
  defaultValue?: T[];
  onChange?: (newValue: T[]) => void;
};

export type SelectType<T> = SelectSingleType<T> | SelectMultiType<T>;

/** *
 * @function Select
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/select}
 *
 * @example
 * <Select options={options} />
 */
export const Select = <T,>({
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
  buttonClassName: _buttonClassName,
  optionsClassName: _optionsClassName,
  optionClassName: _optionClassName,
}: SelectType<T>): React.ReactNode => {
  if (options.length === 0) {
    return null;
  }

  // Convert value(s) to Option(s) for Headless UI
  const valueAsOption = multiple
    ? (value as T[] | undefined)
        ?.map((v) => options.find((o) => o.value === v))
        .filter((o): o is Option<T> => o !== undefined)
    : options.find((o) => o.value === value);

  const defaultValueAsOption = multiple
    ? (defaultValue as T[] | undefined)
        ?.map((v) => options.find((o) => o.value === v))
        .filter((o): o is Option<T> => o !== undefined)
    : options.find((o) => o.value === defaultValue);

  // Convert onChange to work with values instead of Options
  const handleChange = onChange
    ? (newOption: Option<T> | Option<T>[]) => {
        if (multiple) {
          const values = (newOption as Option<T>[]).map((o) => o.value);
          (onChange as (v: T[]) => void)(values);
        } else {
          (onChange as (v: T) => void)((newOption as Option<T>).value);
        }
      }
    : undefined;

  let buttonClassName =
    "min-w-52 relative w-full max-w-full border text-left hover:shadow-sm focus:shadow-md";
  let optionsClassName =
    "min-w-52 mt-1 w-[var(--button-width)] max-w-full border border-neutral-500 bg-[#fff]";
  let optionClassName =
    "mx-1 my-1 flex cursor-default items-center gap-3 data-[focus]:bg-neutral-50 data-[disabled]:opacity-50";
  let chevronIconClassName =
    "pointer-events-none absolute inset-y-0 right-0 h-full px-2.5";
  let checkIconClassName = "fill-neutral-700";

  if (size === "sm") {
    buttonClassName += " pl-2 pr-[36px] text-sm";
    optionClassName += " px-2 text-sm";
    chevronIconClassName += " w-[36px]";
    checkIconClassName += " size-3";
  } else if (size === "md") {
    buttonClassName += " pl-3 pr-[44px] py-2";
    optionClassName += " px-3 py-2";
    chevronIconClassName += " w-[44px]";
    checkIconClassName += " size-4";
  } else if (size === "lg") {
    buttonClassName += " pl-3 pr-[44px] py-3 text-lg";
    optionClassName += " px-3 py-3 text-lg";
    chevronIconClassName += " w-[44px]";
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
        defaultValueAsOption !== undefined
          ? defaultValueAsOption
          : !onChange
            ? multiple
              ? [options[0]]
              : options[0]
            : undefined
      }
      value={valueAsOption}
      onChange={handleChange}
      disabled={disabled}
      invalid={invalid}
      multiple={multiple}
      by="value"
    >
      <ListboxButton className={buttonClassName}>
        {({ value }) => {
          const display = multiple
            ? value.map((o: Option<T>) => o?.label).join(", ").length > 50
              ? `${value.length} item(s) selected`
              : value.map((o: Option<T>) => o?.label).join(", ")
            : value?.label;

          return (
            <>
              {/* Using a non-breaking space to prevent the button from collapsing when there is no value */}
              <span className="block truncate">{display || "\u00A0"}</span>
              <ChevronDownIcon
                className={chevronIconClassName}
                aria-hidden="true"
              />
            </>
          );
        }}
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={optionsClassName}>
        {options.map((option) => (
          <ListboxOption
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
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
