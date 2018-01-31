import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';


export default class ScidashHeadingCell extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.parent = props.parent;
        this.state = {
            value: '',
            valueFrom: '',
            valueTo: '',
        };
        this.range = props.range;
        if (this.range){
            this.filterNameFrom = props.filterNameFrom;
            this.filterNameTo = props.filterNameTo;
        } else {
            this.filterName = props.filterName;
        }

        this.styleDefault = {
            width: "100px"
        }

        this.styleRange = {
            width: "40px"
        }

        this.autoCompleteDataSource = [
            'heh',
            'lol',
            'kek'
        ]
    }

    render(){
        if (!this.range){
            return (
                <span>
                <p>{this.props.title}</p>

                 <AutoComplete
                  searchText={this.state.value}
                  hintText={"Filter " + this.props.title}
                  style={this.styleDefault}
                  textFieldStyle={this.styleDefault}
                  onUpdateInput={(searchText) => {
                    this.parent.onFilter(searchText, this.filterName);
                    this.setState({value: searchText})
                }}
                  dataSource={this.autoCompleteDataSource}
                />

                <input type="text"
                style={this.styleDefault}
                value={this.state.value}
                onChange={(event) => {
                    const value = event.target.value;
                    this.parent.onFilter(value, this.filterName);
                    this.setState({value: value})
                }}
                />
                </span>
            )
        } else {
            return (
                <span>
                <p>{this.props.title}</p>
                <span className="filter-label">From: </span>
                <input type="text"
                style={this.styleRange}
                value={this.state.valueFrom}
                onChange={(event) => {
                    const value = event.target.value;
                    this.parent.onFilter(value, this.filterNameFrom);
                    this.setState({valueFrom: value})
                }}
                />
                <span className="filter-label">To: </span>
                <input type="text"
                style={this.styleRange}
                value={this.state.valueTo}
                onChange={(event) => {
                    const value = event.target.value;
                    this.parent.onFilter(value, this.filterNameTo);
                    this.setState({valueTo: value})
                }}
                />
                </span>
            )

        }
    }
}
