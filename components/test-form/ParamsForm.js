import React from "react";
import TextField from "material-ui/TextField";
import _ from "underscore";

export default class ParamsForm extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.props = props;
    this.state = {
      model: this.transformSchemaToModel()
    };

    this.onChange = props.onChange.bind(this);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.schema, prevProps.schema)) {
      console.log(this.props.schema);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        model: {}
      }, () => {
        this.setState({
          model: this.transformSchemaToModel()
        }, () => this.onChange(this.state.model));
      });
    }
  }

  transformSchemaToModel () {
    let result = {};
    for (let key of Object.keys(this.props.schema)) {
      result[key] = "";
    } 

    return result;
  }

  updateForm (key, newValue) {
    let model = this.state.model;
    this.setState({
      model: {
        ...model,
        [key]: newValue
      }
    }, () => this.onChange(this.state.model));
  }

  render () {
    return (
      <span>
        {Object.keys(this.state.model).map((key, index) => (<TextField
          value={this.state.model[key]}
          key={key}
          type="number"
          onChange={(e, newValue) => this.updateForm(key, newValue)}
          style={{ width: "100%" }}
          floatingLabelText={key}
          underlineStyle={{ borderBottom: "1px solid grey" }}
        />))}
      </span>
    );
  }
}