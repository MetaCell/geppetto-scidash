export const OPEN_SUITES_VIEW = "OPEN_SUITES_VIEW";
export const OPEN_TESTS_VIEW = "OPEN_TESTS_VIEW";

export function openTestsView(){
    return {
        type: OPEN_TESTS_VIEW
    };
}

export function openSuitesView(){
    return {
        type: OPEN_SUITES_VIEW
    };
}