import { forwardRef } from "react";
import type { ChangeEvent } from "react";

export interface IProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const FormInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      isRequired = false,
      isDisabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = `input-${name}`;

    const baseInputStyles = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
  `;

    const inputStyles = error
      ? `${baseInputStyles} border-red-300 focus:ring-red-500 focus:border-red-500`
      : `${baseInputStyles} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={`space-y-1 ${className}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {isRequired && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={isDisabled}
            required={isRequired}
            className={inputStyles}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
