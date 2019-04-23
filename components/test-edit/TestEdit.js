import React from "react";
import TestForm from "../test-form/TestForm";

const TestCreate = ({ model, testClasses, errors, onSave, onCancel, actionType }) => { 
  let errorsTemplate = null;

  if (errors.length > 0){
    // eslint-disable-next-line react/no-array-index-key
    errorsTemplate = errors.map((value, index) => <p key={index} style={{ color: "red" }}>{value}</p>);
  } 

  return (
    <div>
      {errorsTemplate}
      <TestForm
        testClasses={testClasses}
        model={model}
        onSave={onSave}
        onCancel={onCancel}
        actionType={actionType}
      />
    </div>
  );
};

export default TestCreate;
