import React, { useState } from "react";
import type { MultiSelectFieldType } from "../../Types/fields.types";

interface MultiSelectFieldProps extends MultiSelectFieldType {
  value?: any[];
  error?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  label,
  placeholder = "انتخاب کنید...",
  disabled = false,
  required = false,
  value = [],
  error,
  options = [],
  maxSelect,
  searchable = false,
  className = "",
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

  const selectedOptions = options.filter((option) => value.includes(option.value));
  const canSelectMore = !maxSelect || value.length < maxSelect;

  const handleSelect = (optionValue: any) => {
    if (value.includes(optionValue)) {
      // Remove from selection
      const newValues = value.filter((v) => v !== optionValue);
      onChange?.(newValues);
    } else if (canSelectMore) {
      // Add to selection
      const newValues = [...value, optionValue];
      onChange?.(newValues);
    }
  };

  const handleRemove = (optionValue: any) => {
    const newValues = value.filter((v) => v !== optionValue);
    onChange?.(newValues);
  };

  const handleBlur = () => {
    onBlur?.(value);
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleFocus = () => {
    onFocus?.(value);
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {maxSelect && (
          <span className="text-gray-500 text-xs ml-2">
            ({value.length}/{maxSelect})
          </span>
        )}
      </label>

      {/* Selected items */}
      {selectedOptions.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          className={`
            w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}
            ${isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}
          `}
          aria-describedby={error ? `${name}-error` : undefined}>
          <span className="block truncate">
            {selectedOptions.length === 0 ? placeholder : `${selectedOptions.length} مورد انتخاب شده`}
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
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  const isDisabled = !isSelected && !canSelectMore;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      disabled={isDisabled}
                      className={`
                        w-full px-3 py-2 text-left text-sm focus:outline-none
                        ${isSelected ? "bg-blue-100 text-blue-800" : "hover:bg-gray-50"}
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      `}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // Handled by button click
                          className="mr-2"
                        />
                        {option.label}
                      </div>
                    </button>
                  );
                })
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
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {validation?.message && !error && <p className="mt-1 text-sm text-gray-500">{validation.message}</p>}
    </div>
  );
};

export default MultiSelectField;
