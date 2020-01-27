import { connect } from "react-redux";
import _ from "underscore";
import Toggle from "material-ui/Toggle";
import React from "react";
import { TOGGLE_ALL, UNTOGGLE_ALL } from "./events";

const styles = {
  thumbOff: { backgroundColor: "red", },
  trackOff: { backgroundColor: "#e19183", },
  thumbSwitched: { backgroundColor: "#008000", },
  trackSwitched: { backgroundColor: "#83e183", }
};

export const rowDataSelector = (state, { griddleKey }) => state
  .get("data")
  .find(rowMap => rowMap.get("griddleKey") === griddleKey)
  .toJSON();

export const enhancedWithRowData = (onCheck, onUncheck, disabled) => connect((state, props) => ({
  rowData: rowDataSelector(state, props),
  onCheck,
  onUncheck,
  disabled
}));

export class ChooseVarComponent extends React.Component{

  constructor (props, context){
    super(props);

    this.state = { toggled: true };

    this.onToggle = this.onToggle.bind(this);
    this.switchToggle = this.switchToggle.bind(this);

    this.onToggleAll = (() => this.switchToggle(true)).bind(this);
    this.onUntoggleAll = (() => this.switchToggle(false)).bind(this);
  }

  componentDidMount (){

    GEPPETTO.on(TOGGLE_ALL, this.onToggleAll, this);
    GEPPETTO.on(UNTOGGLE_ALL, this.onUntoggleAll, this);

    this.setState({ toggled: this.props.value });
  }

  componentWillUnmount (){
    GEPPETTO.off(TOGGLE_ALL, this.onToggleAll, this);
    GEPPETTO.off(UNTOGGLE_ALL, this.onUntoggleAll, this);
  }

  onToggle (ev, toggled){
    this.switchToggle(toggled, () => {
      if (toggled) {
        this.props.onCheck(this.props.rowData.name);
      } else {
        this.props.onUncheck(this.props.rowData.name);
      }
    });
  }

  switchToggle (toggled, callback){

    if (!callback){
      callback = () => {};
    }

    this.setState({ toggled: toggled }, callback());
  }

  render (){
    return (
      <div style={{ float: "right" }}>
        <Toggle
          toggled={
            this.state.toggled
          }
          onToggle={this.onToggle}
          disabled={this.props.disabled}
          thumbStyle={styles.thumbOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackStyle={styles.trackOff}
          trackSwitchedStyle={styles.trackSwitched}
        />
      </div>
    );
  }

}