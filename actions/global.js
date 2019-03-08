
export function error (globalState, action){
  let errors = globalState.errors;

  errors.push(action.message);

  return {
    ...globalState,
    errors
  };
}

export function clearErrors (globalState, action){
  return {
    ...globalState,
    errors: []
  };
}