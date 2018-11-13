import {
    FILTERING_SUITES_FINISHED,
    FILTERING_SUITES_STARTED,
    HIDE_MODEL,
    SHOW_ALL_MODELS,
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from "../actions/creators/test-suites"
import {
    filteringSuitesFinished,
    filteringSuitesStarted,
    hideModel,
    showAllModels,
    dateFilterChanged,
    dateFilterClear
} from "../actions/test-suites"

export default function scidashTestSuites(state = {}, action){
    console.group("SCIDASH TEST SUITES REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
        case DATE_FILTER_CLEAR:
            newState = {
                ...dateFilterClear(state, action)
            }
            break;
        case DATE_FILTER_CHANGED:
            newState = {
                ...dateFilterChanged(state, action)
            }
            break;
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
        case SHOW_ALL_MODELS:
            newState = {
                ...showAllModels(state, action)
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

