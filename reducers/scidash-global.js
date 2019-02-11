import {
  openTestsView,
  openSuitesView
} from "../actions/shared";
import {
  OPEN_SUITES_VIEW,
  OPEN_TESTS_VIEW
} from "../actions/creators/shared";

export default function scidashGlobal (state = {}, action){
  let newState = null;

  switch (action.type){
  case OPEN_SUITES_VIEW:
    newState = {
      ...openSuitesView(state, action, "global")
    };
    break;
  case OPEN_TESTS_VIEW:
    newState = {
      ...openTestsView(state, action, "global")
    };
    break;
  default:
    newState = {
      ...state,
    };
    break;
  }

  return newState;
}
