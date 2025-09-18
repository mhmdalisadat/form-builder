import React from "react";
import type { NumberFieldType } from "../../Types/fields.types";

interface NumberFieldProps extends NumberFieldType {
  value?: number;
  error?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  value,
  error,
  min,
  max,
  step,
  className = "",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? undefined : Number(e.target.value);
    onChange?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    onBlur?.(value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value);
    onFocus?.(value);
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type="number"
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min ?? validation?.min}
        max={max ?? validation?.max}
        step={step}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {validation?.message && !error && <p className="mt-1 text-sm text-gray-500">{validation.message}</p>}
    </div>
  );
};

export default NumberField;
