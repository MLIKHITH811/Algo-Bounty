import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormDatePickerProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  helperText?: string;
  minDate?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  register,
  error,
  helperText,
  minDate = new Date().toISOString().split('T')[0], // Default to today
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        type="date"
        className={`input ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
        min={minDate}
        {...register(name)}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormDatePicker;