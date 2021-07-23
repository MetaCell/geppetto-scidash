import React from "react";
import TestForm from "../test-form/TestForm";
import ErrorDialog from "../error-dialog/ErrorDialog";

const TestCreate = ( { model, testClasses, errors, onSave, onClearErrors, onCancel, actionType } ) => (<div>
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
  />
</div>
);

export default TestCreate;
