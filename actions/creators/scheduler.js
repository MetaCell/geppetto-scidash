export const ADD_TEST_TO_SCHEDULER = "ADD_TEST_TO_SCHEDULER";
export const ADD_MODEL_TO_SCHEDULER = "ADD_MODEL_TO_SCHEDULER";
export const REMOVE_TEST_FROM_SCHEDULER = "REMOVE_TEST_FROM_SCHEDULER";
export const REMOVE_MODEL_FROM_SCHEDULER = "REMOVE_MODEL_FROM_SCHEDULER";

export function addTestToScheduler (id){
  return {
    type: ADD_TEST_TO_SCHEDULER,
    id
  };
}

export function removeTestFromScheduler (id){
  return {
    type: REMOVE_TEST_FROM_SCHEDULER,
    id
  };
}

export function addModelToScheduler (id){
  return {
    type: ADD_MODEL_TO_SCHEDULER,
    id
  };
}

export function removeModelFromScheduler (id){
  return {
    type: REMOVE_MODEL_FROM_SCHEDULER,
    id
  };
}