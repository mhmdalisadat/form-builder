import FormBuilder from "../components/FormBuilder";
import type { FormFieldType } from "../Types/fields.types";

const Example = () => {
  const formObject: FormFieldType[] = [
    {
      type: "text",
      label: "نام (Solid)",
      name: "name",
      required: true,
      placeholder: "نام خود را وارد کنید",
      variant: "solid",
    },
    {
      type: "text",
      label: "ایمیل (Underline)",
      name: "email",
      required: true,
      placeholder: "ایمیل خود را وارد کنید",
      variant: "underline",
    },
    {
      type: "textarea",
      label: "پیام (Simple)",
      name: "message",
      required: true,
      placeholder: "پیام خود را بنویسید",
      variant: "simple",
      rows: 3,
    },
    {
      type: "number",
      label: "سن",
      name: "age",
      required: true,
      placeholder: "سن خود را وارد کنید",
      variant: "solid",
    },
    {
      type: "select",
      label: "کشور",
      options: [
        { label: "ایران", value: "iran" },
        { label: "آمریکا", value: "usa" },
        { label: "کانادا", value: "canada" },
      ],
      name: "country",
      required: true,
      placeholder: "کشور خود را انتخاب کنید",
      variant: "underline",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">مثال استفاده از Field Variants</h1>
      <FormBuilder formFields={formObject} initialValues={{}} onSubmit={() => {}} />
    </div>
  );
};

export default Example;
