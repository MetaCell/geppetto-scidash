import React from "react";
import ModelForm from "../model-form/ModelForm";

const ModelCreate = ({ model, modelClasses, downloadModelFromUrl, toggleModelForm, onSave, onCancel }) => (<ModelForm
  modelClasses={modelClasses}
  model={model}
  downloadModelFromUrl={downloadModelFromUrl}
  toggleModelForm={toggleModelForm}
  onSave={onSave}
  onCancel={onCancel}
/>
);

export default ModelCreate;