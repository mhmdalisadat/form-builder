import React from "react";
import type { TextAreaFieldType } from "../../Types/fields.types";
import {
  getFieldContainerStyles,
  getLabelStyles,
  getTextareaStyles,
  getErrorStyles,
  getValidationStyles,
} from "../../utils/fieldVariants";

interface TextAreaFieldProps extends TextAreaFieldType {
  value?: string;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  value = "",
  error,
  rows = 4,
  maxLength,
  minLength,
  className = "",
  variant = "solid",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus?.(e.target.value);
  };

  return (
    <div className={getFieldContainerStyles(variant, className)}>
      <label htmlFor={name} className={getLabelStyles(variant)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={getTextareaStyles(variant, error, disabled)}
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

export default TextAreaField;
