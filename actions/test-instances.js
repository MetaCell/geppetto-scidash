import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
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
    let initialStateService = InitialStateService.getInstance();
    let scoreApiService = new ScoreApiService();

    for (let entry of Object.entries(initialStateService.getInitialState().global.globalFilters)){
        scoreApiService.setupFilter(entry[0], entry[1]);
        action.filter(entry[1], entry[0], action.dispatch, true)
    }
}
