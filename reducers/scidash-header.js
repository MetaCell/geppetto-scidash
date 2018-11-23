import {
    toggleSettings,
    hideSettings,
    toggleColorBlind,
    toggleDrawer,
    changePage
} from '../actions/header';
import {
    openTestsView,
    openSuitesView
} from '../actions/shared';
import {
    TOGGLE_SETTINGS,
    HIDE_SETTINGS,
    TOGGLE_COLOR_BLIND,
    TOGGLE_DRAWER,
    CHANGE_PAGE
} from '../actions/creators/header';
import {
    OPEN_SUITES_VIEW,
    OPEN_TESTS_VIEW
} from '../actions/creators/shared';


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
        case OPEN_SUITES_VIEW:
            newState = {
                ...openSuitesView(state, action, 'header')
            }
            break;
        case OPEN_TESTS_VIEW:
            newState = {
                ...openTestsView(state, action, 'header')
            }
            break;
        case TOGGLE_DRAWER:
            newState = {
                ...toggleDrawer(state, action)
            }
            break;
        case CHANGE_PAGE:
            newState = {
                ...changePage(state, action)
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
