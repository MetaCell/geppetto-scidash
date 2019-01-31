import $ from "jquery";
import TestInstancesGriddleAdapter from "../shared/adapter/TestInstancesGriddleAdapter";
import FilteringService from "../services/FilteringService";
import Config from "../shared/Config";


export function filteringTestsStarted (state, action){

  $(".griddle-page-select").hide();

  let newState = {
    ...state
  };

  return newState;
}

export function filteringTestsFinished (state, action){

  let adapter = new TestInstancesGriddleAdapter(action.models);

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

  state.data = [
    ...state.data,
    ...adopted
  ];

  return {
    ...state
  };
}