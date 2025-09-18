import { cn } from "./cn";
import type { FieldVariant } from "../Types/fields.types";

/**
 * Get field container styles based on variant
 */
export function getFieldContainerStyles(variant: FieldVariant = "solid", className?: string) {
  const baseStyles = "form-field";

  const variantStyles = {
    solid: "space-y-2",
    underline: "space-y-1",
    simple: "space-y-1",
  };

  return cn(baseStyles, variantStyles[variant], className);
}

/**
 * Get label styles based on variant
 */
export function getLabelStyles(variant: FieldVariant = "solid") {
  const baseStyles = "block font-medium text-gray-700";

  const variantStyles = {
    solid: "text-sm mb-1",
    underline: "text-sm mb-1",
    simple: "text-xs mb-1 text-gray-600",
  };

  return cn(baseStyles, variantStyles[variant]);
}

/**
 * Get input styles based on variant
 */
export function getInputStyles(
  variant: FieldVariant = "solid",
  error?: string,
  disabled?: boolean,
  className?: string
) {
  const baseStyles = "w-full transition-colors duration-200 focus:outline-none";

  const variantStyles = {
    solid: cn(
      "px-3 py-2 border rounded-md shadow-sm",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white"
    ),
    underline: cn(
      "px-0 py-2 border-0 border-b-2 bg-transparent",
      "focus:ring-0 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
    simple: cn(
      "px-0 py-1 border-0 bg-transparent",
      "focus:ring-0 focus:border-0",
      "border-b border-gray-200 focus:border-gray-400",
      error ? "border-red-400" : "",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
  };

  return cn(baseStyles, variantStyles[variant], className);
}

/**
 * Get textarea styles based on variant
 */
export function getTextareaStyles(
  variant: FieldVariant = "solid",
  error?: string,
  disabled?: boolean,
  className?: string
) {
  const baseStyles = "w-full transition-colors duration-200 focus:outline-none resize-none";

  const variantStyles = {
    solid: cn(
      "px-3 py-2 border rounded-md shadow-sm",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white"
    ),
    underline: cn(
      "px-0 py-2 border-0 border-b-2 bg-transparent",
      "focus:ring-0 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
    simple: cn(
      "px-0 py-1 border-0 bg-transparent",
      "focus:ring-0 focus:border-0",
      "border-b border-gray-200 focus:border-gray-400",
      error ? "border-red-400" : "",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
  };

  return cn(baseStyles, variantStyles[variant], className);
}

/**
 * Get select styles based on variant
 */
export function getSelectStyles(
  variant: FieldVariant = "solid",
  error?: string,
  disabled?: boolean,
  className?: string
) {
  const baseStyles = "w-full transition-colors duration-200 focus:outline-none";

  const variantStyles = {
    solid: cn(
      "px-3 py-2 border rounded-md shadow-sm",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white"
    ),
    underline: cn(
      "px-0 py-2 border-0 border-b-2 bg-transparent",
      "focus:ring-0 focus:border-blue-500",
      error ? "border-red-500" : "border-gray-300",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
    simple: cn(
      "px-0 py-1 border-0 bg-transparent",
      "focus:ring-0 focus:border-0",
      "border-b border-gray-200 focus:border-gray-400",
      error ? "border-red-400" : "",
      disabled ? "cursor-not-allowed text-gray-500" : ""
    ),
  };

  return cn(baseStyles, variantStyles[variant], className);
}

/**
 * Get error message styles based on variant
 */
export function getErrorStyles(variant: FieldVariant = "solid") {
  const baseStyles = "text-sm text-red-600";

  const variantStyles = {
    solid: "mt-1",
    underline: "mt-1",
    simple: "mt-1 text-xs",
  };

  return cn(baseStyles, variantStyles[variant]);
}

/**
 * Get validation message styles based on variant
 */
export function getValidationStyles(variant: FieldVariant = "solid") {
  const baseStyles = "text-sm text-gray-500";

  const variantStyles = {
    solid: "mt-1",
    underline: "mt-1",
    simple: "mt-1 text-xs",
  };

  return cn(baseStyles, variantStyles[variant]);
}
