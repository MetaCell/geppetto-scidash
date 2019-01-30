import React from "react";
import TestForm from "../test-form/TestForm";

const TestCreate = ({ model, testClasses, toggleTestForm, onSave, onCancel }) => (<TestForm
  modelClasses={testClasses}
  model={model}
  toggleTestForm={toggleCreateTest}
  onSave={onSave}
  onCancel={onCancel}
/>
);

export default TestCreate;

