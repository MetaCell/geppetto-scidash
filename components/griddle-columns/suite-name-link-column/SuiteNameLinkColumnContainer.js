import { connect } from "react-redux";
import SuiteNameLinkColumn from "./SuiteNameLinkColumn";


const mapStateToProps = (state, ownProps) => {
    let suiteHash = ownProps.value.get("hash");

    return {
        colorBlind: ownProps.colorBlind,
        hiddenModels: ownProps.hiddenModels,
        scoreMatrix: ownProps.scoreMatrixList[suiteHash],
        scoreMatrixTableData: ownProps.scoreMatrixTableDataList[suiteHash],
        hideRow: ownProps.hideRow
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}

const SuiteNameLinkColumnContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SuiteNameLinkColumn)

export default SuiteNameLinkColumnContainer;

