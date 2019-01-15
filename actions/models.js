import ModelsGriddleAdapter from '../shared/adapter/ModelsGriddleAdapter';
import FilteringService from '../services/FilteringService';
import Config from '../shared/Config';

import $ from 'jquery';

export function filteringModelsStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state
    };

    return newState;
}

export function filteringModelsFinished(state, action){

    let adapter = new ModelsGriddleAdapter(action.models)

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

    filteringService.restoreFromInitial(Config.modelInstancesNamespace);

    for (let entry of Object.entries(filteringService.getFilters(Config.modelInstancesNamespace))){
        action.filter(entry[1], entry[0], action.dispatch, true)
    }

    return {
        ...state,
        dateFilterChanged: false
    }

}

