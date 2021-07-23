import React from "react";
import ModelForm from "../model-form/ModelForm";
import ErrorDialog from "../error-dialog/ErrorDialog";

const ModelCreate = ({ model, modelClasses, errors, onSave, onClearErrors, onCancel, actionType, data }) => (<div>
  <ErrorDialog
    onClearErrors={onClearErrors}
    errors={errors}
  />
  <ModelForm
    modelClasses={modelClasses}
    model={model}
    onSave={onSave}
    onCancel={onCancel}
    actionType={actionType}
    data={data}
  />
</div>
);

export default ModelCreate;