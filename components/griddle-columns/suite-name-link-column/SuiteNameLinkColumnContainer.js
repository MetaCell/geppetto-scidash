import { connect } from 'react-redux';
import SuiteNameLinkColumn from './SuiteNameLinkColumn';


const mapStateToProps = (state, ownProps) => {
    return {
        colorBlind: ownProps.colorBlind,
        hiddenModels: ownProps.hiddenModels,
        scoreMatrix: ownProps.scoreMatrix,
        scoreMatrixTableData: ownProps.scoreMatrixTableData,
        hideRow: ownProps.hideRow
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

const SuiteNameLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SuiteNameLinkColumn)

export default SuiteNameLinkColumnContainer;

