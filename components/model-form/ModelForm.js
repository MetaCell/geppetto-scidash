import React from "react";
import Chip from "material-ui/Chip";
import SvgIcon from "material-ui/SvgIcon";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import { OKicon } from "../../assets/CustomIcons";

export default class ModelForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      modelClasses: props.modelClasses,
      model: props.model,
      loading: false,
      success: false,
      newTag: null
    };

    this.downloadModelFromUrl = props.downloadModelFromUrl.bind(this);
    this.toggleModelForm = props.toggleModelForm.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.onSave = props.onSave.bind(this);
    this.onCancel = props.onCancel.bind(this);
  }

  updateModel (data){
    let newModel = {};

    newModel = {
      ...this.state.model,
      ...data
    };

    this.setState({
      model: newModel
    });
  }

  render () {

    return (
      <span className="model-form">
        <div className="first-line">
          <div className="container">
            <TextField
              value={this.state.model.name}
              className="model-name"
              floatingLabelText="Name of the model"
              underlineStyle={{ borderBottom: "1px solid grey" }}
              onChange={(event, value) => this.updateModel({ name: value })}
            />
            <TextField
              value={this.state.model.url}
              className="url"
              floatingLabelText="Source URL"
              underlineStyle={{ borderBottom: "1px solid grey" }}
              onKeyPress={this.downloadModelFromUrl}
              onChange={(event, value) => this.updateModel({ url: value })}
            />
            <span className="icons">
              {this.state.success ? <SvgIcon>{OKicon}</SvgIcon> : null}
              {this.state.loading && <CircularProgress size={36} />}
            </span>
          </div>
        </div>

        <div className="second-line">
          <div className="container">
            <SelectField
              floatingLabelText="Select class"
              value={this.state.model.model_class.id}
              underlineStyle={{ borderBottom: "1px solid grey" }}
              onChange={(event, value) => {
                for (let klass of this.state.modelClasses){
                  if (klass.id == value){
                    this.updateModel({ "model_class": klass });
                  }
                }
              }}
            >
              <MenuItem value={0}><em>None</em></MenuItem>
              {this.state.modelClasses.map(klass => <MenuItem value={klass.id} key={klass.id} primaryText={klass.class_name} label={klass.class_name} /> )}
            </SelectField>

            <TextField
              onChange={(e, value) => { this.setState({ newTag: value }); }}
              className="new-tag"
              floatingLabelText="Add a new tag"
              underlineStyle={{ borderBottom: "1px solid grey" }}
              onKeyPress={e => e.key === "Enter" ? this.updateModel({ tags: [...this.state.model.tags, this.state.newTag] }) : null}
            />

            <div className="tags">
              {/* eslint-disable-next-line react/no-array-index-key */}
              {this.state.model.tags.map((tag, i) => <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }} key={`${tag}-${i}`}>{tag}</Chip> )}
            </div>
          </div>
        </div>

        <div className="fourth-line">
          <h3>Model parameters</h3>
        </div>

        <div className="fifth-line">
          <div className="container">
            <TextField
              onChange={(e, value) => this.updateModel({ "run_params": JSON.parse(value) })}
              value={JSON.stringify(this.state.model.run_params)}
              className="item"
              floatingLabelText="Model parameter"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
          </div>
        </div>

        <div className="actions-container">
          <RaisedButton
            label="save"
            className="actions-button"
            onClick={() => this.onSave(this.state.model)}
          />

          <RaisedButton
            label="cancel"
            className="actions-button"
            onClick={() => this.onCancel(this.state.model)}
          />
        </div>
      </span>
    );
  }
}
