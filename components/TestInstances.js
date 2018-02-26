import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import Toggle from 'material-ui/Toggle';

import BackendService from '../common/BackendService';
import ScidashFilterCell from './common/griddle/ScidashFilterCell';
import ScidashDateRangeCell from './common/griddle/ScidashDateRangeCell';

import ScidashModelDetailLinkColumn from './common/griddle/ScidashModelDetailLinkColumn';
import ScidashScoreDetailLinkColumn from './common/griddle/ScidashScoreDetailLinkColumn';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class TestInstances extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dataTemplate = {
            name: " ",
            score_type: " ",
            _sort_key: 0,
            score: {},
            test_class: " ",
            model: {},
            hostname: " ",
            build_info: " ",
            timestamp: " ",
            _timestamp: " "
        }
        this.autoCompleteDataTemplate = {
                name: [],
                score: [],
                score_type: [],
                _sort_key: [],
                test_class: [],
                model: [],
                hostname: [],
                owner: [],
                build_info: [],
                timestamp: [],
                _timestamp: []
            }
        this.state = {
            data: [this.dataTemplate],
            autoCompleteData: this.autoCompleteDataTemplate,
            colorBlind: false
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
        this.filters = {};

        this.togglColorBlind = this.togglColorBlind.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load(filters) {
        if (typeof filters == "undefined"){
            filters = {};
        }
        let scoreData = [];
        let autoCompleteData = {};

        BackendService.score.getAll(filters)
            .then((results) => {
                for (let score of results['scores']){
                    var testSuite = null;
                    if (score.test_instance.test_suites.length > 0){
                        testSuite = score.test_instance.test_suites[0].name;
                    }
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
                    let formattedDate = new Date(score.timestamp).toLocaleString('en-US', options);

                    scoreData.push({
                        name: score.test_instance.test_class.class_name,
                        score: score,
                        score_type: score.score_type,
                        _sort_key: score.sort_key,
                        test_class: score.test_instance.test_class.class_name,
                        model: score.model_instance,
                        hostname: score.test_instance.hostname,
                        owner: score.owner.username,
                        build_info: score.test_instance.build_info,
                        timestamp: formattedDate,
                        _timestamp: score.timestamp
                    });
                }

                if (scoreData.length > 0){
                    for (let key of Object.keys(scoreData[0])){
                        autoCompleteData[key] = [];

                        for (let item of scoreData){

                                if (key == "model"){
                                    if (!autoCompleteData[key].includes(item[key]["model_class"]["class_name"]))
                                        autoCompleteData[key].push(item[key]["model_class"]["class_name"])
                                } else {
                                    if (!autoCompleteData[key].includes(item[key]))
                                        autoCompleteData[key].push(item[key]);
                                }
                        }
                    }

                    this.setState({
                        data: scoreData,
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

    sortScore(data, column, sortAscending = true) {
        return data.sort(
            (original, newRecord) => {
                original = (!!original.get('_sort_key') && original.get('_sort_key')) || "";
                newRecord = (!!newRecord.get('_sort_key') && newRecord.get('_sort_key')) || "";

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

    sortModel(data, column, sortAscending = true) {
        return data.sort(
            (original, newRecord) => {
                original = (!!original.get('model').get("class_name") && original.get("model").get("class_name")) || "";
                newRecord = (!!newRecord.get("model").get("class_name") && newRecord.get("model").get("class_name")) || "";

                if(original.localeCompare(newRecord) === 0) {
                    return 0;
                } else if (original.localeCompare(newRecord) === 1) {
                    return sortAscending ? 1 : -1;
                }
                else {
                    return sortAscending ? -1 : 1;
                }
            });
    }

    togglColorBlind(event){
        this.setState({
            colorBlind: !this.state.colorBlind
        });
    }

    render() {
        return (
            <div>
            <div id='controlsContainer'>
                <label>
                    <Toggle
                      label="Color map"
                      defaultToggled={false}
                      onToggle={this.togglColorBlind}
                      labelPosition="right"
                      style={{margin: 2.5}}
                    />
                    <div 
                        id='colorMapGradientLabel' 
                        className={this.state.colorBlind?'colorBlindGradient':'defaultGradient'}>
                    </div>
                </label>
            </div>
            <Griddle
                data={this.state.data}
                components={this.griddleComponents}
                plugins={[plugins.LocalPlugin]}
                styleConfig={this.styleConfig} >
                <RowDefinition>
                <ColumnDefinition
                id="name"
                title="Name"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="score_name"
                    {...props} />
                } order={1} />
                <ColumnDefinition
                id="score"
                title="Score"
                sortMethod={this.sortScore}
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
                customHeadingComponent={(props) => <ScidashFilterCell
                    filterName="score_type"
                    parent={this}
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={3} />
                <ColumnDefinition
                id="score_type"
                title="Score Type"
                customHeadingComponent={(props) => <ScidashFilterCell
                    filterName="score_type"
                    parent={this}
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={3} />
                <ColumnDefinition
                id="model"
                title="Model"
                sortMethod={this.sortModel}
                customComponent={ScidashModelDetailLinkColumn}
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="model_class"
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={6} />
                <ColumnDefinition
                id="hostname"
                title="Hostname"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="hostname"
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={7} />
                <ColumnDefinition
                id="owner"
                title="Owner"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="owner"
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={8} />
                <ColumnDefinition
                id="build_info"
                title="Build Info"
                customHeadingComponent={(props) => <ScidashFilterCell
                    parent={this}
                    filterName="build_info"
                    autoCompleteDataSource={[]}
                    {...props} />
                } order={9} />
                <ColumnDefinition
                id="timestamp"
                sortMethod={this.sortTimestamp}
                title="Timestamp"
                customHeadingComponent={(props) => <ScidashDateRangeCell
                    parent={this}
                    filterNameFrom="timestamp_before"
                    filterNameTo="timestamp_after"
                    {...props} />
                } order={10} />
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
