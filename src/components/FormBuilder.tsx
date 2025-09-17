import { Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import type { FormFieldType } from "../Types/formBuilder";
import NumberField from "./fields/NumberField";

const validationSchema = yup.object({
  username: yup.string().min(2, "Username must be at least 2 characters."),
});

type FormBuilderProps = {
  formFields: FormFieldType[];
  initialValues: object;
  onSubmit: (values: object, actions: FormikHelpers<object>) => void;
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  initialValues,
  formFields,
  onSubmit,
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
      }}
    >
      {() => (
        <>
          {formFields.map((field) =>
            field.type === "number" ? (
              <NumberField key={field.name} {...field} />
            ) : null
          )}
        </>
      )}
    </Formik>
  );
};

export default FormBuilder;
