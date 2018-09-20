import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition, plugins} from 'griddle-react';
import Toggle from 'material-ui/Toggle';

import _ from "underscore";
import $ from "jquery";

import GEPPETTO from 'geppetto';
import Scidash from '../common/Scidash';

import RaisedButton from 'material-ui/RaisedButton';
import BackendService from '../common/BackendService';
import ScidashFilterCell from './common/griddle/ScidashFilterCell';
import ScidashDateRangeCell from './common/griddle/ScidashDateRangeCell';

import Helper from '../common/Helper';
import ScidashModelDetailLinkColumn from './common/griddle/ScidashModelDetailLinkColumn';
import ScidashScoreDetailLinkColumn from './common/griddle/ScidashScoreDetailLinkColumn';
import ScidashBuildInfoColumn from './common/griddle/ScidashBuildInfoColumn';
import ScidashTimestampColumn from './common/griddle/ScidashTimestampColumn';


export default class TestInstances extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.helper = new Helper()

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
            colorBlind: props.colorBlind,
            showLoading: false
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
                Table: 'table scidash-table',
                TableHeadingCell: 'scidash-table-heading-cell'
            }
        }

        let dateFrom = new Date();
        let dateTo = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        dateFrom.setMonth(dateFrom.getMonth() - 3);
        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(0, 0, 0, 0);

        this.filters = {
            'timestamp_to': dateTo.toISOString(),
            'timestamp_from': dateFrom.toISOString()
        };

        let filters = new URLSearchParams(location.search);

        for (let filter of filters){
            if (/^timestamp_/.test(filter)){

                let date = new Date(filter[1]);

                if (Object.prototype.toString.call(date) === "[object Date]")
                    if (!isNaN(date.getTime()))
                        this.filters[filter[0]]= date.toISOString()

            } else {
                this.filters[filter[0]]=filter[1]
            }
        }

        this.toggleColorBlind = this.toggleColorBlind.bind(this);

    }

    componentDidMount() {
        this.load();
        GEPPETTO.on(Scidash.COLOR_MAP_TOGGLED, this.toggleColorBlind, this)
    }

    componentWillUnmount(){
        GEPPETTO.off(Scidash.COLOR_MAP_TOGGLED, this.toggleColorBlind, this)
    }

    load(filters = null, withLoading = true) {
        if (filters !== null){
            this.filters = _.extend(this.filters, filters)
        }

        let scoreData = [];
        let autoCompleteData = {};

        if (withLoading) {
            this.setState({
                showLoading: true
            });
            // ¯\_(ツ)_/¯
            $(".griddle-page-select").hide()
        }

        BackendService.score.getAll(this.filters)
            .then((results) => {
                this.setState({
                    showLoading: false
                })

                // ¯\_(ツ)_/¯
                $(".griddle-page-select").show()

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
                    let fullDate = new Date(score.timestamp).toLocaleString('en-US', options);
                    let shortDate = new Date(score.timestamp).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

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
                        timestamp: {full: fullDate, short: shortDate},
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
                                    if (!autoCompleteData[key].includes(item[key]["name"]))
                                        autoCompleteData[key].push(item[key]["name"])
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
        this.load(this.filters, false);
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

    toggleColorBlind(event){
        this.setState({
            colorBlind: !this.state.colorBlind
        });
    }
    render() {
        const customName = ({value}) => <div style={{paddingRight:"20px"}}>{value}</div>;
        const loader = this.state.showLoading ? <i className="fa fa-cog fa-4x fa-spin centered-modal loading-spinner" style={{
            top:"30%"
        }}></i> : "";
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
                            id="name"
                            title="Name"
                            customComponent={customName}
                            customHeadingComponent={(props) => <ScidashFilterCell
                                    parent={this}
                                    filterName="name"
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
                            id="model"
                            title="Model"
                            sortMethod={this.sortModel}
                            customComponent={ScidashModelDetailLinkColumn}
                            customHeadingComponent={(props) => <ScidashFilterCell
                                    parent={this}
                                    filterName="model"
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
                            customComponent={ScidashBuildInfoColumn}
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
                {loader}
            </div>
        )
    }
}
