import React from "react";
import Loader from "../loader/Loader";
import Button from "@material-ui/core/Button";
import DDListContainer from "./DDListContainer";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CompatibilityTable from "./CompatibilityTable";
import PagesService from "../../services/PagesService";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SchedulingApiService from "../../services/api/SchedulingApiService";

class Scheduling extends React.Component {

  constructor (props, context) {
    super(props, context);

    this.state = {
      saveSuites: false,
      compatible: {},
      showLoading: false,
      scheduled: false,
      suitesName: `Suites_${new Date().toJSON().slice(0, 19)}`.replace(/[-:]/g, "_") // a default date set to today
    };

    this.saveCompatible = this.saveCompatible.bind(this);

    if (!this.props.user.isLogged) {
      this.props.notLoggedRedirect();
    }
  }

  getItemByID (ids) {
    return this.props.data.filter(item => ids.includes(item.scheduler_id));
  }

  async scheduleTests (matrix) {
    try {
      this.setState({ showLoading: true });

      let payload = {
        suiteName: this.state.saveSuites ? this.state.suitesName : "",
        matrix,
      };

      let schedulingService = new SchedulingApiService();

      schedulingService.clearCache(schedulingService.storage);

      let result = await schedulingService.create(payload);

      this.setState({
        showLoading: false,
        scheduled: true
      });

      this.props.clearScheduler();

      return result;
    } catch (error) {
      this.setState(() => {
        throw "scheduleTests threw error " + error
      });
    }
  }

  saveCompatible (csvMatrix) {
    let result = {};
    let rows = csvMatrix.split(";");

    let header = rows.shift();
    header = header.split("|");
    header.shift();
    rows.pop();

    for (let row of rows) {

      row = row.split("|");
      let modelName = row.shift();
      let modelId = modelName.split("#")[1];

      result[modelId] = [];

      for (const [index, test] of header.entries()) {
        let testId = test.split("#")[1];

        if (row[index] == "TBD") {
          result[modelId].push(parseInt(testId));
        }

      }
    }

    this.setState({ compatible: result }, () => console.log(this.state.compatible));

    return result;

  }

  render () {
    const { saveSuites, suitesName } = this.state;

    const { choosedTests, choosedModels } = this.props;

    let pagesService = new PagesService();

    if (this.state.scheduled) {
      this.props.gotoScorePage();
    }

    return (
      <span>
        <DDListContainer />


        {choosedModels.length > 0 && choosedTests.length > 0
          ? <span>
            <CompatibilityTable // renders a table with compatibility between selected tests and models
              tests={this.getItemByID(choosedTests)}
              models={this.getItemByID(choosedModels)}
              onFinish={this.saveCompatible}
            />
            <div style={styles.saveContainer}>
              <Button
                id="run-tests"
                variant="contained"
                onClick={() => this.scheduleTests(this.state.compatible)}
              >
                Run tests
              </Button>
            </div>
            {saveSuites
              ? <div style={styles.saveSubContainer}>
                <TextField
                  value={suitesName}
                  id="enter-name"
                  style={styles.saveRoot}
                  placeholder='Name the suites'
                  label="Enter a name"
                  onChange={e => this.setState({ suitesName: e.target.value })}
                  onKeyPress={e => e.key === "Enter" ? () => { } : null}
                />
              </div>
              : null
            }
            <div style={styles.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="save-as-suite"
                    checked={saveSuites}
                    onClick={e => this.setState(oldState => ({ saveSuites: !oldState.saveSuites }))}
                    style={styles.checkbox}
                  />
                }
                label="Save as suite"
              />
            </div>
          </span>
          : null
        }
        {this.state.showLoading ? <Loader /> : ""}
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
    textAlign: "center",
    marginTop: "0px",
    position: "relative"
  },
  saveButton: { display: "inline-block" },
  saveRoot: {
    marginLeft: "10px",
    marginTop: "16px",
    width: "250px"
  },
  checkboxContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "-20px",
    paddingTop: "15px",
    textAlign: "center",
    width: "160px"
  },
  checkbox: { marginLeft: "5px" }
};
