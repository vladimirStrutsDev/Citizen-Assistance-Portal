import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
  rows?: number;
  min?: number;
  max?: number;
  // React Hook Form props
  register?: UseFormRegisterReturn;
  fieldError?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(
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
      rows = 4,
      min,
      max,
      register,
      fieldError,
      ...props
    },
    ref
  ) => {
    const inputId = `input-${name}`;
    
    // Try to get form context, but don't fail if not available
    let formContext;
    try {
      formContext = useFormContext();
    } catch {
      formContext = null;
    }

    const baseInputStyles = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
  `;

    // Get field error from form context if available
    const contextError = formContext?.formState?.errors?.[name]?.message as string;
    const displayError = error || fieldError?.message || contextError;

    const inputStyles = displayError
      ? `${baseInputStyles} border-red-300 focus:ring-red-500 focus:border-red-500`
      : `${baseInputStyles} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    // Use register props if available, otherwise use manual props
    const inputProps = register ? {
      ...register,
      id: inputId,
      className: inputStyles,
      "aria-invalid": !!displayError,
      "aria-describedby": displayError ? `${inputId}-error` : undefined,
      ...props,
    } : {
      id: inputId,
      name,
      placeholder,
      value,
      onChange: handleChange,
      onBlur,
      disabled: isDisabled,
      required: isRequired,
      className: inputStyles,
      "aria-invalid": !!displayError,
      "aria-describedby": displayError ? `${inputId}-error` : undefined,
      ...props,
    };

    // Add min/max for number inputs
    if (type === "number") {
      if (min !== undefined) (inputProps as any).min = min;
      if (max !== undefined) (inputProps as any).max = max;
    }

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
          {type === "textarea" ? (
            <textarea
              ref={register?.ref || (ref as React.Ref<HTMLTextAreaElement>)}
              rows={rows}
              {...inputProps}
            />
          ) : (
            <>
              <input
                ref={register?.ref || (ref as React.Ref<HTMLInputElement>)}
                type={type}
                {...inputProps}
              />

              {displayError && (
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
            </>
          )}
        </div>

        {displayError && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
