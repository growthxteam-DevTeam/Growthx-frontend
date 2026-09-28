import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { FrameworkT } from "@/types/global";

interface ComboboxFieldProps {
  field: {
    value?: string;
    onChange: (value: string) => void;
  };
  options?: FrameworkT[];
  searchPlaceholder?: string;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onSearchChange?: (value: string) => void;
}

const ComboboxField = ({
  field,
  options = [],
  searchPlaceholder,
  placeholder,
  disabled,
  onSearchChange,
}: ComboboxFieldProps) => {
  return (
    <Combobox
      items={options}
      value={field.value ?? null}
      onValueChange={(value) => field.onChange(value as string)}
      onInputValueChange={onSearchChange}
      disabled={disabled}
    >
      <ComboboxInput placeholder={searchPlaceholder ?? placeholder} disabled={disabled} />

      <ComboboxContent>
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>

        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
};

export default ComboboxField;
