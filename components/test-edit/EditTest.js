import React from 'react';
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { brown500 } from 'material-ui/styles/colors';

export default class EditTest extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      selectedClass: '',
    }
  }

  render() {
    return (
      <span>
        <div style={styles.firstLine.container}>
          <TextField
            value="test name"
            style={styles.firstLine.one}
            floatingLabelText="Name of the model"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />

          <SelectField
            style={styles.firstLine.two}
            underlineStyle={{color: "grey"}}
            value={this.state.selectedClass}
            floatingLabelText="Select test class"
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onChange={( event, index, value ) => this.setState({ selectedClass: value })}
          >
            <MenuItem value="None"><em>None</em></MenuItem>
            <MenuItem value={1} primaryText="Option 1" label="Option 1" />
            <MenuItem value={2} primaryText="Option 2" label="Option 2" />
            <MenuItem value={3} primaryText="option 3" label="Option 3" />
          </SelectField>
        </div>

        <div style={styles.secondLine.container}>
          <TextField
            value="a description of the model"
            style={styles.secondLine.one}
            floatingLabelText="Test description"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />
        </div>

        <div style={styles.thirdLine.container}>
          <TextField
            value="new_tag"
            onChange={() => null}
            floatingLabelText="Add tags"
            style={styles.thirdLine.one}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onKeyPress={e => e.key === 'Enter' ? () => {} : null}

          />
          <div style={styles.thirdLine.two}>
            <Chip	style={{ marginLeft: 4, marginTop: 4, float: "left" }}>A tag</Chip>
            <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }}>Another tag</Chip>
            <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }}>A third tag</Chip>
          </div>
        </div>

        <div style={styles.fourthLine.container}>

          <div style={styles.fourthLine.column}>
            <h3>Observation source:</h3>

            <SelectField
              value="2"
              onChange={e => {}}
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
              value={"enter an url"}
              style={{ width: "100%" }}
              floatingLabelText="Enter the URL for the model"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
          </div>

          <div style={styles.fourthLine.column}>
            <h3 >Observation values:</h3>
            <TextField
                value={22}
                style={{ width: "100%" }}
                floatingLabelText={"A parameter"}
                underlineStyle={{ borderBottom: "1px solid grey" }}
            />
            <TextField
                value={33}
                style={{ width: "100%" }}
                floatingLabelText={"A parameter"}
                underlineStyle={{ borderBottom: "1px solid grey" }}
            />
          </div>

          <div style={styles.fourthLine.column}>
            <h3 >Test parameters:</h3>
            <TextField
              value="1000 ms"
              style={{ width: "100%" }}
              floatingLabelText="Enter the type of neuron"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
            <TextField
              value="0.25 ms"
              style={{ width: "100%" }}
              floatingLabelText="Enter the type of neuron"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
            <TextField
              value="IClamp"
              style={{ width: "100%" }}
              floatingLabelText="Enter the type of neuron"
              underlineStyle={{ borderBottom: "1px solid grey" }}
            />
          </div>
        </div>
      <div style={styles.actionsContainer}>
        <RaisedButton
          label="save"
          style={styles.actionsButton}
          onClick={() => this.props.activateEditTest()}
        />
        <RaisedButton
          label="cancel"
          style={styles.actionsButton}
          onClick={() => this.props.activateEditTest()}
        />
      </div>
    </span>
    )
  }
}

const styles = {
  actionsContainer: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  actionsButton: {
    width: '100px'
  },
  firstLine: {
    container: {
      width: '100%',
      display: 'flex',
      flexFlow: 'horizontal',
      justifyContent: "space-around",
      alignItems: "center"
    },
    one: { flex: 2 },
    two: { flex: 2, marginLeft: '25px' },
  },
  secondLine: {
    container: { width: '100%', marginTop: 12 },
    one: { width: '100%' }
  },
  thirdLine: {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    one: { width: '20%' },
    two: { float: 'right', width: '79%' }
  },
  fourthLine: {
    container: {
      width: '100%',
      display: "flex",
      flexFlow: 'horizontal',
      alignItems: "stretch",
      justifyContent: "space-around",
    },
    column: {
      flex: 1,
      margin: '20px',
      display: "flex",
      flexFlow: 'column',
    },
  }
}
