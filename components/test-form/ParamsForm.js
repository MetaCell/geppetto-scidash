import React from "react";
import TextField from "material-ui/TextField";
import _ from "underscore";

export default class ParamsForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.props = props;
    this.state = {
      model:
        this.props.model === undefined
          ? this.transformSchemaToModel()
          : this.props.model,
      unitsMap: this.props.unitsMap,
      iterable: []
    };
    this.onChange = props.onChange.bind(this);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(this.props.schema, prevProps.schema)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          model: {},
          unitsMap: {}
        },
        () => {
          this.setState(
            {
              model:
                this.props.model === undefined
                  ? this.transformSchemaToModel()
                  : this.props.model,
              unitsMap: this.props.unitsMap,
              iterable: this.getIterable()
            },
            () => this.onChange(this.state.model)
          );
        }
      );
    }
  }

  getIterable (){
    let iterable = [];
    let schema = {};

    if (Array.isArray(this.props.schema)) {
      schema = this.props.schema[1];
    } else {
      if (typeof this.props.schema != "undefined") {
        schema = this.props.schema;
      }
    }

    for (let key of Object.keys(schema)) {
      let param = schema[key];
      if (Object.keys(param).includes("iterable")){
        iterable.push(key);
      }
    }

    return iterable;
  }

  transformSchemaToModel () {
    let schema = {};

    if (Array.isArray(this.props.schema)) {
      schema = this.props.schema[1];
    } else {
      if (typeof this.props.schema != "undefined") {
        schema = this.props.schema;
      }
    }

    let result = {};
    for (let key of Object.keys(schema)) {
      result[key] = "";
    }

    return result;
  }

  updateForm (key, newValue) {
    let model = this.state.model;
    this.setState(
      {
        model: {
          ...model,
          [key]: newValue
        }
      },
      () => this.onChange(this.state.model)
    );
  }

  render () {
    if (this.state.model === null){
      return (
        <span />
      );
    }
    return (
      <span>
        {Object.keys(this.state.model).map(
          function (key, index) {
            return (
              <TextField
                value={this.state.model[key]}
                key={key}
                type={this.state.iterable.includes(key) ? "text" : "number"}
                onKeyDown={(e, value) => {
                  if (e.keyCode === 69 && !this.state.iterable.includes(key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e, newValue) => this.updateForm(key, newValue)}
                style={{ width: "100%" }}
                floatingLabelText={`${key} (${this.state.unitsMap[key]})`}
                underlineStyle={{ borderBottom: "1px solid grey" }}
                disabled={this.props.disabled}
              />
            );
          }.bind(this)
        )}
      </span>
    );
  }
}
