import { connect } from "react-redux";
import ModelEdit from "./ModelEdit";
import { editModel } from "../../actions/creators/models";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
    model: state.router.location.state.model,
    modelClasses: state.modelClasses.data,
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