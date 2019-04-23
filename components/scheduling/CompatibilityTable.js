/* eslint-disable react/no-array-index-key */
import React from "react";
import SvgIcon from "material-ui/SvgIcon";
import _ from "underscore";
import { OKicon, Xicon } from "../../assets/CustomIcons";
import CompatibilityApiService from "../../services/api/CompatibilityApiService";
import Loader from "../loader/Loader";


export default class CompatibilityTable extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;

    this.state = {
      tests: props.tests,
      showLoading: false,
      models: props.models,
      csvTable: "",
      styles: {
        tableContainer: {
          textAlign: "center", marginTop: "40px"
        },
        table: {
          display: "inline-block"
        },
        tableFirstHeader: {
          float: "left", margin: "2px 10px 10px 0px"
        },
        tableHeader: {
          margin: "2px 10px 10px 2px"
        },
        tableFirstBody: {
          borderBottom: "1px solid grey"
        },
        tableModelName: {
          borderBottom: "1px solid grey",
          textAlign: "left"
        },
        tableBody: {
          float: "left", margin: "8px 10px 8px 0px"
        },
      }
    };

    this.onFinish = this.props.onFinish;

    this.compatibilityIcon = (svg, props) => (
      <SvgIcon {...props}>
        {svg}
      </SvgIcon>
    );

  }

  componentDidMount (){
    this.getCsvCompatibilityTable();
  }

  componentDidUpdate (prevProps, _prevState, _snapshot) {
    if (!_.isEqual(this.props.tests, prevProps.tests) || !_.isEqual(this.props.models, prevProps.models)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tests: {},
        models: {}
      }, () => {
        this.setState({
          tests: this.props.tests,
          models: this.props.models
        }, () => this.getCsvCompatibilityTable());
      });
    }
  }


  getTableCell (cellInfo) {
    if (cellInfo == "TBD" || cellInfo == "N/A"){
      return (
        <span
          data-tooltip={cellInfo == "TBD"
            ? "Test compatible with model"
            : "Test incompatible with model"
          }
        >
          {this.compatibilityIcon(cellInfo == "TBD" ? OKicon : Xicon)}
        </span>
      );
    } else {
      return (
        <span>
          {cellInfo}
        </span>
      );
    }
  }


  getTableHeader (tests) {
    tests.shift();

    return (
      <tr>
        <th key="Models"><p style={this.state.styles.tableFirstHeader}>Models</p></th>
        {tests.map((test, index) => (
          <th key={index}>
            <p style={this.state.styles.tableHeader}>
              {test}
            </p>
          </th>
        ))}
      </tr>
    );

  }


  getCsvCompatibilityTable () { // check HERE if the test is compatible with the model

    let preparedData = {
      tests: this.state.tests.map(test => test.id),
      models: this.state.models.map(model => model.id)
    };

    this.getCompatibilityMatrix(preparedData)
      .then(result => result.json())
      .then(result => {
        this.setState({
          csvTable: result.compatibility
        }, () => this.onFinish(result.compatibility));
      });
  }

  getTableRow (rowsArray) {
    rowsArray.pop();

    return rowsArray.map(row => (
      <tr key={row[0]}>
        {row.map((el, i) => {
          if (i === 0) {
            return (
              <td key={i} style={this.state.styles.tableModelName}>
                {this.getTableCell(el)}
              </td>
            );
          } else {
            return (
              <td key={i} style={this.state.styles.tableFirstBody}>
                {this.getTableCell(el)}
              </td>
            );
          }
        })}
      </tr>
    ));

  }

  async getCompatibilityMatrix (modelsVsTests) {
    this.setState({
      showLoading: true
    });
    let service = new CompatibilityApiService();
    let result = await service.create(modelsVsTests);

    this.setState({
      showLoading: false
    });

    return result;
  }

  render () {
    let rows = this.state.csvTable.split(";");

    let csvHeader = rows.shift();
    let tableHeader = this.getTableHeader(csvHeader.split("|"));
    let tableRows = this.getTableRow(rows.map(row => row.split("|")));

    return (
      <div style={this.state.styles.tableContainer}>
        <table style={this.state.styles.table}>
          <tbody>
            {tableHeader}
            {tableRows}
          </tbody>
        </table>
        {this.state.showLoading ? <Loader /> : ""}
      </div>
    );
  }

}