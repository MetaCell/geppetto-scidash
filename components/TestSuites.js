import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';

import BackendService from '../common/BackendService';
import ScidashFilterCell from './common/griddle/ScidashFilterCell';
import ScidashDateRangeCell from './common/griddle/ScidashDateRangeCell';


export default class TestSuites extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dataTemplate = {
            suite: " ",
            aggrScore: "",
            testsCount: "",
            model: {},
            timestamp: " ",
            _timestamp: " "
        }
        this.autoCompleteDataTemplate = {
            suite: [],
            aggrScore: [],
            testsCount: [],
            model: [],
            timestamp: [],
            _timestamp: []
            }
        this.state = {
            data: [this.dataTemplate],
            autoCompleteData: this.autoCompleteDataTemplate
        }
        this.griddleComponents = {
            Filter: () => null,
            SettingsToggle: () => null
        }
        this.styleConfig = {
            classNames: {
                Table: 'table scidash-table',
                TableHeadingCell: 'scidash-table-heading-cell'
            }
        }
        this.filters = {
            with_suites: true
        };

    }

    componentDidMount() {
        this.load();
    }

    countAggregateScore(scores){
        let sum = 0;
        for (let score of scores){
            sum += score.score;
        }

        return sum / scores.length
    }

    groupScores(scores){
        let result = {}

        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };

        for (let score of scores){
            let suiteName = score.test_instance.test_suites[0].name;
            let suiteTimestamp = score.test_instance.test_suites[0].timestamp;
            let modelName = score.model_instance.model_class.class_name;
            let modelSuiteKey = suiteName + "_" + modelName;

            if(!(modelSuiteKey in result))
                result[modelSuiteKey] = {};

            result[modelSuiteKey]['suite'] = suiteName;
            result[modelSuiteKey]['model'] = modelName;

            if (!('scores' in result[modelSuiteKey]))
                result[modelSuiteKey]['scores'] = [];

            result[modelSuiteKey]['scores'].push(score);
            result[modelSuiteKey]['aggrScore'] = this.countAggregateScore(result[modelSuiteKey]['scores']);
            result[modelSuiteKey]['testsCount'] = result[modelSuiteKey]['scores'].length;
            result[modelSuiteKey]['timestamp'] = new Date(suiteTimestamp).toLocaleString('en-US', options);
            result[modelSuiteKey]['_timestamp'] = suiteTimestamp;
        }

        return Object.values(result);
    }

    load(filters) {
        if (typeof filters == "undefined"){
            filters = {
                with_suites: true
            };
        }
        let suiteData = [];
        let autoCompleteData = {};

        BackendService.score.getAll(filters)
            .then((results) => {

                let suiteData = this.groupScores(results['scores'])

                if (suiteData.length > 0){
                    for (let key of Object.keys(suiteData[0])){
                        autoCompleteData[key] = [];

                        for (let item of suiteData){
                            if (!autoCompleteData[key].includes(item[key]))
                                autoCompleteData[key].push(item[key]);
                        }
                    }

                    console.log(autoCompleteData);
                    this.setState({
                        data: suiteData,
                        autoCompleteData: autoCompleteData
                    });
                } else {
                    this.setState({
                        data: [this.dataTemplate],
                        autoCompleteData: this.autoCompleteDataTemplate
                    });
                }
            });
    };

    onFilter(value, columnId){
        if (value == ''){
            delete this.filters[columnId];
        } else {
            this.filters[columnId] = value;
        }

        this.load(this.filters);
    }

    sortTimestamp(data, column, sortAscending = false) {
        return data.sort(
            (original, newRecord) => {
                original = (!!original.get('_timestamp') && original.get('_timestamp')) || "";
                newRecord = (!!newRecord.get('_timestamp') && newRecord.get('_timestamp')) || "";

                if(original === newRecord) {
                    return 0;
                } else if (original > newRecord) {
                    return sortAscending ? 1 : -1;
                }
                else {
                    return sortAscending ? -1 : 1;
                }
            });
    }

    render() {
        return (
            <div>
            <Griddle
                data={this.state.data}
                components={this.griddleComponents}
                plugins={[plugins.LocalPlugin]}
                styleConfig={this.styleConfig} >
                <RowDefinition>
                <ColumnDefinition
                id="suite"
                title="Name"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="suite"
                    {...props} />
                } order={1} />
                <ColumnDefinition
                id="aggrScore"
                title="Avg. Score"
                order={2} />
                <ColumnDefinition
                id="testsCount"
                title="# Tests"
                order={3} />
                <ColumnDefinition
                id="model"
                title="Model Name"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="model_class"
                    {...props} />
                }
                order={4} />
                <ColumnDefinition
                id="timestamp"
                sortMethod={this.sortTimestamp}
                title="Timestamp"
                customHeadingComponent={(props) => <ScidashDateRangeCell
                    parent={this}
                    filterNameFrom="timestamp_before"
                    filterNameTo="timestamp_after"
                    {...props} />
                } order={5} />
                <ColumnDefinition
                isMetadata="true"
                id="_timestamp"
                title="_timestamp"
                />
                </RowDefinition>
            </Griddle>
            </div>
        )
    }
}

