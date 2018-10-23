import React from "react";
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import {Card, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Helper from '../../shared/Helper';

export default class ScoreMatrix extends React.Component {

    constructor(props, context){

        super(props, context);

        this.props = props;
        this.helper = new Helper();
    }

    render(){
        const ScoreCell = ({value}) => {
            return <div style={{
                background: typeof value == "undefined" ? "white" : this.helper.getBackground(value.get("sort_key"), this.props.colorBlind),
                color: "white",
                padding: "8px",
                margin : 0
            }}>{typeof value == "undefined" ? " ": value.get("sort_key").toFixed(2)}</div>;
        }

        const HideRowCell = ({value}) => <i onClick={() => this.props.hideRow(value)} className="fa fa-eye-slash eye-icon" title="Hide row"></i>;

        const ShowAllHeading = ({value}) => <RaisedButton style={ !this.props.hiddenModels.length ? {
            display: "none"
        } : {}} onClick={this.props.showAll} icon={<FontIcon className="fa fa-eye show-all-icon" style={{ padding: 5 }}/>} title="Show all"/>;

        const griddleComponents = {
            Filter: () => null,
            PageDropdown: () => null,
            NoResults: () => <table className="table scidash-table suites-table no-results-table"><thead><tr><th><ShowAllHeading /></th></tr></thead></table>,
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
            <Card style={{
                    overflow: "scroll"
                }}>
                <CardText>
                    <Griddle
                        data={this.props.scoreMatrixTableData}
                        components={griddleComponents}
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
                                                order={index + 1} />);
                                } else if (heading.title == "hide_all") {
                                    return (<ColumnDefinition
                                                id="hideButtons"
                                                key={index}
                                                title={heading.title}
                                                width="88px"
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

