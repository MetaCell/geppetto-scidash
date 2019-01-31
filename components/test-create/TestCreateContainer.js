import { connect } from "react-redux";
import TestCreate from "./TestCreate";
import TestInstance from "../../models/TestInstance";
import { toggleCreateTest } from "../../actions/creators/header";
import { testCreateStarted } from "../../actions/creators/tests";

const mapStateToProps = state => ({
  model: new TestInstance(),
  testClasses: state.testClasses.data
});

const mapDispatchToProps = dispatch => ({
  toggleTestForm: () => dispatch(toggleCreateTest()),
  onSave: model => dispatch(testCreateStarted(model, dispatch)),
  onCancel: () => dispatch(toggleCreateTest())
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
