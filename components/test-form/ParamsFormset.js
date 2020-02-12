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
      choosedForm: 0,
      model2: this.props.model
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
    this.setState({
      choosedForm: 0
    })
  }


  updateStateModel(){
    let schemaList = {};
    if (!Array.isArray(this.props.schema)) {
      schemaList = [this.props.schema]
    } else {
      schemaList = this.props.schema
    }
    const newModel = Object.assign({},
        ...Object.keys(schemaList.length > 1 ? schemaList[this.state.choosedForm][1] : schemaList[0]).
        map((key) => (
            {
              [key]: (this.props.model && key in this.props.model ? this.props.model[key] : ""),
            }
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
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        unitsMap: this.props.unitsMap
      });
    }
    if (this.props.test_class.class_name !== prevProps.test_class.class_name && this.state.choosedForm !== 0){
      this.setState( {
        choosedForm: 0
      })
    }
    if(this.state.choosedForm !== prevState.choosedForm){
      this.updateStateModel();
    }
  }

  render () {
    return (
      <span>
        {this.props.schema.length > 1 &&
          <SelectField
            id="testFormSelectObservationSchema"
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
              <MenuItem id={`${value[0]}`} label={`${value[0]}`} primaryText={`${value[0]}`} value={index} key={index} />
            )}
          </SelectField>
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