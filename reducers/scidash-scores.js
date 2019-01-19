import {
    FILTERING_SCORES_STARTED,
    FILTERING_SCORES_FINISHED,
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from '../actions/creators/scores';
import {
    filteringScoresStarted,
    filteringScoresFinished,
    dateFilterChanged,
    dateFilterClear
} from '../actions/scores';


export default function scidashScores(state = {}, action = null){
    console.group("SCIDASH SCORES REDUCER")

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
        case FILTERING_SCORES_STARTED:
            newState = {
                ...filteringScoresStarted(state, action)
            };
            break;
        case FILTERING_SCORES_FINISHED:
            newState = {
                ...filteringScoresFinished(state, action)
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

