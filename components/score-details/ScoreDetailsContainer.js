import { connect } from "react-redux";
import ScoreDetails from "./ScoreDetails";
import Helper from "../../shared/Helper";


const mapStateToProps = (state, ownProps) => {

  let helper = new Helper();

  let sortKey = "N/A";

  if (ownProps.score.get("score_key") !== null){
    sortKey = ownProps.score.get("sort_key");
  }

  let score = "N/A";

  if (ownProps.score.get("score") !== null){
    score = ownProps.score.get("score");
  }

  let timestamp = new Date(ownProps.score.get("timestamp")).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
    timeZoneName: "short"
  });

  let background = helper.getBackground(sortKey, ownProps.colorBlind);

  let scoreType = null;

  if (ownProps.score.get("score_type") == ""){
    if (ownProps.score.get("score_class") == null){
      scoreType = ownProps.score.get("score_type");
    } else {
      scoreType = ownProps.score.get("score_class").get("class_name");
    }
  } else {
    scoreType = ownProps.score.get("score_type");
  }

  return {
    scoreClassName: helper.noneIfEmptyString(ownProps.score.get("test_instance").get("test_class").get("class_name")),
    testClassName: helper.noneIfEmptyString(ownProps.score.get("test_instance").get("test_class").get("class_name")),
    score: score,
    scoreType: scoreType,
    hostname: helper.noneIfEmptyString(ownProps.score.get("hostname")),
    error: helper.noneIfEmptyString(ownProps.score.get("error")),
    buildInfo: helper.parseBuildInfo(ownProps.score.get("test_instance").get("build_info")),
    timestamp: timestamp,
    modelBackend: helper.noneIfEmptyString(ownProps.score.get("model_instance").get("backend")),
    observation: helper.noneIfEmptyMap(ownProps.score.get("test_instance").get("observation")),
    modelInstance: ownProps.score.get("model_instance"),
    sortKey: sortKey,
    background
  };
};

const mapDispatchToProps = dispatch => ({});

const ScoreDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreDetails);

export default ScoreDetailsContainer;
