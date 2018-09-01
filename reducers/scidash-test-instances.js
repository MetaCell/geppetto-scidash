import {
    FILTERING_STARTED,
    FILTERING_FINISHED
} from '../actions/creators/test-instances';
import {
    filteringStarted,
    filteringFinished
} from '../actions/test-instances';


export default function scidashTestInstances(state = {}, action = null){
    console.group("SCIDASH TEST INSTANCES REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
        case FILTERING_STARTED:
            newState = {
                ...filteringStarted(state, action)
            };
            break;
        case FILTERING_FINISHED:
            newState = {
                ...filteringFinished(state, action)
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

