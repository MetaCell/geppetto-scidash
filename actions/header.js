import ApiService from '../services/api/ApiService';

export function toggleSettings(headerState, action){

    let newState = {
        ...headerState,
        showSettings: !headerState.showSettings
    };

    return newState;
}

export function hideSettings(headerState, action){

    let newState = {
        ...headerState,
        showSettings: false
    };

    return newState;
}

export function toggleColorBlind(headerState, action){

    let newState = {
        ...headerState,
        colorBlind: !headerState.colorBlind
    };

    return newState;
}

export function openTestsPage(headerState, action){

    new ApiService().clearFilters()
    window.history.pushState("", "", "/");

    let newState = {
        ...headerState,
        suitesActive: false,
        testsActive: true
    };

    return newState;
}

export function openSuitesPage(headerState, action){

    new ApiService().clearFilters()
    window.history.pushState("", "", "/");

    let newState = {
        ...headerState,
        testsActive: false,
        suitesActive: true
    };

    return newState;
}
