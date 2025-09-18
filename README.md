# Form Builder Package

یک پکیج قدرتمند و انعطاف‌پذیر برای ساخت فرم‌های React با TypeScript که از discriminated unions برای type safety استفاده می‌کند.

## ویژگی‌ها

-   ✅ **Type Safety کامل**: استفاده از discriminated unions برای اطمینان از type safety
-   ✅ **15 نوع فیلد مختلف**: از text و number تا dynamic fields و file upload
-   ✅ **Validation خودکار**: سیستم validation قدرتمند با Yup
-   ✅ **UI زیبا**: طراحی مدرن با Tailwind CSS
-   ✅ **RTL Support**: پشتیبانی کامل از راست به چپ
-   ✅ **Customizable**: قابلیت سفارشی‌سازی کامل
-   ✅ **TypeScript**: نوشته شده با TypeScript برای بهترین تجربه توسعه

## نصب

```bash
npm install form_pkg
# یا
yarn add form_pkg
# یا
pnpm add form_pkg
```

## استفاده سریع

```tsx
import React from "react";
import { FormBuilder, createFormValidationSchema } from "form_pkg";

const MyForm = () => {
    const fields = [
        {
            name: "email",
            label: "ایمیل",
            type: "email" as const,
            required: true,
            placeholder: "example@domain.com",
        },
        {
            name: "age",
            label: "سن",
            type: "number" as const,
            min: 18,
            max: 100,
        },
        {
            name: "country",
            label: "کشور",
            type: "select" as const,
            options: [
                { label: "ایران", value: "iran" },
                { label: "آمریکا", value: "usa" },
            ],
        },
    ];

    const validationSchema = createFormValidationSchema(fields);

    const handleSubmit = (values: Record<string, any>) => {
        console.log("Form data:", values);
    };

    return <FormBuilder fields={fields} validationSchema={validationSchema} onSubmit={handleSubmit} />;
};
```

## انواع فیلدها

### 1. Text Fields

```tsx
{
  name: 'firstName',
  label: 'نام',
  type: 'text' | 'email' | 'password',
  required: true,
  maxLength: 50,
  validation: {
    pattern: /^[\u0600-\u06FF\s]+$/,
    message: 'فقط حروف فارسی مجاز است'
  }
}
```

### 2. Number Field

```tsx
{
  name: 'age',
  label: 'سن',
  type: 'number',
  min: 18,
  max: 100,
  step: 1
}
```

### 3. Textarea

```tsx
{
  name: 'bio',
  label: 'درباره من',
  type: 'textarea',
  rows: 4,
  maxLength: 500
}
```

### 4. Select Field

```tsx
{
  name: 'country',
  label: 'کشور',
  type: 'select',
  options: [
    { label: 'ایران', value: 'iran' },
    { label: 'آمریکا', value: 'usa' }
  ],
  searchable: true
}
```

### 5. Multi Select

```tsx
{
  name: 'interests',
  label: 'علایق',
  type: 'multiSelect',
  options: [
    { label: 'برنامه‌نویسی', value: 'programming' },
    { label: 'طراحی', value: 'design' }
  ],
  maxSelect: 3
}
```

### 6. Radio Field

```tsx
{
  name: 'gender',
  label: 'جنسیت',
  type: 'radio',
  options: [
    { label: 'مرد', value: 'male' },
    { label: 'زن', value: 'female' }
  ],
  direction: 'horizontal'
}
```

### 7. Checkbox

```tsx
{
  name: 'newsletter',
  label: 'عضویت در خبرنامه',
  type: 'checkbox',
  defaultValue: false
}
```

### 8. Date Field

```tsx
{
  name: 'birthDate',
  label: 'تاریخ تولد',
  type: 'date',
  max: '2024-01-01',
  format: 'YYYY-MM-DD'
}
```

### 9. Time Picker

```tsx
{
  name: 'preferredTime',
  label: 'ساعت ترجیحی',
  type: 'timePicker',
  format: '24h'
}
```

### 10. File Upload

```tsx
{
  name: 'profilePicture',
  label: 'عکس پروفایل',
  type: 'file',
  accept: 'image/*',
  maxSize: 5, // MB
  allowedTypes: ['image/jpeg', 'image/png']
}
```

### 11. Transfer List

```tsx
{
  name: 'selectedItems',
  label: 'موارد انتخاب شده',
  type: 'transferList',
  leftTitle: 'موارد موجود',
  rightTitle: 'موارد انتخاب شده',
  leftItems: [
    { id: 1, name: 'آیتم 1', codename: 'item1' }
  ],
  rightItems: []
}
```

