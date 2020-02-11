import React from "react";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { Draggable, Droppable } from "react-drag-and-drop";
import { grey, brown, blue } from "@material-ui/core/colors";
import { TestIcon, ModelsIcon } from "../../assets/CustomIcons";
import InfoDialog from "../info-dialog/InfoDialog";
import Config from "../../shared/Config";

const styles = {
  header: { position: "relative", left: "20px", top: "9px", color: "black" },
  divider: { marginTop: "12px" }
};

const brownColors = {
  start: brown[200],
  hover: brown[100],
  end: "inherit"
};

const blueColors = {
  start: blue[200],
  hover: blue[100],
  end: "inherit"
};
// DONT USE UPPERCASE FOR DRAGGABLE NOT DROPPABLE TYPES

export default class DDList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      testsBGC: "none",
      modelsBGC: "none",
      dragging: false,
      searchable: "",
      dialogOpened: false
    };

    this.closeDialog = this.closeDialog.bind(this);

    this.infoDialog = undefined;
  }

  changeBGC (type, action) {
    if (action == "start") {
      if (type == "tests") {
        this.setState({ testsBGC: brownColors.start, dragging: type });
      } else {
        this.setState({ modelsBGC: blueColors.start, dragging: type });
      }
    } else if (action == "end") {
      this.setState({ modelsBGC: blueColors.end, testsBGC: brownColors.end, dragging: false });
    } else if (action == "enter") {
      if (type == "tests" && this.state.dragging == "tests") {
        this.setState({ testsBGC: brownColors.hover });
      } else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: blueColors.hover });
      }
    } else if (action == "leave") {
      if (type == "tests" && this.state.dragging == "tests") {
        this.setState({ testsBGC: brownColors.start });
      } else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: blueColors.start });
      }
    }
  }

  isSearchable (item){
    if (item.tags.includes("deprecated")) {
      return false;
    }
    if (this.state.searchable == ""){
      return true;
    }

    let re = new RegExp(`^${this.state.searchable}`, "i");

    return re.test(item.name);
  }

  openDialog (instance) {
    this.infoDialog = <InfoDialog instance={instance} closeDialog={this.closeDialog} dialogOpened />;
    this.setState({ dialogOpened: true });
  }

  closeDialog () {
    this.infoDialog = undefined;
    this.setState({ dialogOpened: false });
  }

  render () {
    const { data, choosedTests, choosedModels, addTest, addModel, removeTest, removeModel, onDrop } = this.props;

    return (
      <div className="scrolling">
        <div className="scrolling2">
          <TextField
            floatingLabelText="Search"
            value={this.state.searchable}
            onChange={(e, value) => this.setState({ searchable: value })}
          />
          <div className="scrolling3">
            {data
              .filter(
                item =>
                  !choosedModels.includes(item.scheduler_id)
                  && !choosedTests.includes(item.scheduler_id)
                  && this.isSearchable(item)
                  && !item.tags.includes(Config.noImportTag)
              )
              .map(dataItem => (
                <Draggable
                  key={dataItem.scheduler_id}
                  data={dataItem.scheduler_id}
                  type={!dataItem.source ? "tests" : "models"}
                  onDragEnd={() =>
                    this.changeBGC(
                      !dataItem.source ? "tests" : "models",
                      "end"
                    )
                  }
                  onDragStart={() =>
                    this.changeBGC(
                      !dataItem.source ? "tests" : "models",
                      "start"
                    )
                  }
                >
                  <ListItem
                    primaryText={dataItem.name}
                    secondaryText={dataItem.class}
                    firstActionClass="fa fa-info"
                    secondActionClass="fa fa-chevron-right"
                    firstAction={() => {
                      this.openDialog(dataItem);
                    }}
                    secondAction={() => {
                      !dataItem.source
                        ? addTest(dataItem.scheduler_id)
                        : addModel(dataItem.scheduler_id);
                    }}
                    leftIconSVG={!dataItem.source ? TestIcon : ModelsIcon}
                    leftIconColor={!dataItem.source ? brown[500] : blue[500]}
                  />
                </Draggable>
              ))}
          </div>
        </div>
        <div className="scrolling2">
          <h3 style={styles.header}>Tests</h3>
          <Divider style={styles.divider} />
          <Droppable
            types={["tests"]}
            className="scrolling3"
            onDrop={dropData => addTest(dropData.tests)}
            onDragEnter={() => this.changeBGC("tests", "enter")}
            onDragLeave={() => this.changeBGC("tests", "leave")}
            style={{ backgroundColor: this.state.testsBGC }}
          >
            {data
              .filter(item => choosedTests.includes(item.scheduler_id))
              .map(test => (
                <ListItem
                  key={test.scheduler_id}
                  primaryText={test.name}
                  secondaryText={test.class}
                  firstActionClass="fa fa-info"
                  secondActionClass="fa fa-trash-o"
                  firstAction={() => {
                    this.openDialog(test);
                  }}
                  secondAction={() => {
                    removeTest(test.scheduler_id);
                  }}
                  leftIconColor={brown[500]}
                  leftIconSVG={TestIcon}
                />
              ))}
          </Droppable>
          {this.state.dragging == "tests" ? (
            <p style={{ textAlign: "center", marginTop: "-25px" }}>
              DROP HERE
            </p>
          ) : null}
        </div>
        <div className="scrolling2">
          <h3 style={styles.header}>Models</h3>
          <Divider style={styles.divider} />
          <Droppable
            types={["models"]}
            className="scrolling3"
            onDrop={dropData => addModel(dropData.models)}
            onDragEnter={() => this.changeBGC("models", "enter")}
            onDragLeave={() => this.changeBGC("models", "leave")}
            style={{ backgroundColor: this.state.modelsBGC }}
          >
            {data
              .filter(item => choosedModels.includes(item.scheduler_id))
              .map(model => (
                <ListItem
                  key={model.scheduler_id}
                  primaryText={model.name}
                  secondaryText={model.class}
                  firstActionClass="fa fa-info"
                  secondActionClass="fa fa-trash-o"
                  firstAction={() => {
                    this.openDialog(model);
                  }}
                  secondAction={() => removeModel(model.scheduler_id)}
                  leftIconColor={blue[500]}
                  leftIconSVG={ModelsIcon}
                />
              ))}
          </Droppable>
          {this.state.dragging == "models" ? (
            <p style={{ textAlign: "center", marginTop: "-25px" }}>
              DROP HERE
            </p>
          ) : null}
        </div>
        {this.infoDialog}
      </div>
    );
  }
}

const ListItem = ({ primaryText, secondaryText, leftIconSVG, leftIconColor, firstActionClass, firstAction, secondActionClass, secondAction }) => (

  <div style={{ display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center", margin: "3px 8px 0px" }}>
    <span style={{ width: "40px", height: "40px", borderRadius: "40px", backgroundColor: leftIconColor, display: "flex", alignItems:"center", justifyContent:"center" }}>
      <SvgIcon color="white" style={{ backgroundColor: leftIconColor }}>{leftIconSVG}</SvgIcon>
    </span>

    <span style={{ flex: 1, marginLeft: "10px", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
      <p style={{ fontSize: "14px", margin: "0", color: "black" }}>{primaryText}</p>
      <p style={{ fontSize: "12px", margin: "0", color: "grey" }}>{secondaryText}</p>
    </span>

    <IconButton
      style={{ borderRadius: "40px" }}
      onClick={() => firstAction()}
      hoveredStyle={{ backgroundColor: grey[400] }}
      className={firstActionClass}
    />

    <IconButton
      style={{ borderRadius: "40px" }}
      onClick={scheduler_id => secondAction(scheduler_id)}
      hoveredStyle={{ backgroundColor: grey[400] }}
      className={secondActionClass}
    />
  </div>
);
