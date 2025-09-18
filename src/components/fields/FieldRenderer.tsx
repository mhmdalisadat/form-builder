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

const FieldRenderer: React.FC<{ field: FormFieldType }> = ({ field }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return <TextField {...field} />;

    case "number":
      return <NumberField {...field} />;

    case "textarea":
      return <TextAreaField {...field} />;

    case "select":
      return <SelectField {...field} />;

    case "multiSelect":
      return <MultiSelectField {...field} />;

    case "radio":
      return <RadioField {...field} />;

    case "checkbox":
      return <CheckboxField {...field} />;

    case "date":
      return <DateField {...field} />;

    case "file":
      return <FileField {...field} />;

    default:
      return null;
  }
};

export default FieldRenderer;
