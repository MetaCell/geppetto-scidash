import React from "react";
import Chip from "material-ui/Chip";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import ParamsForm from "./ParamsForm";


export default class TestForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      testClasses: props.testClasses,
      model: props.model,
      newTag: ""
    };

    this.toggleTestForm = props.toggleTestForm.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.onSave = props.onSave.bind(this);
    this.onCancel = props.onCancel.bind(this);
  }

  updateModel (data) {
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
      <span>
        <div style={styles.firstLine.container}>
          <TextField
            value={this.state.model.name}
            onChange={(e, value) => this.updateModel({ "name": value })}
            style={styles.firstLine.one}
            floatingLabelText="Name of the test"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />

          <SelectField
            style={styles.firstLine.two}
            iconStyle={styles.firstLine.icon}
            value={this.state.model.test_class.id}
            floatingLabelText="Select test class"
            floatingLabelFixed={false}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onChange={(e, key, value) => {
              for (let klass of this.state.testClasses){
                if (klass.id == value){
                  this.updateModel({ "test_class": klass });
                }
              }
            }}
          >

            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.testClasses.map((klass, index) => <MenuItem value={klass.id} key={index} primaryText={klass.class_name} label={klass.class_name} />)}
          </SelectField>
        </div>

        <div style={styles.secondLine.container}>
          <TextField
            onChange={(e, value) => this.updateModel({ "description": value })}
            value={this.state.model.description}
            style={styles.secondLine.one}
            floatingLabelText="Test description"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />
        </div>

        <div style={styles.thirdLine.container}>
          <TextField
            value={this.state.newTag}
            onChange={(e, value) => { this.setState({ newTag: value }); }}
            floatingLabelText="Add tags"
            style={styles.thirdLine.one}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onKeyPress={e => e.key === "Enter" ? this.updateModel({ tags: [...this.state.model.tags, this.state.newTag] }) : null}
          />
          <div style={styles.thirdLine.two}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.model.tags.map((tag, i) => <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }} key={`${tag}-${i}`}>{tag}</Chip>)}
          </div>
        </div>

        <div style={styles.fourthLine.container}>

          <div style={styles.fourthLine.column}>
            <h3>Observation source:</h3>

            <SelectField
              value="2"
              onChange={e => { }}
              floatingLabelText="Select observer"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            >
              <MenuItem value="0"><em>None</em></MenuItem>
              <MenuItem value="1"><em>Option 1</em></MenuItem>
              <MenuItem value="2"><em>Option 2</em></MenuItem>
            </SelectField>

            <TextField
              value="Neuron type"
              style={{ width: "100%" }}
              floatingLabelText="Enter the type of neuron"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />

            <TextField
              value="enter an url"
              style={{ width: "100%" }}
              floatingLabelText="Enter the URL for the model"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
          </div>

          <div style={styles.fourthLine.column}>
            <h3>Observation values:</h3>
            <ParamsForm
              schema={this.state.model.test_class.observation_schema}
              onChange={observation => {
                this.updateModel({
                  observation
                });
              }}
            />
          </div>

          <div style={styles.fourthLine.column}>
            <h3>Test parameters:</h3>
            <ParamsForm
              schema={this.state.model.test_class.test_parameters_schema}
              onChange={params => {
                this.updateModel({
                  params
                });
              }}
            />
          </div>
        </div>
        <div style={styles.actionsContainer}>
          <RaisedButton
            label="save"
            style={styles.actionsButton}
            onClick={() => this.props.onSave(this.state.model)}
          />
          <RaisedButton
            label="cancel"
            style={styles.actionsButton}
            onClick={() => this.props.toggleTestForm()}
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
