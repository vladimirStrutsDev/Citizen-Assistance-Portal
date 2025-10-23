interface CommonTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const CommonTextarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: CommonTextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${className}`}
    />
  );
};

export default CommonTextarea;
