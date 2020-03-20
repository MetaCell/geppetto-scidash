import ScoresApiService from "../../services/api/ScoresApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import Helper from "../../shared/Helper";

export const FILTERING_SCORES_STARTED = "FILTERING_SCORES_STARTED";
export const FILTERING_SCORES_FINISHED = "FILTERING_SCORES_FINISHED";
export const DATE_FILTER_CHANGED = "INSTANCES_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "INSTANCES_DATE_FILTER_CLEAR";
export const UPDATE_SCORES = "UPDATE_SCORES";
export const UPDATE_SCORES_FINISHED = "UPDATE_SCORES_FINISHED";

export function dateFilterChanged (){
  return { type: DATE_FILTER_CHANGED };
}

export function clearDateFilter (filter, dispatch){
  return {
    type: DATE_FILTER_CLEAR,
    filter,
    dispatch
  };
}

export function filteringScoresFinished (scores){
  return {
    type: FILTERING_SCORES_FINISHED,
    scores
  };
}

export function filteringScoresStarted (searchText, filterName, dispatch){
  let apiService = new ScoresApiService();
  let filteringService = FilteringService.getInstance();
  const namespace = Config.scoresNamespace;

  if (searchText && searchText.length > 0) {
    filteringService.setupFilter(filterName, searchText, namespace);
  } else {
    filteringService.deleteFilter(filterName, namespace);
  }

  filteringService.deleteFilter("with_suites");

  apiService.getList(false, namespace).then(result => {
    window.history.pushState("", "", `${location.pathname}` + filteringService.getQueryString (namespace));

    let filters = filteringService.getFilters(namespace);

    let filterString = Object.keys(filters).length ? "/?" + filteringService.stringifyFilters(filters) : "";

    dispatch(filteringScoresFinished(result));

  });

  return { type: FILTERING_SCORES_STARTED };
}

export function updateScoresFinished (result){
  return {
    type: UPDATE_SCORES_FINISHED,
    scores: result
  };
}

export function updateScores (dispatch){
  let scoresApiService = new ScoresApiService();

  scoresApiService.clearCache(scoresApiService.storage);

  scoresApiService.getList(false, Config.scoresNamespace).then(result => {
    dispatch(updateScoresFinished(result));
  });

  return { type: UPDATE_SCORES };
}