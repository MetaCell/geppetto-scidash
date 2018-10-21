import React from "react";
import Griddle, {ColumnDefinition, RowDefinition, plugins} from "griddle-react";

import FilterCellContainer from "../filter-cell/FilterCellContainer";
import ModelDetailLinkColumnContainer from "../griddle-columns/model-detail-link-column/ModelDetailLinkColumnContainer";
import DateRangeCellContainer from "../date-range-cell/DateRangeCellContainer";
// TODO: move this component to shared
// Also remove all Scidash mentions
import ScidashTimestampColumn from "./partials/ScidashTimestampColumn";
import ScidashSuiteNameLinkColumn from "./partials/ScidashSuiteNameLinkColumn";
import ScidashAvgScoreDetailLinkColumn from "./partials/ScidashAvgScoreDetailLinkColumn";

import Loader from "../loader/Loader";

export default class TestInstances extends React.Component {

    constructor(props, context){
        super(props, context);
        this.props = props;
    }

    render(){
        return (
            <div>
                <Griddle
                    data={this.props.data}
                    components={this.props.griddleComponents}
                    plugins={[plugins.LocalPlugin]}
                    styleConfig={this.props.styleConfig}
                    pageProperties={this.props.pageProperties} >
                    <RowDefinition>
                        <ColumnDefinition
                            id="suiteObject"
                            title="Suite Name"
                            customComponent={(props) => <ScidashSuiteNameLinkColumn
                                    colorBlind={this.props.colorBlind}
                                    {...props}
                                    /> }
                            customHeadingComponent={(props) => <FilterCellContainer
                                filterName="suite_name"
                                onFilterUpdate={this.props.onFilterUpdate}
                                autoCompleteData={this.props.autoCompleteData}
                                {...props} />
                            } order={1} />
                        <ColumnDefinition
                            id="avgScore"
                            customComponent={(props) => <ScidashAvgScoreDetailLinkColumn parent={this} colorBlind={this.props.colorBlind} {...props} />}
                            title="Avg Score"
                            width="100px"
                            order={2} />
                        <ColumnDefinition
                            id="testsCount"
                            title="# Tests"
                            width="100px"
                            order={3} />
                        <ColumnDefinition
                            id="model"
                            title="Model"
                            customComponent={ModelDetailLinkColumnContainer}
                            customHeadingComponent={(props) => <FilterCellContainer
                                filterName="model"
                                onFilterUpdate={this.props.onFilterUpdate}
                                autoCompleteData={this.props.autoCompleteData}
                                {...props} />
                            }
                            order={4} />
                        <ColumnDefinition
                            id="timestamp"
                            width="100px"
                            sortMethod={this.props.sortTimestamp}
                            title="Timestamp"
                            customComponent={ScidashTimestampColumn}
                            customHeadingComponent={(props) => <DateRangeCellContainer
                                filterNameFrom="timestamp_from"
                                filterNameTo="timestamp_to"
                                onFilterUpdate={this.props.onFilterUpdate}
                                {...props} />
                            } order={5} />
                        <ColumnDefinition
                            isMetadata="true"
                            id="_timestamp"
                            title="_timestamp"
                        />
                    </RowDefinition>
                </Griddle>
                {this.props.showLoading ? <Loader /> : ""}
            </div>
        );
    }
}

