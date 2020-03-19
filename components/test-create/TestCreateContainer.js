import { connect } from "react-redux";
import TestCreate from "./TestCreate";
import TestInstance from "../../models/TestInstance";
import { testCreateStarted } from "../../actions/creators/tests";
import { changePage } from "../../actions/creators/header";
import PagesService from "../../services/PagesService";
import { clearErrors } from "../../actions/creators/global";

const mapStateToProps = state => ({
  model: new TestInstance(),
  testClasses: state.testClasses.data,
  errors: state.global.errors,
  actionType: "create"
});

const mapDispatchToProps = dispatch => ({
  onSave: model => {
    if (model.params !== undefined) {
      var keys = ['dt', 'tmax'];
      for (let i = 0; i < keys.length; i++) {
        if (model.params[keys[i]] !== undefined && model.params[keys[i]] === "") {
          if (model.test_class.default_params !== undefined
            && model.test_class.default_params[keys[i]] !== undefined) {
            model.params[keys[i]] = model.test_class.default_params[keys[i]];
          }
        }
      }
    }
    dispatch(testCreateStarted(model, dispatch));
  },
  onClearErrors: () => dispatch(clearErrors()),
  onCancel: () => dispatch(changePage(new PagesService().TESTS_PAGE, dispatch))
});

const TestCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCreate);

export default TestCreateContainer;
