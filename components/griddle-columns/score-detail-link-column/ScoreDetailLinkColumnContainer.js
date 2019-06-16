import { connect } from "react-redux";
import Helper from "../../../shared/Helper";
import ScoreDetailLinkColumn from "./ScoreDetailLinkColumn";

const mapStateToProps = (state, ownProps) => {
  let scoreInstanceObject = ownProps.value;
  let score = null;
  let scoreType = scoreInstanceObject.get("score_type");
  let sortKey = scoreInstanceObject.get("sort_key");

  if (scoreInstanceObject.get("status") == "c"){
    score = scoreInstanceObject.get("score").toFixed(3);
  } else {
    if (scoreInstanceObject.get("id") == null){
      score = "";
    } else {
      score = "N/A";
    }
  }

  let helper = new Helper();

  return {
    customContentStyle: {
      width: "900px",
      height: "900px",
    },
    background: helper.getBackground(sortKey, ownProps.colorBlind),
    scoreObject: scoreInstanceObject,
    colorBlind: ownProps.colorBlind,
    score
  };
};

const mapDispatchToProps = dispatch => ({});

const ScoreDetailLinkColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreDetailLinkColumn);

export default ScoreDetailLinkColumnContainer;
