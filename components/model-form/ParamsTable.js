import React from "react";
import Griddle, { RowDefinition, ColumnDefinition, plugins } from "griddle-react";
import _ from "underscore";
import FlatButton from "material-ui/FlatButton";
import { enhancedWithRowData, ChooseVarComponent } from "./partials";
import { TOGGLE_ALL, UNTOGGLE_ALL } from "./events";

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
    GEPPETTO.on(UNTOGGLE_ALL, this.props.removeAll, this);
    GEPPETTO.on(TOGGLE_ALL, this.props.addAll, this);

    this.convertToStateVariablesTableData();
    this.convertToParamsTableData();
  }

  componentWillUnmount (){
    GEPPETTO.off(UNTOGGLE_ALL, this.props.removeAll, this);
    GEPPETTO.off(TOGGLE_ALL, this.props.addAll, this);
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
      <span>

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
              title="Watch"
              headerCssClassName="toggleHeaderClass"
              customComponent={enhancedWithRowData(
                this.props.onCheck,
                this.props.onUncheck,
                this.state.watchedVariables,
                this.props.disabled
              )(
                ChooseVarComponent
              )}
            />
          </RowDefinition>
        </Griddle>
      </span>
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
          {this.state.stateVariablesOpen &&
            (
              <span>
                <FlatButton
                  label="Untoggle all" style={{
                    margin: "10px 0 10px 0",
                    float: "right"
                  }}
                  disabled={this.props.disabled}
                  onClick={() => GEPPETTO.trigger(UNTOGGLE_ALL)}
                />
                <FlatButton
                  label="Toggle all" style={{
                    margin: "10px 0 10px 0",
                    float: "right"
                  }}
                  disabled={this.props.disabled}
                  onClick={() => GEPPETTO.trigger(TOGGLE_ALL)}
                />
              </span>
            )
          }
        </div>
        { this.state.stateVariablesOpen ? stateVariablesTable : "" }
        { this.state.paramsOpen ? paramsTable : "" }
      </span>
    );
  }
}