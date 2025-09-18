import React from "react";
import type { CheckboxFieldType } from "../../Types/fields.types";

interface CheckboxFieldProps extends CheckboxFieldType {
  value?: boolean;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  disabled = false,
  required = false,
  value = false,
  error,
  className = "",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    onChange?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e.target.checked);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e.target.checked);
  };

  return (
    <div className={`form-field ${className}`}>
      <div className="flex items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={value}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`
            h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
            ${error ? "border-red-500" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        <label htmlFor={name} className="mr-2 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {validation?.message && !error && <p className="mt-1 text-sm text-gray-500">{validation.message}</p>}
    </div>
  );
};

export default CheckboxField;
