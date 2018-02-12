import React from 'react';

import DatePicker from 'material-ui/DatePicker';

export default class ScidashDateRangeCell extends React.Component {
    constructor(props, context){
        super(props, context);
        this.parent = props.parent;
        this.columnId = props.columnId;

        let valueFrom = new Date();
        let valueTo = new Date();

        valueFrom.setMonth(valueFrom.getMonth() - 1);
        valueFrom.setHours(0, 0, 0, 0);
        valueTo.setHours(0, 0, 0, 0);

        this.filterNameFrom = props.filterNameFrom;
        this.filterNameTo = props.filterNameTo;

        this.state = {
            valueFrom: valueFrom,
            valueTo: valueTo,
        };

        this.styleTextField = {
            width: "90px",
            borderRadius: "0px",
            height: "28px",
            border: "1px solid #ccc",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fontSize:"14px",
            fontWeight:"normal",
            padding: "0px 0px 0px 3px"
        }

        this.styleWrapper = {
            margin: "0px 10px 0px 0px"
        }

    }

    render(){
        return (
            <span>
            <p>
                {this.props.title}
                {this.props.icon}
            </p>

                <div className="datepicker-wrapper">
                    <DatePicker
                        hintText="From"
                        title="From"
                        className="scidash-materialui-field"
                        style={this.styleWrapper}
                        textFieldStyle={this.styleTextField}
                        value={this.state.valueFrom}
                        onChange={(event, date) => {
                            this.parent.onFilter(date.toISOString(), this.filterNameTo);
                            this.setState({valueFrom: date});
                        }}
                    />
                </div>

                <div className="datepicker-wrapper">
                    <DatePicker
                        hintText="To"
                        title="To"
                        className="scidash-materialui-field"
                        style={this.styleWrapper}
                        textFieldStyle={this.styleTextField}
                        value={this.state.valueTo}
                        onChange={(event, date) => {
                            this.parent.onFilter(date.toISOString(), this.filterNameFrom);
                            this.setState({valueTo: date});
                        }}
                    />
                </div>

            </span>
        )
    }
}
