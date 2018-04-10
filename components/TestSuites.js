import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import Toggle from 'material-ui/Toggle';

import GEPPETTO from 'geppetto';
import Scidash from '../common/Scidash';

import RaisedButton from 'material-ui/RaisedButton';
import BackendService from '../common/BackendService';
import ScidashFilterCell from './common/griddle/ScidashFilterCell';
import ScidashDateRangeCell from './common/griddle/ScidashDateRangeCell';

import ScidashAvgScoreDetailLinkColumn from '../components/common/griddle/ScidashAvgScoreDetailLinkColumn';
import ScidashModelDetailLinkColumn from './common/griddle/ScidashModelDetailLinkColumn';


export default class TestSuites extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dataTemplate = {
            suite: " ",
            avgScore: [],
            testsCount: "",
            model: {},
            timestamp: " ",
            _timestamp: " "
        }
        this.autoCompleteDataTemplate = {
            suite: [],
            avgScore: [],
            testsCount: [],
            model: [],
            timestamp: [],
            _timestamp: []
        }
        this.state = {
            data: [this.dataTemplate],
            autoCompleteData: this.autoCompleteDataTemplate,
            colorBlind: props.colorBlind
        }
        this.griddleComponents = {
            Filter: () => null,
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
        this.styleConfig = {
            classNames: {
                Table: 'table scidash-table suites-table',
                TableHeadingCell: 'scidash-table-heading-cell'
            }
        }
        this.filters = {
            with_suites: true
        };

        this.toggleColorBlind = this.toggleColorBlind.bind(this);

    }

    countAggregateScore(scores){
        let sum = 0;

        for (let score of scores){
            sum += score.sort_key;
        }

        return sum / scores.length;
    }

    componentDidMount() {
        this.load();
        GEPPETTO.on(Scidash.COLOR_MAP_TOGGLED, this.toggleColorBlind, this)
    }

    componentWillUnmount(){
        GEPPETTO.off(Scidash.COLOR_MAP_TOGGLED, this.toggleColorBlind, this)
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
            result[modelSuiteKey]['model'] = score.model_instance;

            if (!('avgScore' in result[modelSuiteKey]))
                result[modelSuiteKey]['avgScore'] = {
                    value: null,
                    scoreList: []
                }

            result[modelSuiteKey]['avgScore']['scoreList'].push(score)
            result[modelSuiteKey]['testsCount'] = result[modelSuiteKey]['avgScore']['scoreList'].length;
            result[modelSuiteKey]['timestamp'] = new Date(suiteTimestamp).toLocaleString('en-US', options);
            result[modelSuiteKey]['_timestamp'] = suiteTimestamp;
        }

        let list = Object.values(result)

        for (let item of list){
            item['avgScore']['value'] = this.countAggregateScore(item['avgScore']['scoreList']);
        }
        return list;
    }

    load(filters) {

        this.setState({
            showLoading: true
        })

        if (typeof filters == "undefined"){
            filters = {
                with_suites: true
            };
        }
        let suiteData = [];
        let autoCompleteData = {};

        BackendService.score.getAll(filters)
            .then((results) => {

                this.setState({
                    showLoading: false
                })
                let suiteData = this.groupScores(results['scores'])

                if (suiteData.length > 0){
                    for (let key of Object.keys(suiteData[0])){
                        autoCompleteData[key] = [];

                        for (let item of suiteData){
                            if (!autoCompleteData[key].includes(item[key]))
                                autoCompleteData[key].push(item[key]);
                        }
                    }
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

    toggleColorBlind(event){
        this.setState({
            colorBlind: !this.state.colorBlind
        });
    }


    render() {
        const loader = this.state.showLoading ? <i className="fa fa-cog fa-spin centered-modal loading-spinner"></i> : "";
        const pageProperties = {
            currentPage: 1
        }
        return (
            <div>
                <Griddle
                    data={this.state.data}
                    components={this.griddleComponents}
                    plugins={[plugins.LocalPlugin]}
                    styleConfig={this.styleConfig}
                    pageProperties={pageProperties} >
                    <RowDefinition>
                        <ColumnDefinition
                            id="suite"
                            title="Name"
                            customHeadingComponent={(props) => <ScidashFilterCell
                                parent={this}
                                filterName="by_suite_name"
                                {...props} />
                            } order={1} />
                        <ColumnDefinition
                            id="avgScore"
                            customComponent={(props) => <ScidashAvgScoreDetailLinkColumn parent={this} {...props} />}
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
                            title="Model Name"
                            customComponent={ScidashModelDetailLinkColumn}
                            customHeadingComponent={(props) => <ScidashFilterCell
                                parent={this}
                                filterName="model_class"
                                {...props} />
                            }
                            order={4} />
                        <ColumnDefinition
                            id="timestamp"
                            width="250px"
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
                {loader}
            </div>
        )
    }
}

