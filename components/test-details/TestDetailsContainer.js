import { connect } from "react-redux";
import TestDetails from "./TestDetails";
import Helper from "../../shared/Helper";


const mapStateToProps = (state, ownProps) => {

  let helper = new Helper();

  let testTags = [];

  if (ownProps.testInstance.get("tags").size > 0) {
    testTags = ownProps.testInstance.get("tags").map(item => item.get("name"));
  }


  return {
    testClassName: helper.noneIfEmptyString(ownProps.testInstance.get("test_class").get("class_name")),
    testClassDescription: ownProps.testInstance.get("test_class").get("tooltip"),
    buildInfo: helper.parseBuildInfo(ownProps.testInstance.get("build_info")),
    observation: helper.noneIfEmptyMap(ownProps.testInstance.get("observation")),
    testTags: testTags,
    instanceTestName: helper.noneIfEmptyString(ownProps.testInstance.get("name"))
  };
};

const mapDispatchToProps = dispatch => ({});

const TestDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetails);

export default TestDetailsContainer;
