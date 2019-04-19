import { connect } from "react-redux";
import _ from "underscore";
import Toggle from "material-ui/Toggle";
import React from "react";

export const rowDataSelector = (state, { griddleKey }) => state
  .get("data")
  .find(rowMap => rowMap.get("griddleKey") === griddleKey)
  .toJSON();

export const enhancedWithRowData = (onCheck, onUncheck, watchedVariables) => {console.log(watchedVariables); return connect((state, props) => ({
  rowData: rowDataSelector(state, props),
  onCheck,
  onUncheck,
  watchedVariables
}));};

export class ChooseVarComponent extends React.Component{

  constructor (props, context){
    super(props);

    this.state = {
      watchedVariables: props.watchedVariables
    };

    console.log(this.state.watchedVariables);

    this.onToggle = this.onToggle.bind(this);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.watchedVariables, prevProps.watchedVariables)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        watchedVariables: this.props.watchedVariables
      });
    }
  }

  onToggle (ev, isInputChecked){
    if (isInputChecked){
      this.props.onCheck(this.props.rowData.name);
    } else {
      this.props.onUncheck(this.props.rowData.name);
    }
  }

  render (){
    return (
      <div>
        <Toggle
          toggled={
            this.state.watchedVariables.includes(this.props.rowData.name)
          }
          onToggle={this.onToggle}
        />
      </div>
    );
  }

}