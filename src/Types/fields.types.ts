/* eslint-disable @typescript-eslint/no-explicit-any */

// Base field properties that all fields share
export interface BaseField {
    name: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
    onFocus?: (value: any) => void;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}

// Text input fields (text, email, password)
export interface TextFieldType extends BaseField {
    type: "text" | "email" | "password";
    defaultValue?: string;
    maxLength?: number;
    minLength?: number;
}

// Number field
export interface NumberFieldType extends BaseField {
    type: "number";
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
}

// Textarea field
export interface TextAreaFieldType extends BaseField {
    type: "textarea";
    defaultValue?: string;
    rows?: number;
    maxLength?: number;
    minLength?: number;
}

// Select field
export interface SelectFieldType extends BaseField {
    type: "select";
    defaultValue?: any;
    options: { label: string; value: any }[];
    multiple?: boolean;
    searchable?: boolean;
}

// Multi-select field
export interface MultiSelectFieldType extends BaseField {
    type: "multiSelect";
    defaultValue?: any[];
    options: { label: string; value: any }[];
    maxSelect?: number;
    searchable?: boolean;
}

// Radio field
export interface RadioFieldType extends BaseField {
    type: "radio";
    defaultValue?: any;
    options: { label: string; value: any }[];
    direction?: "horizontal" | "vertical";
}

// Checkbox field
export interface CheckboxFieldType extends BaseField {
    type: "checkbox";
    defaultValue?: boolean;
}

// Date field
export interface DateFieldType extends BaseField {
    type: "date";
    defaultValue?: string;
    min?: string;
    max?: string;
    format?: string;
}

// File field
export interface FileFieldType extends BaseField {
    type: "file";
    accept?: string;
    maxSize?: number; // in MB
    allowedTypes?: string[];
    multiple?: boolean;
    maxFiles?: number;
}

// Union type for all field types
export type FormFieldType =
    | TextFieldType
    | NumberFieldType
    | TextAreaFieldType
    | SelectFieldType
    | MultiSelectFieldType
    | RadioFieldType
    | CheckboxFieldType
    | DateFieldType
    | FileFieldType;
