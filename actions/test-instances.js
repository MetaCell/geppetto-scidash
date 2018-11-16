import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
import FilteringService from '../services/FilteringService';
import Config from '../shared/Config';

import $ from 'jquery';

export function filteringTestsStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state,
        showLoading: true
    };

    return newState;
}

export function filteringTestsFinished(state, action){

    let adapter = new TestInstancesGriddleAdapter(action.scores)

    $(".griddle-page-select").show()

    let newState = {
        ...state,
        showLoading: false,
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
        showLoading: false,
        dateFilterChanged: false
    }

}
