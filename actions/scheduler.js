
export function addTestToScheduler (schedulerState, action){
  if (schedulerState.choosedTests.indexOf(action.testID) == -1) {
    let newState = {
      ...schedulerState,
      choosedTests: [ ...schedulerState.choosedTests, action.testID ]
    };
    return newState;
  } else {
    return { ...schedulerState };
  }
}

export function removeTestFromScheduler (schedulerState, action){

  let tests = schedulerState.choosedTests.filter(testID => testID != action.testID);

  return {
    ...schedulerState,
    choosedTests: tests
  };
}

export function addModelToScheduler (schedulerState, action){

  if (schedulerState.choosedModels.indexOf(action.modelID) == -1) {
    let newState = {
      ...schedulerState,
      choosedModels: [ ...schedulerState.choosedModels, action.modelID ]
    };
    return newState;
  } else {
    return { ...schedulerState };
  }
}

export function removeModelFromScheduler (schedulerState, action){
  let models = schedulerState.choosedModels.filter(modelID => modelID != action.modelID);

  return {
    ...schedulerState,
    choosedModels: models
  };
}

export function clearScheduler (schedulerState, action){
  return {
    ...schedulerState,
    choosedModels: [],
    choosedTests: []
  };
}