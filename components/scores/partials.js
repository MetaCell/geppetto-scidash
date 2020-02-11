import React from "react";
import $ from "jquery";
import Helper from "../../shared/Helper";

const CustomScoreName = ({ value }) => (
  <div style={{ paddingRight: "20px" }}>{value.get("test_class").get("class_name")}</div>
);

class StatusIconColumn extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.helper = new Helper();
  }

  componentDidMount () {
    if (this.props.value != " ") {
      $(".build-info-cell").tooltip();
    }
  }

  render () {
    let statusIcon = undefined;
    switch (this.props.value) {
    case "Calculated": {
      statusIcon = <i className="fa fa-check" style={{fontSize: "18px"}}/>;
      break;
    }
    case "Scheduled": {
      statusIcon = (
          <i className="fa fa-clock-o" style={{fontSize: "18px"}}/>
      );
      break;
    }
    case "Locked": {
      statusIcon = <i className="fa fa-lock" style={{fontSize: "18px"}}/>;
      break;
    }
    case "Failed": {
      statusIcon = <i className="fa fa-times" style={{fontSize: "18px"}}/>;
      break;
    }
    default: {
      if (this.props.value !== undefined && this.props.value !== "") {
        statusIcon = (
            <i className="fa fa-question" style={{fontSize: "18px"}}/>
        );
      }
    }
    }

    return <div title={this.props.value}>{statusIcon}</div>;
  }
}

class ScidashBuildInfoColumn extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.props = props;
    this.helper = new Helper();
  }

  componentDidMount () {
    if (this.props.value != " ") {
      $(".build-info-cell").tooltip();
    }
  }

  render () {
    let parsedBuildInfo = this.helper.parseBuildInfo(this.props.value);

    return (
      <div className="build-info-cell" title={this.props.value}>
        <i className={`fa ${parsedBuildInfo.icon}`} />
        {this.props.value}
      </div>
    );
  }
}

class ScidashTimestampColumn extends React.Component {
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
        <div
          className="timestamp-cell"
          style={{ textAlign: "center" }}
          title={this.props.value.get("full")}
        >
          {this.props.value.get("short")}
        </div>
      );
    }

    return <span />;
  }
}

export {
  CustomScoreName,
  ScidashBuildInfoColumn,
  ScidashTimestampColumn,
  StatusIconColumn
};
