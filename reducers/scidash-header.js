import {
    toggleSettings,
    hideSettings,
    toggleColorBlind,
    openTestsPage,
    openSuitesPage
} from '../actions/header';

import InitialStateService from '../services/InitialStateService';

let initialState = new InitialStateService().getInitialState();

export default function scidashHeader(state = initialState.header, action){
    console.group("SCIDASH HEADER REDUCER");

    let newState = null;

    switch(action.type){
        case "TOGGLE_SETTINGS":
            newState = {
                ...toggleSettings(state, action)
            }
            break;
        case "HIDE_SETTINGS":
            newState = {
                ...hideSettings(state, action)
            }
            break;
        case "TOGGLE_COLOR_BLIND":
            newState = {
                ...toggleColorBlind(state, action)
            }
            break;
        case "OPEN_SUITES_PAGE":
            newState = {
                ...openSuitesPage(state, action)
            }
            break;
        case "OPEN_TESTS_PAGE":
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

    console.groupEnd()

    return newState;
}
