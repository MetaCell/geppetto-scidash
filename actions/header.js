export function toggleSettings(headerState, action){
    console.log("Action dispatched: ", action);

    let newState = {
        ...headerState,
        showSettings: !headerState.showSettings
    };

    return newState;
}

export function hideSettings(headerState, action){
    console.log("Action dispatched: ", action);

    let newState = {
        ...headerState,
        showSettings: false
    };

    return newState;
}

export function toggleColorBlind(headerState, action){
    console.log("Action dispatched: ", action);

    let newState = {
        ...headerState,
        colorBlind: !headerState.colorBlind
    };

    return newState;
}

export function openTestsPage(headerState, action){
    console.log("Action dispatched: ", action);

    let newState = {
        ...headerState,
        suitesActive: false,
        testsActive: true
    };

    return newState;
}

export function openSuitesPage(headerState, action){
    console.log("Action dispatched: ", action);

    let newState = {
        ...headerState,
        testsActive: false,
        suitesActive: true
    };

    return newState;
}
