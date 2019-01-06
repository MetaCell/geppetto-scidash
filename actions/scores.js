import ScoresGriddleAdapter from '../shared/adapter/ScoresGriddleAdapter';
import FilteringService from '../services/FilteringService';
import Config from '../shared/Config';

import $ from 'jquery';

export function filteringTestsStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state
    };

    return newState;
}

export function filteringTestsFinished(state, action){

    let adapter = new ScoresGriddleAdapter(action.scores)

    $(".griddle-page-select").show()

    let newState = {
        ...state,
        data: adapter.getGriddleData()
    }

    return newState;
}

export function dateFilterChanged(state, action){
    return {
        ...state,
        dateFilterChanged: true
    };
}

export function dateFilterClear(state, action){
    let filteringService = FilteringService.getInstance();

    filteringService.restoreFromInitial(Config.instancesNamespace);

    for (let entry of Object.entries(filteringService.getFilters(Config.instancesNamespace))){
        action.filter(entry[1], entry[0], action.dispatch, true)
    }

    return {
        ...state,
        dateFilterChanged: false
    }

}
