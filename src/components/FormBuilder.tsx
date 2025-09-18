import { Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import type { FormFieldType } from "../Types/formBuilder";
import NumberField from "./fields/NumberField";
import type { IColumnsConfig, ICustomInputs, IFormErrors, ISubmitButtonProps } from "../Types";

const validationSchema = yup.object({
  username: yup.string().min(2, "Username must be at least 2 characters."),
});
interface FormBuilderProps {
  formFields: FormFieldType[];
  initialValues: object;
  onSubmit: (values: object, actions: FormikHelpers<object>) => void;
  formFilds?: FormFieldType[];
  initioalValues?: object;
  submitButtonProps?: ISubmitButtonProps;
  customInputs?: ICustomInputs;
  className?: string;
  columns?: IColumnsConfig;
  errors?: IFormErrors;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  initialValues,
  formFields,
  onSubmit,
  formFilds,
  initioalValues,
  submitButtonProps,
  customInputs,
  className,
  columns,
  errors,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values, actions);
        } finally {
          actions.setSubmitting(false);
        }
      }}>
      {() => (
        <>{formFields.map((field) => (field.type === "number" ? <NumberField key={field.name} {...field} /> : null))}</>
      )}
    </Formik>
  );
};

export default FormBuilder;
