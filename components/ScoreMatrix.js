import React from "react";
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import {Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import BackendService from "../common/BackendService";
import Helper from "../common/Helper";
import ScidashScoreDetailLinkColumn from './common/griddle/ScidashScoreDetailLinkColumn';


export default class ScoreMatrix extends React.Component {

    constructor(props, context){

        super(props, context);

        this.props = props;
        this.helper = new Helper();
        this.scores = [];
        this.hiddenModels = [];
        this.tableData = [];

        this.state = {
            scoreMatrix: {
                headings: [],
                rows: {}
            },
            tableData: null,
            colorBlind: false
        }

        this.styleConfig = {
            classNames: {
                Table: "modal-table scidash-tilted-titles-table hideAll-column",
                TableHeadingCell: "scidash-tilted-titles-table-heading-cell",
            }
        }

        this.showAll = this.showAll.bind(this)

        this.griddleComponents = {
            Filter: () => null,
            PageDropdown: () => null,
            SettingsToggle: () => null,
            NextButton: (props) => {
                if (props.hasNext)
                    return <RaisedButton label={props.text} onClick={props.getNext} style={{
                        marginLeft: "10px"
                    }}/>;
                return null;
            },
            PreviousButton: (props) => {
                if (props.hasPrevious)
                    return <RaisedButton label={props.text} onClick={props.getPrevious} style={{
                        marginRight: "10px"
                    }}/>;
                return null;
            }
        }

    }

    componentDidMount(){
        this.setState({
            colorBlind: this.props.colorBlind
        })
        this.load(this.props.suite.get("hash"));
    }

    load(hash = false){
        if (!hash)
            return;

        BackendService.score.getAll({
            suite_hash: hash
        }).then((results) => {

            this.scores = results["scores"];
            this.buildTableData(this.scores);
        })
    }

    hideRow(modelInstanceName){
        if (this.hiddenModels.includes(modelInstanceName))
            return;

        this.hiddenModels = [modelInstanceName, ...this.hiddenModels];

        this.buildTableData(this.scores);
    }

    showAll(){
        this.hiddenModels = [];
        this.buildTableData(this.scores);
    }

    buildMatrix(scoreList = []){
        let scoreMatrix = {
            rows: {},
            headings: [
                {
                    title: "model_name",
                    id: "modelInstanceName"
                }
            ]
        };

        for (let score of scoreList){
            let modelInstanceName = score.model_instance.name;
            let modelInstanceId = score.model_instance.id;
            let testHashId = score.test_instance.hash_id;
            let modelKey = `${modelInstanceName}_${modelInstanceId}`;

            if (this.hiddenModels.includes(modelKey)){
                continue;
            }

            if (!(modelKey in scoreMatrix.rows))
                scoreMatrix.rows[modelKey] = {
                    title: modelInstanceName,
                    info: new Map()
                }

            scoreMatrix.rows[modelKey]["info"].set(testHashId, score);
        }

        let biggestRow = new Map();
        for (let row of Object.values(scoreMatrix.rows)){
            if (row["info"].size > biggestRow.size)
                biggestRow = row["info"];
        }

        if (biggestRow.size > 0){
            for (let item of biggestRow.entries()){
                scoreMatrix.headings.push({
                    title: item[1].test_instance.test_class.class_name,
                    id: item[1].test_instance.hash_id
                });
            }
        }


        scoreMatrix.headings.push({
            title: "hide_all",
            id: "hideButtons"
        })

        return scoreMatrix;
    }

    buildTableData(scoreList){
        let scoreMatrix = this.buildMatrix(scoreList);
        this.tableData = [];

        Object.keys(scoreMatrix.rows).map((key, heading) => {
            let rowData = {};

            for (let heading of scoreMatrix.headings){
                if (heading.id != "modelInstanceName")
                    rowData[heading.id] = scoreMatrix["rows"][key]["info"].get(heading.id);
                else
                    rowData["modelInstanceName"] = scoreMatrix["rows"][key]["title"];
            }

            rowData["hideButtons"] = key;

            this.tableData.push(rowData);
        });

        this.setState({
            scoreMatrix: scoreMatrix,
            tableData: this.tableData
        }, () => {
            $(".eye-icon, button[title='Show all']").tooltip()
        });
    }

    render(){
    	var self = this;
        if (this.state.scoreMatrix.headings.length > 0){
            const pageProperties = {
                currentPage: 1,
                pageSize: 50
            }

            const ScoreCell = ({value}) => <div style={{
                background: this.helper.getBackground(value.get("sort_key"), this.state.colorBlind),
                color: "white",
                padding: "8px",
                margin : 0,
                width: "auto",
                textAlign: "center"
            }}>{value.get("sort_key").toFixed(2)}</div>


            const TitleHeader = ({title}) => <div className="scidash-tilted-titles-table-heading-cell-div">{title}</div>;
            
            const HideRowCell = ({value}) => <i onClick={() => this.hideRow(value)} className="fa fa-eye-slash eye-icon" title="Hide row"></i>
                const ShowAllHeading = ({value}) => <RaisedButton id="showAllButton" style={ !this.hiddenModels.length ? {
                display: "none"
            } : {minWidth: '45px', width: '45px', maxHeight : '30px'}} onClick={this.showAll} icon={<FontIcon className="fa fa-eye show-all-icon"/>} title="Show all"/>

            const griddleComponents = {
                Filter: () => null,
                PageDropdown: () => null,
                NoResults: () => <table className="modal-table scidash-tilted-titles-table"><thead><tr><th><ShowAllHeading /></th></tr></thead></table>,
                SettingsToggle: () => null,
                NextButton: (props) => {
                    if (props.hasNext)
                        return <RaisedButton label={props.text} onClick={props.getNext} style={{
                            marginLeft: "10px"
                        }}/>;
                    return null;
                },
                PreviousButton: (props) => {
                    if (props.hasPrevious)
                        return <RaisedButton label={props.text} onClick={props.getPrevious} style={{
                            marginRight: "10px"
                        }}/>;
                    return null;
                }
            }

            return (
                <Card style={{
                        overflow: "scroll"
                    }}>
                    <CardText>
                        <Griddle
                            data={this.state.tableData}
                            components={griddleComponents}
                            plugins={[plugins.LocalPlugin]}
                            styleConfig={this.styleConfig}
                            pageProperties={pageProperties} >
                            <RowDefinition>
                                {this.state.scoreMatrix.headings.map((heading, index) => {
                                	if (heading.title == "model_name"){
                                        return (<ColumnDefinition
                                                    id={heading.id}
                                                    key={index}
                                                    title=" "
                                                    cssClassName="modelName-row-heading"
                                                    order={index + 1} />);
                                    } else if (heading.title == "hide_all") {
                                        return (<ColumnDefinition
                                                    id="hideButtons"
                                                    key={index}
                                                    title={heading.title}
                                                    width="55px"
                                                    customComponent={HideRowCell}
                                                    customHeadingComponent={ShowAllHeading}
                                                    cssClassName="griddle-cell score-matrix-cell"
                                                    order={index + 1} />);
                                    } else {
                                    	return (<ColumnDefinition
                                                    id={heading.id}
                                                    key={index}
                                                    title={heading.title}
                                                    customComponent={ScoreCell}
                                    	            customHeadingComponent={TitleHeader}
                                                    cssClassName="griddle-cell score-matrix-cell"
                                                    order={index + 1} />);
                                    }
                                })}
                            </RowDefinition>
                        </Griddle>
                    </CardText>
                </Card>
            );
        } else {
            return (<i className="fa fa-cog fa-4x fa-spin centered-modal loading-spinner" style={{ top:"30%" }}></i>);
        }
    }
}
