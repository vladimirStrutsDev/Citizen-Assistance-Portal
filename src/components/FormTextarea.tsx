import { type FieldErrors, type UseFormRegister } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  rules?: Record<string, any>;
}

const FormTextarea = ({
  label,
  name,
  register,
  errors,
  rules,
}: FormTextareaProps) => {
  const error = errors[name];
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        rows={4}
        {...register(name, rules)}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormTextarea;
