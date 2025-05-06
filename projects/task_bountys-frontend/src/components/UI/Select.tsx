import React, { SelectHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  name: string;
  options: Option[];
  register: UseFormRegister<any>;
  error?: FieldError;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  helperText,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-2.5 text-base',
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <select
        id={name}
        className={`block w-full px-4 ${sizeClasses[size]} border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
        {...register(name)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Select;