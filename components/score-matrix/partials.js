import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Helper from "../../shared/Helper";
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const EnhancedWithRowData = connect((state, props:any) => {
  return {
    // rowData will be available into ScoreCell
    rowData: rowDataSelector(state, props)
  };
});

const ScoreCell = ({value, props}) => {
	let helper = new Helper();
    return <div style={{
        background: typeof value == "undefined" ? "white" : helper.getBackground(value.get("sort_key"), false),
        color: "white",
        padding: "8px",
        margin : 0,
        width: "auto",
        textAlign: "center"
    }}>{typeof value == "undefined" ? " ": value.get("sort_key").toFixed(2)}</div>;
}

const TitleHeader = ({title}) => <div className="scidash-tilted-titles-table-heading-cell-div">{title}</div>;

const HideRowCell = ({value, hideRow}) => {
	return <i onClick={() => hideRow(value)} className="fa fa-eye-slash eye-icon" title="Hide row"></i>;
};

const ShowAllHeading = ({hiddenModels,showAllModels}) => <RaisedButton id="show-all-button" style={ !hiddenModels.length ? {
    display: "none"
} : {minWidth: '45px', width:'45px', maxHeight: '30px'}} onClick={showAllModels} icon={<FontIcon className="fa fa-eye show-all-icon" style={{ padding: 5 }}/>} title="Show all"/>;

export {
	ScoreCell,
	TitleHeader,
	HideRowCell,
	ShowAllHeading,
	EnhancedWithRowData
}