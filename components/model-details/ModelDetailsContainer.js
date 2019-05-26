import { connect } from "react-redux";
import ModelDetails from "./ModelDetails";
import Helper from "../../shared/Helper";


const mapStateToProps = (state, ownProps) => {

  let helper = new Helper();

  let modelTags = null;

  if (ownProps.model.get("tags").size > 0) {
    modelTags = ownProps.model.get("tags").map(item => item.get("name"));
  }

  return {
    modelClassName: helper.noneIfEmptyString(ownProps.model.get("model_class").get("class_name")),
    modelClassUrl: helper.noneIfEmptyString(ownProps.model.get("model_class").get("url")),
    classCapabilities: helper.noneIfEmptyArray(ownProps.model.get("model_class").get("capabilities")),
    instanceName: helper.noneIfEmptyArray(ownProps.model.get("name")),
    instanceSource: helper.noneIfEmptyArray(ownProps.model.get("url")),
    runParameters: helper.noneIfEmptyMap(ownProps.model.get("run_params")),
    modelTags: modelTags
  };
};

const mapDispatchToProps = dispatch => ({});

const ModelDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDetails);

export default ModelDetailsContainer;
