import {
  openTestsView,
  openSuitesView
} from "../actions/shared";
import {
  OPEN_SUITES_VIEW,
  OPEN_TESTS_VIEW
} from "../actions/creators/shared";

import { error } from "../actions/global";
import { ERROR } from "../actions/creators/global";

export default function scidashGlobal (state = {}, action){
  let newState = null;

  switch (action.type){
  case OPEN_SUITES_VIEW:
    newState = { ...openSuitesView(state, action, "global") };
    break;
  case OPEN_TESTS_VIEW:
    newState = { ...openTestsView(state, action, "global") };
    break;
  case ERROR:
    newState = { ...error(state, action) };
    break;
  default:
    newState = { ...state, };
    break;
  }

  return newState;
}
