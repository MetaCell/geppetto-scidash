import React from "react";
import TestForm from "../test-form/TestForm";
import ErrorDialog from "../error-dialog/ErrorDialog";

const TestCreate = ({ model, testClasses, errors, onSave, onClearErrors, onCancel, actionType, data }) => (<div>
  <ErrorDialog
    onClearErrors={onClearErrors}
    errors={errors}
  />
  <TestForm
    testClasses={testClasses}
    model={model}
    onSave={onSave}
    onCancel={onCancel}
    actionType={actionType}
    data={data}
  />
</div>
);

export default TestCreate;