### 12. Dynamic Fields

```tsx
{
  name: 'skills',
  label: 'مهارت‌ها',
  type: 'dynamic',
  fields: [
    {
      name: 'skillName',
      label: 'نام مهارت',
      type: 'text',
      required: true
    },
    {
      name: 'level',
      label: 'سطح',
      type: 'select',
      options: [
        { label: 'مبتدی', value: 'beginner' },
        { label: 'پیشرفته', value: 'advanced' }
      ]
    }
  ],
  maxFields: 5,
  minFields: 1
}
```

### 13. Attachment Field

```tsx
{
  name: 'documents',
  label: 'مدارک',
  type: 'attachment',
  maxFiles: 3,
  acceptedTypes: ['application/pdf', 'image/*'],
  maxSize: 10
}
```

### 14. View File

```tsx
{
  name: 'document',
  label: 'مدرک',
  type: 'viewFile',
  url: 'https://example.com/document.pdf',
  fileType: 'application/pdf',
  showPreview: true
}
```

### 15. Detail Field

```tsx
{
  name: 'createdAt',
  label: 'تاریخ ایجاد',
  type: 'detail',
  value: new Date().toLocaleDateString('fa-IR'),
  format: (value) => new Date(value).toLocaleDateString('fa-IR')
}
```

## Validation

### استفاده از Validation Schema

```tsx
import { createFormValidationSchema, validationPatterns } from "form_pkg";

const validationSchema = createFormValidationSchema(fields);

// اضافه کردن validation سفارشی
validationSchema.shape.confirmPassword = validationSchema.shape.confirmPassword.test(
    "password-match",
    "رمز عبور و تکرار آن یکسان نیستند",
    function (value) {
        return this.parent.password === value;
    }
);
```

### الگوهای Validation از پیش تعریف شده

```tsx
import { validationPatterns } from 'form_pkg';

// استفاده از الگوهای آماده
{
  name: 'phone',
  label: 'تلفن',
  type: 'text',
  validation: {
    pattern: validationPatterns.phone.source,
    message: 'شماره تلفن صحیح نیست'
  }
}
```

## Type Safety

این پکیج از discriminated unions استفاده می‌کند تا اطمینان حاصل کند که هر field type فقط properties مربوط به خودش را دارد:

```tsx
// ✅ صحیح - select field فقط options دارد
{
  name: 'country',
  type: 'select',
  options: [{ label: 'ایران', value: 'iran' }]
}

// ❌ خطا - email field نمی‌تواند options داشته باشد
{
  name: 'email',
  type: 'email',
  options: [{ label: 'ایران', value: 'iran' }] // TypeScript error!
}
```

## سفارشی‌سازی

### استایل‌دهی

```tsx
<FormBuilder
    fields={fields}
    onSubmit={handleSubmit}
    className="custom-form-class"
    submitText="ارسال سفارشی"
    resetText="پاک کردن"
    showResetButton={true}
    showSubmitButton={true}
/>
```

### Field-level Styling

```tsx
{
  name: 'specialField',
  label: 'فیلد خاص',
  type: 'text',
  className: 'custom-field-class'
}
```

## مثال کامل

برای مشاهده مثال کامل، فایل `src/examples/UserRegistrationForm.tsx` را بررسی کنید.

## API Reference

### FormBuilder Props

-   `fields: FormFieldType[]` - آرایه فیلدهای فرم
-   `initialValues?: Record<string, any>` - مقادیر اولیه
-   `validationSchema?: yup.ObjectSchema` - schema validation
-   `onSubmit: (values: Record<string, any>) => void` - تابع ارسال فرم
-   `className?: string` - کلاس CSS سفارشی
-   `showResetButton?: boolean` - نمایش دکمه بازنشانی
-   `showSubmitButton?: boolean` - نمایش دکمه ارسال
-   `submitText?: string` - متن دکمه ارسال
-   `resetText?: string` - متن دکمه بازنشانی
-   `isLoading?: boolean` - حالت loading

### Field Types

هر field type دارای properties مخصوص خود است که در فایل `src/Types/formBuilder.ts` تعریف شده‌اند.

## مشارکت

برای مشارکت در این پروژه، لطفاً ابتدا issue ایجاد کنید یا pull request ارسال کنید.

## لایسنس

MIT License
