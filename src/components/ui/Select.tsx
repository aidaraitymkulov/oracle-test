import * as RadixSelect from '@radix-ui/react-select';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
}

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder = 'Выберите...',
  label,
  error,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          className={`inline-flex items-center justify-between rounded-lg border px-3 py-2 text-sm outline-none transition-colors data-placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className="ml-2 text-gray-500">
            <img src={chevronDownIcon} alt="" width={16} height={16} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className="z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
            position="popper"
            sideOffset={4}
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-blue-50 data-highlighted:text-blue-700"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
