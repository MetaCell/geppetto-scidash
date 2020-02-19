import { connect } from "react-redux";
import ModelEdit from "./ModelEdit";
import ModelInstance from "../../models/ModelInstance";
import { editModel } from "../../actions/creators/models";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = (state, ownprops) => ({
  model: new ModelInstance(ownprops.location.state.model),
  modelClasses: state.modelClasses.data,
  errors: state.global.errors,
  data: state.models.data,
  actionType: "edit"
});

const mapDispatchToProps = dispatch => ({
  onSave: model => dispatch(editModel(model, dispatch)),
  onCancel: () => dispatch(changePage(new PagesService().MODELS_PAGE, dispatch))
});

const ModelEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelEdit);

export default ModelEditContainer;
