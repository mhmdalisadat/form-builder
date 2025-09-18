import React from "react";
import type { TextFieldType } from "../../Types/fields.types";
import {
  getFieldContainerStyles,
  getLabelStyles,
  getInputStyles,
  getErrorStyles,
  getValidationStyles,
} from "../../utils/fieldVariants";

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
  variant = "solid",
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
    <div className={getFieldContainerStyles(variant, className)}>
      <label htmlFor={name} className={getLabelStyles(variant)}>
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
        className={getInputStyles(variant, error, disabled)}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {error && (
        <p id={`${name}-error`} className={getErrorStyles(variant)}>
          {error}
        </p>
      )}

      {validation?.message && !error && <p className={getValidationStyles(variant)}>{validation.message}</p>}
    </div>
  );
};

export default TextField;
