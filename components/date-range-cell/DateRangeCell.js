import React from "react";
import DatePicker from "material-ui/DatePicker";
import { ClearButton } from "./partials";


export default class DateRangeCell extends React.Component {

    constructor(props, context){
        super(props, context);

        this.props = props;
    }

    render(){
        return (
            <span style={{
                textAlign: "center"
            }}>
                <p>
                    {this.props.title}&nbsp;

                    <ClearButton
                        changed={this.props.changed}
                        clearFilter={(event) => {
                            this.props.stopPropagation(event);
                            this.props.onDateFilterClear();
                        }} />

                    {this.props.icon}
                </p>

                <div className="datepicker-wrapper">
                    <div className=" date-range-tooltip" title="From">
                        <DatePicker
                            hintText="From"
                            title="From"
                            onClick={this.props.stopPropagation}
                            className="scidash-materialui-field"
                            style={this.props.styleWrapper}
                            textFieldStyle={this.props.styleTextField}
                            value={this.props.value.from}
                            onChange={(event, date) => this.props.onFilterUpdate(date.toISOString(), this.props.filterNameFrom)}
                        />
                    </div>

                    <div className="date-range-tooltip" title="To">
                        <DatePicker
                            hintText="To"
                            title="To"
                            className="scidash-materialui-field date-range-tooltip"
                            onClick={this.props.stopPropagation}
                            style={this.props.styleWrapper}
                            textFieldStyle={this.props.styleTextField}
                            value={this.props.value.to}
                            onChange={(event, date) => this.props.onFilterUpdate(date.toISOString(), this.props.filterNameTo)}
                        />
                    </div>
                </div>
            </span>
        );

    }

}
