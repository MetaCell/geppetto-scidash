import { connect } from "react-redux";
import ScoreDetails from "./ScoreDetails";
import Helper from "../../shared/Helper";


const mapStateToProps = (state, ownProps) => {

    let helper = new Helper();
    let sortKey = ownProps.score.get("sort_key");

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

    return {
        scoreClassName: helper.noneIfEmptyString(ownProps.score.get("test_instance").get("test_class").get("class_name")),
        testClassName: helper.noneIfEmptyString(ownProps.score.get("test_instance").get("test_class").get("class_name")),
        score: ownProps.score.get("score").toFixed(3),
        scoreType: ownProps.score.get("score_type"),
        hostname: helper.noneIfEmptyString(ownProps.score.get("hostname")),
        buildInfo: helper.parseBuildInfo(ownProps.score.get("test_instance").get("build_info")),
        timestamp: timestamp,
        modelBackend: helper.noneIfEmptyString(ownProps.score.get("model_instance").get("backend")),
        observation: helper.noneIfEmptyMap(ownProps.score.get("test_instance").get("observation")),
        modelInstance: ownProps.score.get("model_instance"),
        sortKey: sortKey.toFixed(2),
        background
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ScoreDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreDetails)

export default ScoreDetailsContainer;
