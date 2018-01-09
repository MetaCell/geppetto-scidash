import React from 'react';
import BackendService from '../common/BackendService';


export default class ScidashHeadingCell extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.parent = props.parent;
        this.columnId = props.columnId;
        this.state = {value: ''};
    }

    render(){
        return (
            <span>
                {this.props.title}
                <input type="text"
                    value={this.state.value}
                    onChange={(event) => {
                            const value = event.target.value;
                            this.parent.onFilter(value, this.columnId);
                            this.setState({value: value})
                        }
                    }
            />
            </span>
        )
    }
}
