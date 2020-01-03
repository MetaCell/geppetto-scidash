import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import { Redirect } from "react-router-dom";
import DDListContainer from "./DDListContainer";
import CompatibilityTable from "./CompatibilityTable";
import SchedulingApiService from "../../services/api/SchedulingApiService";
import Loader from "../loader/Loader";
import PagesService from "../../services/PagesService";
import {changePage} from "../../actions/creators/header";


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

  }

  componentWillMount () {
    if (!this.props.user.isLogged) {
      this.props.notLoggedRedirect();
    }
  }

  getItemByID (ids) {
    return this.props.data.filter(item => ids.includes(item.scheduler_id));
  }

  async scheduleTests (matrix) {
    this.setState({
      showLoading: true
    });

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

    this.setState({
      compatible: result
    }, () => console.log(this.state.compatible));

    return result;

  }

  render () {
    const { saveSuites, suitesName } = this.state;

    const { choosedTests, choosedModels } = this.props;

    let pagesService = new PagesService();

    if (this.state.scheduled) this.props.gotoScorePage();

    return (
      <span>
        <DDListContainer />


        {choosedModels.length > 0 && choosedTests.length > 0 ?
          <span>
            <CompatibilityTable // renders a table with compatibility between selected tests and models
              tests={this.getItemByID(choosedTests)}
              models={this.getItemByID(choosedModels)}
              onFinish={this.saveCompatible}
            />
            <div style={styles.saveContainer}>
              <RaisedButton
                onClick={() => this.scheduleTests(this.state.compatible)}
              >
                Run tests
              </RaisedButton>
            </div>
            {saveSuites ?
              <div style={styles.saveSubContainer}>
                <TextField
                  value={suitesName}
                  style={styles.saveRoot}
                  placeholder='Name the suites'
                  floatingLabelText="Enter a name"
                  onChange={e => this.setState({ suitesName: e.target.value })}
                  onKeyPress={e => e.key === "Enter" ? () => { } : null}
                />
              </div>
              : null
            }
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
    paddingLeft: "-20px",
    paddingTop: "15px",
    textAlign: "center",
    width: "160px"
  },
  checkbox: {
    marginLeft: "5px"
  }
};
