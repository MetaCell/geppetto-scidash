export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const HIDE_SETTINGS = 'HIDE_SETTINGS';

export const TOGGLE_COLOR_BLIND = 'TOGGLE_COLOR_BLIND';

export const OPEN_TESTS_PAGE = 'OPEN_TESTS_PAGE';
export const OPEN_SUITES_PAGE = 'OPEN_SUITES_PAGE';


export function toggleSettings(){
    return {
        type: TOGGLE_SETTINGS
    };
}

export function toggleColorBlind(){
    return {
        type: TOGGLE_COLOR_BLIND
    };
}

export function hideSettings(){
    return {
        type: HIDE_SETTINGS
    };
}

export function openTestsPage(){
    return {
        type: OPEN_TESTS_PAGE
    };
}

export function openSuitesPage(){
    return {
        type: OPEN_SUITES_PAGE
    };
}
