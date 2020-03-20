import { connect } from "react-redux";
import TestCreate from "./TestEdit";
import TestInstance from "../../models/TestInstance";
import { editTest } from "../../actions/creators/tests";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";
import { clearErrors } from "../../actions/creators/global";

const mapStateToProps = (state, ownProps) => ({
  model: new TestInstance(ownProps.location.state.test),
  testClasses: state.testClasses.data,
  errors: state.global.errors,
  data: state.testInstances.data,
  actionType: "edit"
});

const mapDispatchToProps = dispatch => ({
  onSave: model => dispatch(editTest(model, dispatch)),
  onClearErrors: () => dispatch(clearErrors()),
  onCancel: () => dispatch(changePage(new PagesService().TESTS_PAGE, dispatch))
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
