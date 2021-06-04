import {
  FILTERING_TESTS_STARTED,
  FILTERING_TESTS_FINISHED,
  DATE_FILTER_CHANGED,
  DATE_FILTER_CLEAR,
  TEST_CREATE_FINISHED,
  TEST_CLONE_FINISHED,
  TEST_EDIT_FINISHED
} from "../actions/creators/tests";
import {
  filteringTestsStarted,
  filteringTestsFinished,
  dateFilterChanged,
  dateFilterClear,
  testCreateFinished,
  testCloneFinished,
  testEditFinished
} from "../actions/tests";

export default function scidashTestInstances (state = {}, action){
  let newState = null;

  switch (action.type){
  case DATE_FILTER_CLEAR:
    newState = { ...dateFilterClear(state, action) };
    break;
  case DATE_FILTER_CHANGED:
    newState = { ...dateFilterChanged(state, action) };
    break;
  case FILTERING_TESTS_STARTED:
    newState = { ...filteringTestsStarted(state, action), showLoading: true };
    break;
  case FILTERING_TESTS_FINISHED:
    newState = { ...filteringTestsFinished(state, action), showLoading: false };
    break;
  case TEST_CREATE_FINISHED:
    newState = { ...testCreateFinished(state, action) };
    break;
  case TEST_CLONE_FINISHED:
    newState = { ...testCloneFinished(state, action) };
    break;
  case TEST_EDIT_FINISHED:
    newState = { ...testEditFinished(state, action) };
    break;
  default:
    newState = { ...state, };
    break;
  }

  return newState;
}
