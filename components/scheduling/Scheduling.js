import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';


import { CustomTable } from './partial';





class Scheduling extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      saveSuites: false,
      suitesName: `Suites__${new Date().toJSON().slice(0, 19)}`.replace(/[-:]/g, "_")
    }
    
  }

  render () {
    const { saveSuites, suitesName } = this.state;
    const { data, models, tests, addModelToScheduler, addTestToScheduler, removeTestFromScheduler, removeModelFromScheduler, setDraggingState, dragging } = this.props;
    return (
      <span>
        

        {models.length > 0 && tests.length > 0 ?  
          <span>
            <CustomTable tests={tests} models={models} />
            <div style={styles.saveContainer}>
              <RaisedButton style={styles.saveButton}>Run tests</RaisedButton>
              {saveSuites ?
                <span style={styles.saveSubContainer}>
                  <TextField
                    value={suitesName}	
                    floatingLabelText="Enter a name"
                    placeholder='Name the suites'
                    style={styles.saveRoot}
                    onChange={e => this.setState({ suitesName: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? this.doSomethingToAddTab(e.target.value) : null}
                  />
                </span> 
                : null
              }
            </div>
            <div style={styles.radioContainer}>
              <Checkbox
                label="Save as Suite"
                checked={saveSuites}
                onClick={e => this.doSomethingToHandleSaveSuite(e.target.checked)}
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
  searchRoot: { 
    position: 'relative', 
    width: '80%', 
    left: '20px', 
    top: '5px'
  },
  searchInput: { 
    paddingLeft: '38px', 
    borderRadius: '25px', 
    position:'relative', 
    boxShadow: "none", 
    border: "1px solid grey", 
    height: "2em" 
  },
  saveContainer: { 
    textAlign: 'center', 
    marginTop: '35px', 
    position: 'relative' 
  },
  saveSubContainer: { 
    position: 'absolute', marginLeft: '25px' 
  },
  saveButton: {
    display: 'inline-block'
  },
  saveRoot: { 
    marginLeft: '10px', width: '200px' 
  },
  saveInput: { 
    outline: 'none !important', 
    border: 'none !important', 
    boxShadow: 'none !important' 
  }, // frontend overides these props upstream
  searchIcon: {
    position: 'absolute', 
    left:'10px'
  },
  radioContainer: {
    textAlign: 'center', position: 'relative'
  },
  radioRoot: {
    marginLeft:'15px'
  },
  header: {
    position: 'relative', left: '20px', top: "9px"
  },
  divider: {
    marginTop: '12px' 
  },
};