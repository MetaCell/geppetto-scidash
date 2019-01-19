import ApiService from '../services/api/ApiService';
import PagesService from '../services/PagesService';

export function addTestToScheduler(schedulerState, action){
    if (schedulerState.tests.indexOf(action.id) == -1) {
      let newState = {
          ...schedulerState,
          tests: [ ...schedulerState.tests, action.id ]
      };
      return newState
    }
    else {
      return { ...schedulerState }
    }
}

export function removeTestFromScheduler(schedulerState, action){

  let tests = schedulerState.tests.filter(id => id != action.id)
  
  return {
    ...schedulerState,
    tests
  }
}

export function addModelToScheduler(schedulerState, action){

    if (schedulerState.models.indexOf(action.id) == -1) {
      let newState = {
          ...schedulerState,
          models: [ ...schedulerState.models, action.id ]
      };
      return newState
    }
    else {
      return { ...schedulerState }
  }
}

export function removeModelFromScheduler(schedulerState, action){
  let models = schedulerState.models.filter(id => id != action.id)
  
  return {
    ...schedulerState,
    models
  }
}
