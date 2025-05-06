import React, { TextareaHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  helperText?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  register,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <textarea
        id={name}
        className={`input min-h-[100px] resize-y ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
        {...register(name)}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-slate-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormTextarea;