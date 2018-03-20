import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';


export default class ScidashFilterCell extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.parent = props.parent;
        this.columnId = props.columnId;
        this.state = {
            value: ''
        };
        this.filterName = props.filterName;

        this.styleDefault = {
            width: "100px",
            height: "28px",
            marginRight: "5px"
        }

        this.menuStyle = {
            width: "180px"
        }

        this.listStyle = {
            width: "180px"
        }

        this.styleInputDefault = {
            width: "100px",
            height: "28px",
            border: "1px solid #ccc"
        }

    }

    render(){
        return (
            <span>
                <p>
                    {this.props.title}
                    {this.props.icon}
                </p>
                <AutoComplete
                    className="scidash-materialui-field"
                    searchText={this.state.value}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    hintText={"Filter " + this.props.title}
                    style={this.styleDefault}
                    textFieldStyle={this.styleInputDefault}
                    menuStyle={this.menuStyle}
                    listStyle={this.listStyle}
                    onUpdateInput={(searchText) => {
                        this.parent.onFilter(searchText, this.filterName);
                        this.setState({value: searchText})
                    }}
                    dataSource={this.parent.state.autoCompleteData[this.columnId]}
                />

        </span>
        )
    }
}
