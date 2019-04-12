import $ from "jquery";
import ModelsGriddleAdapter from "../shared/adapter/ModelsGriddleAdapter";
import FilteringService from "../services/FilteringService";
import Config from "../shared/Config";
import ApiService from "../services/api/ApiService";


export function filteringModelsStarted (state, action){

  $(".griddle-page-select").hide();

  let newState = {
    ...state
  };

  return newState;
}

export function filteringModelsFinished (state, action){

  let adapter = new ModelsGriddleAdapter(action.models);

  $(".griddle-page-select").show();

  let newState = {
    ...state,
    data: adapter.getGriddleData()
  };

  return newState;
}

export function dateFilterChanged (state, action){
  return {
    ...state,
    dateFilterChanged: true
  };
}

export function dateFilterClear (state, action){
  let filteringService = FilteringService.getInstance();

  filteringService.restoreFromInitial(Config.modelInstancesNamespace);

  for (let entry of Object.entries(filteringService.getFilters(Config.modelInstancesNamespace))){
    action.filter(entry[1], entry[0], action.dispatch, true);
  }

  return {
    ...state,
    dateFilterChanged: false
  };

}

export function modelCreateFinished (state, action){
  let resultArray = [action.result];
  let adopted = new ModelsGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  state.data = [
    ...state.data,
    ...adopted
  ];

  return {
    ...state
  };
}

export function modelCloneFinished (state, action){
  let resultArray = [action.model];
  let adopted = new ModelsGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  state.data = [
    ...state.data,
    ...adopted
  ];

  return {
    ...state
  };
}

export function modelEditFinished (state, action){
  let resultArray = [action.model];
  let adopted = new ModelsGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  state.data = [
    ...state.data,
    ...adopted
  ];

  return {
    ...state
  };
}