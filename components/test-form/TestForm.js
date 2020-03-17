import React from "react";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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

    this.setState({ model: newModel });
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
    let checkInstance = function (value, index, array) {
      return value.id === testId; 
    };
    let instance = this.props.data.find(checkInstance);
    if ((this.state.isBlocked === false) && (instance.block.isBlocked || (instance.tags.indexOf("deprecated") !== -1))) {
      this.setState({ isBlocked: true });
    }
  }


  render () {
    let blockedWarning = <div style={{ fontSize: '18px' }}>
      <p>
        <i className="fa fa-lock" style={{ fontSize: '25px' }}/> &nbsp;
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
            onChange={e => this.updateModel({ "name": e.target.value })}
            error={ this.state.model.errors !== undefined && "name" in this.state.model.errors }
            helperText={
              (this.state.model.errors !== undefined && "name" in this.state.model.errors) ? this.state.model.errors["name"] : ""
            }
            style={styles.firstLine.one}
            label="Name of the test"
            disabled={this.state.isBlocked}
          />

          <Select
            id="testFormSelectClass"
            style={styles.firstLine.two}
            value={ this.state.model.test_class.id ? this.state.model.test_class.id : "" }
            label="Select test class"
            onChange={e => {
              for (let klass of this.state.testClasses) {
                if (klass.id == e.target.value) {
                  this.updateModel({ "test_class": klass, });
                }
              }
            }}
            disabled={this.state.isBlocked}
          >

            {this.state.testClasses.sort((a, b) => {
              let textA = a.class_name.toLowerCase();
              let textB = b.class_name.toLowerCase();

              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).map((klass, index) => <MenuItem value={klass.id} id={klass.class_name} key={index} label={klass.class_name}>{klass.class_name}</MenuItem>)}
          </Select>
        </div>

        <div style={styles.secondLine.container}>
          <TextField
            onChange={e => this.updateModel({ "description": e.target.value })}
            value={this.state.model.description}
            style={styles.secondLine.one}
            label="Test description"
            id="test-description"
            disabled={this.state.isBlocked}
          />
        </div>

        <div style={styles.thirdLine.container}>
          <TextField
            value={this.state.newTag}
            id="test-add-tags"
            onChange={e => {
              this.setState({ newTag: e.target.value });
            }}
            label="Add tags"
            style={styles.thirdLine.one}
            onKeyPress={e => e.key === "Enter" ? this.addTag(this.state.newTag.toLowerCase()) : null}
          />
          <div className="tags" style={styles.thirdLine.two}>
            {this.state.model.tags.map(function (tag, i) {
              if (typeof(tag.name) !== "undefined") {
                return (
                  <Chip
                    color={(tag.name.toLowerCase() === "deprecated") ? "secondary" : "primary"}
                    style={{ marginLeft: 4, marginTop: 4, float: "left" }}
                    key={`${tag.name}-${i}`}
                    onDelete={() => this.deleteTag(tag)}
                    label={tag.name.toString()}
                  />
                );
              } else {
                return (
                  <Chip
                    color={tag.toLowerCase() === "deprecated" || tag.toLowerCase() === "unschedulable" ? "secondary" : "primary"}
                    style={{ marginLeft: 4, marginTop: 4, float: "left" }}
                    key={`${tag}-${i}`}
                    onDelete={() => this.deleteTag(tag)}
                    label={tag}
                  />
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
              default_params={{}}
              unitsMap={this.state.model.getObservationUnitsMap()}
              test_class={this.state.model.test_class}
              onChange={observation => {
                this.updateModel({ observation });
              }}
              model={this.props.actionType === "edit" && this.props.model.test_class.class_name === this.state.model.test_class.class_name ? this.props.model.observation : undefined}
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
              test_class={this.state.model.test_class}
              onChange={params => {
                this.updateModel({ params });
              }}
              model={this.props.actionType === "edit" && this.props.model.test_class.class_name === this.state.model.test_class.class_name ? this.props.model.params : this.state.model.test_class.default_params}
              disabled={this.state.isBlocked}
            />
          </div>
        </div>
        <div style={styles.actionsContainer}>
          <Button
            variant="contained"
            label="save"
            id="save-test"
            style={styles.actionsButton}
            onClick={() => {
              if (this.state.model.validate()) {
                this.setState({ validationFailed: false });
                this.props.onSave(this.state.model);
              } else {
                this.setState({ validationFailed: true });
              }
            }}
          >save</Button>
          <Button
            variant="contained"
            label="cancel"
            id="cancel-test"
            style={styles.actionsButton}
            onClick={() => this.props.onCancel()}
          >cancel</Button>
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
  actionsButton: { width: "100px" },
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
    container: { width: "100%", marginTop: 16 },
    one: { width: "100%" }
  },
  thirdLine: {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16
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
