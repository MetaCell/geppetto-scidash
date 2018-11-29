import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import DDList from './DDList';
import CustomTable from './CustomTable';


const draggableData = [ // fake 
  { type: 'tests', name: 'My first test', meta: 'Rheobase test', id: 0 }, 
  { type: 'models', name: 'My first model', meta: 'Reduced model', id: 1 }, 
  { type: 'tests', name: 'My second test', meta: 'VM test', id: 2 },
  { type: 'models', name: 'My second model', meta: 'Reduced model', id: 3 }, 
  { type: 'tests', name: 'My third test', meta: 'VM test', id: 4 }, 
  { type: 'models', name: 'My third model', meta: 'Reduced model', id: 5 },
]

class Scheduling extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      saveSuites: false,
      selectedTestIDs: [0],
      selectedModelIDs: [1],
      suitesName: `Suites_${new Date().toJSON().slice(0, 19)}`.replace(/[-:]/g, "_") // a default date set to today
    }
    
  }

  getItemByID(ids){
    return draggableData.filter(item => ids.includes(item.id))
  }

  drop(dropData){
    const { selectedTestIDs, selectedModelIDs } = this.state;
    if (Object.keys(dropData).indexOf("tests") > -1) {
      const index = parseInt(dropData.tests)
      if (selectedTestIDs.indexOf(index) == -1) {
        this.setState( oldState => ({ selectedTestIDs: [ ...oldState.selectedTestIDs, index] }) )
      }
    }
    else {
      const index = parseInt(dropData.models)
      if (selectedModelIDs.indexOf(index) == -1) {
        this.setState( oldState => ({ selectedModelIDs: [ ...oldState.selectedModelIDs, index] }) )
      }
    }
  }

  render () {
    const { saveSuites, suitesName, selectedTestIDs, selectedModelIDs } = this.state;
    return (
      <span>
        <DDList 
          data={draggableData} // available tests and models
          onDrop={dropData => this.drop(dropData)}
          tests={this.getItemByID(selectedTestIDs)}   // selected tests
          models={this.getItemByID(selectedModelIDs)} // selected models
        />
        
        {selectedTestIDs.length > 0 && selectedModelIDs.length > 0 ?  
          <span>
            <CustomTable  //renders a table with compatibility between selected tests and models
              tests={this.getItemByID(selectedTestIDs)} 
              models={this.getItemByID(selectedModelIDs)} 
            />
            <div style={styles.saveContainer}>
              <RaisedButton >Run tests</RaisedButton>
              {saveSuites ?
                <span style={styles.saveSubContainer}>
                  <TextField
                    value={suitesName}	
                    style={styles.saveRoot}
                    placeholder='Name the suites'
                    floatingLabelText="Enter a name"
                    onChange={e => this.setState({ suitesName: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? ()=>{} : null}
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
    )
  }
}

export default Scheduling

const styles = {
  saveContainer: { 
    textAlign: 'center', 
    marginTop: '35px', 
    position: 'relative' 
  },
  saveSubContainer: { 
    position: 'absolute', 
    marginLeft: '0px',
    marginTop: '-26px' 
  },
  saveButton: {
    display: 'inline-block'
  },
  saveRoot: { 
    marginLeft: '10px', 
    width: '200px' 
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