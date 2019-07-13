import React from "react";
import ModelForm from "../model-form/ModelForm";

const ModelCreate = ({ model, modelClasses, onSave, onCancel, actionType, data }) => (<ModelForm
    modelClasses={modelClasses}
    model={model}
    onSave={onSave}
    onCancel={onCancel}
    actionType={actionType}
    data={data}
/>
);

export default ModelCreate;