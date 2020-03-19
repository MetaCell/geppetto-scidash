import $ from "jquery";
import TestInstancesGriddleAdapter from "../shared/adapter/TestInstancesGriddleAdapter";
import FilteringService from "../services/FilteringService";
import Config from "../shared/Config";
import ApiService from "../services/api/ApiService";
import TestInstancesAutocompleteAdapter from "../shared/adapter/TestInstancesAutocompleteAdapter";


export function filteringTestsStarted (state, action){

  $(".griddle-page-select").hide();

  let newState = { ...state };

  return newState;
}

export function filteringTestsFinished (state, action){

  let data = new TestInstancesGriddleAdapter(action.models).getGriddleData();

  $(".griddle-page-select").show();
  let newState = {
    ...state,
    data: data,
    autoCompleteData: new TestInstancesAutocompleteAdapter(data).getAutocompleteData()
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

  for (let entry of Object.entries(filteringService.getFilters(Config.testInstancesNamespace))){
    action.filter(entry[1], entry[0], action.dispatch, true);
  }

  return {
    ...state,
    dateFilterChanged: false
  };
}

export function testCreateFinished (state, action){
  let resultArray = [action.result];
  let adopted = new TestInstancesGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  state.data = [
    ...adopted,
    ...state.data
  ];

  return { ...state };
}

export function testCloneFinished (state, action){
  let resultArray = [action.model];
  let adopted = new TestInstancesGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  state.data = [
    ...adopted,
    ...state.data
  ];

  return { ...state };
}


export function testEditFinished (state, action){
  let resultArray = [action.result];
  let adopted = new TestInstancesGriddleAdapter(resultArray).getGriddleData();

  let apiService = new ApiService();
  apiService.clearCache(apiService.storage);

  var index = undefined;
  for (let i = 0; i < state.data.length; i++) {
    if (state.data[i].id === adopted[0].id) {
      index = i;
      break;
    }
  }
  if (index === undefined) {
    state.data = [
      ...adopted,
      ...state.data
    ];
  } else {
    state.data = [
      ...adopted,
      ...state.data.slice(0, index),
      ...state.data.slice(index + 1)
    ];
  }

  return { ...state };
}