import { connect } from "react-redux";
import ModelCreate from "./ModelCreate";
import ModelInstance from "../../models/ModelInstance";
import { toggleCreateModel } from "../../actions/creators/header";
import { modelCreateStarted } from "../../actions/creators/models";

const mapStateToProps = (state, ownProps) => ({
  model: new ModelInstance(),
  modelClasses: state.modelClasses.data
});

const mapDispatchToProps = dispatch => ({
  downloadModelFromUrl: () => console.log("Downloading"),
  toggleModelForm: () => dispatch(toggleCreateModel()),
  onSave: model => dispatch(modelCreateStarted(model, dispatch)),
  onCancel: () => dispatch(toggleCreateModel())
});

const ModelCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelCreate);

export default ModelCreateContainer;