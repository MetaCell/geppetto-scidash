import React from 'react';

import DatePicker from 'material-ui/DatePicker';

export default class ScidashDateRangeCell extends React.Component {
    constructor(props, context){
        super(props, context);
        this.parent = props.parent;
        this.columnId = props.columnId;

        let valueFrom = new Date();
        let valueTo = new Date();

        valueFrom.setFullYear(valueFrom.getFullYear() - 1);
        valueTo.setFullYear(valueTo.getFullYear() + 1);
        valueFrom.setHours(0, 0, 0, 0);
        valueTo.setHours(0, 0, 0, 0);

        this.filterNameFrom = props.filterNameFrom;
        this.filterNameTo = props.filterNameTo;

        this.state = {
            valueFrom: valueFrom,
            valueTo: valueTo,
        };

        this.styleRange = {
            width: "40px",
            borderRadius: "0px",
            height: "28px",
            border: "1px solid #ccc"
        }

    }

    render(){
        return (
            <span>
                <p>{this.props.title}</p>

                <div className="datepicker-wrapper">
                    <span className="filter-label">From: </span>
                    <DatePicker
                        hintText="From"
                        className="scidash-materialui-field"
                        textFieldStyle={this.styleRange}
                        value={this.state.valueFrom}
                        onChange={(event, date) => {
                            this.parent.onFilter(date.toISOString(), this.filterNameTo);
                            this.setState({valueFrom: date});
                        }}
                    />
                </div>

                <div className="datepicker-wrapper">
                    <span className="filter-label">To: </span>
                    <DatePicker
                        hintText="To"
                        className="scidash-materialui-field"
                        textFieldStyle={this.styleRange}
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
