import { connect } from "react-redux";
import DDList from "./DDList";
import * as actions from "../../actions/creators/scheduler";

const mapStateToProps = state => ({
  data: [
    ...state.models.data,
    ...state.testInstances.data
  ],
  choosedTests: state.scheduler.choosedTests,
  choosedModels: state.scheduler.choosedModels
});

const mapDispatchToProps = dispatch => ({
  addTest: testID => dispatch(actions.addTestToScheduler(testID)),
  addModel: modelID => dispatch(actions.addModelToScheduler(modelID)),
  removeTest: testID => dispatch(actions.removeTestFromScheduler(testID)),
  removeModel: modelID => dispatch(actions.removeModelFromScheduler(modelID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DDList);