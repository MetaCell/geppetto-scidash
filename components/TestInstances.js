import React from 'react';
import Griddle, {ColumnDefinition, RowDefinition} from 'griddle-react';

import BackendService from '../common/BackendService';
import ScidashHeadingCell from './common/griddle/ScidashHeadingCell';

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
        this.state = {
            data: [this.dataTemplate]
        };
        this.griddleComponents = {
            Filter: () => null,
            SettingsToggle: () => null
        }
        this.styleConfig = {
            classNames: {
                Table: 'table',
            }
        }
    }

    componentDidMount(){
        this.load()
    }

    load(filters) {
        if (typeof filters == "undefined"){
            filters = {}
        }
        let scoreData = []


        BackendService.score.getAll(filters)
            .then((results) => {
                for (let score of results['scores']){
                    var testSuite = null;
                    if (score.test_instance.test_suites.length > 0){
                        testSuite = score.test_instance.test_suites[0].name;
                    }
                    scoreData.push({
                        name: score.test_instance.test_class.class_name,
                        score: score.score,
                        score_type: score._class,
                        suite: testSuite,
                        test_class: score.test_instance.test_class.class_name,
                        model: score.model_instance.model_class.class_name,
                        hostname: score.test_instance.hostname,
                        build_info: score.test_instance.build_info,
                        timestamp:score.timestamp
                    })
                }
                if (scoreData.length > 0){
                    this.setState({
                        data: scoreData
                    })
                } else {
                    this.setState({
                        data: [this.dataTemplate]
                    })
                }
            });
    };

    onFilter(value, columnId){
        let filters = {};
        filters[columnId] = value;

        this.load(filters);
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
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            parent={this}
                            filterName="test_instance__test_class__class_name"
                            {...props} />
                    } order={1} />

                    <ColumnDefinition
                        id="score"
                        title="Score"
                    order={2} />

                    <ColumnDefinition
                        id="score_type"
                        title="Score Type"
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            filterName="_class"
                            parent={this}
                            {...props} />
                    } order={3} />

                    <ColumnDefinition
                        id="suite"
                        title="Suite"
                        order={4} />
                    <ColumnDefinition
                        id="test_class"
                        title="T.Class"
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            parent={this}
                            filterName="test_instance__test_class__class_name"
                            {...props} />
                    } order={5} />
                    <ColumnDefinition
                        id="model"
                        title="Model"
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            parent={this}
                            filterName="model_instance__model_class__class_name"
                            {...props} />
                    } order={6} />
                    <ColumnDefinition
                        id="hostname"
                        title="Hostname"
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            parent={this}
                            filterName="test_instance__hostname"
                            {...props} />
                    } order={7} />
                    <ColumnDefinition
                        id="build_info"
                        title="Build Info"
                        customHeadingComponent={(props) => <ScidashHeadingCell
                            parent={this}
                            filterName="test_instance__build_info"
                            {...props} />
                    } order={8} />
                    <ColumnDefinition
                        id="timestamp"
                        title="Timestamp"
                    order={9} />
                </RowDefinition>
            </Griddle>
        )
    }
}
