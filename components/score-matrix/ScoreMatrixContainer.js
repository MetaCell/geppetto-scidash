import { connect } from 'react-redux';
import ScoreMatrix from './ScoreMatrix';
import Helper from '../../shared/Helper';


const mapStateToProps = (state, ownProps) => {
    return {
        scoreMatrix: ownProps.scoreMatrix,
        scoreMatrixTableData: ownProps.scoreMatrixTableData,
        hiddenModels: ownProps.hiddenModels,
        pageProperties: {
            currentPage: 1,
            pageSize: 50
        },
        colorBlind: ownProps.colorBlind,
        hideRow: ownProps.hideRow
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const ScoreMatrixContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScoreMatrix)

export default ScoreMatrixContainer;

