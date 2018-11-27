import { connect } from 'react-redux';
import AvgScoreDetailLinkColumn from './AvgScoreDetailLinkColumn';
import Helper from "../../../shared/Helper";
import ScreenShotHelper from '../../../shared/ScreenShotHelper';



const mapStateToProps = (state, ownProps) => {
    if (!ownProps.value.size){
        return {}
    }
    let helper = new Helper();

    let avgScore = ownProps.value.get('value').toFixed(2);
    let scoreList = ownProps.value.get('scoreList');

    let background = helper.getBackground(parseFloat(avgScore), ownProps.colorBlind);

    return {
        colorBlind: ownProps.colorBlind,
        background,
        avgScore,
        scoreList
    }
}

const mapDispatchToProps = dispatch => {
    let screenshotHelper = new ScreenShotHelper()
    return {
        takeScreenshot: (e) => {
            screenShotHelper.takeScreenshot(e,"Average_score_image")
        }
    }
}

const AvgScoreDetailLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AvgScoreDetailLinkColumn)

export default AvgScoreDetailLinkColumnContainer;
