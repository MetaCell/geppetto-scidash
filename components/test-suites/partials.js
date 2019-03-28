import React from "react";
import $ from "jquery";


// FIXME: This component repeating in another partials.js for test-instances, it should be fixed in future
export default class ScidashTimestampColumn extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;
  }

  componentDidMount () {
    if (this.props.value != " ") {
      $(".timestamp-cell").tooltip();
    }
  }

  render () {
    if (this.props.value != " ") {
      return (
        <div className="timestamp-cell" style={{ textAlign: "center" }} title={this.props.value.get("full")}>
          {this.props.value.get("short")}
        </div>
      );
    }

    return (<span />);
  }
}