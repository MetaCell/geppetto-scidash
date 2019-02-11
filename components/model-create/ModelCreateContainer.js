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
  onSave: model => dispatch(modelCreateStarted(model, dispatch)),
  onCancel: () => dispatch(new PagesService().MODELS_PAGE)
});

const ModelCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelCreate);

export default ModelCreateContainer;