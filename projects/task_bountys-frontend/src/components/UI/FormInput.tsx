import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  error,
  helperText,
  type = 'text',
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`input ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        {...register(name)}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;