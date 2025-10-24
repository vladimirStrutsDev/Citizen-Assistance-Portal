import { useFormContext } from "react-hook-form";

export const useFormInput = (name: string) => {
  const { register, formState: { errors } } = useFormContext();
  
  const fieldError = errors[name]?.message as string;
  const fieldRegister = register(name);
  
  return {
    ...fieldRegister,
    error: fieldError,
  };
};
