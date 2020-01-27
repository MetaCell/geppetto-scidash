import ScoresApiService from "../../services/api/ScoresApiService";
import FilteringService from "../../services/FilteringService";
import Config from "../../shared/Config";
import Helper from "../../shared/Helper";

export const FILTERING_SUITES_STARTED = "FILTERING_SUITES_STARTED";
export const FILTERING_SUITES_FINISHED = "FILTERING_SUITES_FINISHED";
export const HIDE_MODEL = "HIDE_MODEL";
export const SHOW_ALL_MODELS = "SHOW_ALL_MODELS";
export const DATE_FILTER_CHANGED = "SUITES_DATE_FILTER_CHANGED";
export const DATE_FILTER_CLEAR = "SUITES_DATE_FILTER_CLEAR";

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

export function filteringSuitesFinished (scores){
  return {
    type: FILTERING_SUITES_FINISHED,
    scores
  };
}

export function filteringSuitesStarted (searchText, filterName, dispatch){
  let apiService = new ScoresApiService();
  let filteringService = FilteringService.getInstance();
  const namespace = Helper.getNamespaceFromKey(filterName, Config.suitesNamespace);

  filteringService.setupFilter("with_suites", true, namespace);

  if (searchText.length > 0) {
    filteringService.setupFilter(filterName, searchText, namespace);
  } else {
    filteringService.deleteFilter(filterName, namespace);
  }

  apiService.getList(false, namespace).then(result => {

    let filters = filteringService.getFilters(namespace);
    let filterString = Object.keys(filters).length ? "?" + filteringService.stringifyFilters(filters) : "";

    window.history.pushState("", "", `${location.pathname}` + filterString);
    dispatch(filteringSuitesFinished(result));

  });

  return { type: FILTERING_SUITES_STARTED };
}

export function hideModel (modelKey) {
  return {
    type: HIDE_MODEL,
    modelKey
  };
}

export function showAllModels (){
  return { type: SHOW_ALL_MODELS };
}
