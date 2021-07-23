import { connect } from "react-redux";
import ScoreMatrix from "./ScoreMatrix";
import Helper from "../../shared/Helper";


const mapStateToProps = (state, ownProps) => ({
  styleConfig: {
    classNames: {
      Table: "modal-table scidash-tilted-titles-table hideAll-column",
      TableHeadingCell: "scidash-tilted-titles-table-heading-cell",
    }
  },
  scoreMatrix: ownProps.scoreMatrix,
  scoreMatrixTableData: ownProps.scoreMatrixTableData,
  hiddenModels: ownProps.hiddenModels,
  pageProperties: {
    currentPage: 1,
    pageSize: 50
  },
  colorBlind: ownProps.colorBlind,
  hideRow: ownProps.hideRow,
  showAllModels: ownProps.showAllModels
});

const mapDispatchToProps = dispatch => ({
  sortScore: (data, column, sortAscending = true) => data.sort(
    (original, newRecord) => {

      original = (!!original.get(column).get("sort_key") && original.get(column).get("sort_key")) || "";
      newRecord = (!!newRecord.get(column).get("sort_key") && newRecord.get(column).get("sort_key")) || "";

      if (original === newRecord) {
        return 0;
      } else if (original > newRecord) {
        return sortAscending ? 1 : -1;
      } else {
        return sortAscending ? -1 : 1;
      }
    }),
});

const ScoreMatrixContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreMatrix);

export default ScoreMatrixContainer;
