import React from "react";
import type { TextFieldType } from "../../Types/fields.types";

interface TextFieldProps extends TextFieldType {
  value?: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  value = "",
  error,
  maxLength,
  minLength,
  className = "",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e.target.value);
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
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        min={validation?.min}
        max={validation?.max}
        pattern={validation?.pattern}
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

export default TextField;
