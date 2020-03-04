import React from "react";
import _ from "underscore";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ParamsForm from "./ParamsForm";

export default class ParamsFormset extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.props = props;

    this.state = {
      schemaList: [{}],
      unitsMap: this.props.unitsMap,
      choosedForm: 0,
      model2: this.props.model
    };
  }

  componentDidMount (){
    if (!Array.isArray(this.props.schema)){
      this.setState({ schemaList: [this.props.schema] });
    } else {
      this.setState({ schemaList: this.props.schema });
    }
    this.setState({ choosedForm: 0 })
  }


  updateStateModel (){
    let schemaList = {};
    if (!Array.isArray (this.props.schema)) {
      schemaList = [this.props.schema]
    } else {
      schemaList = this.props.schema
    }
    const newModel = Object.assign({},
      ...Object.keys(schemaList.length > 1 ? schemaList[this.state.choosedForm][1] : schemaList[0]).
        map(key => (
          { [key]: (this.props.model && key in this.props.model ? this.props.model[key] : ""), }
        ))
    );
    this.setState({
      schemaList: schemaList,
      model2: newModel ? newModel : {}
    });
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.schema, prevProps.schema)) {
      this.updateStateModel();
    }
    if (!_.isEqual(this.props.unitsMap, prevProps.unitsMap)) {
      this.setState({ unitsMap: this.props.unitsMap });
    }
    if (this.props.test_class.class_name !== prevProps.test_class.class_name && this.state.choosedForm !== 0){
      this.setState( { choosedForm: 0 })
    }
    if (this.state.choosedForm !== prevState.choosedForm){
      this.updateStateModel();
    }
  }

  render () {
    return (
      <span>
        {this.state.schemaList.length > 1
          && <Select
            id="testFormSelectClass"
            style={styles.firstLine.two}
            value={this.state.choosedForm}
            onChange={e => {
              this.setState({ choosedForm: e.target.value });
            }}
            label="Select observation schema"
            disabled={this.props.disabled}
          >
            {this.state.schemaList.map((value, index) =>
              <MenuItem id={`${value[0]}`} label={`${value[0]}`} value={index} key={index}>{`${value[0]}`}</MenuItem>
            )}
          </Select>
        }

        <ParamsForm
          unitsMap={this.state.unitsMap}
          schema={Array.isArray(this.state.schemaList[this.state.choosedForm]) ? this.state.schemaList[this.state.choosedForm][1] : this.state.schemaList[this.state.choosedForm]}
          onChange={this.props.onChange}
          model={this.state.model2}
          default_params={this.props.default_params}
          disabled={this.props.disabled}
        />

      </span>
    );
  }
}

let styles = {
  firstLine: {
    two: { flex: 2 },
    icon: { background: "#000", padding: "2px", width: "28px", height: "28px" }
  }
};