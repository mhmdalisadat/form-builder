import React from "react";
import type { NumberFieldType } from "../../Types/fields.types";
import {
  getFieldContainerStyles,
  getLabelStyles,
  getInputStyles,
  getErrorStyles,
  getValidationStyles,
} from "../../utils/fieldVariants";

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
  variant = "solid",
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
    <div className={getFieldContainerStyles(variant, className)}>
      <label htmlFor={name} className={getLabelStyles(variant)}>
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

export default NumberField;
