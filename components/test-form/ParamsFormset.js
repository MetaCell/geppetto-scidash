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
      choosedForm: 0
    };

  }

  componentDidMount (){
    if (!Array.isArray(this.props.schema)){
      this.setState({ schemaList: [this.props.schema] });
    } else {
      this.setState({ schemaList: this.props.schema });
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (
      (!_.isEqual(this.props.test_class, prevProps.test_class))
      || (!_.isEqual(this.props.schema, prevProps.schema)) 
    ){
      if (!Array.isArray(this.props.schema)){
        this.setState({ schemaList: [this.props.schema], });
      } else {
        this.setState({ schemaList: this.props.schema });
      }
      this.setState({ unitsMap: this.props.unitsMap });
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
            onChange={(e, key, value) => {
              this.setState({ choosedForm: value });
            }}
            floatingLabelText="Select observation schema"
            floatingLabelFixed={false}
            disabled={this.props.disabled}
          >
            {this.state.schemaList.map((value, index) =>
              <MenuItem label={`${value[0]}`} primaryText={`${value[0]}`} value={index} key={index} />
            )}
          </Select>
        }

        <ParamsForm
          unitsMap={this.state.unitsMap}
          schema={this.state.schemaList[this.state.choosedForm]}
          onChange={this.props.onChange}
          model={this.props.model}
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