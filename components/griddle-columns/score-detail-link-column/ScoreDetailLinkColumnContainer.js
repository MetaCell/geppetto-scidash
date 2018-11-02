import { connect } from "react-redux"
import Helper from '../../../shared/Helper';
import ScoreDetailLinkColumn from "./ScoreDetailLinkColumn"

const mapStateToProps = (state, ownProps) => {
    let scoreInstanceObject = ownProps.value;
    let score = scoreInstanceObject.get("score");
    let scoreType = scoreInstanceObject.get("score_type");
    let sortKey = scoreInstanceObject.get("sort_key")

    let helper = new Helper()

    if(!score)
        score = "";
    else
        score = score.toFixed(3)

    return {
        customContentStyle: {
            width: "900px",
            height: "900px",
        },
        background: helper.getBackground(sortKey, ownProps.colorBlind),
        scoreObject: scoreInstanceObject,
        colorBlind: ownProps.colorBlind,
        score
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ScoreDetailLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreDetailLinkColumn)

export default ScoreDetailLinkColumnContainer
