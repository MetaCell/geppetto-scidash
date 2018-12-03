import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import ScoreMatrixGriddleAdapter from '../shared/adapter/ScoreMatrixGriddleAdapter';
import FilteringService from '../services/FilteringService';
import Config from '../shared/Config';
import $ from 'jquery';

export function dateFilterChanged(state, action){
    return {
        ...state,
        dateFilterChanged: true
    };
}

export function dateFilterClear(state, action){
    let filteringService = FilteringService.getInstance();

    filteringService.restoreFromInitial(Config.suiteNamespace);

    for (let entry of Object.entries(filteringService.getFilters(Config.suiteNamespace))){
        action.filter(entry[1], entry[0], action.dispatch, true)
    }

    return {
        ...state,
        dateFilterChanged: false
    }
}

export function filteringSuitesStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state
    };

    return newState;
}

export function filteringSuitesFinished(state, action){

    let adapter = new TestSuitesGriddleAdapter(action.scores)

    $(".griddle-page-select").show()

    let newState = {
        ...state,
        data: adapter.getGriddleData()
    }

    return newState;
}

export function hideModel(state, action){
    let hiddenModels = state.hiddenModels;
    hiddenModels.push(action.modelKey);

    let adapter = ScoreMatrixGriddleAdapter.getInstance()
    adapter.setHiddenModels(hiddenModels);

    return {
        ...state,
        scoreMatrixList: adapter.getScoreMatrix(),
        scoreMatrixTableDataList: adapter.getGriddleData(),
        hiddenModels
    }
}

export function showAllModels(state, action){
    let adapter = ScoreMatrixGriddleAdapter.getInstance()
    adapter.setHiddenModels([]);

    return {
        ...state,
        scoreMatrixList: adapter.getScoreMatrix(),
        scoreMatrixTableDataList: adapter.getGriddleData(),
        hiddenModels: []
    };
}
