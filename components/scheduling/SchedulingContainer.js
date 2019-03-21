import { connect } from "react-redux";
import Scheduling from "./Scheduling";

const mapStateToProps = state => ({
  data: [
    ...state.models.data,
    ...state.testInstances.data
  ],
  choosedTests: state.scheduler.choosedTests,
  choosedModels: state.scheduler.choosedModels
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduling);