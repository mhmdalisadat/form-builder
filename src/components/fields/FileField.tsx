import React, { useRef } from "react";
import type { FileFieldType } from "../../Types/fields.types";

interface FileFieldProps extends FileFieldType {
  value?: File | File[];
  error?: string;
}

const FileField: React.FC<FileFieldProps> = ({
  name,
  label,
  disabled = false,
  required = false,
  value,
  error,
  accept,
  maxSize,
  allowedTypes = [],
  multiple = false,
  maxFiles,
  className = "",
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Validate file types
    if (allowedTypes.length > 0) {
      const invalidFiles = fileArray.filter((file) => !allowedTypes.some((type) => file.type.includes(type)));
      if (invalidFiles.length > 0) {
        console.warn("Invalid file types:", invalidFiles);
        return;
      }
    }

    // Validate file sizes
    if (maxSize) {
      const oversizedFiles = fileArray.filter((file) => file.size > maxSize * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        console.warn("Files too large:", oversizedFiles);
        return;
      }
    }

    // Validate max files
    if (maxFiles && fileArray.length > maxFiles) {
      console.warn(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newValue = multiple ? fileArray : fileArray[0];
    onChange?.(newValue);
  };

  const handleBlur = () => {
    onBlur?.(value);
  };

  const handleFocus = () => {
    onFocus?.(value);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const fileArray = multiple ? files : [files[0]];
      const newValue = multiple ? fileArray : fileArray[0];
      onChange?.(newValue);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileInfo = () => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return value.map((file, index) => (
        <div key={index} className="text-sm text-gray-600">
          {file.name} ({formatFileSize(file.size)})
        </div>
      ));
    } else {
      return (
        <div className="text-sm text-gray-600">
          {value.name} ({formatFileSize(value.size)})
        </div>
      );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={() => !disabled && fileInputRef.current?.click()}>
        <input
          ref={fileInputRef}
          id={name}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          onChange={handleFileChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="hidden"
          aria-describedby={error ? `${name}-error` : undefined}
        />

        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">کلیک کنید</span> یا فایل را اینجا بکشید
          </div>

          <div className="text-xs text-gray-500">
            {accept && `فرمت‌های مجاز: ${accept}`}
            {maxSize && ` - حداکثر حجم: ${maxSize}MB`}
            {maxFiles && ` - حداکثر تعداد: ${maxFiles}`}
          </div>
        </div>
      </div>

      {/* Selected files */}
      {value && <div className="mt-2 space-y-1">{getFileInfo()}</div>}

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {validation?.message && !error && <p className="mt-1 text-sm text-gray-500">{validation.message}</p>}
    </div>
  );
};

export default FileField;
