import React, { useState } from "react";
import type { SelectFieldType } from "../../Types/fields.types";
import { cn } from "../../utils/cn";
import {
  getFieldContainerStyles,
  getLabelStyles,
  getSelectStyles,
  getErrorStyles,
  getValidationStyles,
} from "../../utils/fieldVariants";

interface SelectFieldProps extends SelectFieldType {
  value?: string | number;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  placeholder = "انتخاب کنید...",
  disabled = false,
  required = false,
  value,
  error,
  options = [],
  multiple = false,
  searchable = false,
  className = "",
  variant = "solid",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const selectedOption = options.find((option) => option.value === value);
  const selectedOptions = multiple
    ? options.filter((option) => Array.isArray(value) && value.includes(option.value))
    : [];

  const handleSelect = (optionValue: string | number) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? (value as (string | number)[]) : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleBlur = () => {
    onBlur?.(value);
    setTimeout(() => setIsOpen(false), 200); // Delay to allow click events
  };

  const handleFocus = () => {
    onFocus?.(value);
  };

  return (
    <div className={getFieldContainerStyles(variant, className)}>
      <label htmlFor={name} className={getLabelStyles(variant)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          className={cn(
            getSelectStyles(variant, error, disabled),
            "text-left cursor-pointer",
            isOpen && "ring-2 ring-blue-500 border-blue-500"
          )}
          aria-describedby={error ? `${name}-error` : undefined}>
          <span className="block truncate">
            {multiple
              ? selectedOptions.length > 0
                ? `${selectedOptions.length} مورد انتخاب شده`
                : placeholder
              : selectedOption?.label || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {searchable && (
              <div className="p-2 border-b">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full px-3 py-2 text-left text-sm hover:bg-blue-50 focus:outline-none focus:bg-blue-50
                      ${multiple && Array.isArray(value) && value.includes(option.value) ? "bg-blue-100" : ""}
                      ${!multiple && value === option.value ? "bg-blue-100" : ""}
                    `}>
                    <div className="flex items-center">
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={Array.isArray(value) && value.includes(option.value)}
                          onChange={() => {}} // Handled by button click
                          className="mr-2"
                        />
                      )}
                      {!multiple && value === option.value && (
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {option.label}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  {searchTerm ? "نتیجه‌ای یافت نشد" : "گزینه‌ای موجود نیست"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className={getErrorStyles(variant)}>
          {error}
        </p>
      )}

      {validation?.message && !error && <p className={getValidationStyles(variant)}>{validation.message}</p>}
    </div>
  );
};

export default SelectField;
