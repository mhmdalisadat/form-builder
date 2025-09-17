import React from "react";
import { type FieldProps, Field } from "formik";

export interface NumberFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  min,
  max,
  step,
  className = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label
              htmlFor={name}
              className={`block text-sm font-medium text-gray-700 mb-2 ${labelClassName}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <input
            id={name}
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${
                meta.touched && meta.error
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }
              ${inputClassName}
            `}
            {...field}
          />

          {meta.touched && meta.error && (
            <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
              {meta.error}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default NumberField;
