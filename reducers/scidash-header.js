import {
    toggleSettings,
    hideSettings,
    toggleColorBlind,
    openTestsPage,
    openSuitesPage
} from '../actions/header';
import {
    TOGGLE_SETTINGS,
    HIDE_SETTINGS,
    TOGGLE_COLOR_BLIND,
    OPEN_SUITES_PAGE,
    OPEN_TESTS_PAGE
} from '../actions/creators/header';

export default function scidashHeader(state = {}, action){
    console.group("SCIDASH HEADER REDUCER");

    if (action !== null)
        console.log("ACTION DISPATCHED: ", action)

    let newState = null;


    switch(action.type){
        case TOGGLE_SETTINGS:
            newState = {
                ...toggleSettings(state, action)
            }
            break;
        case HIDE_SETTINGS:
            newState = {
                ...hideSettings(state, action)
            }
            break;
        case TOGGLE_COLOR_BLIND:
            newState = {
                ...toggleColorBlind(state, action)
            }
            break;
        case OPEN_SUITES_PAGE:
            newState = {
                ...openSuitesPage(state, action)
            }
            break;
        case OPEN_TESTS_PAGE:
            newState = {
                ...openTestsPage(state, action)
            }
            break;
        default:
            newState = {
                ...state
            };
            break;
    }

    console.log("Current state: ", newState);
    console.groupEnd()

    return newState;
}
