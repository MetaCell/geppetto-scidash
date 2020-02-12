import React from "react";
import DatePicker from "@material-ui/pickers/DatePicker";
import TextField from "@material-ui/core/TextField";
import { ClearButton } from "./partials";


export default class DateRangeCell extends React.Component {

  constructor (props, context){
    super(props, context);

    this.props = props;
  }

  render (){
    return (
      <span style={{ textAlign: "center" }}>
        <p>
          {this.props.title}&nbsp;

          <ClearButton
            changed={this.props.changed}
            clearFilter={event => {
              this.props.stopPropagation(event);
              this.props.onDateFilterClear();
            }} />

          {this.props.icon}
        </p>

        <div className="datepicker-wrapper">
          <div className=" date-range-tooltip" title="From">
            <TextField
              title="From"
              type="date"
              onClick={this.props.stopPropagation}
              className="scidash-materialui-field"
              style={this.props.styleWrapper}
              defaultValue={this.props.value.from.toISOString().slice(0,10)}
              onChange={event => this.props.onFilterUpdate(new Date(event.target.value).toISOString(), this.props.filterNameFrom)}
            >From</TextField>
          </div>

          <div className="date-range-tooltip" title="To">
            <TextField
              title="To"
              type="date"
              className="scidash-materialui-field date-range-tooltip"
              onClick={this.props.stopPropagation}
              style={this.props.styleWrapper}
              defaultValue={this.props.value.to.toISOString().slice(0,10)}
              onChange={event => this.props.onFilterUpdate(new Date(event.target.value).toISOString(), this.props.filterNameTo)}
            >To</TextField>
          </div>
        </div>
      </span>
    );

  }

}
