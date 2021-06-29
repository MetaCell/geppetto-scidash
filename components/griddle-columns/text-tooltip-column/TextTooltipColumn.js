import React from "react";

export default class TextTooltipColumn extends React.Component {

  constructor (props, modelClass, context) {
    super(props, context);
    this.props = props;
  }

  render () {
    return (
      this.props.value !== " "
        ? <div
          title={this.props.value.get("tooltip")}
        >
          {this.props.value.get("class_name")}
        </div>
        : ""
    );
  }
}
