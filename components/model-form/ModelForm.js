import React from "react";
import Chip from "material-ui/Chip";
import SvgIcon from "material-ui/SvgIcon";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { OKicon, Xicon } from "../../assets/CustomIcons";
import ModelClassApiService from "../../services/api/ModelClassApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import ModelParametersApiService from "../../services/api/ModelParametersApiService";
import ParamsTable from "./ParamsTable";

export default class ModelForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      modelClasses: [],
      model: props.model,
      loadingClasses: false,
      successClasses: false,
      // FIXME: redundant, delete this, and operate with successClasses
      failClasses: false,
      loadingParams: false,
      successParams: false,
      paramsDisabled: true,
      newTag: null,
      modelParamsOpen: false
    };


    this.checkUrl = this.checkUrl.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.onSave = props.onSave.bind(this);
    this.onCancel = props.onCancel.bind(this);
    this.modelFactory = GEPPETTO.ModelFactory;
  }

  async checkUrl (url){
    this.setState({
      loadingClasses: true,
      successClasses: false,
      successParams: false
    });

    let classService = new ModelClassApiService();
    let paramsService = new ModelParametersApiService();
    let filteringService = FilteringService.getInstance();

    filteringService.setupFilter("model_url", url, Config.modelCreateNamespace);

    let responseClasses = await classService.getList(false, Config.modelCreateNamespace);

    if (responseClasses.length > 0){
      this.setState({
        successClasses: true
      });
    } else {
      this.setState({
        failClasses: true
      });
    }

    this.setState({
      loadingClasses: false,
      modelClasses: responseClasses,
      loadingParams: true
    });

    let responseParams = await paramsService.getList(false, Config.modelCreateNamespace);
    this.processModel(JSON.parse(responseParams.data));

    this.setState({
      loadingParams: false,
      successParams: true,
      paramsDisabled: false
    });

  }

  processModel (model){
    GEPPETTO.Manager.loadModel(JSON.parse(model.geppetto_model_loaded));

    return this;
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
              onChange={
                (event, value) => {
                  this.updateModel({ url: value });
                  this.checkUrl(value);
                } 
              }

            />
            <span className="icons">
              {this.state.successClasses ? <SvgIcon style={{ color: "green" }}>{OKicon}</SvgIcon> : null}
              {this.state.failClasses ? <SvgIcon style={{ color: "red" }}>{Xicon}</SvgIcon> : null}
              {this.state.loadingClasses ? <CircularProgress size={36} /> : null}
            </span>
          </div>
        </div>

        <div className="second-line">
          <div className="container">
            <SelectField
              floatingLabelText="Select class"
              iconStyle={{ background: "#000", padding: "2px", width: "28px", height: "28px" }}
              disabled={this.state.modelClasses.length == 0}
              value={this.state.model.model_class.id}
              underlineStyle={{ borderBottom: "1px solid grey" }}
              onChange={(event, key, value) => {
                for (let klass of this.state.modelClasses){
                  if (klass.id == value){
                    this.updateModel({ "model_class": klass });
                  }
                }
              }}
            >
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
          <RaisedButton
            label="Open"
            disabled={this.state.paramsDisabled}
            className="actions-button"
            style={{
              padding:"0px",
              margin:"10px 0 0 0"
            }}
            onClick={() => this.setState({ modelParamsOpen: true })}
          />

          <span className="icons">
            {this.state.successParams ? <SvgIcon style={{ color: "green" }}>{OKicon}</SvgIcon> : null}
            {this.state.loadingParams ? <CircularProgress size={36} /> : null}
          </span>

          <Dialog
            modal
            actions={[<FlatButton
              label="Close"
              key="close-button"
              primary
              onClick={() => this.setState({ modelParamsOpen: false })}
            />,]}
            autoScrollBodyContent
            contentStyle={{
              width: "75%",
              maxWidth: "none"
            }}
            contentClassName="centered-modal"
            open={this.state.modelParamsOpen}
          >
            <ParamsTable /> 
          </Dialog>
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
            onClick={() => this.onCancel()}
          />
        </div>
      </span>
    );
  }
}
