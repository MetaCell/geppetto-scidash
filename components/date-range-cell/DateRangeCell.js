import React from "react";
import DatePicker from "@material-ui/pickers/DatePicker";
import TextField from "@material-ui/core/TextField";
import { ClearButton } from "./partials";
import FilteringService from "../../services/FilteringService";
import Helper from "../../shared/Helper";


export default class DateRangeCell extends React.Component {

  constructor (props, context){
    super(props, context);

    this.props = props;
    this.state = {
      changed: props.changed,
      from: props.value.from,
      to: props.value.to
    };
  }

  updateStateWithDates () {
    const currentFilters = FilteringService.getInstance().getFilters("global", true);
    const names = ["from", "to"];
    const filterNameBase = "timestamp_";

    let newState = {};
    for (let name of names){
      const filterName = filterNameBase + name;
      if (filterName in currentFilters) {
        newState[name] = new Date(currentFilters[filterName]);
      }
    }
    this.setState ( { ...newState } );
  }

  render (){
    return (
      <span style={{ textAlign: "center" }}>
        <p>
          {this.props.title}&nbsp;

          <ClearButton
            changed={this.state.changed}
            clearFilter={event => {
              this.props.stopPropagation(event);
              this.props.onDateFilterClear();
              this.updateStateWithDates();
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
              value={this.state.from === null ? "" : this.state.from.toISOString().slice(0,10)}
              onChange={event => {
                const newDate = event.target.value === "" ? null : new Date(event.target.value);
                this.setState( {
                  from: newDate,
                  changed: true
                } );
                this.props.onFilterUpdate(newDate === null ? "" : newDate.toISOString(), this.props.filterNameFrom);
              }}
            >From</TextField>
          </div>

          <div className="date-range-tooltip" title="To">
            <TextField
              title="To"
              type="date"
              className="scidash-materialui-field date-range-tooltip"
              onClick={this.props.stopPropagation}
              style={this.props.styleWrapper}
              value={this.state.to === null ? "" : this.state.to.toISOString().slice(0,10)}
              onChange={event => {
                const newDate = event.target.value === "" ? null : new Date(event.target.value);
                this.setState( {
                  to: newDate,
                  changed: true
                } );
                this.props.onFilterUpdate(newDate === null ? "" : newDate.toISOString(), this.props.filterNameTo);
              }}
            >To</TextField>
          </div>
        </div>
      </span>
    );

  }
}
