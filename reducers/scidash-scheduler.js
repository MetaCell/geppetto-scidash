import * as actions from "../actions/scheduler";
import * as TYPES from "../actions/creators/scheduler";

export default function scidashScheduler (state = {}, action){
  let newState = null;

        
  switch (action.type){  
  case TYPES.ADD_TEST_TO_SCHEDULER:
    newState = {
      ...actions.addTestToScheduler(state, action)
    };
    break;
  case TYPES.REMOVE_TEST_FROM_SCHEDULER:
    newState = {
      ...actions.removeTestFromScheduler(state, action)
    };
    break;
  case TYPES.ADD_MODEL_TO_SCHEDULER:
    newState = {
      ...actions.addModelToScheduler(state, action)
    };
    break;
  case TYPES.REMOVE_MODEL_FROM_SCHEDULER:
    newState = {
      ...actions.removeModelFromScheduler(state, action)
    };
    break;
  default:
    newState = {
      ...state
    };
    break;
  }

  return newState;
}
