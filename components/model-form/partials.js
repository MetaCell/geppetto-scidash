import { connect } from "react-redux";
import _ from "underscore";
import Switch from "@material-ui/core/Switch";
import React, { useState } from "react";
import { TOGGLE_ALL, UNTOGGLE_ALL } from "./events";
import { selectors, GriddleComponents } from 'griddle-react';

const styles = {
  thumbOff: { backgroundColor: "red", },
  trackOff: { backgroundColor: "#e19183", },
  thumbSwitched: { backgroundColor: "#008000", },
  trackSwitched: { backgroundColor: "#83e183", }
};

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

    this.setState({ toggled: this.props.value.get("status") });
  }

  componentWillUnmount (){
    GEPPETTO.off(TOGGLE_ALL, this.onToggleAll, this);
    GEPPETTO.off(UNTOGGLE_ALL, this.onUntoggleAll, this);
  }

  onToggle (ev, toggled){
    this.switchToggle(toggled, () => {
      if (toggled) {
        this.props.onCheck(this.props.value.get("item"));
      } else {
        this.props.onUncheck(this.props.value.get("item"));
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
        <Switch
          checked={
            this.state.toggled
          }
          onChange={this.onToggle}
          disabled={this.props.disabled}
        />
      </div>
    );
  }

}