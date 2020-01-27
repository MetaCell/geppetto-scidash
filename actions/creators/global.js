export const ERROR = "ERROR";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export function error (message){
  return {
    type: ERROR,
    message
  };
}

export function clearErrors (){
  return { type: CLEAR_ERRORS };
}