import { connect } from "react-redux";
import ModelCreate from "./ModelCreate";
import ModelInstance from "../../models/ModelInstance";
import { modelCreateStarted } from "../../actions/creators/models";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  model: new ModelInstance(),
  modelClasses: state.modelClasses.data
});

const mapDispatchToProps = dispatch => ({
  onSave: model => dispatch(modelCreateStarted(model, dispatch)),
  onCancel: () => dispatch(changePage(new PagesService().MODELS_PAGE, dispatch))
});

const ModelCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelCreate);

export default ModelCreateContainer;