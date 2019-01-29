export default function scidashModelClasses (state = {}, action){
  console.group("SCIDASH MODEL CLASSES REDUCER");

  if (action !== null){
    console.log("ACTION DISPATCHED: ", action);
  }

  let newState = null;

  newState = {
    ...state
  };

  console.log("Current state: ", newState);
  console.groupEnd();

  return newState;
}
