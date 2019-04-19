import React from "react";
import Griddle, { RowDefinition, ColumnDefinition, plugins } from "griddle-react";
import _ from "underscore";
import FlatButton from "material-ui/FlatButton";
import { enhancedWithRowData, ChooseVarComponent } from "./partials";

export default class ParamsTable extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      stateVariables: props.stateVariables,
      watchedVariables: props.watchedVariables,
      params: props.params,
      stateVariablesTableData: [],
      paramsTableData: [],
      stateVariablesOpen: true,
      paramsOpen: false
    };

  }

  componentDidMount (){
    this.convertToStateVariablesTableData();
    this.convertToParamsTableData();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.watchedVariables, prevProps.watchedVariables)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        watchedVariables: this.props.watchedVariables
      });
    }
  }


  convertToStateVariablesTableData () {
    let tableData = [];

    this.state.stateVariables.map(item => {
      tableData.push({
        name: item
      });
    });

    this.setState({
      stateVariablesTableData: tableData
    });
  }

  convertToParamsTableData () {
    let tableData = [];

    this.state.params.map(item => {

      let object = eval(item);
      let sixDecimalValue = object.getInitialValue().toString().match(/^-?\d+(?:.\d{0,6})?/)[0];

      tableData.push({
        name: item.replace("Model.neuroml.", ""),
        value: sixDecimalValue,
        unit: object.getUnit()
      });
    });

    this.setState({
      paramsTableData: tableData
    });
  }

  render () {
    console.log(this.state.watchedVariables);
    const ParamsLayout = ({ Table, Pagination, Filter, _SettingsWrapper }) => (
      <div>
        <Filter />
        <Table />
        { this.state.paramsTableData.length > 10 && <Pagination />}
      </div>
    );

    const StateVariablesLayout = ({ Table, Pagination, Filter, _SettingsWrapper }) => (
      <div>
        <Filter />
        <Table />
        { this.state.stateVariablesTableData.length > 10 && <Pagination />}
      </div>
    );

    const paginationButtons = {
      NextButton: props => {
        if (props.hasNext) {
          return (
            <FlatButton
              label={props.text} onClick={props.getNext} style={{
                marginLeft: "10px"
              }}
            />
          );
        }

        return null;

      },
      PreviousButton: props => {
        if (props.hasPrevious) {
          return (
            <FlatButton
              label={props.text} onClick={props.getPrevious} style={{
                marginRight: "10px"
              }}
            />
          );
        }

        return null;
      }
    };

    let stateVariablesTable = (
      <Griddle
        data={this.state.stateVariablesTableData}
        plugins={[plugins.LocalPlugin]}
        styleConfig={{
          classNames: {
            Table: "table scidash-table",
            TableHeadingCell: "scidash-table-heading-cell",
            Filter: "scidash-table-filter"
          }
        }}
        // TODO: a bit ugly, merge into 1 const
        components={{
          Layout: StateVariablesLayout,
          ...paginationButtons
        }}
      >
        <RowDefinition>
          <ColumnDefinition
            title="Name"
            id="name"
          />
          <ColumnDefinition
            title="Choose"
            customComponent={enhancedWithRowData(
              this.props.onCheck,
              this.props.onUncheck,
              this.state.watchedVariables
            )(
              ChooseVarComponent
            )}
          />
        </RowDefinition>
      </Griddle>
    );

    let paramsTable = (
      <Griddle
        plugins={[plugins.LocalPlugin]}
        styleConfig={{
          classNames: {
            Table: "table scidash-table",
            TableHeadingCell: "scidash-table-heading-cell",
            Filter: "scidash-table-filter"
          }
        }}
        data={this.state.paramsTableData}
        components={{
          Layout: ParamsLayout,
          ...paginationButtons
        }}
      >
        <RowDefinition>
          <ColumnDefinition
            title="Name"
            id="name"
          />
          <ColumnDefinition
            title="Value"
            id="value"
          />
          <ColumnDefinition
            title="Unit"
            id="unit"
          />
        </RowDefinition>
      </Griddle>
    );

    return (
      <span>
        <div>
          <FlatButton
            label="State Variables" onClick={() => this.setState({
              stateVariablesOpen: true,
              paramsOpen: false
            })} style={{
              margin: "10px 0 10px 0"
            }}
            backgroundColor={this.state.stateVariablesOpen ? "#ccc" : ""}
          />
          <FlatButton
            label="Parameters" onClick={() => this.setState({
              stateVariablesOpen: false,
              paramsOpen: true
            })} style={{
              margin: "10px 0 10px 0"
            }}
            backgroundColor={this.state.paramsOpen ? "#ccc" : ""}
          />
        </div>
        { this.state.stateVariablesOpen ? stateVariablesTable : "" }
        { this.state.paramsOpen ? paramsTable : "" }
      </span>
    );
  }
}