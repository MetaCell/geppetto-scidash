import {
    openTestsPage,
    openSuitesPage
} from '../actions/shared';
import {
    OPEN_SUITES_PAGE,
    OPEN_TESTS_PAGE
} from '../actions/creators/shared';

export default function scidashGlobal(state = {}, action){
    console.group("SCIDASH GLOBAL REDUCER")

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;

    switch(action.type){
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
