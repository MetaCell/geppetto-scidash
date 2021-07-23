import $ from "jquery";
import ScoresGriddleAdapter from "../shared/adapter/ScoresGriddleAdapter";
import FilteringService from "../services/FilteringService";
import Config from "../shared/Config";
import ScoresAutocompleteAdapter from "../shared/adapter/ScoresAutocompleteAdapter";


export function filteringScoresStarted (state, action){

  $(".griddle-page-select").hide();

  let newState = { ...state };

  return newState;
}

export function filteringScoresFinished (state, action){

  let data = new ScoresGriddleAdapter(action.scores).getGriddleData();

  $(".griddle-page-select").show();

  let newState = {
    ...state,
    data: data,
    autoCompleteData: new ScoresAutocompleteAdapter(data).getAutocompleteData()
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

  filteringService.restoreFromInitial(Config.globalNamespace, 'timestamp_from');
  filteringService.restoreFromInitial(Config.globalNamespace, 'timestamp_to');

  for (let entry of Object.entries(filteringService.getFilters(Config.globalNamespace))){
    action.filter(entry[1], entry[0], action.dispatch, true);
  }

  return {
    ...state,
    dateFilterChanged: false
  };

}

export function updateScoresFinished (state, action){
  let adapter = new ScoresGriddleAdapter(action.scores);

  let newState = {
    ...state,
    data: adapter.getGriddleData()
  };

  return newState;
}