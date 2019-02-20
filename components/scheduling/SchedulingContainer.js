import { connect } from "react-redux";
import Scheduling from "./Scheduling";

const mapStateToProps = state => ({
  data: state.scheduler.data,
  tests: state.scheduler.tests,
  models: state.scheduler.models
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduling);