import {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessUICombobox,
} from "@headlessui/react";
import { useState } from "react";

export type ComboboxType = {
  options: {
    id: string;
    value: string;
    display: string;
    disabled?: boolean;
  }[];
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
export const Combobox = ({ options }: ComboboxType) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.display.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <HeadlessUICombobox
      value={selectedOption}
      onChange={(option: Option) => {
        setSelectedOption(option);
      }}
      onClose={() => {
        setQuery("");
      }}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(option: Option) => (option ? option.display : "")}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="border empty:invisible">
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.id}
            value={option}
            className="data-[focus]:bg-blue-100"
          >
            {option.display}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessUICombobox>
  );
};
