import React from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import Helper from "../../shared/Helper";

const ScoreCell = ({ rowData, colorBlind }) => {
  let helper = new Helper();
  return (
    <div style={{
      background: typeof rowData == "undefined" ? "white" : helper.getBackground(rowData.get("sort_key"), colorBlind),
      color: "white",
      padding: "8px",
      margin: 0,
      width: "auto",
      textAlign: "center"
    }}
    >
      {typeof rowData == "undefined" ? " " : rowData.get("sort_key").toFixed(2)}

    </div>
  );
};

const TitleHeader = ({ title }) => <div className="scidash-tilted-titles-table-heading-cell-div">{title}</div>;

const HideRowCell = ({ rowData, hideRow, data }) => (
  <i style={(data && data.length == 1) ? { display: "none" } : { display: "initial" }}
    onClick={() => hideRow(rowData)} className="fa fa-eye-slash eye-icon" title="Hide row"
  />
);

const ShowAllHeading = ({ hiddenModels, showAllModels }) => (<Button
  variant="contained" id="show-all-button" style={!hiddenModels.length ? { display: "none" } : { minWidth: "45px", width: "45px", maxHeight: "30px" }} onClick={showAllModels} icon={<VisibilityIcon className="show-all-icon" style={{ padding: 5 }} />} title="Show all"
>Show all</Button>);

export {
  ScoreCell,
  TitleHeader,
  HideRowCell,
  ShowAllHeading
};