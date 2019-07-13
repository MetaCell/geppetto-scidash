/* eslint-disable react/no-array-index-key */
import React from "react";


class ModelDetailsPartial extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.props = props;
  }
}


export class Capabilities extends ModelDetailsPartial {

  render () {
    const capabilities = this.props.capabilities
      .map(capability => <li key={capability.get("id")}>{capability.get("class_name")}</li>);

    return (
      <span>
        <ul>
          {capabilities}
        </ul>
      </span>
    );
  }
}


export class RunParams extends ModelDetailsPartial {

  displayParam (param){
    return `${param.get("name")}: ${param.get("value")} ${param.get("unit")}`;
  }

  render () {

    let runParamsObj = Array.from(this.props.runParams).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
    ), {});

    const params = Object.entries(runParamsObj).map(param =>
      (
        <tr key={param[0]}>
          <td>{param[0]}</td>
          <td>
            {typeof param[1] != "string" ? param[1].map((value, index) => (
              <span key={index}>
                {value instanceof Object ? this.displayParam(value) : value}
                <br />
              </span>
            )) : param[1]}
          </td>
        </tr>
      ));

    return (
      <table className="table">
        <tbody>
          {params}
        </tbody>
      </table>
    );
  }
}
