import React from "react";
import type { RadioFieldType } from "../../Types/fields.types";

interface RadioFieldProps extends RadioFieldType {
  value?: string | number;
  error?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  disabled = false,
  required = false,
  value,
  error,
  options = [],
  direction = "vertical",
  className = "",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const handleChange = (optionValue: string | number) => {
    onChange?.(optionValue);
  };

  const handleBlur = () => {
    onBlur?.(value);
  };

  const handleFocus = () => {
    onFocus?.(value);
  };

  return (
    <div className={`form-field ${className}`}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>

        <div
          className={`
          ${direction === "horizontal" ? "flex flex-wrap gap-4" : "space-y-2"}
        `}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`
                flex items-center cursor-pointer
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={disabled}
                required={required}
                onChange={() => handleChange(option.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                aria-describedby={error ? `${name}-error` : undefined}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {validation?.message && !error && <p className="mt-1 text-sm text-gray-500">{validation.message}</p>}
    </div>
  );
};

export default RadioField;
