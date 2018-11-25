import { connect } from 'react-redux';
import Scheduling from './Scheduling';

const mapStateToProps = state => {
  return {
    data,
    tests: [],
    models: [],
    dragging: false
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addModelToScheduler: ()=>{}, 
    addTestToScheduler: ()=>{}, 
    removeTestFromScheduler: ()=>{}, 
    removeModelFromScheduler: ()=>{}, 
    setDraggingState: ()=>{}, 
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scheduling)

const data = [ // fake 
  { type: 'TESTS', name: 'My first test', meta: 'Rheobase test', id: 0 }, 
  { type: 'MODELS', name: 'My first model', meta: 'Reduced model', id: 1 }, 
  { type: 'TESTS', name: 'My second test', meta: 'VM test', id: 2 },
  { type: 'MODELS', name: 'My second model', meta: 'Reduced model', id: 3 }, 
  { type: 'TESTS', name: 'My third test', meta: 'VM test', id: 4 }, 
  { type: 'MODELS', name: 'My third model', meta: 'Reduced model', id: 5 },
]