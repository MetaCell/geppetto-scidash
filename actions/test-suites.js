import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
import ScoreMatrixGriddleAdapter from '../shared/adapter/ScoreMatrixGriddleAdapter';
import $ from 'jquery';

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
        scoreMatrix: adapter.getScoreMatrix(),
        scoreMatrixTableData: adapter.getGriddleData(),
        hiddenModels
    }
}
