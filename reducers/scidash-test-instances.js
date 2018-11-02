import {
    FILTERING_TESTS_STARTED,
    FILTERING_TESTS_FINISHED
} from '../actions/creators/test-instances';
import {
    filteringTestsStarted,
    filteringTestsFinished
} from '../actions/test-instances';


export default function scidashTestInstances(state = {}, action = null){
    console.group("SCIDASH TEST INSTANCES REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
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

    return newState;
}

