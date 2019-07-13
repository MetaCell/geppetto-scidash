import { connect } from "react-redux";
import SuiteNameLinkColumn from "./SuiteNameLinkColumn";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.value == " ") {
    return {};
  }
  let suiteHash = ownProps.value.get("hash");

  return {
    colorBlind: ownProps.colorBlind,
    hiddenModels: ownProps.hiddenModels,
    scoreMatrix: ownProps.scoreMatrixList[suiteHash],
    scoreMatrixTableData: ownProps.scoreMatrixTableDataList[suiteHash],
    hideRow: ownProps.hideRow,
    showAllModels: ownProps.showAllModels
  };
};

const mapDispatchToProps = dispatch => ({});

const SuiteNameLinkColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiteNameLinkColumn);

export default SuiteNameLinkColumnContainer;
