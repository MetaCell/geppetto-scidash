import { connect } from "react-redux";
import DDList from "./DDList";
import * as actions from "../../actions/creators/scheduler";

const mapStateToProps = state => ({
  data: state.scheduler.data,
  tests: state.scheduler.tests,
  models: state.scheduler.models,
});

const mapDispatchToProps = dispatch => ({
  addTest: id => dispatch(actions.addTestToScheduler(id)),
  addModel: id => dispatch(actions.addModelToScheduler(id)),
  removeTest: id => dispatch(actions.removeTestFromScheduler(id)),
  removeModel: id => dispatch(actions.removeModelFromScheduler(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DDList);