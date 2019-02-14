import React from "react";
import TextField from "material-ui/TextField";
import _ from "underscore";


export default class ObservationsForm extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.props = props;
    this.state = this.transformSchemaToModel();

    this.onChange = props.onChange.bind(this);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.schema, prevProps.schema)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(this.transformSchemaToModel());
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
    this.setState({
      [key]: newValue
    }, () => this.onChange(this.state));
  }

  render () {
    return (
      <span>
        {Object.keys(this.state).map((key, index) => (<TextField
          value={this.state[key]}
          key={key}
          onChange={(e, newValue) => this.updateForm(key, newValue)}
          style={{ width: "100%" }}
          floatingLabelText={key}
          underlineStyle={{ borderBottom: "1px solid grey" }}
        />))}
      </span>
    );

  }
}