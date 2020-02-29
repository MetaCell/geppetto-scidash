import React from "react";
import Griddle, { RowDefinition, ColumnDefinition, plugins } from "griddle-react";
import _ from "underscore";
import Button from "@material-ui/core/Button";
import { ChooseVarComponent } from "./partials";
import { TOGGLE_ALL, UNTOGGLE_ALL, ADDED, REMOVED } from "./events";

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

    GEPPETTO.on(UNTOGGLE_ALL, this.removeAll, this);
    GEPPETTO.on(TOGGLE_ALL, this.addAll, this);

    GEPPETTO.on(ADDED, this.addedHandler, this);
    GEPPETTO.on(REMOVED, this.removedHandler, this);

    this.convertToStateVariablesTableData();
    this.convertToParamsTableData();
  }

  componentWillUnmount (){
    GEPPETTO.off(UNTOGGLE_ALL, this.props.removeAll, this);
    GEPPETTO.off(TOGGLE_ALL, this.props.addAll, this);
    GEPPETTO.off(ADDED, this.addedHandler, this);
    GEPPETTO.off(REMOVED, this.removedHandler, this);
    GEPPETTO.off(UNTOGGLE_ALL, this.removeAll, this);
    GEPPETTO.off(TOGGLE_ALL, this.addAll, this);
  }

  addAll (){
    this.setState(state => {
      let watchedVariables = state.stateVariables;

      return {
        ...state,
        watchedVariables
      };
    }, this.convertToStateVariablesTableData);
  }

  removeAll (){
    this.setState(state => {
      let watchedVariables = [];

      return {
        ...state,
        watchedVariables
      };
    }, this.convertToStateVariablesTableData);
  }

  addedHandler (variable){
    this.setState(state => {
      let watchedVariables = state.watchedVariables.concat(variable);

      return {
        ...state,
        watchedVariables
      };
    }, this.convertToStateVariablesTableData);

  }

  removedHandler (variable){
    this.setState(state => {
      let watchedVariables = state.watchedVariables.filter(
        el => el != variable
      );

      return {
        ...state,
        watchedVariables
      };
    }, this.convertToStateVariablesTableData);
  }

  convertToStateVariablesTableData () {
    let tableData = [];

    this.state.stateVariables.map(item => {
      tableData.push({
        name: item,
        toggled: {
          status: this.state.watchedVariables.includes(item),
          item: item
        }
      });
    });

    this.setState({ stateVariablesTableData: tableData });
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

    this.setState({ paramsTableData: tableData });
  }

  render () {
    const ParamsLayout = ({ Table, Pagination, Filter, _SettingsWrapper }) => (
      <div>
        <Filter />
        <Table />
        { this.state.params.length > 10 && <Pagination />}
      </div>
    );

    const StateVariablesLayout = ({ Table, Pagination, Filter, _SettingsWrapper }) => (
      <div>
        <Filter />
        <Table />
        { this.state.stateVariables.length > 10 && <Pagination />}
      </div>
    );

    const paginationButtons = {
      NextButton: props => {
        if (props.hasNext) {
          return (
            <Button
              label={props.text} onClick={props.getNext} style={{ marginLeft: "10px" }}
            >
              {props.text}
            </Button>
          );
        }

        return null;

      },
      PreviousButton: props => {
        if (props.hasPrevious) {
          return (
            <Button
              label={props.text} onClick={props.getPrevious} style={{ marginRight: "10px" }}
            >
              {props.text}
            </Button>
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
              id="toggled"
              headerCssClassName="toggleHeaderClass"
              customComponent={(props) => {
                return (
                  <ChooseVarComponent
                    onCheck={this.props.onCheck}
                    onUncheck={this.props.onUncheck}
                    disabled={this.props.disabled}
                    {...props}
                  />)}}
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
          <Button
            label="State Variables" onClick={() => this.setState({
              stateVariablesOpen: true,
              paramsOpen: false
            })} style={{ margin: "10px 0 10px 0", backgroundColor: this.state.stateVariablesOpen ? "#ccc" : "" }}
          >
            State Variables
          </Button>
          <Button
            label="Parameters" onClick={() => this.setState({
              stateVariablesOpen: false,
              paramsOpen: true
            })} style={{ margin: "10px 0 10px 0", backgroundColor: this.state.paramsOpen ? "#ccc" : "" }}
          >
            Parameters
          </Button>
          {this.state.stateVariablesOpen
            && (
              <span>
                <Button
                  label="Untoggle all" style={{
                    margin: "10px 0 10px 0",
                    float: "right"
                  }}
                  disabled={this.props.disabled}
                  onClick={() => GEPPETTO.trigger(UNTOGGLE_ALL)}
                >
                  Untoggle all
                </Button>
                <Button
                  label="Toggle all" style={{
                    margin: "10px 0 10px 0",
                    float: "right"
                  }}
                  disabled={this.props.disabled}
                  onClick={() => GEPPETTO.trigger(TOGGLE_ALL)}
                >
                    Toggle all
                </Button>
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