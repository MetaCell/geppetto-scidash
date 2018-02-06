import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition} from 'griddle-react';

import BackendService from '../common/BackendService';
import ScidashFilterCell from './common/griddle/ScidashFilterCell';
import ScidashDateRangeCell from './common/griddle/ScidashDateRangeCell';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class TestInstances extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.dataTemplate = {
            name: null,
            score: null,
            score_type: null,
            suite: null,
            test_class: null,
            model: null,
            hostname: null,
            build_info: null,
            timestamp: null
        }
        this.autoCompleteDataTemplate = {
            name: [],
            score: [],
            score_type: [],
            suite: [],
            test_class: [],
            model: [],
            hostname: [],
            owner: [],
            build_info: [],
            timestamp: []
        }
        this.state = {
            data: [this.dataTemplate],
            autoCompleteData: this.autoCompleteDataTemplate
        };
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
        this.filters = {}
    }

    componentDidMount(){
        this.load()
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
                        score: score.score.toFixed(4),
                        score_type: score.score_type,
                        suite: testSuite,
                        test_class: score.test_instance.test_class.class_name,
                        model: score.model_instance.model_class.class_name,
                        hostname: score.test_instance.hostname,
                        owner: score.owner.username,
                        build_info: score.test_instance.build_info,
                        timestamp: formattedDate
                    })
                }

                if (scoreData.length > 0){
                    for (let key of Object.keys(scoreData[0])){
                        autoCompleteData[key] = [];

                        for (let item of scoreData){

                            if(!autoCompleteData[key].includes(item[key]))
                                autoCompleteData[key].push(item[key]);

                        }
                    }

                    this.setState({
                        data: scoreData,
                        autoCompleteData: autoCompleteData
                    })
                } else {
                    this.setState({
                        data: [this.dataTemplate],
                        autoCompleteData: this.autoCompleteDataTemplate
                    })
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

    render() {
        return (
            <Griddle
            data={this.state.data}
            components={this.griddleComponents}
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
            order={2} />
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
            id="suite"
            title="Suite"
            order={4} />
            <ColumnDefinition
            id="test_class"
            title="T.Class"
            customHeadingComponent={(props) => <ScidashFilterCell
                parent={this}
                filterName="test_class"
                autoCompleteDataSource={[]}
                {...props} />
            } order={5} />
            <ColumnDefinition
            id="model"
            title="Model"
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
            order={8} />
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
            title="Timestamp"
            customHeadingComponent={(props) => <ScidashDateRangeCell
                parent={this}
                filterNameFrom="timestamp_before"
                filterNameTo="timestamp_after"
                {...props} />
            } order={10} />
            </RowDefinition>
            </Griddle>
        )
    }
}
