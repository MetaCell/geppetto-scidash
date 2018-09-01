import TestInstancesGriddleAdapter from '../shared/adapter/TestInstancesGriddleAdapter';
import $ from 'jquery';

export function filteringStarted(state, action){

    $(".griddle-page-select").hide()

    let newState = {
        ...state,
        showLoading: true
    };

    return newState;
}

export function filteringFinished(state, action){

    let adapter = new TestInstancesGriddleAdapter()

    $(".griddle-page-select").show()

    adapter.setup(action.scores);

    let newState = {
        ...state,
        showLoading: false,
        data: adapter.getGriddleData()
    }

    return newState;
}
