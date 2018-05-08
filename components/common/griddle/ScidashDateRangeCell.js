import React from 'react';

import DatePicker from 'material-ui/DatePicker';

export default class ScidashDateRangeCell extends React.Component {
    constructor(props, context){
        super(props, context);
        this.parent = props.parent;
        this.columnId = props.columnId;

        this.valueFrom = new Date();
        this.valueTo = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        this.valueFrom.setMonth(this.valueFrom.getMonth() - 1);
        this.valueFrom.setHours(0, 0, 0, 0);
        this.valueTo.setHours(0, 0, 0, 0);

        this.filterNameFrom = props.filterNameFrom;
        this.filterNameTo = props.filterNameTo;

        this.state = {
            valueFrom: this.valueFrom,
            valueTo: this.valueTo,
            changed: false
        };

        this.styleTextField = {
            width: "80px",
            borderRadius: "0px",
            height: "28px",
            border: "1px solid #ccc",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fontSize:"13px",
            fontWeight:"normal",
            padding: "0px 0px 0px 3px"
        }

        this.styleWrapper = {
            margin: "0px 1px 0px 0px"
        }

        this.clear = this.clear.bind(this);

    }

    componentDidMount(){
        $(".date-range-tooltip").tooltip()
    }

    clear(event){
        event.stopPropagation()
        this.setState({
            valueFrom: this.valueFrom,
            valueTo: this.valueTo,
            changed: false
        })
        this.parent.onFilter(this.valueFrom.toISOString(), this.filterNameFrom);
        this.parent.onFilter(this.valueTo.toISOString(), this.filterNameTo);
    }

    render(){


        let clearButton = this.state.changed ? <button onClick={this.clear}> Reset</button> : "";

        return (
            <span style={{
                textAlign: "center"
            }}>
                <p>
                    {this.props.title} {clearButton} {this.props.icon}
                </p>

                <div className="datepicker-wrapper">
                    <div className=" date-range-tooltip" title="From">
                        <DatePicker
                            hintText="From"
                            title="From"
                            onClick={(event) => event.stopPropagation()}
                            className="scidash-materialui-field"
                            style={this.styleWrapper}
                            textFieldStyle={this.styleTextField}
                            value={this.state.valueFrom}
                            onChange={(event, date) => {
                                this.changed = true;
                                this.parent.onFilter(date.toISOString(), this.filterNameFrom);
                                this.setState({
                                    valueFrom: date,
                                    changed: true
                                });
                            }}
                        />
                    </div>

                    <div className="date-range-tooltip" title="To">
                        <DatePicker
                            hintText="To"
                            title="To"
                            className="scidash-materialui-field date-range-tooltip"
                            onClick={(event) => event.stopPropagation()}
                            style={this.styleWrapper}
                            textFieldStyle={this.styleTextField}
                            value={this.state.valueTo}
                            onChange={(event, date) => {
                                this.parent.onFilter(date.toISOString(), this.filterNameTo);
                                this.setState({
                                    valueTo: date,
                                    changed: true
                                });
                            }}
                        />
                    </div>
                </div>

            </span>
        )
    }
}
