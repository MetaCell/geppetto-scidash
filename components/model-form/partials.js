import { connect } from "react-redux";
import _ from "underscore";
import Toggle from "material-ui/Toggle";
import React from "react";

export const rowDataSelector = (state, { griddleKey }) => state
  .get("data")
  .find(rowMap => rowMap.get("griddleKey") === griddleKey)
  .toJSON();

export const enhancedWithRowData = (onCheck, onUncheck, watchedVariables, disabled) => connect((state, props) => ({
  rowData: rowDataSelector(state, props),
  onCheck,
  onUncheck,
  watchedVariables,
  disabled
}));

export class ChooseVarComponent extends React.Component{

  constructor (props, context){
    super(props);

    this.state = {
      toggled: true
    };

    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount (){
    this.setState({
      toggled: this.props.watchedVariables.includes(this.props.rowData.name)
    });
  }

  onToggle (ev, isInputChecked){
    if (isInputChecked){
      this.props.onCheck(this.props.rowData.name);
      this.setState({
        toggled: true
      });
    } else {
      this.setState({
        toggled: false
      });
      this.props.onUncheck(this.props.rowData.name);
    }
  }

  render (){
    return (
      <div>
        <Toggle
          toggled={
            this.state.toggled
          }
          onToggle={this.onToggle}
          disabled={this.props.disabled}
        />
      </div>
    );
  }

}