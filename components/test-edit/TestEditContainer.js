import { connect } from "react-redux";
import TestCreate from "./TestEdit";
import { editTest } from "../../actions/creators/tests";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  model: state.router.location.state.test,
  testClasses: state.testClasses.data,
  errors: state.global.errors,
  actionType: "edit"
});

const mapDispatchToProps = dispatch => ({
  onSave: model => dispatch(editTest(model, dispatch)),
  onCancel: () => dispatch(changePage(new PagesService().TESTS_PAGE, dispatch))
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
