import { connect } from "react-redux";
import TestCreate from "./TestEdit";
import TestInstance from "../../models/TestInstance";
import { editTest } from "../../actions/creators/tests";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  model: new TestInstance(state.router.location.state.test),
  testClasses: state.testClasses.data,
  errors: state.global.errors,
  data: state.testInstances.data,
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
