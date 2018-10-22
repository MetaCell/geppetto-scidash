import { connect } from 'react-redux';
import AvgScoreDetailLinkColumn from './AvgScoreDetailLinkColumn';
import Helper from "../../../shared/Helper";


const mapStateToProps = (state, ownProps) => {
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
    return {}
}

const AvgScoreDetailLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AvgScoreDetailLinkColumn)

export default AvgScoreDetailLinkColumnContainer;
