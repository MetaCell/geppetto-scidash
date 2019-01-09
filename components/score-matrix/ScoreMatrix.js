import React from "react";
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import {Card, CardText} from 'material-ui/Card';
import Helper from '../../shared/Helper';
import { ShowAllHeading, HideRowCell, TitleHeader, ScoreCell} from "./partials"
import RaisedButton from 'material-ui/RaisedButton';

export default class ScoreMatrix extends React.Component {

    constructor(props, context){

        super(props, context);

        this.props = props;
        this.helper = new Helper();
    }

    
    render(){
    	const GriddleComponents = { 
            Filter: () => null,
            PageDropdown: () => null,
            NoResults: () => <table className="model-table scidash-tilted-titles-table"><thead><tr><th><ShowAllHeading /></th></tr></thead></table>,
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
        };
    	
        return (
            <Card id="table-container-div" style={{
                    overflow: "scroll"
                }}>
                <CardText>
                    <Griddle
                        data={this.props.scoreMatrixTableData}
                        components={GriddleComponents}
                        plugins={[plugins.LocalPlugin]}
                        styleConfig={this.props.styleConfig}
                        pageProperties={this.props.pageProperties} >
                        <RowDefinition>
                            {this.props.scoreMatrix.headings.map((heading, index) => {
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
                                                customComponent={({value}) => <HideRowCell rowData={value} hideRow={this.props.hideRow}/>}
                                                customHeadingComponent={(props) => <ShowAllHeading hiddenModels={this.props.hiddenModels} showAllModels={this.props.showAllModels}/>}
                                                cssClassName="griddle-cell score-matrix-cell"
                                                order={index + 1} />);
                                } else {
                                    return (<ColumnDefinition
                                                id={heading.id}
                                                key={index}
                                                title={heading.title}
                                                sortMethod={this.props.sortScore}
                                                customHeadingComponent={TitleHeader}
                                                customComponent={({value}) => <ScoreCell rowData={value} colorBlind={this.props.colorBlind}/>}
                                                cssClassName="griddle-cell score-matrix-cell"
                                                order={index + 1} />);
                                }
                            })}
                        </RowDefinition>
                    </Griddle>
                </CardText>
            </Card>
        );
    }
}

