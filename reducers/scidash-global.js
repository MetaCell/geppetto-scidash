import {
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from '../actions/creators/global';

import {
    dateFilterChanged,
    dateFilterClear
} from '../actions/global';

export default function scidashGlobal(state = {}, action){
    console.group("SCIDASH GLOBAL REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
        case DATE_FILTER_CHANGED:
            newState = {
                ...dateFilterChanged(state, action)
            }
            break;
        case DATE_FILTER_CLEAR:
            newState = {
                ...dateFilterClear(state, action)
            }
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
