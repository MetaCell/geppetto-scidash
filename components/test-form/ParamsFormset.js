import React from "react";
import _ from "underscore";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
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
      this.setState({
        schemaList: [this.props.schema]
      });
    } else {
      this.setState({
        schemaList: this.props.schema
      });
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.schema, prevProps.schema)) {
      if (!Array.isArray(this.props.schema)){
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          schemaList: [this.props.schema],
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          schemaList: this.props.schema
        });
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        unitsMap: this.props.unitsMap
      });
    }
  }

  render () {
    return (
      <span>
        {this.state.schemaList.length > 1 &&
          <SelectField
            id="testFormSelectClass"
            labelStyle={{
              position: "relative",
              top: "-10px"
            }}
            style={styles.firstLine.two}
            iconStyle={styles.firstLine.icon}
            value={this.state.choosedForm}
            onChange={(e, key, value) => {
              this.setState({
                choosedForm: value
              });
            }}
            floatingLabelText="Select observation schema"
            floatingLabelFixed={false}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            disabled={this.props.disabled}
          >
            {this.state.schemaList.map((value, index) =>
              // eslint-disable-next-line react/no-array-index-key
              <MenuItem label={`${value[0]}`} primaryText={`${value[0]}`} value={index} key={index} />
            )}
          </SelectField>
        }

        <ParamsForm
          unitsMap={this.state.unitsMap}
          schema={this.state.schemaList[this.state.choosedForm]}
          onChange={this.props.onChange}
          model={this.props.model}
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