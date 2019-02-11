import {
  toggleSettings,
  hideSettings,
  toggleColorBlind,
  toggleDrawer,
  changePage,
  toggleCreateModel,
  toggleCreateTest,
} from "../actions/header";
import {
  openTestsView,
  openSuitesView
} from "../actions/shared";
import {
  TOGGLE_SETTINGS,
  HIDE_SETTINGS,
  TOGGLE_COLOR_BLIND,
  TOGGLE_DRAWER,
  CHANGE_PAGE,
  TOGGLE_CREATE_MODEL,
  TOGGLE_CREATE_TEST
} from "../actions/creators/header";
import {
  OPEN_SUITES_VIEW,
  OPEN_TESTS_VIEW
} from "../actions/creators/shared";


export default function scidashHeader (state = {}, action){
  let newState = null;

  switch (action.type){
  case TOGGLE_SETTINGS:
    newState = {
      ...toggleSettings(state, action)
    };
    break;
  case HIDE_SETTINGS:
    newState = {
      ...hideSettings(state, action)
    };
    break;
  case TOGGLE_COLOR_BLIND:
    newState = {
      ...toggleColorBlind(state, action)
    };
    break;
  case OPEN_SUITES_VIEW:
    newState = {
      ...openSuitesView(state, action, "header")
    };
    break;
  case OPEN_TESTS_VIEW:
    newState = {
      ...openTestsView(state, action, "header")
    };
    break;
  case TOGGLE_DRAWER:
    newState = {
      ...toggleDrawer(state, action)
    };
    break;
  case CHANGE_PAGE:
    newState = {
      ...changePage(state, action)
    };
    break;
  case TOGGLE_CREATE_TEST:
    newState = {
      ...toggleCreateTest(state, action)
    };
    break;
  case TOGGLE_CREATE_MODEL:
    newState = {
      ...toggleCreateModel(state, action)
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
