import React from 'react';
import Griddle, {RowDefinition, ColumnDefinition} from 'griddle-react';

import BackendService from '../common/BackendService';
import ScidashHeadingCell from './ScidashHeadingCell';

export default class TestInstances extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        this.init()
    }

    init(filters) {
        if (typeof filters == "undefined"){
            filters = {}
        }
        BackendService.testInstance.getAll(filters)
            .then((results) => {
                this.setState({
                    data: results['test-instances']
                })
            });
    };

    onFilter(value, columnId){
        let filters = {};
        filters[columnId] = value;

        this.init(filters);
    }

    render() {
        //if (this.state.data.length > 0){
            return (
                <Griddle
                    data={this.state.data}
                    components={{
                        Filter: () => <span />,
                        SettingsToggle: () => <span />,
                        }}
                >
                    <RowDefinition>
                        <ColumnDefinition id="id" title="ID" order={1} width={400} />
                        <ColumnDefinition
                            id="hostname"
                            title="Hostname"
                            customHeadingComponent={(props) => <ScidashHeadingCell
                                                                    parent={this}
                                                                    {...props} />
                                                    }
                        />
                    </RowDefinition>

                </Griddle>
            )
        //} else {
            //return (<span>No data!</span>)
        //}
    }
}
