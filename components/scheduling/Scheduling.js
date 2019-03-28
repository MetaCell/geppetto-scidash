import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import DDListContainer from "./DDListContainer";
import CompatibilityTable from "./CompatibilityTable";
import SchedulingApiService from "../../services/api/SchedulingApiService";

class Scheduling extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state = {
      saveSuites: false,
      suitesName: `Suites_${new Date().toJSON().slice(0, 19)}`.replace(/[-:]/g, "_") // a default date set to today
    };

  }

  getItemByID (ids){
    return this.props.data.filter(item => ids.includes(item.scheduler_id));
  }

  async scheduleTests (matrix){
    let schedulingService = new SchedulingApiService();

    let result = await schedulingService.create(matrix);
  }

  render () {
    const { saveSuites, suitesName } = this.state;

    const { choosedTests, choosedModels } = this.props;

    return (
      <span>
        <DDListContainer />
        
        {choosedModels.length > 0 && choosedTests.length > 0 ?  
          <span>
            <CompatibilityTable // renders a table with compatibility between selected tests and models
              tests={this.getItemByID(choosedTests)} 
              models={this.getItemByID(choosedModels)} 
            />
            <div style={styles.saveContainer}>
              <RaisedButton
                onClick={() => this.scheduleTests({
                  "tests": this.getItemByID(choosedTests),
                  "models": this.getItemByID(choosedModels)
                })}
              >
                Run tests
              </RaisedButton>
              {saveSuites ?
                <span style={styles.saveSubContainer}>
                  <TextField
                    value={suitesName}
                    style={styles.saveRoot}
                    placeholder='Name the suites'
                    floatingLabelText="Enter a name"
                    onChange={e => this.setState({ suitesName: e.target.value })}
                    onKeyPress={e => e.key === "Enter" ? () => {} : null}
                  />
                </span>
                : null
              }
            </div>
            <div style={styles.checkboxContainer}>
              <Checkbox
                checked={saveSuites}
                label="Save as Suite"
                style={styles.checkbox}
                onClick={e => this.setState(oldState => ({ saveSuites: !oldState.saveSuites }))}
              />
            </div>
          </span>
          : null
        }
      </span>
    );
  }
}

export default Scheduling;

const styles = {
  saveContainer: {
    textAlign: "center",
    marginTop: "35px",
    position: "relative"
  },
  saveSubContainer: {
    position: "absolute",
    marginLeft: "0px",
    marginTop: "-26px"
  },
  saveButton: {
    display: "inline-block"
  },
  saveRoot: {
    marginLeft: "10px",
    width: "200px"
  },
  checkboxContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    width: "160px"
  },
  checkbox: {
    marginLeft: "20px"
  }
};
