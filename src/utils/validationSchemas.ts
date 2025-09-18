import * as yup from "yup";
import { FormFieldType } from "../Types/fields.types";

// Helper function to create validation schema for a single field
export const createFieldValidation = (field: FormFieldType): yup.Schema<any> => {
  let schema: yup.Schema<any>;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      schema = yup.string();

      if (field.type === "email") {
        schema = schema.email("فرمت ایمیل صحیح نیست");
      }

      if (field.minLength) {
        schema = schema.min(field.minLength, `حداقل ${field.minLength} کاراکتر`);
      }

      if (field.maxLength) {
        schema = schema.max(field.maxLength, `حداکثر ${field.maxLength} کاراکتر`);
      }

      if (field.validation?.pattern) {
        schema = schema.matches(new RegExp(field.validation.pattern), field.validation.message || "فرمت صحیح نیست");
      }

      break;

    case "number":
      schema = yup.number().typeError("باید عدد باشد");

      if (field.min !== undefined) {
        schema = schema.min(field.min, `حداقل ${field.min}`);
      }

      if (field.max !== undefined) {
        schema = schema.max(field.max, `حداکثر ${field.max}`);
      }

      if (field.validation?.min !== undefined) {
        schema = schema.min(field.validation.min, `حداقل ${field.validation.min}`);
      }

      if (field.validation?.max !== undefined) {
        schema = schema.max(field.validation.max, `حداکثر ${field.validation.max}`);
      }

      break;

    case "textarea":
      schema = yup.string();

      if (field.minLength) {
        schema = schema.min(field.minLength, `حداقل ${field.minLength} کاراکتر`);
      }

      if (field.maxLength) {
        schema = schema.max(field.maxLength, `حداکثر ${field.maxLength} کاراکتر`);
      }

      break;

    case "select":
      schema = yup.mixed();

      if (field.options && field.options.length > 0) {
        const validValues = field.options.map((option) => option.value);
        schema = schema.oneOf(validValues, "گزینه انتخاب شده معتبر نیست");
      }

      break;

    case "multiSelect":
      schema = yup.array();

      if (field.options && field.options.length > 0) {
        const validValues = field.options.map((option) => option.value);
        schema = schema.of(yup.mixed().oneOf(validValues, "گزینه انتخاب شده معتبر نیست"));
      }

      if (field.maxSelect) {
        schema = schema.max(field.maxSelect, `حداکثر ${field.maxSelect} مورد قابل انتخاب است`);
      }

      break;

    case "radio":
      schema = yup.mixed();

      if (field.options && field.options.length > 0) {
        const validValues = field.options.map((option) => option.value);
        schema = schema.oneOf(validValues, "گزینه انتخاب شده معتبر نیست");
      }

      break;

    case "checkbox":
      schema = yup.boolean();
      break;

    case "date":
      schema = yup.string();

      if (field.min) {
        schema = schema.test(
          "min-date",
          `تاریخ نمی‌تواند قبل از ${field.min} باشد`,
          (value) => !value || new Date(value) >= new Date(field.min!)
        );
      }

      if (field.max) {
        schema = schema.test(
          "max-date",
          `تاریخ نمی‌تواند بعد از ${field.max} باشد`,
          (value) => !value || new Date(value) <= new Date(field.max!)
        );
      }

      break;

    case "timePicker":
      schema = yup.string();
      break;

    case "file":
      schema = yup.mixed();

      if (field.maxSize) {
        schema = schema.test("file-size", `حجم فایل نمی‌تواند بیشتر از ${field.maxSize}MB باشد`, (value) => {
          if (!value) return true;

          if (Array.isArray(value)) {
            return value.every((file) => file.size <= field.maxSize! * 1024 * 1024);
          }

          return value.size <= field.maxSize * 1024 * 1024;
        });
      }

      if (field.allowedTypes && field.allowedTypes.length > 0) {
        schema = schema.test("file-type", "نوع فایل مجاز نیست", (value) => {
          if (!value) return true;

          if (Array.isArray(value)) {
            return value.every((file) => field.allowedTypes!.some((type) => file.type.includes(type)));
          }

          return field.allowedTypes!.some((type) => value.type.includes(type));
        });
      }

      break;

    case "transferList":
      schema = yup.array();
      break;

    case "dynamic":
      schema = yup.array();

      if (field.minFields) {
        schema = schema.min(field.minFields, `حداقل ${field.minFields} مورد الزامی است`);
      }

      if (field.maxFields) {
        schema = schema.max(field.maxFields, `حداکثر ${field.maxFields} مورد مجاز است`);
      }

      break;

    case "attachment":
      schema = yup.array();

      if (field.maxFiles) {
        schema = schema.max(field.maxFiles, `حداکثر ${field.maxFiles} فایل مجاز است`);
      }

      if (field.maxSize) {
        schema = schema.test("attachment-size", `حجم فایل نمی‌تواند بیشتر از ${field.maxSize}MB باشد`, (value) => {
          if (!value || !Array.isArray(value)) return true;
          return value.every((file) => file.size <= field.maxSize! * 1024 * 1024);
        });
      }

      if (field.acceptedTypes && field.acceptedTypes.length > 0) {
        schema = schema.test("attachment-type", "نوع فایل مجاز نیست", (value) => {
          if (!value || !Array.isArray(value)) return true;
          return value.every((file) =>
            field.acceptedTypes!.some((type) => {
              if (type.endsWith("/*")) {
                return file.type.startsWith(type.slice(0, -1));
              }
              return file.type === type;
            })
          );
        });
      }

      break;

    case "viewFile":
    case "detail":
      // These are read-only fields, no validation needed
      schema = yup.mixed();
      break;

    default:
      schema = yup.mixed();
  }

  // Add required validation
  if (field.required) {
    if (field.type === "checkbox") {
      schema = schema.oneOf([true], "این فیلد الزامی است");
    } else if (
      field.type === "multiSelect" ||
      field.type === "transferList" ||
      field.type === "dynamic" ||
      field.type === "attachment"
    ) {
      schema = schema.min(1, "حداقل یک مورد الزامی است");
    } else {
      schema = schema.required("این فیلد الزامی است");
    }
  }

  return schema;
};

// Create validation schema for entire form
export const createFormValidationSchema = (fields: FormFieldType[]): yup.ObjectSchema<any> => {
  const shape = fields.reduce((acc, field) => {
    acc[field.name] = createFieldValidation(field);
    return acc;
  }, {} as Record<string, yup.Schema<any>>);

  return yup.object().shape(shape);
};

// Predefined validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+98|0)?9\d{9}$/,
  nationalId: /^\d{10}$/,
  postalCode: /^\d{10}$/,
  url: /^https?:\/\/.+/,
  persianText: /^[\u0600-\u06FF\s]+$/,
  englishText: /^[a-zA-Z\s]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
};

// Helper function to create custom validation
export const createCustomValidation = (pattern: RegExp, message: string): yup.StringSchema => {
  return yup.string().matches(pattern, message);
};
