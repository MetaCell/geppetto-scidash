import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';

import CustomScoreName from './partials/CustomScoreName';
import FilterCellContainer from './partials/filter-cell/FilterCellContainer';
import ScidashScoreDetailLinkColumn from './partials/ScidashScoreDetailLinkColumn';
import ScidashModelDetailLinkColumn from './partials/ScidashModelDetailLinkColumn';
import ScidashDateRangeCell from './partials/ScidashDateRangeCell';
import ScidashBuildInfoColumn from './partials/ScidashBuildInfoColumn';
import ScidashTimestampColumn from './partials/ScidashTimestampColumn';

import Loader from '../loader/Loader';


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
                            id="name"
                            title="Name"
                            customComponent={CustomScoreName}
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="name"
                                {...props} />
                            } order={1} />
                        <ColumnDefinition
                            id="score"
                            title="Score"
                            sortMethod={this.props.sortScore}
                            customComponent={(props) => <ScidashScoreDetailLinkColumn parent={this} {...props} />}
                            order={2} />
                        <ColumnDefinition
                            id="_sort_key"
                            title="_sort_key"
                            isMetadata="true"
                        />
                        <ColumnDefinition
                            id="score_type"
                            title="Score Type"
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="score_type"
                                {...props} />
                            } order={3} />
                        <ColumnDefinition
                            id="model"
                            title="Model"
                            sortMethod={this.sortModel}
                            customComponent={ScidashModelDetailLinkColumn}
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="model"
                                {...props} />
                            } order={6} />
                        <ColumnDefinition
                            id="hostname"
                            title="Hostname"
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="hostname"
                                {...props} />
                            } order={7} />
                        <ColumnDefinition
                            id="owner"
                            title="Owner"
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="owner"
                                {...props} />
                            } order={8} />
                        <ColumnDefinition
                            id="build_info"
                            title="Build Info"
                            customComponent={ScidashBuildInfoColumn}
                            customHeadingComponent={(props) => <FilterCellContainer
                                autoCompleteData={this.props.autoCompleteData}
                                onFilterUpdate={this.props.onFilterUpdate}
                                filterName="build_info"
                                {...props} />
                            } order={9} />
                        <ColumnDefinition
                            id="timestamp"
                            sortMethod={this.sortTimestamp}
                            title="Timestamp"
                            width="100px"
                            customComponent={ScidashTimestampColumn}
                            customHeadingComponent={(props) => <ScidashDateRangeCell
                                parent={this}
                                filterNameFrom="timestamp_from"
                                filterNameTo="timestamp_to"
                                {...props} />
                            } order={10} />
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
