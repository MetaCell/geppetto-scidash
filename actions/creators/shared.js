export const OPEN_SUITES_PAGE = "OPEN_SUITES_PAGE";
export const OPEN_TESTS_PAGE = "OPEN_TESTS_PAGE";

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

