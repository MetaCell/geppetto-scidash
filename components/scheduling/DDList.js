import React from 'react'
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { TestIcon, ModelsIcon } from '../../assets/CustomIcons';
import { brown500, blue500, grey500 } from 'material-ui/styles/colors';




const styles = {
  header: {
    position: 'relative', left: '20px', top: "9px", color: "black"
  },
  divider: {
    marginTop: '12px' 
  }
}

const colors = {
  start: "pink",
  hover: "orange",
  end: "white"
}
// DONT USE UPPERCASE FOR DRAGGABLE NOT DROPPABLE TYPES

export default class DDList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testsBGC: "white",
      modelsBGC: "white",
      dragging: false
    }
  }

  changeBGC(type, action) {
    if (action == "start") {
      if (type == "tests") {
        this.setState({ testsBGC: colors.start, dragging: type })
      }
      else {
        this.setState({ modelsBGC: colors.start, dragging: type })
      }
    }
    else if (action == "end") {
      this.setState({ modelsBGC: colors.end, testsBGC: colors.end, dragging: false })
    }
    else if (action == "enter") {
      if (type == "tests" && this.state.dragging == "tests") {
        this.setState({ testsBGC: colors.hover })
      }
      else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: colors.hover })  
      }
    }
    else if (action == "leave"){
      if (type == "tests" && this.state.dragging == "tests"){
        this.setState({ testsBGC: colors.start })  
      }
      else if (type == "models" && this.state.dragging == "models") {
        this.setState({ modelsBGC: colors.start })
      }
    }
  }
  render() {
    const { data, tests, models, onDrop } = this.props;
    return (
      <div className="scrolling">
        <div className="scrolling2">
          <TextField value="search" />
          <div className="scrolling3">
            {data.map( dataItem => (
              <Draggable 
                key={dataItem.id}
                type={dataItem.type}
                data={dataItem.id}
                className="scrolling3" 
                onDragEnd={() => this.changeBGC(dataItem.type, "end")}
                onDragStart={() => this.changeBGC(dataItem.type, "start")}
              >
                <ListItem
                  primaryText={dataItem.name}
                  secondaryText={dataItem.meta}
                  firstActionClass="fa fa-info"
                  secondActionClass="fa fa-chevron-right"
                  firstAction={() => { console.log("click info") }}
                  secondAction={() => { console.log("click send right") }}
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
            onDrop={ dropData => onDrop(dropData) }
            onDragEnter={() => this.changeBGC("tests", "enter")}
            onDragLeave={() => this.changeBGC("tests", "leave")}
            style={{ backgroundColor: this.state.testsBGC }}
          >
            {tests.map(({ name, meta, type, id }) => (
              <ListItem
                key={id}
                primaryText={name}
                secondaryText={meta}
                firstActionClass="fa fa-info"
                secondActionClass="fa fa-trash-o"
                firstAction={() => { console.log("click info") }}
                secondAction={() => { console.log("click delete") }}
                leftIconColor={brown500}
                leftIconSVG={TestIcon}
              />
            ))}
          </Droppable>
          
        </div>
        <div className="scrolling2">
          <h3 style={styles.header} >Models</h3> 
          <Divider style={styles.divider} />
          <Droppable
            types={["models"]}
            className="scrolling3" 
            onDrop={ dropData => onDrop(dropData) }
            onDragEnter={() => this.changeBGC("models", "enter")}
            onDragLeave={() => this.changeBGC("models", "leave")}
            style={{ backgroundColor: this.state.modelsBGC }}
          >
            {models.map(({ name, meta, id }) => (
              <ListItem
                key={id}
                primaryText={name}
                secondaryText={meta}
                firstActionClass="fa fa-info"
                secondActionClass="fa fa-trash-o"
                firstAction={() => { console.log("click info") }}
                secondAction={() => { console.log("click delete") }}
                leftIconColor={blue500}
                leftIconSVG={ModelsIcon}
              />
            ))}
          </Droppable>
        </div>

      </div>
    )  
  }
}

const ListItem = ({ primaryText, secondaryText, leftIconSVG, leftIconColor, firstActionClass, firstAction, secondActionClass, secondAction }) => (
  
    <div style={{display: 'flex', flexDirection: "row", justifyItems: "center", alignItems: "center"}}>
      <span style={{width: "40px", height: "40px", borderRadius: "40px", backgroundColor: leftIconColor, display: "flex", alignItems:"center", justifyContent:"center"}}>
        <SvgIcon color={"white"} style={{backgroundColor: leftIconColor}}>{leftIconSVG}</SvgIcon>
      </span>
      
      <span style={{width: '100px', marginLeft: "10px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
        <p style={{fontSize: "14px", margin: "0"}}>{primaryText}</p>
        <p style={{fontSize: "12px", margin: "0", color: "grey"}}>{secondaryText}</p>
      </span>
      
      <IconButton 
        iconStyle={{ color: grey500 }}
        onClick={() => firstAction()}
        iconClassName={firstActionClass}
      />

      <IconButton 
        iconStyle={{ color: grey500 }}
        onClick={() => secondAction()}
        iconClassName={secondActionClass}
      />
    </div>
)


        
  