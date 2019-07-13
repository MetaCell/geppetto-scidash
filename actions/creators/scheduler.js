export const ADD_TEST_TO_SCHEDULER = "ADD_TEST_TO_SCHEDULER";
export const ADD_MODEL_TO_SCHEDULER = "ADD_MODEL_TO_SCHEDULER";
export const REMOVE_TEST_FROM_SCHEDULER = "REMOVE_TEST_FROM_SCHEDULER";
export const REMOVE_MODEL_FROM_SCHEDULER = "REMOVE_MODEL_FROM_SCHEDULER";
export const CLEAR_SCHEDULER = "CLEAR_SCHEDULER";

export function addTestToScheduler (testID){
  return {
    type: ADD_TEST_TO_SCHEDULER,
    testID
  };
}

export function removeTestFromScheduler (testID){
  return {
    type: REMOVE_TEST_FROM_SCHEDULER,
    testID
  };
}

export function addModelToScheduler (modelID){
  return {
    type: ADD_MODEL_TO_SCHEDULER,
    modelID
  };
}

export function removeModelFromScheduler (modelID){
  return {
    type: REMOVE_MODEL_FROM_SCHEDULER,
    modelID
  };
}

export function clearScheduler (){
  return {
    type: CLEAR_SCHEDULER
  };
}