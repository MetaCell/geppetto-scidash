import TestSuitesGriddleAdapter from '../shared/adapter/TestSuitesGriddleAdapter';
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

    let adapter = new TestSuitesGriddleAdapter()

    $(".griddle-page-select").show()

    adapter.setup(action.scores);

    let newState = {
        ...state,
        showLoading: false,
        data: adapter.getGriddleData()
    }

    return newState;
}

