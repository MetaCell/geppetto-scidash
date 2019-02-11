import React from "react";
import ModelForm from "../model-form/ModelForm";

const ModelCreate = ({ model, modelClasses, onSave, onCancel }) => (<ModelForm
  modelClasses={modelClasses}
  model={model}
  onSave={onSave}
  onCancel={onCancel}
/>
);

export default ModelCreate;