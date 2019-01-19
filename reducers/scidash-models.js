import {
    FILTERING_MODELS_STARTED,
    FILTERING_MODELS_FINISHED,
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from '../actions/creators/models';
import {
    filteringModelsStarted,
    filteringModelsFinished,
    dateFilterChanged,
    dateFilterClear
} from '../actions/models';

export default function scidashModels(state = {}, action){
    console.group("SCIDASH MODELS REDUCER")

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
        case FILTERING_MODELS_STARTED:
            newState = {
                ...filteringModelsStarted(state, action)
            };
            break;
        case FILTERING_MODELS_FINISHED:
            newState = {
                ...filteringModelsFinished(state, action)
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

