import { connect } from "react-redux";
import TestCreate from "./TestCreate";
import TestInstance from "../../models/TestInstance";
import { testCreateStarted } from "../../actions/creators/tests";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  model: new TestInstance(),
  testClasses: state.testClasses.data
});

const mapDispatchToProps = dispatch => ({
  toggleTestForm: () => dispatch(toggleCreateTest()),
  onSave: model => dispatch(testCreateStarted(model, dispatch)),
  onCancel: () => dispatch(new PagesService().TESTS_PAGE)
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
