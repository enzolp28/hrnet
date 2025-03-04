interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({ 
  id, 
  label, 
  options, 
  value = '', 
  onChange,
  className = ''
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${className}`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
