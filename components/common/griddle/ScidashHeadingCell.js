import React from 'react';


export default class ScidashHeadingCell extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.parent = props.parent;
        this.filterName = props.filterName;
        this.state = {value: ''};

        this.style = {
            width: "100px"
        }
    }

    render(){
        return (
            <span>
                <p>{this.props.title}</p>
                <input type="text"
                    style={this.style}
                    value={this.state.value}
                    onChange={(event) => {
                            const value = event.target.value;
                            this.parent.onFilter(value, this.filterName);
                            this.setState({value: value})
                        }}
            />
            </span>
        )
    }
}
