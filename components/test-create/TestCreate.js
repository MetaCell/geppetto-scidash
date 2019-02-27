import React from "react";
import TestForm from "../test-form/TestForm";

const TestCreate = ({ model, testClasses, toggleTestForm, onSave, onCancel }) => (<TestForm
  testClasses={testClasses}
  model={model}
  onSave={onSave}
  onCancel={onCancel}
/>
);

export default TestCreate;
