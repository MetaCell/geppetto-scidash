import {
    FILTERING_SUITES_FINISHED,
    FILTERING_SUITES_STARTED,
    HIDE_MODEL
} from "../actions/creators/test-suites"
import {
    filteringSuitesFinished,
    filteringSuitesStarted,
    hideModel
} from "../actions/test-suites"

export default function scidashTestSuites(state = {}, action){
    console.group("SCIDASH TEST SUITES REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
        case FILTERING_SUITES_STARTED:
            newState = {
                ...filteringSuitesStarted(state, action)
            };
            break;
        case FILTERING_SUITES_FINISHED:
            newState = {
                ...filteringSuitesFinished(state, action)
            };
            break;
        case HIDE_MODEL:
            newState = {
                ...hideModel(state, action)
            };
            break;
        default:
            newState = {
                ...state,
            };
            break;
    }

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState;
}

