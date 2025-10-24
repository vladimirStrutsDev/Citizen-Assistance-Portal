import type { FC, ReactNode } from "react";
import type { ComponentSize, ComponentVariant } from "./types";

export interface IProps {
  variant?: keyof ComponentVariant;
  size?: keyof ComponentSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: FC<IProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm hover:shadow-md",
    warning:
      "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-sm hover:shadow-md",
    error:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md",
    info: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const loadingStyles = isLoading ? "cursor-wait" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${loadingStyles}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
