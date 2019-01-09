import React from 'react'
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { TestIcon, ModelsIcon } from '../../assets/CustomIcons';
import { brown500, blue500, grey400, grey600, brown200, brown100, blue200, blue100 } from 'material-ui/styles/colors';

const styles = {
  header: {
    position: 'relative', left: '20px', top: "9px", color: "black"
  },
  divider: {
    marginTop: '12px'
  }
}

const brownColors = {
  start: brown200,
  hover: brown100,
  end: "inherit"
}

const blueColors = {
  start: blue200,
  hover: blue100,
  end: "inherit"
}
// DONT USE UPPERCASE FOR DRAGGABLE NOT DROPPABLE TYPES

export default class DDList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testsBGC: "none",
      modelsBGC: "none",
      dragging: false
    }
  }

  changeBGC(type, action) {
    if (action == "start") {
      if (type == "tests") {
        this.setState({ testsBGC: brownColors.start, dragging: type })
      }
      else {
        this.setState({ modelsBGC: blueColors.start, dragging: type })
      }
    }
    else if (action == "end") {
      this.setState({ modelsBGC: blueColors.end, testsBGC: brownColors.end, dragging: false })
    }
    else if (action == "enter") {
      if (type == "tests" && this.state.dragging == "tests") {
        this.setState({ testsBGC: brownColors.hover })
      }
      else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: blueColors.hover })
      }
    }
    else if (action == "leave"){
      if (type == "tests" && this.state.dragging == "tests"){
        this.setState({ testsBGC: brownColors.start })
      }
      else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: blueColors.start })
      }
    }
  }
  render() {
    const { data, tests, models, addTest, addModel, removeTest, removeModel, onDrop } = this.props;
    return (
      <div className="scrolling">
        <div className="scrolling2">
          <TextField value="search" />
          <div className="scrolling3">
            {data.map( dataItem => (
              <Draggable
                key={dataItem.id}
                data={dataItem.id}
                type={dataItem.type}
                onDragEnd={() => this.changeBGC(dataItem.type, "end")}
                onDragStart={() => this.changeBGC(dataItem.type, "start")}
              >
                <ListItem
                  primaryText={dataItem.name}
                  secondaryText={dataItem.meta}
                  firstActionClass="fa fa-info"
                  secondActionClass="fa fa-chevron-right"
                  firstAction={() => { console.log("click info") }}
                  secondAction={() => { dataItem.type == "tests" ? addTest(dataItem.id) : addModel(dataItem.id)} }
                  leftIconSVG={dataItem.type == "tests" ? TestIcon : ModelsIcon}
                  leftIconColor={dataItem.type == "tests" ? brown500 : blue500}
                />
              </Draggable>
            ))}
          </div>
        </div>
        <div className="scrolling2">
          <h3 style={styles.header} >Tests</h3>
          <Divider style={styles.divider} />
          <Droppable
            types={["tests"]}
            className="scrolling3" 
            onDrop={ dropData => addTest(parseInt(dropData.tests)) }
            onDragEnter={() => this.changeBGC("tests", "enter")}
            onDragLeave={() => this.changeBGC("tests", "leave")}
            style={{ backgroundColor: this.state.testsBGC }}
          >
            {data.filter(item => tests.includes(item.id)).map(test => (
              <ListItem
                key={test.id}
                primaryText={test.name}
                secondaryText={test.meta}
                firstActionClass="fa fa-info"
                secondActionClass="fa fa-trash-o"
                firstAction={() => { console.log("click info") }}
                secondAction={() => { removeTest(test.id) }}
                leftIconColor={brown500}
                leftIconSVG={TestIcon}
              />
            ))}
          </Droppable>
          {this.state.dragging == "tests" ? <p style={{ textAlign: "center", marginTop: "-25px" }}>DROP HERE</p> : null}

        </div>
        <div className="scrolling2">
          <h3 style={styles.header} >Models</h3>
          <Divider style={styles.divider} />
          <Droppable
            types={["models"]}
            className="scrolling3" 
            onDrop={ dropData => { addModel(parseInt(dropData.models)) }}
            onDragEnter={() => this.changeBGC("models", "enter")}
            onDragLeave={() => this.changeBGC("models", "leave")}
            style={{ backgroundColor: this.state.modelsBGC }}
          >
            {data.filter(item => models.includes(item.id)).map(model => (
              <ListItem
                key={model.id}
                primaryText={model.name}
                secondaryText={model.meta}
                firstActionClass="fa fa-info"
                secondActionClass="fa fa-trash-o"
                firstAction={() => { console.log("click info") }}
                secondAction={() => removeModel(model.id)}
                leftIconColor={blue500}
                leftIconSVG={ModelsIcon}
              />
            ))}
          </Droppable>
          {this.state.dragging == "models" ? <p style={{ textAlign: "center", marginTop: "-25px" }}>DROP HERE</p> : null}
        </div>

      </div>
    )
  }
}

const ListItem = ({ primaryText, secondaryText, leftIconSVG, leftIconColor, firstActionClass, firstAction, secondActionClass, secondAction }) => (

    <div style={{display: 'flex', flexDirection: "row", justifyItems: "center", alignItems: "center", margin: "3px 8px 0px"}}>
      <span style={{width: "40px", height: "40px", borderRadius: "40px", backgroundColor: leftIconColor, display: "flex", alignItems:"center", justifyContent:"center"}}>
        <SvgIcon color={"white"} style={{backgroundColor: leftIconColor}}>{leftIconSVG}</SvgIcon>
      </span>

      <span style={{flex: 1, marginLeft: "10px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
        <p style={{fontSize: "14px", margin: "0", color: "black"}}>{primaryText}</p>
        <p style={{fontSize: "12px", margin: "0", color: "grey"}}>{secondaryText}</p>
      </span>

      <IconButton
        style={{borderRadius: "40px"}}
        iconStyle={{ color: grey600 }}
        onClick={() => firstAction()}
        hoveredStyle={{ backgroundColor: grey400 }}
        iconClassName={firstActionClass}
      />

      <IconButton
        style={{borderRadius: "40px"}}
        iconStyle={{ color: grey600 }}
        onClick={(id) => secondAction(id)}
        hoveredStyle={{ backgroundColor: grey400 }}
        iconClassName={secondActionClass}
      />
    </div>
)




