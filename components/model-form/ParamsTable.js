import React from "react";
import Griddle, { RowDefinition, ColumnDefinition, plugins } from "griddle-react";
import FlatButton from "material-ui/FlatButton";

export default class ParamsTable extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      stateVariables: [],
      params: [],
      stateVariablesTableData: [],
      paramsTableData: [],
      stateVariablesOpen: true,
      paramsOpen: false
    };

  }

  componentDidMount () {
    this.retrieveStateVariables();
    this.retrieveParams();
  }

  retrieveStateVariables () {
    this.setState({
      stateVariables: GEPPETTO.ModelFactory.getAllPotentialInstancesOfMetaType("StateVariableType")
    }, () => { this.convertToStateVariablesTableData(); });
  }

  retrieveParams () {
    this.setState({
      params: GEPPETTO.ModelFactory.getAllPotentialInstancesOfMetaType("ParameterType")
    }, () => { this.convertToParamsTableData(); });
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
    console.log(GEPPETTO.ModelFactory);

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

    const ParamsLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
      <div>
        <Filter />
        <Table />
        { this.state.paramsTableData.length > 10 && <Pagination />}
      </div>
    );

    const StateVariablesLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
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

    const stateVariablesTable = ( 
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
        // FIXME: a bit ugly, merge into 1 const
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
        </RowDefinition>
      </Griddle>
    );

    const paramsTable = (
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