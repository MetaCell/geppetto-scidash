/* eslint-disable react/no-unused-state */
import React from "react";
import Chip from "material-ui/Chip";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import { red400, brown500 } from "material-ui/styles/colors";
import ParamsFormset from "./ParamsFormset";
import TestInstance from "../../models/TestInstance";
import Helper from "../../shared/Helper";

export default class TestForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      testClasses: props.testClasses,
      model: props.model,
      validationFailed: false,
      newTag: "",
      isBlocked: false
    };

    this.helper = new Helper();

    this.updateModel = this.updateModel.bind(this);
    this.onSave = props.onSave.bind(this);
    this.onCancel = props.onCancel.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.isInstanceBlocked = this.isInstanceBlocked.bind(this);
  }

  componentWillMount () {
    if (this.props.actionType === "edit") {
      this.isInstanceBlocked();
    }
  }

  componentDidUpdate () {
    if (this.props.actionType === "edit") {
      this.isInstanceBlocked();
    }
  }

  updateModel (data) {
    let newModel = {};

    newModel = {
      ...this.state.model,
      ...data
    };

    newModel = new TestInstance(newModel);

    this.setState({
      model: newModel
    });
  }

  deleteTag (tag) {
    let { model } = this.state;
    for (let i = 0; i < model.tags.length; i++) {
      if (model.tags[i] === tag) {
        model.tags.splice(i, 1);
      }
    }
    this.updateModel({ tags: [...model.tags] });
  }

  addTag (newTag) {
    if (!this.state.model.tags.includes(newTag)) {
      this.updateModel({ tags: [...this.state.model.tags, newTag] });
      this.setState({ newTag: "" });
    }
  }

  isInstanceBlocked () {
    let testId = this.props.model.id;
    let checkInstance = function (value, index, array) { return value.id === testId; };
    let instance = this.props.data.find(checkInstance);
    if ((this.state.isBlocked === false) && (instance.block.isBlocked || (instance.tags.indexOf("deprecated") !== -1))) {
      this.setState({ isBlocked: true });
    }
  }


  render () {
    let blockedWarning = <div style={{fontSize: '18px'}}>
                            <p>
                              <i className="fa fa-lock" style={{fontSize: '25px'}}/> &nbsp;
                              This model instance is locked because it has already a score
                              associated to it, only tags can be edited.
                              Clone from the grid view to create a different instance.
                            </p>
                          </div>;
    return (
      <span>
        {this.state.isBlocked ? blockedWarning : undefined}
        <div style={styles.firstLine.container}>
          <TextField
            value={this.state.model.name}
            onChange={(e, value) => this.updateModel({ "name": value })}
            errorText={
              (this.state.model.errors !== undefined && "name" in this.state.model.errors) ? this.state.model.errors["name"] : ""
            }
            style={styles.firstLine.one}
            floatingLabelText="Name of the test"
            underlineStyle={{ borderBottom: "1px solid grey" }}
            disabled={this.state.isBlocked}
          />

          <SelectField
            id="testFormSelectClass"
            labelStyle={{
              position: "relative",
              top: "-10px"
            }}
            style={styles.firstLine.two}
            iconStyle={styles.firstLine.icon}
            value={this.state.model.test_class.id}
            floatingLabelText="Select test class"
            floatingLabelFixed={false}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            dropDownMenuProps={{
              menuStyle: {
                border: "1px solid black",
                backgroundColor: "#f5f1f1"
              },
              anchorOrigin: {
                vertical: "center",
                horizontal: "left"
              }
            }}
            onChange={(e, key, value) => {
              for (let klass of this.state.testClasses) {
                if (klass.id == value) {
                  this.updateModel({ "test_class": klass });
                }
              }
            }}
            disabled={this.state.isBlocked}
          >

            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.testClasses.sort((a, b) => {
              let textA = a.class_name.toLowerCase();
              let textB = b.class_name.toLowerCase();

              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).map((klass, index) => <MenuItem value={klass.id} key={index} primaryText={klass.class_name} label={klass.class_name} />)}
          </SelectField>
        </div>

        <div style={styles.secondLine.container}>
          <TextField
            onChange={(e, value) => this.updateModel({ "description": value })}
            value={this.state.model.description}
            style={styles.secondLine.one}
            floatingLabelText="Test description"
            underlineStyle={{ borderBottom: "1px solid grey" }}
            disabled={this.state.isBlocked}
          />
        </div>

        <div style={styles.thirdLine.container}>
          <TextField
            value={this.state.newTag}
            onChange={(e, value) => { this.setState({ newTag: value }); }}
            floatingLabelText="Add tags"
            style={styles.thirdLine.one}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onKeyPress={e => e.key === "Enter" ? this.addTag(this.state.newTag.toLowerCase()) : null}
          />
          <div style={styles.thirdLine.two}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.model.tags.map(function (tag, i) {
              if (typeof(tag.name) !== "undefined") {
                return (
                  <Chip
                    backgroundColor={(tag.name.toLowerCase() === "deprecated") ? red400 : brown500}
                    style={{ marginLeft: 4, marginTop: 4, float: "left" }}
                    key={`${tag.name}-${i}`}
                    onRequestDelete={() => this.deleteTag(tag)}
                  >
                    {tag.name.toString()}
                  </Chip>
                );
              } else {
                return (
                  <Chip
                    backgroundColor={(tag.toLowerCase() === "deprecated" || tag.toLowerCase() === "unschedulable") ? red400 : brown500}
                    style={{ marginLeft: 4, marginTop: 4, float: "left" }}
                    key={`${tag}-${i}`}
                    onRequestDelete={() => this.deleteTag(tag)}
                  >
                    {tag}
                  </Chip>
                );
              }

            }.bind(this))}
          </div>
        </div>

        <div style={styles.fourthLine.container}>
          <div style={styles.fourthLine.column}>
            <h3>
              Observation values:
            </h3>
            <p style={{ color: "red" }}>
              {
                (this.state.model.errors !== undefined && "observation" in this.state.model.errors) ? this.state.model.errors["observation"] : ""
              }
            </p>
            <ParamsFormset
              schema={this.state.model.test_class.observation_schema}
              default_params={this.state.model.test_class.default_params}
              unitsMap={this.state.model.getObservationUnitsMap()}
              onChange={observation => {
                this.updateModel({
                  observation
                });
              }}
              model={this.props.actionType === "edit" ? this.state.model.observation : undefined}
              disabled={this.state.isBlocked}
            />
          </div>

          <div style={styles.fourthLine.column}>
            <h3>Test parameters:</h3>
            <p style={{ color: "red" }}>
              {
                (this.state.model.errors !== undefined && "params" in this.state.model.errors) ? this.state.model.errors["params"] : ""
              }
            </p>
            <ParamsFormset
              schema={this.state.model.test_class.test_parameters_schema}
              default_params={this.state.model.test_class.default_params}
              unitsMap={this.state.model.getParamsUnitsMap()}
              onChange={params => {
                this.updateModel({
                  params
                });
              }}
              model={this.props.actionType === "edit" ? this.state.model.params : undefined}
              disabled={this.state.isBlocked}
            />
          </div>
        </div>
        <div style={styles.actionsContainer}>
          <RaisedButton
            label="save"
            style={styles.actionsButton}
            onClick={() => {
              if (this.state.model.validate()) {
                this.setState({
                  validationFailed: false
                });
                this.props.onSave(this.state.model);
              } else {
                this.setState({
                  validationFailed: true
                });
              }
            }}
          />
          <RaisedButton
            label="cancel"
            style={styles.actionsButton}
            onClick={() => this.props.onCancel()}
          />
        </div>
      </span>
    );

  }
}

const styles = {
  actionsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  },
  actionsButton: {
    width: "100px"
  },
  firstLine: {
    container: {
      width: "100%",
      display: "flex",
      flexFlow: "horizontal",
      justifyContent: "space-around",
      alignItems: "center"
    },
    one: { flex: 2 },
    two: { flex: 2, marginLeft: "25px" },
    icon: { background: "#000", padding: "2px", width: "28px", height: "28px" }
  },
  secondLine: {
    container: { width: "100%", marginTop: 12 },
    one: { width: "100%" }
  },
  thirdLine: {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    one: { width: "20%" },
    two: { float: "right", width: "79%" }
  },
  fourthLine: {
    container: {
      width: "100%",
      display: "flex",
      flexFlow: "horizontal",
      alignItems: "stretch",
      justifyContent: "space-around",
    },
    column: {
      flex: 1,
      margin: "20px",
      display: "flex",
      flexFlow: "column",
    },
  }
};
