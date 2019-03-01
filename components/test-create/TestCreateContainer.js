import { connect } from "react-redux";
import TestCreate from "./TestCreate";
import TestInstance from "../../models/TestInstance";
import { testCreateStarted } from "../../actions/creators/tests";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";

const mapStateToProps = state => ({
  model: new TestInstance(),
  testClasses: state.testClasses.data
});

const mapDispatchToProps = dispatch => ({
  onSave: model => dispatch(testCreateStarted(model, dispatch)),
  onCancel: () => dispatch(changePage(new PagesService().TESTS_PAGE, dispatch))
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
