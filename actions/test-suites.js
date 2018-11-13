import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import ScoreMatrixGriddleAdapter from '../shared/adapter/ScoreMatrixGriddleAdapter';
import $ from 'jquery';

export function dateFilterChanged(state, action){
    return {
        ...state,
        dateFilterChanged: true
    };
}

export function dateFilterClear(state, action){
    let initialStateService = InitialStateService.getInstance();
    let scoreApiService = new ScoreApiService();

    for (let entry of Object.entries(initialStateService.getInitialState().global.globalFilters)){
        scoreApiService.setupFilter(entry[0], entry[1]);
        action.filter(entry[1], entry[0], action.dispatch, true)
    }
}

export function filteringSuitesStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state,
        showLoading: true
    };

    return newState;
}

export function filteringSuitesFinished(state, action){

    let adapter = new TestSuitesGriddleAdapter(action.scores)

    $(".griddle-page-select").show()

    let newState = {
        ...state,
        showLoading: false,
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
