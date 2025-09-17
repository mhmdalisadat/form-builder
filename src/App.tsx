import FormBuilder from "./components/FormBuilder";
import type { FormFieldType } from "./Types/formBuilder";

function App() {
  const formFields: FormFieldType[] = [
    {
      name: "name",
      label: "Name",
      type: "number",
    },
  ];

  return (
    <div className="text-3xl font-bold underline">
      <FormBuilder
        formFields={formFields}
        initialValues={{}}
        onSubmit={() => {}}
      />
    </div>
  );
}

export default App;
