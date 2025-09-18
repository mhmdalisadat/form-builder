import React from "react";
import type { FormFieldType } from "../../Types/fields.types";
import TextField from "./TextField";
import NumberField from "./NumberField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import MultiSelectField from "./MultiSelectField";
import RadioField from "./RadioField";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import FileField from "./FileField";

interface FieldRendererProps {
  field: FormFieldType;
  value?: any;
  error?: string;
  touched?: boolean;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, error, touched }) => {
  const commonProps = {
    ...field,
    value,
    error: touched && error ? error : undefined,
  };

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return <TextField {...commonProps} type={field.type} />;

    case "number":
      return <NumberField {...commonProps} type="number" />;

    case "textarea":
      return <TextAreaField {...commonProps} type="textarea" />;

    case "select":
      return <SelectField {...commonProps} type="select" />;

    case "multiSelect":
      return <MultiSelectField {...commonProps} type="multiSelect" />;

    case "radio":
      return <RadioField {...commonProps} type="radio" />;

    case "checkbox":
      return <CheckboxField {...commonProps} type="checkbox" />;

    case "date":
      return <DateField {...commonProps} type="date" />;

    case "file":
      return <FileField {...commonProps} type="file" />;

    default:
      console.warn(`Unknown field type: ${(field as any).type}`);
      return null;
  }
};

export default FieldRenderer;
