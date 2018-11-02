import {
    DATE_FILTER_CHANGED,
    DATE_FILTER_CLEAR
} from '../actions/creators/global';
import {
    openTestsPage,
    openSuitesPage
} from '../actions/shared';
import {
    OPEN_SUITES_PAGE,
    OPEN_TESTS_PAGE
} from '../actions/creators/shared';

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
        case OPEN_SUITES_PAGE:
            newState = {
                ...openSuitesPage(state, action, 'global')
            }
            break;
        case OPEN_TESTS_PAGE:
            newState = {
                ...openTestsPage(state, action, 'global')
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
