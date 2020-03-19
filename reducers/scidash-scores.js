import {
  FILTERING_SCORES_STARTED,
  FILTERING_SCORES_FINISHED,
  UPDATE_SCORES_FINISHED,
  DATE_FILTER_CHANGED,
  DATE_FILTER_CLEAR
} from "../actions/creators/scores";
import {
  filteringScoresStarted,
  filteringScoresFinished,
  updateScoresFinished,
  dateFilterChanged,
  dateFilterClear
} from "../actions/scores";


export default function scidashScores (state = {}, action = null){
  let newState = null;

  switch (action.type){
  case DATE_FILTER_CLEAR:
    newState = { ...dateFilterClear(state, action) };
    break;
  case DATE_FILTER_CHANGED:
    newState = { ...dateFilterChanged(state, action) };
    break;
  case FILTERING_SCORES_STARTED:
    newState = { ...filteringScoresStarted(state, action) };
    break;
  case FILTERING_SCORES_FINISHED:
    newState = { ...filteringScoresFinished(state, action) };
    break;
  case UPDATE_SCORES_FINISHED:
    newState = { ...updateScoresFinished(state, action) };
    break;
  default:
    newState = { ...state, };
    break;
  }

  return newState;
}
