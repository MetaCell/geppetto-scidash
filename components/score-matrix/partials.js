import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Helper from "../../shared/Helper";
import RaisedButton from 'material-ui/RaisedButton';

const ScoreCell = ({valueScore, colorBlind}) => {
	let helper = new Helper();
    return <div style={{
        background: typeof valueScore == "undefined" ? "white" : helper.getBackground(valueScore.get("sort_key"), colorBlind),
        color: "white",
        padding: "8px",
        margin : 0,
        width: "auto",
        textAlign: "center"
    }}>{typeof valueScore == "undefined" ? " ": valueScore.get("sort_key").toFixed(2)}</div>;
}

const TitleHeader = ({title}) => <div className="scidash-tilted-titles-table-heading-cell-div">{title}</div>;

const HideRowCell = ({valueScore, hideRow}) => {
	return <i onClick={() => hideRow(valueScore)} className="fa fa-eye-slash eye-icon" title="Hide row"></i>;
};

const ShowAllHeading = ({hiddenModels,showAllModels}) => <RaisedButton id="show-all-button" style={ !hiddenModels.length ? {
    display: "none"
} : {minWidth: '45px', width:'45px', maxHeight: '30px'}} onClick={showAllModels} icon={<FontIcon className="fa fa-eye show-all-icon" style={{ padding: 5 }}/>} title="Show all"/>;

export {
	ScoreCell,
	TitleHeader,
	HideRowCell,
	ShowAllHeading
}