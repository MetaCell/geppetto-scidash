import {
    FILTERING_TESTS_STARTED,
    FILTERING_TESTS_FINISHED,
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from '../actions/creators/tests';
import {
    filteringTestsStarted,
    filteringTestsFinished,
    dateFilterChanged,
    dateFilterClear
} from '../actions/tests';

export default function scidashTestInstances(state = {}, action){
    console.group("SCIDASH TEST INSTANCES REDUCER")

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
        case FILTERING_TESTS_STARTED:
            newState = {
                ...filteringTestsStarted(state, action)
            };
            break;
        case FILTERING_TESTS_FINISHED:
            newState = {
                ...filteringTestsFinished(state, action)
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

    return newState
}
